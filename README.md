# Retail Tech Frontend Assignment

## Overview

This project is a responsive frontend application developed using **Next.js**, **TypeScript**, **Material UI**, and **React Hook Form**.

It communicates with a NestJS backend to display available products and create orders. The application also demonstrates dynamic form rendering based on JSON configuration.

---

## Features

* Next.js 15+ with App Router
* TypeScript
* Material UI Responsive UI
* React Hook Form Validation
* Dynamic Form Rendering using JSON
* Product List fetched from Backend REST API
* Order Creation
* Local Storage Support
* Clean and Modular Folder Structure

---

## Technologies Used

* Next.js
* TypeScript
* React Hook Form
* Material UI
* Fetch API
* Local Storage

---

## Project Structure

```
app/
│
├── components/
│   ├── ClientOnly.tsx
│   └── DynamicForm.tsx
│
├── page.tsx
│
public/
```

---

## Running the Project

Clone the repository

```
git clone <repository-url>
```

Install dependencies

```
npm install
```

Start the development server

```
npm run dev
```

Open

```
http://localhost:3000
```

---

## Backend APIs

The frontend communicates with the following REST APIs.

### Get Products

```
GET /products
```

### Create Order

```
POST /order
```

---

## Dynamic JSON Form

The application renders components dynamically based on JSON configuration.

Supported field types:

* TEXT
* LIST
* RADIO

Changing the JSON automatically changes the rendered UI without modifying the component code.

---

## Validation

Implemented using React Hook Form.

* Required Fields
* Email Validation
* Minimum Length
* Maximum Length

---

## Data Persistence

Submitted form data is stored in Local Storage and restored automatically when the application reloads.

---

## Assignment Requirements Covered

* Responsive UI
* Material UI
* Dynamic JSON Rendering
* React Hook Form Validation
* REST API Integration
* Local Storage
* TypeScript
* Clean Modular Code

---

## Author

**Vijayarajan G**
