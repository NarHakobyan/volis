# CV-Job Matching Guide

This guide explains how to use the CV-Job Matching feature to analyze CVs against job requirements and get detailed matching analysis.

## Overview

The CV-Job Matching feature uses advanced AI to compare a candidate's CV with job requirements and provides:

1. An overall matching score (percentage)
2. Detailed analysis of matching skills and experience
3. Identification of missing requirements
4. Suggestions for improving the CV for the specific job

## For Job Seekers

### Uploading Your CV

1. Navigate to the CV Matching artifact in the workspace
2. Click on "Upload CV" button
3. Select your CV file (supported formats: PDF, DOCX, TXT)
4. The system will automatically extract information from your CV

### Adding Job Requirements

1. Paste the job description in the "Job Requirements" text area
2. Alternatively, you can manually enter key requirements and responsibilities
3. Click "Analyze Match" to start the analysis

### Understanding Your Results

The analysis will provide:

- **Overall Match Score**: A percentage indicating how well your CV matches the job requirements
- **Skills Match**: A breakdown of skills that match the job requirements
- **Experience Match**: Analysis of your experience relative to job requirements
- **Missing Requirements**: Identification of requirements not found in your CV
- **Improvement Suggestions**: Actionable recommendations to improve your CV for this specific job

### Saving and Comparing Results

- You can save the analysis results for future reference
- Compare results across different job applications to identify patterns
- Track your CV improvements over time

## For Employers and Recruiters

### Uploading Job Requirements

1. Navigate to the CV Matching artifact in the workspace
2. Enter the job title, requirements, and responsibilities in the designated fields
3. Be as specific as possible about required skills, experience, and qualifications

### Analyzing Multiple CVs

1. Upload candidate CVs one by one
2. The system will analyze each CV against the job requirements
3. View a ranked list of candidates based on matching scores

### Detailed Candidate Analysis

For each candidate, you can view:

- Overall matching score
- Breakdown of matching skills and experience
- Qualifications that align with job requirements
- Areas where the candidate may need additional training or development

## Advanced Features

### Custom Weighting

You can adjust the importance of different requirements:

1. Click on "Advanced Settings" in the CV Matching artifact
2. Assign weights to different categories (skills, experience, education, etc.)
3. The matching algorithm will prioritize requirements based on your weights

### Batch Processing

For enterprise users:

1. Upload multiple CVs at once
2. The system will analyze all CVs against the job requirements
3. View a ranked list of candidates with detailed analysis for each

### Integration with ATS

The CV-Job Matching AI can integrate with your existing Applicant Tracking System:

1. Configure the API integration in settings
2. Import job requirements and CVs directly from your ATS
3. Export analysis results back to your ATS

## Best Practices

### For Optimal Results

1. **Use Structured CVs**: Well-structured CVs with clear sections for skills, experience, and education yield better results
2. **Be Specific in Job Requirements**: Clearly define required skills, experience levels, and qualifications
3. **Review and Refine**: The AI provides analysis, but human judgment is still important for final decisions

### Privacy Considerations

1. All uploaded CVs are processed securely
2. Data is encrypted at rest and in transit
3. You can delete CV data at any time from your account settings

## Setting Up AWS S3 for CV Storage

To enable CV uploads, you need to configure AWS S3 bucket storage:

### AWS S3 Configuration Steps

1. **Create an AWS Account** (if you don't already have one)
   - Go to https://aws.amazon.com/ and sign up for an account

2. **Create an S3 Bucket**
   - Navigate to S3 service in AWS Console
   - Click "Create bucket"
   - Name your bucket (e.g., "your-company-cvs")
   - Choose the appropriate region (preferably closest to your users)
   - Configure public access settings (ensure the bucket allows appropriate access)
   - Complete the bucket creation process

3. **Create an IAM User with S3 Access**
   - Go to IAM service in AWS Console
   - Create a new user for your application
   - Attach policies with S3 permissions (AmazonS3FullAccess or custom policy)
   - Save the Access Key ID and Secret Access Key when provided

4. **Configure Environment Variables**
   - Add these variables to your `.env.local` file:
   
   ```
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_selected_region
   AWS_S3_BUCKET_NAME=your_bucket_name
   ```

5. **Set Up CORS Configuration for Your S3 Bucket**
   - In the S3 Console, select your bucket and go to "Permissions" tab
   - Find "Cross-origin resource sharing (CORS)" and click "Edit"
   - Add a CORS configuration like:
   
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```
   
   Note: For production, restrict AllowedOrigins to your specific domain.

### Testing CV Uploads

After configuring AWS S3:

1. Restart your development server
2. Navigate to the CV upload section
3. Attempt to upload a sample CV
4. Check the AWS S3 Console to verify files are being stored correctly

## Troubleshooting

### Common Issues

- **Low Quality Extraction**: If your CV is in an image-based PDF or has unusual formatting, try converting it to a text-based format
- **Vague Job Requirements**: If job requirements are too vague, the matching may be less accurate
- **Language Differences**: The system works best with English language CVs and job descriptions
- **Upload Errors**: If CV uploads fail, check your AWS credentials and bucket permissions

For additional help, contact support at support@cv-matching-ai.com
