# Client Project

## Overview
This project is a React-based web application powered by Vite. It uses TypeScript for type safety, Redux for state management, and Material UI for UI components. The application integrates various libraries such as Axios for HTTP requests, Socket.io for real-time communication, and Chart.js for data visualization.

## Features
- **React & TypeScript**: Modern front-end development with strong typing.
- **State Management**: Utilizes Redux Toolkit for efficient state handling.
- **Material UI**: Beautiful and responsive UI components.
- **Real-time Communication**: Integrated with Socket.io for real-time interactions.
- **Charts & Data Visualization**: Uses Chart.js and react-chartjs-2.
- **Form Handling**: Implemented with react-hook-form for seamless form validation.
- **Time Management**: Uses Moment.js and Moment Timezone for date/time manipulation.
- **Toasts & Notifications**: React-hot-toast for user-friendly notifications.

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Scripts
- `npm run dev` - Start the development server.
- `npm run build` - Build the production version.
- `npm run lint` - Run ESLint for code quality.
- `npm run preview` - Preview the production build.

## Project Structure
```
client/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Application pages
│   ├── store/        # Redux store and slices
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   ├── styles/       # Global styles and Tailwind config
│   └── main.tsx      # Application entry point
├── public/           # Static assets
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Dependencies
### Main Dependencies
- **React**: Frontend library
- **Redux Toolkit**: State management
- **Material UI**: UI components
- **Axios**: HTTP requests
- **Socket.io-client**: Real-time communication
- **Chart.js & react-chartjs-2**: Data visualization

### Dev Dependencies
- **TypeScript**: Strong typing
- **ESLint**: Code quality
- **TailwindCSS**: Utility-first CSS framework
- **Vite**: Fast build tool



