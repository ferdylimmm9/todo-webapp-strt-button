# To-Do List Application

A simple To-Do List app where users can register, log in, manage tasks, and view/edit their profiles. Built with React, Axios, and Vite for fast development and a smooth user experience.

[https://todo-webapp-strt-button.vercel.app/signin](https://todo-webapp-strt-button.vercel.app/signin)


## Features

### ✅ **User Authentication**
- Users can register or log in to the app.
- JWT token is saved in cookies for secure authentication.

### ✅ **Task Management**
- Users can view all tasks in their to-do list.
- Users can view details of each task.
- Users can create, edit, and delete tasks.
- Confirmation dialog is shown before deleting a task.

### ✅ **Profile Management**
- Users can view and edit their profile details.

### ❌ **Pagination**
- Pagination feature is not implemented since the frontend handles task pagination via query parameters.

## Detailed Features

- **Filter via Query Params**: Filters are applied through URL query parameters, making it easy to copy and share links with persistent filters.
- **React Query**: Used for network state management, allowing efficient data fetching, caching, and synchronization.
- **Loading States**: The app shows loading indicators while waiting for API responses to improve the user experience.
- **Warning Dialogs**: A confirmation dialog appears when logging out or deleting a task to prevent accidental actions.
- **useRef for Optimization**: `useRef` is used to isolate component renders for performance improvements.
- **Secure Token Storage**: JWT token is stored in cookies to reduce vulnerability to JavaScript-based attacks.
- **Private Routes**: Task-related pages (like the task list) are protected and only accessible when authenticated.
- **Vite**: Vite is used for fast builds and a quick development environment.
- **Axios for HTTP Requests**: Axios is used to handle API requests and errors (especially for 4xx and 5xx responses). Unlike `fetch`, Axios throws errors for non-2xx status codes.
- **No TailwindCSS Configuration**: The focus is on delivering features quickly, without adding TailwindCSS configuration.
- **TypeScript**: Type annotations are used extensively in the codebase to ensure type safety and reduce bugs.

## Installation

### Prerequisites

- **Node.js** (>= v16.0.0)
- **NPM** or **Yarn**

### Steps to Run the App

1. Clone the repository:

   ```bash
   git clone [https://github.com/yourusername/todo-app.git](https://github.com/ferdylimmm9/todo-webapp-strt-button.git)
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the app:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be running at `http://localhost:5173`.

## Usage

- **Login/Registration**: Users can register or log in to access the task list. JWT tokens are stored in cookies.
- **Task Management**: View all tasks, add new tasks, and edit or delete existing ones. Deleting tasks will trigger a confirmation dialog.
- **Profile**: View and update user profile information.

## Technologies

- **React**: For building the user interface.
- **React Query**: For managing API requests and state.
- **Axios**: For handling HTTP requests and error management.
- **Vite**: For fast development and build processes.
- **TypeScript**: For type safety and improved development experience.

---

### Checklist of Features

- ✅ Users can log in or register.
- ✅ Users can view all to-do tasks.
- ❌ Pagination (frontend handles pagination via query params).
- ✅ Users can see task details.
- ✅ Users can create, edit, and delete tasks.
- ✅ Users can view and edit their profile.
- ✅ Filters are applied via query params (persists when copied/pasted).
- ✅ React Query is used for network state management.
- ✅ Loading indicators are shown during API calls.
- ✅ Confirmation dialogs for logout and task deletion.
- ✅ `useRef` is used to optimize component renders.
- ✅ Token is saved in cookies (for security).
- ✅ Private routes for task-related pages.
- ✅ Vite is used for fast builds.
- ✅ Axios is used for handling errors (4xx/5xx).
- ❌ No TailwindCSS configuration (focus on features).
- ✅ Type annotations are used throughout the codebase.
