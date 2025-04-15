# DebtSentry

DebtSentry is a system designed to manage and analyze disconnected accounts or debts data. It provides a dashboard for visualizing data, generating reports, and managing uploads.

## Features

- Upload Excel files containing disconnected accounts data.
- Process and categorize data based on time intervals.
- View data in table and chart formats.
- Generate detailed Excel reports.
- Responsive and user-friendly interface.

## Prerequisites

- Node.js (v20 or higher)
- Docker (optional for containerized deployment)
- MySQL database (if required for backend)

## Setup Instructions

### Backend (Server-Side)

1. Navigate to the `server-side` directory:
   ```bash
   cd server-side
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server-side` directory and configure the following variables:
   ```env
   PORT=3000
   NODE_ENV=development
   ALLOWED_MIME_TYPES=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend (Client-Side)

1. Navigate to the `client-side/status21-app` directory:
   ```bash
   cd client-side/status21-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at [http://localhost:8080](http://localhost:8080).

### Docker Deployment

1. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Frontend: [http://localhost:8080](http://localhost:8080)

## Usage

1. **Upload Data**: Navigate to the `/upload` page to upload Excel files.
2. **View Dashboard**: Navigate to the `/dashboard` page to view data in table and chart formats.
3. **Generate Reports**: Use the "Generate Report" button on the dashboard to download Excel reports.

## Project Structure

```
DebtSentry/
├── server-side/          # Backend code
│   ├── controllers/      # API controllers
│   ├── middleware/       # Middleware functions
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── index.js          # Entry point for the backend
├── client-side/          # Frontend code
│   └── status21-app/     # Next.js application
│       ├── src/          # Source code
│       ├── public/       # Static assets
│       └── pages/        # Application pages
└── docker-compose.yml    # Docker Compose configuration
```

## Technologies Used

- **Backend**: Node.js, Express.js, Winston, Multer
- **Frontend**: Next.js, React, Tailwind CSS, Chart.js
- **Database**: MySQL (optional)
- **Others**: Docker, ExcelJS, html-to-image

## License

This project is licensed under the MIT License. See the LICENSE file for details.
