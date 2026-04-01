# Coremart (Admin Panel)

A production-oriented e-commerce admin system built with a frontend-first approach, focusing on scalable architecture, clean modular design, and real-world engineering practices.


## Description

Coremart Admin Panel is the central administration interface for the Coremart ecosystem, designed to manage users, products, orders, and system configurations.

This project is designed to simulate a real-world frontend system with:

* modular component architecture
* robust data fetching and state management
* centralized API integration layer
* production-ready UI/UX principles

The goal is not just a UI dashboard, but to demonstrate how modern frontend administrative systems are structured, optimized, and connected to complex backend APIs.


## Live Demo

This project is deployed on Vercel and can be accessed live:

**🔗 [Coremart Admin Panel - Live Demo](https://cm-admin.corestackcode.tech/)**

### Exploring the Demo
On the login screen, you have two access options:
* **Login with Credentials**: For authorized administrators.
* **Demo Admin**: For visitors. Click this button to instantly explore the dashboard, UI design, and features. *(Note: The demo account has read-only access and cannot perform any destructive/write actions).*


## Installation

#### 1. Clone the repository

```
git clone https://github.com/core-stack-code/coremart-admin.git
cd coremart-admin
```

#### 2. Install dependencies

```
npm install
```

#### 3. Setup environment variables

Create a `.env.local` file using the provided `.env.example`:

* `NEXT_PUBLIC_SERVER_URL`: Point to the local or remote Coremart backend
* `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name for media handling

#### 4. Start the server

```
npm run dev
```


## Tech Stack and Libraries

* Next.js, React, TypeScript
* Tailwind CSS, Shadcn UI
* TanStack Query (React Query)
* React Hook Form, Zod
* Axios
* Cloudinary (media integration)


## Features

* **Authentication flow** integrated with the backend using secure, httpOnly cookies and **session state management**
* **Centralized API registry** abstracting pure Axios calls, utilizing **structured query and mutation hooks** for predictable data fetching
* **Modular frontend architecture** with clear separation between **pure UI primitives, composite components, and form wrappers**
* **Robust form handling** built with React Hook Form and Zod, ensuring **strict validation** and consistent global error states
* **Comprehensive data tables** designed to handle complex backend reporting, advanced filtering, and **pagination**
* **Predictable state handling** enforcing strict rendering rules for loading skeletons, isolated empty states, and **global error boundaries**
* **Theme and UI consistency** using customized CSS variables and Shadcn UI to maintain a strict, highly reusable **design system**


## Related Repositories

Backend:
[https://github.com/core-stack-code/coremart-backend]()

Frontend (User):
[https://github.com/core-stack-code/coremart-frontend]()


## Author Note

This project was built with a strong focus on:

* API-driven UI patterns
* reusable and scalable component design
* real-world dashboard practices

It represents a production-style admin interface suitable for learning, showcasing, and extending into real enterprise applications.