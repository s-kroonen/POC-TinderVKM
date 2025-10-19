# Tinder VKM

This is a **Proof of Concept** project for a Tinder-like application for students to browse and match with classes. The project is built with **TypeScript, Node.js, Express, Vue 3, Capacitor, and MongoDB**, and follows the **Onion Architecture** for clean separation.

---

## Documentation

The project contains detailed documentation to guide development, research, and deployment:

* [Project Requirements](./docs/requirements.md) — Functional and Non-Functional Requirements, aligned with the LU 1 rubric.
* [Technological Research](./docs/research.md) — Comprehensive research and justification for chosen technologies.
* [Presentation](./docs/presentation.md) — Visual and summarized presentation of the project, suitable for demos.

## Public Demo

* [Live Demo](https://vkm.kroon-en.nl/) — Access the public demo site of the application.


## Project Setup & Deployment

### 1. Prerequisites

* Docker & Docker Compose installed
* Node.js >= 18 (for local testing)
* MongoDB URI (can use local container or Atlas)
* `.env` file in the root directory

### 2. Environment Variables

Create a `.env` file in the root folder with at least the following:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/tinder-classes
JWT_SECRET=your_secret_key
```

> Note: Adjust the `MONGO_URI` if using a hosted MongoDB or different container setup.

### 3. Running the Application

From the root directory, run:

```bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down
```

### 4. Accessing the App

* Backend API: `http://localhost:3000/api`
* Frontend App: `http://localhost:8080` (or as configured in Vue)

### 5. Notes

* The project uses **Onion Architecture**, so the backend is modular and testable.
* Ensure that the `.env` file is present and properly configured before starting Docker Compose.
* Rollbacks and database restores can be handled by restoring previous Docker volumes or MongoDB backups.

---

## References

* [Requirements](./docs/requirements.md)
* [Research](./docs/research.md)
* [Presentation](./docs/presentation.md)
