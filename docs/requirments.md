# 📋 Project Requirements — TypeScript & NoSQL Proof of Concept

This document outlines the **functional** and **non-functional** requirements for the TypeScript + Node.js + MongoDB project.  
It is aligned with the **LU 1 TypeScript & NoSQL rubric**, including the areas:  
- Technological Research  
- Full-stack Realisation  
- Testing  
- CI/CD  
- MongoDB Integration  

---

## 1. Functional Requirements

| ID | Requirement | Description | Acceptance Criteria | Status |
|----|--------------|--------------|---------------------|:------:|
| **FR1** | **User Registration & Authentication** | Users can register and log in using email and password. | - Registration stores user in MongoDB.<br>- Login returns JWT token.<br>- Passwords hashed with bcrypt. | [ ] |
| **FR2** | **Profile Creation & Management** | Users can create and edit personal profiles including preferences and tags. | - CRUD operations work.<br>- Validation on required fields. | [ ] |
| **FR3** | **Class Discovery** | Users can browse available classes. | - Data fetched from MongoDB.<br>- Supports pagination and filtering. | [ ] |
| **FR4** | **Tinder-like Swiping** | Users can swipe right to like or left to skip classes. | - Swipe stored in database.<br>- Matches tracked and visible. | [ ] |
| **FR5** | **Match System** | Detect mutual interest between users and classes. | - Matches created when both express interest.<br>- Match list visible to user. | [ ] |
| **FR6** | **Public REST API** | Provide public API for mobile app. | - Documented via Swagger.<br>- JWT-secured.<br>- Returns JSON. | [ ] |
| **FR7** | **Mobile App Integration** | Mobile app consumes backend API. | - Endpoints accessible externally.<br>- Auth via JWT. | [ ] |
| **FR8** | **Admin Dashboard (Optional)** | Admins can manage users, classes, and matches. | - Role-based access.<br>- CRUD operations logged. | [ ] |
| **FR9** | **Testing Coverage** | Core features include automated testing. | - ≥5 unit tests, 5 system tests, 2 UI tests.<br>- ≥80% code coverage. | [ ] |

---

## 2. Non-Functional Requirements

| ID | Requirement | Description | Acceptance Criteria | Status |
|----|--------------|--------------|---------------------|:------:|
| **NFR1** | **Architecture** | Use Onion Architecture to separate concerns. | - Layers: Domain, Application, Infrastructure, API.<br>- Dependencies flow inward only. | [ ] |
| **NFR2** | **Technology Justification** | Node.js + TypeScript backend, Vue/React frontend, MongoDB persistence. | - All tech choices justified in research.<br>- Alternatives compared. | [ ] |
| **NFR3** | **Deployment** | Application can be self-hosted and deployed to server. | - Automated CI/CD pipeline.<br>- MongoDB in container or Atlas.<br>- Rollback supported. | [ ] |
| **NFR4** | **Security** | Secure data handling and API access. | - JWT authentication.<br>- Input sanitization.<br>- HTTPS in production. | [ ] |
| **NFR5** | **Performance** | API responses within acceptable time. | - Avg response < 500 ms.<br>- Indexed MongoDB queries. | [ ] |
| **NFR6** | **Scalability** | Backend supports concurrent users. | - Stateless API.<br>- Containerization for horizontal scaling. | [ ] |
| **NFR7** | **Maintainability** | Code is modular, documented, and consistent. | - JSDoc docs.<br>- ESLint + Prettier.<br>- Folder structure per Onion Architecture. | [ ] |
| **NFR8** | **Reliability & Rollback** | Rollback and recovery possible. | - Previous deployment restorable.<br>- Database backups retained. | [ ] |
| **NFR9** | **User Experience (UX)** | Smooth, mobile-friendly UI. | - Swiping animation responsive.<br>- Key actions within ≤3 clicks. | [ ] |
| **NFR10** | **Testing Integration** | Automated testing within CI/CD pipeline. | - Tests run on each push.<br>- Failed tests block deployment. | [ ] |

---

## 3. Excellent-Level Enhancements

These optional items aim for **maximum rubric scores** (“Excellent” column):

- [ ] **Additional Research:** Compare alternative architectures (Onion vs Clean) and backend frameworks (Express vs NestJS vs Fastify).  
- [ ] **Advanced MongoDB Queries:** Use aggregation pipelines for analytics and recommendations.  
- [ ] **Interactive Presentation:** Include live demo and visual explanation of architecture.  
- [ ] **Smart Recommendations:** Suggest classes based on user swiping patterns (basic AI/ML).  
- [ ] **Independent Deployments:** Separate CI/CD workflows for frontend and backend.  
- [ ] **Rollback Workflow:** GitHub Action with `workflow_dispatch` rollback trigger.  

---

## 4. Traceability Matrix (Template)

| Requirement ID | Linked Test(s) | Verified In | Status |
|----------------|----------------|--------------|:------:|
| FR1 | Unit 01, System 01 | CI Pipeline | [ ] |
| FR4 | Unit 03, UI 01 | Local / CI | [ ] |
| NFR3 | Deployment Test | GitHub Actions | [ ] |
| NFR10 | CI/CD Integration Test | Workflow Logs | [ ] |

---

**Version:** 1.0  
**Author:** Storm Kroonen  
**Project:** Tinder-VKM

