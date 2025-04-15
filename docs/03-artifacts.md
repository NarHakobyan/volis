# Components and Features

This document describes the key components and features of the Volis application.

## Core Components

### Estonia Map Component

The `EstoniaMap` component provides an interactive visualization of Estonian municipalities:

```typescript
// components/estonia-map.tsx
export function EstoniaMap() {
  // Interactive map using react-leaflet
  // Clickable regions with active voting indicators
  // Navigation to municipality-specific pages
}
```

Key features:
- Interactive map visualization
- Region highlighting based on active votings
- Click navigation to municipality pages
- Responsive design for different screen sizes

### Active Votings Component

The `ActiveVotings` component displays current and upcoming votings:

```typescript
// components/active-votings.tsx
export function ActiveVotings() {
  // List of active and upcoming votings
  // Voting cards with key information
  // Status indicators and navigation
}
```

Features:
- Voting status badges
- Date range display
- Municipality and voting type information
- Direct links to voting details

## Authentication and Authorization

The application uses Next.js middleware for authentication and role-based access control:

```typescript
// middleware.ts
export const middleware = authMiddleware({
  publicRoutes: ['/'],
  roleRoutes: {
    admin: ['/admin/*'],
    voter: ['/vote/*']
  }
});
```

## API Routes

### Voting Management

```typescript
// app/api/votings/route.ts
// Create new voting
POST /api/votings
{
  title: string
  description: string
  type: VotingType
  startDate: Date
  endDate: Date
  municipalityId: string
}

// Get active votings
GET /api/votings/active

// Get voting details
GET /api/votings/:id

// Submit vote
POST /api/votings/:id/vote
{
  choice: any
}
```

### Municipality Management

```typescript
// app/api/municipalities/route.ts
// List municipalities
GET /api/municipalities

// Get municipality details
GET /api/municipalities/:id

// Get municipality votings
GET /api/municipalities/:id/votings
```

## UI Components

The application uses shadcn/ui components for consistent styling:

### Cards

```typescript
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Voting Card Example
<Card>
  <CardHeader>
    <CardTitle>{voting.title}</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Voting details */}
  </CardContent>
</Card>
```

### Badges

```typescript
import { Badge } from "@/components/ui/badge";

// Status Badge Example
<Badge variant={voting.status === "active" ? "default" : "secondary"}>
  {voting.status}
</Badge>
```

## Data Flow

1. User Authentication
   - Login with Estonian ID
   - Role assignment based on municipality

2. Voting Process
   - Browse active votings
   - Select voting
   - Submit choice
   - Receive confirmation

3. Admin Functions
   - Create/manage votings
   - Monitor participation
   - View results

## Error Handling

The application implements comprehensive error handling:

```typescript
// Error Boundary Component
export function ErrorBoundary({ children }) {
  // Catch and handle rendering errors
  // Display user-friendly error messages
  // Log errors for monitoring
}

// API Error Handling
export async function handleError(error: unknown) {
  // Log error details
  // Return appropriate error response
  // Maintain type safety
}
```

## Testing

The application includes various types of tests:

1. Unit Tests
   ```typescript
   // Example component test
   describe('VotingCard', () => {
     it('displays correct voting information', () => {
       // Test implementation
     });
   });
   ```

2. Integration Tests
   ```typescript
   // Example API route test
   describe('POST /api/votings', () => {
     it('creates new voting successfully', () => {
       // Test implementation
     });
   });
   ```

3. E2E Tests
   ```typescript
   // Example E2E test
   test('user can submit vote', async ({ page }) => {
     // Test implementation
   });
   ```

For more detailed information about specific components or features, refer to the inline documentation in the codebase.
