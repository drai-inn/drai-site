# Contributing to the DRAI Site

Thank you for your interest in contributing to this project! Whether you're fixing a bug, adding a new feature, or improving documentation, your help is appreciated.

## Getting Started

Before you begin, please ensure you have [Node.js](https://nodejs.org/) (LTS version) installed on your system.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:ndjones/drai-site.git
    cd drai-site
    ```

2.  **Install dependencies:**
    This project uses `npm` to manage dependencies.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command starts the Astro site and the TinaCMS backend together.
    ```bash
    npm run dev
    ```
    Your site will be available at `http://localhost:4321`.

## Development Workflow

This project uses a Git-based workflow for all changes.

1.  **Pull the latest changes:**
    ```bash
    git pull
    ```

2.  **Create a new branch** for your feature or bugfix (optional but recommended):
    ```bash
    git checkout -b my-new-feature
    ```

3.  **Make your changes** to the code.

4.  **Commit and push** your changes:
    ```bash
    git add .
    git commit -m "feat: Describe your new feature or fix"
    git push origin my-new-feature
    ```

5.  **Open a Pull Request** on GitHub.

## Project Architecture & Workflows

To understand how the project is structured, please review the architectural diagrams:

- [**Project Documentation Overview**](./docs/README.md)
- [**Component Architecture**](./docs/architecture.md)
- [**Code Development Workflow**](./docs/code-development-workflow.md)
- [**Content Editing Workflow**](./docs/content-editing-workflow.md)
