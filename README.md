# Bookstore Express App 📚

An Express.js based Bookstore project with **Postgres** as the database, managed via **Drizzle ORM**.
This project uses Docker for containerization and Drizzle Studio/Kit for migrations and schema management.

---


### 2. Install Dependencies

```bash
npm install
```

---

## 🐳 Running with Docker

### Start Services

Make sure you have **Docker** and **Docker Compose** installed.

```bash
docker compose up -d
```

This will start:

* **Postgres** database
* (Optionally) Express.js app container if defined

### Stop Services

```bash
docker compose down
```

### Check Logs

```bash
docker compose logs -f
```

---

## 🗄 Database with Drizzle

We are using **Drizzle ORM** for schema migrations and queries.

### Initialize Drizzle

```bash
npx drizzle-kit generate:pg
```

### Push Migrations

```bash
npx drizzle-kit push:pg
```

### Open Drizzle Studio

Run:

```bash
npx drizzle-kit studio
```

This opens a local web UI to explore and manage your database schema.

---

## 📦 Project Structure

```
bookstore06oct/
 ├── controllers/      # Route controllers
 ├── db/              # Database connection setup
 ├── drizzle/         # Drizzle migrations & schema
 ├── middlewares/     # Custom middlewares
 ├── models/          # Database models
 ├── routes/          # Express routes
 ├── views/           # View templates (if any)
 ├── index.js         # Entry point for Express app
 ├── docker-compose.yml
 └── package.json
```

---

