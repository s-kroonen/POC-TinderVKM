# Technological Research — TypeScript & NoSQL Proof of Concept

This document contains the **complete research** behind the chosen technologies for this project.  
The goal was to build a **Tinder-like app for students to choose and match with classes**, using a **TypeScript + Node.js backend** and a **Vue frontend**, connected to a **MongoDB NoSQL database**.  
The research includes comparisons, reflections, and motivation for each technology.

---

## 1. Research Questions

1. **Why choose Vue and Capacitor for the frontend?**  
2. **Which backend framework fits best with TypeScript: Express, NestJS, or Fastify?**  
3. **Why use MongoDB as a NoSQL database instead of SQL or alternatives like Firebase?**  
4. **What architecture best fits this stack: Onion or Clean Architecture?**  
5. **How do these choices affect scalability, maintainability, and developer experience?**

---

## 2. Backend Research — Node.js Ecosystem

### 🔹 Framework Options

| Framework | Pros | Cons | Verdict |
|------------|------|------|----------|
| **Express.js** | - Lightweight and minimal.<br>- Large ecosystem and community.<br>- Excellent TypeScript support via `@types/express`.<br>- Easy to extend with middleware.<br>- Integrates well with MongoDB and Mongoose. | - Lacks strong structure out of the box.<br>- Manual configuration for validation, DI, and error handling. | **Chosen** — fits the POC goal and offers freedom to implement Onion Architecture manually. |
| **NestJS** | - Opinionated structure based on Angular concepts.<br>- Built-in Dependency Injection and testing support.<br>- Great documentation and TypeScript-first. | - Steep learning curve.<br>- Verbose boilerplate for small projects.<br>- Overkill for simple CRUD and swiping logic. | Not chosen — too heavy for this lightweight project. |
| **Fastify** | - Extremely fast and efficient.<br>- Built-in schema validation with AJV.<br>- Great plugin ecosystem. | - Smaller community than Express.<br>- Some packages require adaptation. | Considered — good for future scalability, but Express fits better for a learning-focused project. |

#### **Final Decision: Express.js**
> Chosen because it’s lightweight, TypeScript-friendly, and gives full control over architecture design (Onion pattern).  
> It allows focusing on the logic, MongoDB integration, and testing, without fighting framework conventions.

---

## 3. Frontend Research — Vue + Capacitor

### 🔹 Framework Comparison

| Framework | Pros | Cons | Verdict |
|------------|------|------|----------|
| **Vue 3** | - Lightweight and intuitive.<br>- Familiar HTML/JS syntax (easy transition from vanilla JS).<br>- Great reactivity system (Composition API).<br>- Fast build times with Vite.<br>- Excellent for rapid prototyping. | - Smaller ecosystem than React.<br>- Fewer ready-made TypeScript examples. | **Chosen** — balances simplicity and structure, perfect for a small yet interactive UI. |
| **React** | - Massive community and library support.<br>- Strong TypeScript support.<br>- JSX allows more flexibility. | - Verbose syntax (JSX).<br>- Can become complex quickly.<br>- Requires more boilerplate for simple components. | Not chosen — heavier for this use case and less “HTML-like” to work with. |
| **Angular** | - Full-featured with DI, routing, and forms built-in.<br>- Perfect for enterprise-scale projects. | - Steep learning curve.<br>- Heavy and opinionated.<br>- Slower to prototype. | Not chosen — overkill for a prototype-level project. |

### 🔹 Native Wrapper — Capacitor
| Technology | Pros | Cons | Verdict |
|-------------|------|------|----------|
| **Capacitor (by Ionic)** | - Turns Vue web app into a native mobile app.<br>- Simple integration with existing web code.<br>- Native API access (camera, storage, etc.).<br>- Maintained by Ionic team. | - Requires manual plugin setup for some native features.<br>- Limited offline caching by default. | **Chosen** — enables hybrid deployment with minimal changes. |
| **Cordova** | - Mature ecosystem.<br>- Large plugin library. | - Outdated tech.<br>- Poor TypeScript and modern JS support.<br>- Slow build pipeline. | Not chosen — Capacitor is the modern successor. |

