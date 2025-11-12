
# Haven Communities

<<<<<<< HEAD
A modern real estate platform for land sales and property management in Nigeria. Haven Communities provides a comprehensive solution for browsing available properties, reading informative blog content, and connecting with our sales team.

## Features
=======
  ## Running the code
>>>>>>> bf3b19f65e5443aff7eee6560ec3b9e7b9992e3b

- Property listings with detailed information and pricing in Nigerian Naira
- Blog section with articles about land investment and community development
- Newsletter subscription system
- Contact form for inquiries
- Admin panel for content management
- Responsive design for desktop and mobile devices

<<<<<<< HEAD
## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Edge Functions)
- **Authentication**: Supabase Auth
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/ObeeJ/HavenCommunitiesWebApp.git
cd HavenCommunitiesWebApp
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your Supabase credentials.

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Deployment

This application is configured for deployment on Render. The `render.yaml` file contains the necessary configuration.

### Deploy to Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the build command to `npm install && npm run build`
4. Set the start command to `npm run preview`
5. Add the required environment variables

## Project Structure

```
src/
├── components/          # React components
├── admin/              # Admin panel components
├── imports/            # Figma-generated components
├── lib/                # Utility libraries and API client
├── styles/             # Global styles
└── utils/              # Helper functions
```

## Admin Panel

The admin panel is accessible at `/admin` and provides:

- Property management (create, edit, delete listings)
- Blog post management
- Newsletter subscriber management
- Contact form submissions
- Dashboard with analytics

## Contributing

This is a private project for Haven Communities. For any issues or feature requests, please contact the development team.

## License

This project is proprietary software owned by Haven Communities.
  
=======
  Run `npm run dev` to start the development server.
  Backend built with Hono.Js on Supabase edge function  
>>>>>>> bf3b19f65e5443aff7eee6560ec3b9e7b9992e3b
