# Municipality Administration Guide

This guide provides detailed information for municipality administrators on how to use and manage the Volis platform.

## Getting Started

### 1. Administrator Access

To access the administrator dashboard:
1. Log in with your Estonian ID
2. Navigate to `/admin` dashboard
3. Verify your municipality administrator role

### 2. Dashboard Overview

The administrator dashboard provides:
- Active votings overview
- Participation statistics
- User management tools
- System settings

## Managing Votings

### 1. Creating a New Voting

```typescript
// Example of creating a new voting
async function createVoting(voting: VotingCreation) {
  const response = await fetch('/api/votings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voting),
  });
  return response.json();
}
```

Required steps:
1. Fill in basic information
2. Set voting period
3. Define voting options
4. Configure eligibility criteria
5. Review and publish

### 2. Managing Active Votings

Administrators can:
- Monitor participation
- View live results
- Handle issues
- Extend or close votings

### 3. Results Management

```typescript
interface VotingResults {
  votingId: string;
  totalVotes: number;
  options: Array<{
    id: string;
    title: string;
    votes: number;
    percentage: number;
  }>;
  demographics?: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
  };
}
```

## User Management

### 1. Voter Registration

- Automatic registration through Estonian ID
- Manual registration for special cases
- Voter eligibility verification
- User role management

### 2. Administrator Management

```typescript
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  permissions: string[];
  municipalityId: string;
}
```

## Security and Compliance

### 1. Data Protection

Administrators must ensure:
- GDPR compliance
- Data minimization
- Secure data handling
- Regular security audits

### 2. Access Control

```typescript
interface AccessControl {
  role: 'ADMIN' | 'SUPER_ADMIN';
  permissions: {
    createVoting: boolean;
    manageUsers: boolean;
    viewResults: boolean;
    exportData: boolean;
    systemSettings: boolean;
  };
}
```

## Reporting and Analytics

### 1. Available Reports

- Participation statistics
- Voting patterns
- User demographics
- System usage

### 2. Data Export

```typescript
interface ExportOptions {
  format: 'CSV' | 'JSON' | 'PDF';
  dateRange: {
    start: Date;
    end: Date;
  };
  includeData: {
    votingResults: boolean;
    userStats: boolean;
    systemLogs: boolean;
  };
}
```

## System Configuration

### 1. Municipality Settings

```typescript
interface MunicipalitySettings {
  name: string;
  code: string;
  contactEmail: string;
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    notificationTypes: string[];
  };
  customization: {
    logo?: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
}
```

### 2. Notification Templates

Customize messages for:
- Voting announcements
- Reminders
- Results publication
- System notifications

## Best Practices

### 1. Voting Management

- Plan voting periods carefully
- Provide clear descriptions
- Set appropriate duration
- Monitor participation

### 2. User Communication

- Regular updates
- Clear instructions
- Prompt issue resolution
- Transparent results

### 3. Data Management

- Regular backups
- Data cleanup
- Access reviews
- Audit logging

## Troubleshooting

### 1. Common Issues

- Authentication problems
- Voting access issues
- Result discrepancies
- System errors

### 2. Support Resources

- Technical documentation
- Support contact
- FAQ section
- Training materials

## API Integration

### 1. Available Endpoints

```typescript
// Municipality-specific endpoints
GET    /api/municipalities/:id/stats
GET    /api/municipalities/:id/users
POST   /api/municipalities/:id/settings
PUT    /api/municipalities/:id/notifications

// Voting management endpoints
POST   /api/votings/create
PUT    /api/votings/:id/status
GET    /api/votings/:id/results
POST   /api/votings/:id/extend
```

### 2. Webhook Integration

```typescript
interface WebhookConfig {
  url: string;
  events: Array<'voting.created' | 'voting.completed' | 'user.voted'>;
  secret: string;
  enabled: boolean;
}
```

For technical support or additional guidance, contact the Volis support team.
