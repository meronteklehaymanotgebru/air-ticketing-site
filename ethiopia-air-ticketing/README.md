# FlyEthiopia Admin Portal & Ticketing Site

A modern, full-stack Next.js 16 application for managing flight bookings, travel services, and customer inquiries.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (managed via Prisma ORM)
- **Styling:** Tailwind CSS + custom Glassmorphism UI
- **Authentication:** Custom JWT (jose) + bcryptjs
- **State/Notifications:** Zustand, React-Hot-Toast
- **Icons & Charts:** Lucide-React, Recharts
- **Data Export:** jsPDF, xlsx

## 📦 Key Admin Dependencies Installed
The following crucial packages were added during the admin dashboard build. Running `npm install` will fetch them automatically, but they are listed here for your reference:
- `bcryptjs` (Password hashing)
- `jose` (Edge-compatible JWT authentication)
- `lucide-react` (Modern SVG icons used throughout the admin panel)
- `react-hot-toast` (Beautiful popup notifications)
- `recharts` (Used for dashboard statistics graphs)
- `jspdf` & `jspdf-autotable` (PDF exporting functionality)
- `xlsx` (Excel exporting functionality)
- `@prisma/client` & `prisma` (Database ORM)

---

## 🚀 Quick Start for Teammates

### 1. Clone & Install
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Environment Variables
Copy the example environment file and configure it with your local PostgreSQL credentials:
```bash
cp .env.example .env
```
*Make sure your local Postgres server is running and the database specified in `.env` exists.*

### 3. Database Setup & Syncing
If you are pulling the latest updates (which include new schemas like Announcements), you must sync your local database and regenerate the Prisma client:
```bash
npx prisma db push
npx prisma generate
```

If this is your first time setting up the project, seed the database with the default Admin user and the core Travel Services:
```bash
npm run seed
```
*(Note: If you get an error running `db push` on Windows, stop your `npm run dev` server first!)*

### 4. Run the Application
Start the Next.js development server:
```bash
npm run dev
```

### 5. Access the Admin Panel
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@flyethiopia.com`
- **Password:** `admin123`

---

## 📂 Project Structure
- `src/app/(public)`: All public-facing website pages (Home, Services, Contact, Booking).
- `src/app/admin/(authenticated)`: Secure admin dashboard pages. Protected by server-side JWT verification.
- `src/components`: Reusable UI components (Sidebar, AdminHeader, Toasts, etc).
- `src/lib/auth.ts`: Core authentication and JWT logic.
- `prisma/schema.prisma`: Database schema containing models for `Service`, `User`, etc.
