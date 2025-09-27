# Project Purple - Docker Setup

This directory contains all the necessary Docker configuration files to run the Project Purple application using Docker Compose.

## What's Included

- **dockerfile.frontend**: Dockerfile for building the React/TypeScript frontend
- **dockerfile.backend**: Dockerfile for building the Spring Boot backend
- **docker-compose.yml**: Docker Compose configuration for running the entire stack
- **nginx.conf**: Nginx configuration for the frontend, including API proxying

## How to Run

1. Make sure you have Docker and Docker Compose installed on your machine

2. Open a terminal and navigate to this directory:
   ```bash
   cd docker-project
   ```

3. Build and start all services with Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build the frontend and backend Docker images
   - Start a MySQL database container
   - Start the backend Spring Boot application
   - Start the frontend React application with Nginx
   - Configure networking between all services

4. Once all services are up and running, you can access the application at:
   - **Frontend**: http://localhost
   - **Backend API**: http://localhost/api
   - **MySQL Database**: localhost:3306 (if needed for external connections)

## Environment Variables

The following environment variables are configured in `docker-compose.yml`:

### MySQL
- `MYSQL_DATABASE`: Name of the database (`project_purple`)
- `MYSQL_ROOT_PASSWORD`: Root password for the database (configured to match application.properties)

### Backend
- `SPRING_DATASOURCE_URL`: Database connection URL pointing to the MySQL container
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `SERVER_PORT`: Port on which the backend runs (8081)
- `SPRING_MVC_CORS_ALLOWED_ORIGINS`: CORS configuration allowing requests from the frontend

## Important Notes

1. **API Communication**: The frontend uses relative paths (`/api/auth`) for API calls, which are proxied through Nginx to the backend service.

2. **Data Persistence**: MySQL data is stored in a Docker volume (`mysql-data`) to persist data between container restarts.

3. **Health Checks**: The Docker Compose configuration includes health checks for both the MySQL database and Spring Boot backend to ensure services start in the correct order.

4. **CORS Configuration**: The backend is configured to allow CORS requests from the frontend origin.

## Troubleshooting

### Common Issues

1. **Connection Refused Errors**: If you see "Failed to fetch" errors in the frontend, check:
   - If all containers are running (`docker-compose ps`)
   - Docker logs for any errors (`docker-compose logs backend` or `docker-compose logs frontend`)

2. **Database Connection Issues**: If the backend can't connect to the database:
   - Verify the MySQL container is healthy (`docker-compose logs mysql`)
   - Check the database credentials in `docker-compose.yml` match your setup

3. **Port Conflicts**: If you have other services running on ports 80, 3306, or 8081, you may need to modify the port mappings in `docker-compose.yml`

## Stopping the Application

To stop all running containers:
```bash
# From the docker-project directory
 docker-compose down
```

To stop and remove volumes (this will delete your database data):
```bash
 docker-compose down -v
```

## Making Changes

If you make changes to the application code:
1. Rebuild the images with `docker-compose build`
2. Restart the services with `docker-compose up`