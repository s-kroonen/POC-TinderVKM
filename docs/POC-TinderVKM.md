# POC-TinderVKM — TypeScript & NoSQL Proof of Concept

This document contains the **project requirements**, **technological research**, and **presentation overview**.  
It aligns with the LU 1 TypeScript & NoSQL rubric and covers backend, frontend, database, architecture, and deployment choices.

---

## 1. Project Requirements

### 1.1 Functional Requirements

| ID | Requirement | Description | Acceptance Criteria | Status |
|----|--------------|--------------|---------------------|:------:|
| **FR1** | User Registration & Authentication | Users can register and log in using email/password | - Store securely in MongoDB<br>- Login returns JWT<br>- Passwords hashed | [ ] |
| **FR2** | Profile Creation & Management | CRUD operations for user profiles including preferences/tags | - Validation on required fields | [ ] |
| **FR3** | Class Discovery | Users can browse classes | - Fetch from MongoDB<br>- Pagination & filtering | [ ] |
| **FR4** | Tinder-like Swiping | Users can swipe right (like) or left (skip) | - Swipes stored in DB<br>- Matches tracked & displayed | [ ] |
| **FR5** | Match System | Detect mutual interest between users/classes | - Matches created when mutual<br>- Matches visible to users | [ ] |
| **FR6** | Public REST API | Backend API for mobile app | - JWT-secured<br>- Documented with Swagger<br>- JSON responses | [ ] |
| **FR7** | Mobile App Integration | Mobile app consumes backend API | - Endpoints accessible externally<br>- Auth via JWT | [ ] |
| **FR8** | Admin Dashboard (Optional) | Manage users, classes, matches | - Role-based access<br>- CRUD logged | [ ] |
| **FR9** | Testing Coverage | Automated testing for core features | - ≥5 unit tests, 5 system tests, 2 UI tests<br>- ≥80% coverage | [ ] |

### 1.2 Non-Functional Requirements

| ID | Requirement | Description | Acceptance Criteria | Status |
|----|--------------|--------------|---------------------|:------:|
| **NFR1** | Architecture | Onion Architecture | - Layers: Domain, Application, Infrastructure, API<br>- Dependencies inward only | [ ] |
| **NFR2** | Technology Justification | Node.js + TypeScript backend, Vue frontend, MongoDB | - Documented choices & alternatives | [ ] |
| **NFR3** | Deployment | Self-hosted with server deployment | - Automated CI/CD<br>- MongoDB container or Atlas<br>- Rollback supported | [ ] |
| **NFR4** | Security | Safe data handling and API | - JWT authentication<br>- Input sanitization<br>- HTTPS enforced | [ ] |
| **NFR5** | Performance | API response < 500ms | - Indexed queries, efficient code | [ ] |
| **NFR6** | Scalability | Support multiple concurrent users | - Stateless API, containerized deployment | [ ] |
| **NFR7** | Maintainability | Modular and documented code | - JSDoc, ESLint, Prettier | [ ] |
| **NFR8** | Reliability & Rollback | Rollback & recovery possible | - Restore previous deployment<br>- Database backups retained | [ ] |
| **NFR9** | User Experience | Intuitive, mobile-friendly UI | - Swipe animation smooth<br>- Key actions ≤3 clicks | [ ] |
| **NFR10** | Testing Integration | CI/CD automated testing | - Tests run on push<br>- Failures block deployment | [ ] |

### 1.3 Excellent-Level Enhancements

- Compare architectures & frameworks (Onion vs Clean, Express vs NestJS vs Fastify)  
- Advanced MongoDB aggregation for analytics  
- Interactive presentation with live demo  
- AI-based recommendations (future)  
- Independent frontend/backend deployment  
- Rollback workflow via GitHub Actions  

---

## 2. Technological Research

### 2.1 Research Questions

1. Why choose Vue + Capacitor for the frontend?  
2. Which backend framework fits best with TypeScript: Express, NestJS, or Fastify?  
3. Why use MongoDB instead of SQL or Firebase?  
4. Which architecture fits best: Onion or Clean?  
5. How do choices affect scalability, maintainability, and developer experience?

### 2.2 Backend Research

**Express.js** chosen for TypeScript backend:  
- Lightweight, flexible, strong TypeScript support  
- Easy to implement Onion Architecture  
- Better learning experience than NestJS (too heavy) or Fastify (smaller community)

### 2.3 Frontend Research

**Vue 3 + Capacitor** chosen:  
- Lightweight, intuitive, reactive (Composition API)  
- Capacitor wraps web app for mobile with minimal changes  
- Alternatives like React or Angular were heavier or overkill

### 2.4 Database Research

**MongoDB + Mongoose** chosen:  
- Flexible schema for user/class data  
- Integrates well with TypeScript  
- Cloud options (Atlas) or containerized deployment

### 2.5 Architecture

**Onion Architecture** chosen:  
- Clear separation of concerns (Domain, Application, Infrastructure, API)  
- Testable, maintainable, scalable  
- Alternative Clean Architecture considered but overkill for POC

---

## 3. Project Presentation Notes

### 3.1 Overview

- Tinder-style class discovery app for students  
- Swipe UI, Microsoft OAuth login, REST API backend  
- Web + mobile-ready via Capacitor  
- MongoDB persistence, unit/integration tests, CI/CD deployment

### 3.2 Technology Rationale

- **Frontend:** Vue 3 + TypeScript (fast, reactive)  
- **Mobile:** Capacitor (native wrapper)  
- **Backend:** Express.js + TypeScript (simple, flexible)  
- **Database:** MongoDB + Mongoose (dynamic data)  
- **Auth:** Passport (Microsoft OAuth), JWT for API security  
- **Deployment:** Docker + Portainer, Nginx proxy  
- **CI/CD:** GitHub Actions (build, test, deploy)  
- **Testing:** Jest for unit/integration, automated in pipeline

### 3.3 System Workflow

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
- Portainer manages the stack
- CI/CD automates build, test, and deployment
- MongoDB internal-only; Nginx handles routing & SSL

### 3.4 Next Steps
- Integrate AI recommendations
- Improve security (CORS, secure cookies, token expiry)
- Add monitoring & logging (Prometheus, Grafana, ELK)
- Mobile UX refinement via Capacitor builds

### 4. References & Sources

- Vue 3 Documentation — https://vuejs.org/
- Capacitor Documentation — https://capacitorjs.com/
- Express.js Documentation — https://expressjs.com/
- NestJS Documentation — https://nestjs.com/
- Fastify Documentation — https://www.fastify.io/
- MongoDB Documentation — https://www.mongodb.com/
- Mongoose ORM — https://mongoosejs.com/
- Onion Architecture Guide — https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/
- GitHub Actions Documentation — https://docs.github.com/en/actions
- Jest Testing Framework — https://jestjs.io/


**Version:** 1.0  
**Author:** Storm Kroonen  
**Project:** Tinder-VKM
