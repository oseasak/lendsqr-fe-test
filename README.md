# Lendsqr Frontend Engineering Assessment

This repository contains my solution for the Lendsqr Frontend Engineering Assessment. The assessment evaluates skills in building a responsive, high-fidelity web application using **React**, **TypeScript**, and **SCSS**.

---

## Project Overview

At Lendsqr, many lenders use web apps to reach over half a million customers. This project is a partial simulation of the **Lendsqr Admin Console**, focusing on:

- Login page  
- Dashboard  
- Users page  
- User Details page  

The application is **mobile responsive** and follows the design provided in [Figma](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/FrontendTesting?node-id=5530%3A0).

---

## Mock API

User data is generated using **Faker.js**:

- 500 mock user records are created dynamically using `@faker-js/faker`.  
- Data is served via a local mock API in the frontend.  
- User details are stored and retrieved using **localStorage** for the User Details page.  

> Faker ensures realistic user data without relying on external APIs.

---

## Features Implemented

- Full **mobile-responsive design** matching the Figma layout  
- **Dashboard, Users, and User Details pages** implemented  
- User pages fetch data from **mock API (Faker)**  
- Local storage integration for user details  
- **Avatar dropdown menu** with profile, settings, and logout  
- Mobile slide-over menu for smaller screens  
- Full **SCSS-based styling** with modular CSS  

---

## Credentials

To log in to the site:

Email: test@example.com
Password: password123


---

## Tech Stack

- **React** (function components with hooks)  
- **TypeScript** (type safety and code reliability)  
- **SCSS** (modular and maintainable styling)  
- **Faker.js** (mock API data generation)  

---

## Known Limitations / Pending Features

- No backend integration (mock API only)  

---

## Running the Project

1. Clone the repo:

```bash
git clone https://github.com/<your-username>/lendsqr-fe-test.git
cd lendsqr-fe-test

2. Install dependencies: 

npm install

3. Run locally

npm run dev
