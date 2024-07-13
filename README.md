# Antd Admin Template

<img src="public/logo.png" alt="image" style="zoom: 70%;" />

> - node >= 18.15.0
> - npm >= 9.5.0
> - vite 5
> - react 18
> - react router 6
> - ant design 5.0



## 🔗 Introduction

This is a starter template for building React applications with [Ant Design 5.0](https://ant.design/), designed to work seamlessly within the [Vite](https://vitejs.dev/) environment.



## 🛠️ Installation & Setup

To get started with the project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/HyaCiovo/AntD5-Admin.git
   cd AntD5-Admin
   ```

   

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

   This will install all the required dependencies listed in the package.json file.

## 📦 Dependencies

The project relies on several key packages to function as intended. Below is a list of the core dependencies:

| name              | version | description                                                  |
| :---------------- | :------ | ------------------------------------------------------------ |
| @ant-design/icons | 5.3.7   | provides a rich set of icons for use with Ant Design components. |
| ahooks            | 3.8.0   | a collection of custom hooks for React to simplify state management and side effects. |
| antd              | 5.19.0  | a popular UI library based on Ant Design specifications.     |
| axios             | 1.7.2   | a promise-based HTTP client for the browser and Node.js.     |
| dayjs             | 1.11.11 | a lightweight date-time library for JavaScript.              |
| immer             | 10.1.1  | a library for creating and managing immutable state in React applications. |
| react             | 18.3.1  | the core library for building user interfaces.               |
| react-dom         | 18.3.1  | the DOM-specific part of React used to render React elements into the DOM. |
| react-router-dom  | 6.24.1  | routing for React applications.                              |
| zustand           | 4.5.4   | a small, fast, and scalable state management library.        |

These dependencies are essential for the application's functionality and are included in the production build.



## 🔧 Development Dependencies

Development dependencies are crucial for the development process but are not needed for the application to run in production. Here are the development dependencies:

| name                                                        | description                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| @types/node, @types/react, @types/react-dom                 | TypeScript definitions for Node.js, React, and React DOM respectively. |
| @typescript-eslint/eslint-plugin, @typescript-eslint/parser | ESLint plugins for TypeScript to enforce coding standards.   |
| @vitejs/plugin-react-swc                                    | Vite plugin for React using SWC for Fast Refresh.            |
| autoprefixer                                                | For automatically adding vendor prefixes to CSS properties.  |
| eslint                                                      | A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. |
| eslint-plugin-react-hooks, eslint-plugin-react-refresh      | ESLint plugins for React Hooks and Vite's React refresh.     |
| less                                                        | Preprocessor for CSS to write cleaner and more maintainable stylesheets. |
| postcss                                                     | A tool for transforming styles with JS plugins.              |
| rollup-plugin-visualizer                                    | Plugin for visualizing Rollup bundle sizes.                  |
| tailwindcss                                                 | Utility-first CSS framework for rapid UI development.        |
| typescript                                                  | Strongly typed programming language that builds on JavaScript. |
| vite                                                        | Build tool for modern web applications.                      |
| vite-plugin-compression                                     | Vite plugin for compressing assets during the build process. |

These tools are used for development purposes such as linting, styling, and optimizing the codebase.



## 🚀 Running Locally

```bash
pnpm run dev
```

This command will start the development server, and you can access your application at http://localhost:3100 (or another port specified in your configuration).



## 📦 Building for Production

When you're ready to deploy your application, you'll need to build it for production:

```bash
pnpm run build
```

This command will generate the optimized production-ready files in the dist directory (or another location defined in your build scripts).

After running the build command, you can serve the static files from the dist directory using a web server of your choice.