#### **Final Decision: Vue + Capacitor**
> Vue was chosen for its approachable syntax, fast learning curve, and flexibility.  
> Capacitor makes it possible to extend the project into a mobile PWA or Android app without changing the core codebase.

> **Personal Reflection:**  
> I wanted to try a new frontend framework that wasn’t React or Angular.  
> Vue felt natural because of its simple template system — similar to HTML — and its reactivity reminds me of Express’ straightforward style.  
> It’s modern, lightweight, and lets me focus on functionality instead of framework complexity.

---

## 4. Database Research — MongoDB (NoSQL)

| Database | Pros | Cons | Verdict |
|-----------|------|------|----------|
| **MongoDB** | - Flexible document model (no strict schema).<br>- Perfect for dynamic class & user data.<br>- Easy integration with Mongoose ORM.<br>- Scalable horizontally with sharding.<br>- Cloud-hosted options (Atlas). | - Less strict than SQL (risk of inconsistent data).<br>- Joins require aggregation pipelines. | **Chosen** — best fit for the project’s fast-changing data model. |
| **PostgreSQL** | - Strong relational integrity.<br>- Great for complex queries.<br>- Native JSON support. | - Requires migrations and rigid schema.<br>- Overhead for agile prototypes. | Not chosen — more structure than needed for flexible swiping app. |
| **Firebase** | - Real-time updates.<br>- Easy hosting. | - Vendor lock-in.<br>- Limited query capabilities.<br>- Harder to integrate with CI/CD. | Not chosen — less control over backend logic. |

#### **Final Decision: MongoDB + Mongoose**
> Offers dynamic schema handling and seamless TypeScript integration via Mongoose models.  
> Ideal for storing flexible user and class data, matches, and swiping patterns.

---

## 5. Architecture — Onion Pattern

| Architecture | Pros | Cons | Verdict |
|---------------|------|------|----------|
| **Onion Architecture** | - Clear separation of concerns.<br>- Testable and maintainable.<br>- Domain at the center, infrastructure outside. | - Slightly more boilerplate. | **Chosen** — provides strong modularity for future extensions. |
| **Clean Architecture** | - Similar benefits with more strict rules. | - More complex for small projects.<br>- Overhead in setup. | Considered but not needed. |
| **MVC** | - Simple and traditional.<br>- Easy for quick projects. | - Tight coupling between layers. | Not chosen — not modular enough for scaling. |

#### **Final Decision: Onion Architecture**
> Ensures a clean boundary between business logic, API, and data access layers.  
> Perfect for implementing a **scalable, testable backend** that can grow over time.

---

## 6. Summary of Choices

| Layer | Technology | Reason |
|-------|-------------|--------|
| **Frontend** | Vue 3 + TypeScript | Lightweight, HTML-like syntax, fast setup, ideal for prototypes. |
| **Mobile Wrapper** | Capacitor | Enables native deployment with minimal code change. |
| **Backend** | Express.js + TypeScript | Simple, powerful, flexible, and widely supported. |
| **Database** | MongoDB + Mongoose | NoSQL flexibility for dynamic user/class data. |
| **Architecture** | Onion | Promotes maintainability and testability. |
| **CI/CD** | GitHub Actions | Supports automated testing, deployment, and rollback. |

---

## 7. Critical Reflection

Throughout development, I compared multiple tools before finalizing this stack.  
Although **NestJS** and **React** offer strong ecosystems, they add significant complexity for what is meant to be a **proof-of-concept**.  
Vue and Express both follow a **lightweight, component-based** design philosophy — they complement each other and allowed me to focus on learning **TypeScript, testing, and MongoDB integration**.

I chose Vue mainly out of curiosity and to challenge myself with a **new but accessible framework**.  
This decision also influenced the backend: Express fit better due to its minimalism and alignment with Vue’s “configure only what you need” mindset.

> **Reflection:**  
> My research and framework testing guided the final implementation.  
> Every choice — from Vue to Express and MongoDB — supports quick iteration, modular design, and modern development practices while remaining realistic for deployment and CI/CD integration.

