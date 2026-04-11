# Adinko Backend & Admin Dashboard

## Overview
Business website backend API and admin dashboard for grass sintetis/layanan.

## Tech Stack
- **Runtime**: Bun + Cloudflare Workers
- **API Framework**: Hono
- **Database**: SQLite via D1 + Drizzle ORM
- **Auth**: better-auth
- **Frontend**: TanStack Start (React) + TanStack Query + TanStack React Form
- **Storage**: Cloudflare R2 for image uploads
- **Deployment**: Alchemy

## Database Schema (`packages/db/src/schema/umum.ts`)

### Tables
- `kategori` - Category for portfolio/testimoni (id, nama, createdAt)
- `portfolio` - Portfolio entries with images (id, kategoriId, title, subtitle, image, alamat, tahun, createdAt)
- `testimoni` - Customer testimonials with images (id, kategoriId, nama, testimoni, image, createdAt)
- `layanan` - Services with images (id, title, image, createdAt)
- `kontak` - Contact information - single row (id, alamat, wa, instagram, email, updatedAt)

## API Routes (`apps/server/src/routes/`)

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/kategori` | GET, POST | List/Create categories |
| `/api/kategori/:id` | GET, PUT, DELETE | Single category CRUD |
| `/api/portfolio` | GET, POST | List/Create portfolio |
| `/api/portfolio/:id` | GET, PUT, DELETE | Single portfolio CRUD |
| `/api/testimoni` | GET, POST | List/Create testimonials |
| `/api/testimoni/:id` | GET, PUT, DELETE | Single testimonial CRUD |
| `/api/layanan` | GET, POST | List/Create services |
| `/api/layanan/:id` | GET, PUT, DELETE | Single service CRUD |
| `/api/kontak` | GET, PUT | Get/Update contact info |
| `/api/upload/file` | POST | Upload file to R2 (auth required) |
| `/api/auth/*` | * | better-auth endpoints |

### Authentication
- **Public**: GET requests for all entities
- **Protected**: POST, PUT, DELETE require authentication via `requireAuth` middleware

### Response Format
```json
// Success
{ "data": { ... } }

// Error
{ "error": "Error message" }
```

## Frontend Admin (`apps/web/src/routes/admin/`)

### Pages
- `admin.tsx` - Layout with sidebar navigation
- `admin/kategori.tsx` - Category management
- `admin/portfolio.tsx` - Portfolio management with image upload
- `admin/testimoni.tsx` - Testimonial management with image upload
- `admin/layanan.tsx` - Service management with image upload
- `admin/kontak.tsx` - Contact information editor

### Features
- TanStack Query for data fetching
- TanStack React Form for form handling
- Image upload with file preview
- Dialog-based create/edit forms
- Toast notifications for feedback

## Image Upload (R2)

### Flow
1. Client selects file via `<input type="file">`
2. `api.upload.uploadFile(file, entity)` sends FormData to `/api/upload/file`
3. Server uploads directly to R2 bucket via `R2_BUCKET` binding
4. Server returns `{ key, publicUrl }`
5. Client saves publicUrl to entity record

### R2 Configuration
- Bucket: `adinko-images`
- Public URL: `https://pub-xxx.r2.dev/adinko-images/{key}`
- Binding: `R2_BUCKET` via Alchemy alchemy.run.ts

### Environment Variables (`apps/server/.env`)
```env
R2_PUBLIC_URL=https://pub-xxx.r2.dev
R2_BUCKET_NAME=adinko-images
```

## API Documentation

Full API documentation is available at `/docs/api/` (powered by Fumadocs):
- `/docs/api/` - API overview
- `/docs/api/kategori` - Kategori endpoints
- `/docs/api/portfolio` - Portfolio endpoints
- `/docs/api/testimoni` - Testimoni endpoints
- `/docs/api/layanan` - Layanan endpoints
- `/docs/api/kontak` - Kontak endpoints
- `/docs/api/upload` - Upload endpoints

## Key Files

| File | Purpose |
|------|---------|
| `packages/db/src/schema/umum.ts` | Drizzle schema for all tables |
| `apps/server/src/index.ts` | Hono app entry point, routes mounted |
| `apps/server/src/routes/_middleware.ts` | Auth middleware (requireAuth) |
| `apps/server/src/routes/kategori.ts` | Kategori CRUD handlers |
| `apps/server/src/routes/portfolio.ts` | Portfolio CRUD handlers |
| `apps/server/src/routes/testimoni.ts` | Testimoni CRUD handlers |
| `apps/server/src/routes/layanan.ts` | Layanan CRUD handlers |
| `apps/server/src/routes/kontak.ts` | Kontak get/update handlers |
| `apps/server/src/routes/upload.ts` | R2 file upload handler |
| `apps/web/src/lib/api.ts` | API client with all CRUD functions |
| `apps/web/src/routes/admin.tsx` | Admin layout with sidebar |
| `apps/web/src/routes/admin/*.tsx` | Admin CRUD pages |
| `packages/infra/alchemy.run.ts` | Alchemy config, R2 bucket binding |

## Development Commands

```bash
# Install dependencies
bun install

# Start development
bun run dev

# Build for production
bun run build

# Type check
bun run check-types

# Push database schema
bun run db:push

# Deploy
bun run deploy
```

## Known Issues

### R2 Bucket Naming
Alchemy auto-generates bucket names as `{app-name}-{bucket-name}-{username}`. To use a specific bucket name:
1. Create bucket via `wrangler r2 bucket create <name>`
2. Use `R2Bucket("bucket-name", { name: "bucket-name", dev: { remote: true } })`

### Public URL Format
When R2 public access is enabled, the URL format is:
```
https://pub-{hash}.r2.dev/{bucket-name}/{key}
```
Store this in `R2_PUBLIC_URL` env var, and construct URL as `${R2_PUBLIC_URL}/${key}`.
