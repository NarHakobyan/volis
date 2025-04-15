import { S3Client } from '@aws-sdk/client-s3';

// Helper function to validate required environment variables
export function validateEnvVars(requiredVars: string[]): boolean {
  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName] || process.env[varName] === ''
  );

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    return false;
  }

  return true;
}

// Initialize S3 client with proper error handling
export function initS3Client(): S3Client | null {
  const requiredVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET_NAME'];

  if (!validateEnvVars(requiredVars)) {
    return null;
  }

  const region = process.env.AWS_REGION as string;

  return new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
}

// Get S3 bucket name with validation
export function getS3BucketName(): string {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('AWS_S3_BUCKET_NAME is not defined in the environment variables');
  }

  return bucketName;
}
