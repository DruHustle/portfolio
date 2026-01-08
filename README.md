# Portfolio for Andrew Gotora

This is the repository for a personal portfolio website built with React, TypeScript, and Vite. It showcases a collection of projects with detailed descriptions, technology stacks, and links to live demos and source code.


## Features

- **Dynamic Project Showcase**: The portfolio features a variety of projects, each with its own detailed page.
- **Dark Theme UI**: A sleek and modern dark theme is used throughout the application for a professional look.
- **Responsive Design**: The layout is fully responsive and works on all devices, from mobile phones to desktops.
- **Smooth Animations**: Framer Motion is used to create smooth and engaging animations and page transitions.
- **Detailed Project Pages**: Each project has a dedicated page with a problem statement, core requirements, system architecture, technology ecosystem, implementation roadmap, and business impact.
- **Consistent Styling**: The UI is built with Tailwind CSS and shadcn/ui for a consistent and professional design.

## Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [Wouter](https://github.com/molefrog/wouter)
- **UI Components**: Radix UI, Lucide React
- **Data Fetching**: tRPC, TanStack Query

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Project Structure

```
/portifolio
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Home, ProjectDetail, etc.)
│   │   ├── App.tsx        # Main application component with routing
│   │   └── main.tsx       # Entry point for the React app
├── server/                # Backend Express server
│   └── index.ts           # Main server file
├── public/                # Static assets
├── package.json           # Project dependencies and scripts
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DruHustle/portifolio.git
   ```
2. Navigate to the project directory
   ```sh
   cd portifolio
   ```
3. Install dependencies
   ```sh
   pnpm install
   ```

### Running the Development Server

To start the development server, run:

```sh
pnpm dev
```

This will start the Vite development server at `http://localhost:3000`.

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm preview`: Previews the production build locally.
- `pnpm check`: Runs TypeScript to check for type errors.
- `pnpm test`: Runs tests with Vitest.
- `pnpm format`: Formats code with Prettier.

## License

Distributed under the MIT License. See `LICENSE` for more information.
