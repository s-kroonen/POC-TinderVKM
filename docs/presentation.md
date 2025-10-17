# POC-TinderVKM — Project Presentation

## Overview

POC-TinderVKM is a Tinder-style application for class discovery, designed to help students browse and choose classes intuitively. Features include:

- Swipe UI for exploring classes
- Microsoft OAuth authentication
- REST API backend with MongoDB persistence
- Web and mobile-ready frontend (Capacitor)
- Unit and integration tests with CI/CD deployment

Planned: AI-based class recommendations using user behavior and profiles.

---

## Technology Rationale

- **Vue + Vite:** Fast, reactive UI development with HMR, perfect for swipe-based interfaces.  
- **Capacitor:** Seamlessly wraps web app for Android/iOS platforms.  
- **Node.js + Express + TypeScript:** Stable server framework with typed code for maintainability.  
- **MongoDB + Mongoose:** Flexible document database suitable for dynamic class and user records.  
- **Passport (Microsoft OAuth):** Simplifies authentication via Microsoft accounts.  
- **JWT + cookieStore:** Stateless authentication with persistent cookies.  
- **Docker + Portainer:** Ensures containerized, reproducible deployments; Portainer simplifies orchestration.  
- **Nginx + NPM:** Serves frontend assets, provides SSL termination, and reverse proxy routing.  
- **Jest:** Reliable framework for unit and integration testing.  
- **GitHub Actions:** CI/CD automation for build, test, and deployment workflows.

---

## System Workflow (High-Level)

1. User opens frontend (served by Nginx container).
2. Auth: User signs in via Microsoft OAuth → backend issues JWT stored in cookies.
3. Frontend communicates with backend REST endpoints for classes and user operations.
4. Backend reads/writes MongoDB via Mongoose models through services and repositories.
5. All services run as Docker containers in a Portainer-managed stack.
6. Nginx Proxy Manager routes traffic and provides SSL termination.

---

## Topology

```text
Public Internet
│
▼
Nginx Proxy Manager (SSL)
┌──────────────────────────┐
│ Reverse proxy & SSL term │
└───────────┬──────────────┘
            │
   ┌────────┴────────┐
   │                 │
   ▼                 ▼
Frontend Container   Backend Container
(serves /)           (serves /api/*)
   │                 │
   └──────┬──────────┘
          ▼
     MongoDB Container
     (internal network)
```
- Portainer manages the stack (frontend, backend, mongodb).
- GitHub Actions builds images and triggers deployments.
- MongoDB must be internal-only; NPM handles SSL and routing.

---

## Next Steps

- Integrate AI-based recommendation engine
- Enhance security (CORS, secure cookies, token expiry)
- Add monitoring and logging (Prometheus, Grafana, ELK stack)
- Mobile UX refinement via Capacitor builds
