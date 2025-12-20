# Rust-in Website

Rust-in is a modern bicycle shop website built with [Payload CMS](https://payloadcms.com) and [Next.js](https://nextjs.org). The website features a fully-functional admin panel for managing content, products (bikes, scooters, skis), team members, reviews, FAQs, and more.

## About Rust-in

Rust-in is a bicycle repair shop and sales platform that helps cyclists maintain and purchase quality bikes. The website showcases:

- **Product Catalog**: Browse and manage bikes, scooters, and skis
- **Team Management**: Showcase your team members with photos and descriptions
- **Customer Reviews**: Display testimonials from satisfied customers
- **FAQ Section**: Answer common questions
- **Contact Information**: Manage opening hours and contact details
- **Pricing Information**: Display service prices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: Payload CMS 3.67
- **Database**: MongoDB (via `@payloadcms/db-mongodb`)
- **Storage**: Vercel Blob Storage (for media files)
- **Styling**: TailwindCSS with shadcn/ui components
- **Language**: TypeScript
- **Fonts**: Geist Sans & Geist Mono

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.20.2 or >= 20.9.0
- **pnpm**: Version 9 or 10 (package manager)
- **MongoDB**: A MongoDB database (local or cloud-based like MongoDB Atlas)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd test-rust-in2
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URI=mongodb://localhost:27017/rust-in
# or for MongoDB Atlas:
# DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/rust-in

# Payload Secret (generate a random string)
PAYLOAD_SECRET=your-secret-key-here

# Vercel Blob Storage (optional, for media storage)
BLOB_READ_WRITE_TOKEN=your-blob-token-here

# Server URL (for development)
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

To generate a secure `PAYLOAD_SECRET`, you can use:

```bash
openssl rand -base64 32
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### 5. Create Your First Admin User

1. Navigate to http://localhost:3000/admin
2. Follow the on-screen instructions to create your first admin user
3. Once logged in, you can start managing content through the admin panel

## Development

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm generate:types` - Generate TypeScript types from Payload collections

### Project Structure

```
test-rust-in2/
├── src/
│   ├── app/
│   │   ├── (frontend)/     # Public-facing pages
│   │   │   ├── about/      # About page
│   │   │   ├── contact/    # Contact page
│   │   │   └── ...
│   │   └── (payload)/      # Payload admin routes
│   │       └── admin/      # Admin panel
│   ├── collections/        # Payload collections
│   │   ├── Bikes/
│   │   ├── Scooters/
│   │   ├── Skis/
│   │   ├── Team/
│   │   ├── Reviews/
│   │   ├── FAQ/
│   │   └── ...
│   ├── components/         # React components
│   ├── payload.config.ts    # Payload CMS configuration
│   └── ...
├── public/                 # Static assets
│   └── media/              # Uploaded media files
└── package.json
```

### Working with Collections

The website includes the following Payload collections:

- **Bikes**: Manage bicycle inventory
- **Scooters**: Manage scooter inventory
- **Skis**: Manage ski inventory
- **Team**: Manage team members
- **Reviews**: Customer testimonials
- **FAQ**: Frequently asked questions
- **OpeningHours**: Store hours
- **ContactInfo**: Contact information
- **Prices**: Service pricing
- **Media**: Image and file uploads
- **Users**: Admin users

### Database

This project uses MongoDB. For local development, you can:

1. Install MongoDB locally, or
2. Use MongoDB Atlas (free tier available)

The database connection is configured in `src/payload.config.ts` using the `DATABASE_URI` environment variable.

### Media Storage

By default, media files are stored using Vercel Blob Storage. To use local storage instead, you can modify the storage configuration in `src/payload.config.ts`.

## Production

### Build for Production

1. Ensure all environment variables are set in your production environment
2. Build the application:

```bash
pnpm build
```

3. Start the production server:

```bash
pnpm start
```

### Environment Variables for Production

Make sure to set all required environment variables in your production environment:

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob Storage)
- `PAYLOAD_PUBLIC_SERVER_URL` (your production URL)

## Deployment

### Deploying to Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

The project uses Vercel Blob Storage for media files, which works seamlessly with Vercel deployments.

### Self-hosting

You can deploy this application to any Node.js hosting platform:

1. Ensure your hosting platform supports Node.js 18.20.2+ or 20.9.0+
2. Set up MongoDB (local or cloud)
3. Configure environment variables
4. Build and start the application

## Features

### Admin Panel

- Full CRUD operations for all collections
- Rich text editor (Lexical) for content editing
- Media management with image optimization
- User authentication and access control
- Live preview of content changes

### Frontend

- Responsive design (mobile-first)
- SEO optimized
- Fast page loads with Next.js App Router
- Dark mode support
- Modern UI with TailwindCSS and shadcn/ui

## Troubleshooting

### Common Issues

**Database Connection Error**

- Verify your `DATABASE_URI` is correct
- Ensure MongoDB is running (if local)
- Check network connectivity (if using cloud database)

**Build Errors**

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check Node.js version matches requirements

**Media Upload Issues**

- Verify `BLOB_READ_WRITE_TOKEN` is set correctly
- Check Vercel Blob Storage quota

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions:

- Check the [Payload CMS documentation](https://payloadcms.com/docs)
- Check the [Next.js documentation](https://nextjs.org/docs)
- Open an issue in the repository
