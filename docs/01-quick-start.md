# Quick Start

Volis is a web application built using [Next.js 14](https://nextjs.org) that provides a platform for managing and participating in local government votings in Estonia. The application features an interactive map interface, real-time voting updates, and comprehensive voting management tools.

### Pre-requisites:

- Node.js 18.17 or later
- PostgreSQL database
- pnpm package manager

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/volis
cd volis
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
   Copy the `.env.example` file to `.env.local` and update the values:
```bash
cp .env.example .env.local
```

4. Run database migrations:
```bash
pnpm db:migrate
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Project Structure

```
volis/
├── app/                # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions and database setup
├── public/            # Static assets
├── tests/             # Test files
├── docs/              # Documentation
└── drizzle/           # Database migrations and schema
```

### Key Features

- Interactive Estonia map with region-based navigation
- Real-time voting status updates
- Municipal voting management
- User authentication and authorization
- Responsive design with shadcn/ui components

### Development Guidelines

- Follow TypeScript best practices
- Use React Server Components where possible
- Implement proper error boundaries and loading states
- Follow the established component structure
- Use Tailwind CSS for styling

### Testing

Run the test suite:
```bash
pnpm test
```

For end-to-end tests:
```bash
pnpm test:e2e
```

### Database Migrations

To create a new migration:
```bash
pnpm db:generate
```

To apply migrations:
```bash
pnpm db:migrate
```

For more detailed information about specific features, please refer to the other documentation files in the `docs` folder.
