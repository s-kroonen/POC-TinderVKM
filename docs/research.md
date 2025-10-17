# POC-TinderVKM — Research: Technologies Used

This document summarizes the key technologies, frameworks, and tools used in the POC-TinderVKM project, a Tinder-style prototype for student class selection.

## Frontend

- **Framework:** Vue.js (Single-File Components `.vue`)  
  Provides a reactive UI and modular component system for a responsive, swipe-based interface.

- **Bundler / Dev Server:** Vite (`vite.config.js`)  
  Offers fast builds, Hot Module Replacement (HMR), and streamlined development workflow.

- **Mobile Bridge:** Capacitor (`capacitor.config.json`, `android/ios/` folders)  
  Allows packaging the web app as native Android/iOS applications with minimal platform-specific changes.

- **UI Structure:**  
  - `App.vue` — root application component  
  - Components: `GameCard`, `GameCardsStack`  
  - Views: `Home`, `LoginRegister`

- **State & Routing:** Pinia stores (`stores/*.ts`) and Vue Router (`router/index.ts`)  
  Manages application state and navigation.

- **API Clients:** `src/infrastructure/api/*.ts` (e.g., `authApi.ts`, `classApi.ts`)  
  Abstracts communication with backend endpoints.

- **Persistence:** `cookieStore.ts`  
  Handles authentication tokens and session persistence.

- **Tooling:**  
  - `Dockerfile`, `nginx.conf` — containerized frontend hosting  
  - `.env.app` — environment-specific configurations

- **Testing:** `tests/*.ts`  
  Unit and integration tests (likely using Jest or Vitest).

---

## Backend

- **Runtime & Framework:** Node.js + Express (TypeScript) (`src/app.ts`, `src/index.ts`)  
  Provides REST API endpoints for classes, users, and authentication.

- **Database:** MongoDB via Mongoose (`models/*`, `repositories/*`)  
  Schema-driven, document-based storage for classes and users.

- **Authentication:**  
  - Passport (Microsoft OAuth strategy)  
  - JWT utils (`utils/jwt.ts`)  
  - Cookie/session helpers

- **Logging:** Winston (`utils/logger.js`)  

- **Architecture:** Layered  
  - Domain: models  
  - Repositories: data access  
  - Services: business logic  
  - Presentation: controllers, routes

- **Testing:** Jest (`jest.config.js`, `tests/*`)  

- **Containerization:** Dockerfile for backend container

---

## DevOps / Deployment

- **Container Orchestration:** Portainer stack (frontend, backend, MongoDB)  
  Simplifies deployment, management, and updates.

- **Reverse Proxy & SSL:** Nginx + Nginx Proxy Manager (NPM)  
  Handles SSL termination and routes traffic to frontend/backend containers.

- **CI/CD:** GitHub Actions (`deploy.yml`)  
  Automates build, test, and deployment pipeline.

- **Docker:** All services containerized; MongoDB runs as a container managed by Portainer.

---

## Languages & Tooling

- **TypeScript**: Frontend and backend typed code  
- **JavaScript**: Some frontend logic  
- **Testing:** Jest (backend); frontend tests likely use Jest or Vitest  
- **Linting & Build:** Implicit via `package.json` and tooling scripts
