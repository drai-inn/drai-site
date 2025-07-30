# Component Architecture

This diagram shows the relationship between the core technologies in both the local development environment and the live production environment.

```mermaid
graph TD
    subgraph "Local Development Environment (Your Mac)"
        A[Developer's Code Editor] --> B{Local Git Repo};
        C[Web Browser] -- "Views localhost:4321" --> D[Astro Dev Server];
        D -- "Serves site & proxies requests" --> E[TinaCMS Backend];
        E -- "Reads/Writes to" --> F[Content Files (.mdx)];
        B <--> F;
        A --> D;
    end

    subgraph "Cloud / Production"
        G[GitHub Repository]
        H[GitHub Actions (CI/CD)]
        I[Static Web Host (Vercel, etc.)]
        J[Live Website (drai-site)]
        K[End User's Browser]

        G -- "On push/merge" --> H;
        H -- "Builds Astro site" --> I;
        I -- "Serves static files" --> J;
        K -- "Views" --> J;
    end

    B -- "git push" --> G;
    G -- "git pull" --> B;
```
