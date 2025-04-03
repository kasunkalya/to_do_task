# To-Do Task Web Application

This project is a full-stack To-Do Task web application with a Vue.js frontend and a Laravel backend. The application is containerized using Docker Compose for easy deployment.

---

## Project Structure

```
/to_do_task
│-- frontend/        # Vue.js Frontend  
│   ├── src/         # Source files  
│   ├── Dockerfile   # Dockerfile for frontend  
│   ├── package.json # Project dependencies  
│  
│-- backend/         # Laravel Backend  
│   ├── app/         # Laravel application files  
│   ├── Dockerfile   # Dockerfile for backend  
│   ├── composer.json # Laravel dependencies  
│  
│-- docker-compose.yml  # Docker Compose file  
│-- README.md           # Project Documentation  
```

---

## Prerequisites

Ensure you have the following installed:
- **Docker** ([Download Here](https://www.docker.com/))
- **Docker Compose** (Included in Docker Desktop)

---

## Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kasunkalya/to_do_task.git
cd to_do_task
```

### 2️⃣ Build and Start the Containers
```bash
docker-compose up --build -d
```
This will:
- Start the **Vue.js frontend** on `http://localhost:8080`
- Start the **Laravel backend** on `http://localhost:8000`
- Create a shared network for both services

To check running containers:
```bash
docker ps
```

### 3️⃣ Stop the Containers
```bash
docker-compose down
```

---

## Frontend Setup (Vue.js)

### Running Inside Docker
Once the frontend container is running, access the Vue.js app at:
 `http://localhost:8080`

###  Running Without Docker (Optional)
```bash
cd frontend
npm install
npm run dev
```

---

## Backend Setup (Laravel)

### Running Inside Docker
Once the backend container is running, access the Laravel API at:
 `http://localhost:8000/api`

###  Running Without Docker (Optional)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
Access the backend at:
 `http://127.0.0.1:8000`

---

## API Endpoints

| Method | Endpoint                | Description         |
|--------|-------------------------|---------------------|
| GET    | `/api/tasks`            | Get all tasks      |
| POST   | `/api/tasks`            | Create a new task  |
| PATCH  | `/api/tasks/{task}/done` | Mark task as done |

---

## Environment Variables

Ensure `.env` files are configured correctly.

### Frontend (.env example)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env example)
```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=db_task
DB_USERNAME=root
DB_PASSWORD=
```

---

## Troubleshooting

### 1️⃣ Check Logs
```bash
docker-compose logs -f
```

### 2️⃣ Restart Containers
```bash
docker-compose restart
```

