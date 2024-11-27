# SpreadReview App

A modern web application for managing spreadsheet data and product reviews. Built with React, TypeScript, and Tailwind CSS.

## Unraid Installation

1. Add the following template repository to your Unraid Docker repositories:
   ```
   https://github.com/yourusername/spreadsheet-review-app
   ```

2. In the Unraid Docker tab, click "Add Container" and select "spreadsheet-review-app"

3. Configure the following settings:
   - Name: spreadsheet-review-app
   - Port: 8080
   - Volume: /app/data

4. Click "Apply" to start the container

The application will be available at `http://your-unraid-ip:8080`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Production

Using Docker:

```bash
# Build and start the container
docker-compose up -d

# Stop the container
docker-compose down
```

## Project Structure

```
├── src/
│   ├── components/    # React components
│   ├── store/        # State management
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── public/           # Static assets
├── Dockerfile        # Docker configuration
├── nginx.conf        # Nginx configuration
└── docker-compose.yml # Docker Compose configuration
```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- TanStack Table
- Docker
- Nginx

## License

MIT