import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';

import { auth } from '@/app/(auth)/auth';
import { initS3Client, getS3BucketName } from '@/lib/aws/s3';

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    // Update the file type to accept CV file formats
    .refine(
      (file) => [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ].includes(file.type),
      {
        message: 'File type should be JPEG, PNG, PDF, DOCX, DOC, or TXT',
      }
    ),
});

export async function POST(request: Request) {
  // Initialize S3 client
  const s3Client = initS3Client();

  // Validate AWS configuration
  if (!s3Client) {
    console.error('Failed to initialize S3 client');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // Get bucket name
  let bucketName: string | undefined;
  try {
    bucketName = getS3BucketName();
  } catch (error) {
    console.error('Failed to get S3 bucket name:', error);
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (request.body === null) {
    return new Response('Request body is empty', { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(', ');

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Get filename from formData since Blob doesn't have name property
    const originalFilename = (formData.get('file') as File).name;

    // Create a unique filename to avoid collisions
    const uniqueId = nanoid();
    const filename = `${session.user?.id}/${uniqueId}-${originalFilename}`;

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    try {
      // Upload file to S3
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: fileBuffer,
        ACL: 'public-read',
        ContentType: file.type,
      });
      await s3Client.send(putObjectCommand);

      // Generate a pre-signed URL for accessing the uploaded file
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: filename,
      });

      // Generate a signed URL that will work with the correct endpoint
      const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 * 24 * 7 }); // URL valid for 7 days

      // Remove query parameters from URL if you want a clean URL (optional)
      const cleanUrl = url.split('?')[0];

      return NextResponse.json({
        url: cleanUrl,
        path: filename,
        size: file.size,
        contentType: file.type
      });
    } catch (error) {
      console.error('S3 upload error:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}
