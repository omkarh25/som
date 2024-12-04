# SOM - Office Management System Frontend

SOM is a comprehensive office management system designed to simplify the management of personal and professional duties. This repository contains the frontend implementation using Next.js and modern web technologies.

## Features

- **Data Models**: View and manage database structures across departments and projects
- **Control Processes**: Execute and manage various business processes and workflows
- **Role Views**: Access role-specific templates and functionalities

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── datamodels/        # Data models view
│   │   ├── controlprocesses/  # Process management
│   │   ├── roleviews/        # Role-specific views
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # Reusable components
│   │   └── ui/              # UI components
│   └── constants/           # Application constants
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## Getting Started

1. **Prerequisites**
   - Node.js 18 or later
   - npm or yarn package manager

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd frontend

   # Install dependencies
   npm install
   ```

3. **Development**
   ```bash
   # Start development server
   npm run dev
   ```
   Visit `http://localhost:3000` to view the application.

4. **Build**
   ```bash
   # Create production build
   npm run build

   # Start production server
   npm start
   ```

## Project Organization

- **Components**: Reusable UI components are stored in `src/components/ui/`
- **Pages**: Each major section has its own page under `src/app/`
- **Constants**: Application data and configurations are in `src/constants/`

## Database Structure

The system currently supports the following databases:

### Kaas.db (BookKeeping)
- **Transactions**: Records financial transactions
- **Accounts**: Manages account information
- **Freedom**: Tracks future transactions

## Available Roles

1. **BookKeeping**
   - Owner: Full access to all features
   - CAView: Chartered Accountant specific views
   - CalendarView: Schedule and deadline management

2. **ContentManagement**
   - Owner: Full system access
   - CreatorView: Content creation workspace

3. **DocumentManagement**
   - Owner: Complete document system access
   - DocManagerView: Document processing workspace

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
