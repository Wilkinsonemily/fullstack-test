# Fullstack_Apps

Aplikasi CRUD transaksi full-stack dengan grouping by year-month.

## Tech Stack
- Frontend: React.js
- Backend: Spring Boot (Java 17)
- Database: MySQL 8
- Build: Maven, npm

## Cara Menjalankan

### 1. Database
```sql
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd transaction-api
./mvnw spring-boot:run
```
API jalan di http://localhost:8080

### 3. Frontend
```bash
cd transaction-frontend
npm install
npm start
```
UI jalan di http://localhost:3000

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/transactions | Get all |
| GET | /api/transactions/{id} | Get by id |
| POST | /api/transactions | Create |
| PUT | /api/transactions/{id} | Update |
| DELETE | /api/transactions/{id} | Delete |
