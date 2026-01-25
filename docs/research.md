# Technological Research — TypeScript & NoSQL Proof of Concept (Updated)

This document contains the **updated and extended research** behind the chosen technologies for this project.
The focus of this update is a **multi‑criteria analysis** of the frontend and backend frameworks, comparing **Vue vs React** and **Express vs Fastify**, while preserving the original motivation and project context.

The goal remains the same: building a **Tinder‑like application for students to match with classes**, using a **TypeScript + Node.js backend**, a **Vue-based frontend**, and a **MongoDB NoSQL database**.

---

## 1. Research Questions

1. Why choose **Vue** over **React** for the frontend?
2. Why choose **Express** over **Fastify** for the backend?
3. How do these choices score across multiple criteria (learning curve, maintainability, performance, scalability)?
4. How well do these frameworks align with the project’s proof‑of‑concept goals?

---

## 2. Frontend Framework Research — Vue vs React

### 🔹 Multi‑Criteria Analysis

| Criterion                 | Vue 3 | React | Explanation                                                                                                                                   |
| ------------------------- | ----- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Syntax & Readability**  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | Vue uses HTML‑like templates that feel familiar and intuitive. React’s JSX mixes logic and markup, which can feel verbose and harder to scan. |
| **Learning Curve**        | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | Vue is easier to pick up, especially for developers with HTML/CSS background. React requires learning JSX patterns and hooks early on.        |
| **Reactivity Model**      | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐  | Vue’s reactivity system (Composition API) is explicit and predictable. React relies on state + hooks, which can become complex.               |
| **TypeScript Experience** | ⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐ | React has slightly more mature TypeScript ecosystem, but Vue 3 offers first‑class TS support and excellent inference.                         |
| **Boilerplate**           | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | Vue components are concise. React often requires more setup for state handling, effects, and context.                                         |
| **Ecosystem & Libraries** | ⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐ | React has a larger ecosystem, but Vue’s ecosystem is stable and well‑maintained.                                                              |
| **Performance**           | ⭐⭐⭐⭐  | ⭐⭐⭐⭐  | Both are highly performant for this scale of application. Differences are negligible for a POC.                                               |
| **Developer Experience**  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐  | Vue’s single‑file components and tooling (Vite) enable fast iteration and clean structure.                                                    |

### 🔹 Verdict: **Vue 3 (Chosen)**

Vue was selected because it aligns better with the project’s goals:

* Rapid prototyping
* Clear separation of template, logic, and styling
* Minimal boilerplate
* Easier reasoning about component behavior

> **Key Motivation:**
> Vue’s template‑based, HTML‑like syntax makes dynamic UI development intuitive. It allows focusing on **application behavior** rather than framework mechanics, which is ideal for a proof‑of‑concept with complex user interaction (swiping, matching, favoriting).

---

## 3. Backend Framework Research — Express vs Fastify

### 🔹 Multi‑Criteria Analysis

| Criterion                     | Express.js | Fastify | Explanation                                                                                                  |
| ----------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| **Simplicity**                | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐    | Express is minimal and straightforward. Fastify adds structure that can feel heavier for small projects.     |
| **Learning Curve**            | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐    | Express is easy to understand and widely taught. Fastify introduces schemas, plugins, and stricter patterns. |
| **TypeScript Support**        | ⭐⭐⭐⭐       | ⭐⭐⭐⭐⭐   | Fastify is TypeScript‑first. Express relies on `@types`, but works reliably in practice.                     |
| **Performance**               | ⭐⭐⭐        | ⭐⭐⭐⭐⭐   | Fastify outperforms Express under high load due to optimized HTTP handling.                                  |
| **Flexibility**               | ⭐⭐⭐⭐⭐      | ⭐⭐⭐     | Express allows full freedom in architecture design. Fastify encourages specific patterns.                    |
| **Ecosystem & Community**     | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐    | Express has a massive ecosystem and long‑term stability.                                                     |
| **Scalability**               | ⭐⭐⭐⭐       | ⭐⭐⭐⭐⭐   | Both can scale, but Fastify is more performance‑oriented for large APIs.                                     |
| **Middleware & Integrations** | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐    | Express integrates seamlessly with MongoDB, Mongoose, and common middleware.                                 |

### 🔹 Verdict: **Express.js (Chosen)**

Express was chosen because:

* It matches prior development experience
* It is lightweight and unopinionated
* It allows manual implementation of **Onion Architecture**
* It avoids unnecessary abstraction for a learning‑focused POC

> **Key Motivation:**
> Express provides exactly what is needed — no more, no less. Its simplicity accelerates development and keeps the focus on **business logic, data modeling, and testing**, rather than framework‑specific patterns.

Fastify was considered due to performance advantages, but those benefits are not critical for a prototype‑scale application.

---

## 4. Alignment Between Frontend & Backend Choices

Vue and Express share a similar philosophy:

* Configure only what you need
* Stay close to web standards
* Avoid heavy abstractions

This makes the stack cohesive and predictable, improving:

* Debugging
* Maintainability
* Developer focus

---

## 5. Impact on Scalability, Maintainability & DX

| Aspect                   | Impact                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Scalability**          | Both Vue and Express scale well when combined with clean architecture and proper separation of concerns. |
| **Maintainability**      | Onion Architecture + Vue components ensure modular code and testability.                                 |
| **Developer Experience** | Fast iteration, clear structure, and minimal boilerplate improve productivity.                           |
| **Future Growth**        | Express can later be migrated to Fastify or NestJS if performance or structure becomes critical.         |

---

## 6. Final Technology Summary

| Layer            | Technology              | Reason                                                                              |
| ---------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| **Frontend**     | Vue 3 + TypeScript      | HTML‑like syntax, strong reactivity, fast learning curve, ideal for interactive UI. |
| **Backend**      | Express.js + TypeScript | Simple, flexible, extensible, aligns with learning and POC goals.                   |
| **Database**     | MongoDB + Mongoose      | Flexible NoSQL schema, seamless Node.js integration.                                |
| **Architecture** | Onion Architecture      | Strong separation of concerns, testable and scalable.                               |
| **CI/CD**        | GitHub Actions          | Automated testing and deployment.                                                   |

---

## 7. Critical Reflection

This updated research confirms that **Vue and Express** are not just convenient choices, but **well‑reasoned technical decisions** for this project.

While **React** and **Fastify** excel in large‑scale or performance‑critical systems, they introduce complexity that does not align with a proof‑of‑concept focused on:

* Learning
* Rapid iteration
* Clean architecture

> **Final Reflection:**
> Choosing Vue and Express allowed me to focus on building a solid, maintainable application without unnecessary abstraction. The stack supports growth, but never gets in the way of understanding the fundamentals.

---

**Version:** 1.1
**Author:** Storm Kroonen & ChatGPT
**Project:** Tinder‑VKM
