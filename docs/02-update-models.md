# Database Schema and Models

This document describes the database schema and models used in the Volis application for managing local government votings in Estonia.

## Database Setup

The application uses PostgreSQL as the primary database, with [Drizzle ORM](https://orm.drizzle.team) for database operations and migrations.

### Schema Overview

The main database tables include:

```typescript
// Municipalities
municipalities {
  id: string (uuid)
  name: string
  code: string
  createdAt: timestamp
  updatedAt: timestamp
}

// Votings
votings {
  id: string (uuid)
  title: string
  description: text
  type: enum (NORMAL, YOUTH_COUNCIL, REFERENDUM)
  startDate: timestamp
  endDate: timestamp
  municipalityId: string (foreign key)
  status: enum (DRAFT, ACTIVE, COMPLETED)
  createdAt: timestamp
  updatedAt: timestamp
}

// Users
users {
  id: string (uuid)
  name: string
  email: string
  role: enum (ADMIN, VOTER)
  municipalityId: string (foreign key)
  createdAt: timestamp
  updatedAt: timestamp
}

// Votes
votes {
  id: string (uuid)
  votingId: string (foreign key)
  userId: string (foreign key)
  choice: jsonb
  createdAt: timestamp
}
```

## Working with Migrations

### Creating New Migrations

To create a new migration after schema changes:

```bash
pnpm db:generate
```

This will create a new migration file in the `drizzle/migrations` directory.

### Applying Migrations

To apply pending migrations:

```bash
pnpm db:migrate
```

### Migration Best Practices

1. Always create migrations for schema changes
2. Test migrations locally before deploying
3. Include both up and down migrations
4. Keep migrations atomic and focused
5. Add descriptive comments to complex migrations

## Model Usage

Example of using models in your code:

```typescript
import { db } from '@/lib/db';
import { votings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Fetch active votings for a municipality
const activeVotings = await db.query.votings.findMany({
  where: eq(votings.status, 'ACTIVE'),
  with: {
    municipality: true
  }
});
```

## Data Validation

We use [Zod](https://zod.dev) for runtime type validation of database operations. Example:

```typescript
import { z } from 'zod';

export const VotingSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
  type: z.enum(['NORMAL', 'YOUTH_COUNCIL', 'REFERENDUM']),
  startDate: z.date(),
  endDate: z.date(),
  municipalityId: z.string().uuid()
});
```

For more information about specific database operations and examples, refer to the API documentation.
