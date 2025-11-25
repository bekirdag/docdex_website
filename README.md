# Docdex Website

The official landing page and documentation portal for **Docdex** (Documentation Indexer). This repository contains the source code for the single-page application (SPA) that serves as the marketing face and technical reference for the Docdex tool.

## 🚀 Overview

This project is a modern, high-performance React application built to showcase the capabilities of Docdex. It features a custom-built documentation engine, interactive data visualizations, and a responsive design optimized for developers.

### Key Features

*   **Single Page Architecture**: Seamless transitions between the Landing Page and Documentation without full page reloads.
*   **Custom Documentation Engine**: A bespoke `DocsPage` component that handles sidebar navigation, scroll-spy active states, and code highlighting.
*   **Interactive Visualizations**:
    *   **Hero Animation**: Custom HTML5 Canvas particle system (`Hero.tsx`) simulating data nodes.
    *   **Benchmarks**: Interactive charts comparing Docdex performance vs. Elasticsearch/Lucene (`Benchmarks.tsx`).
*   **MCP Integration Guide**: Dedicated UI for generating CLI commands for various AI agents (`AgentCommands.tsx`).
*   **Dark Mode UI**: A polished, dark-themed interface built with Tailwind CSS, featuring glassmorphism and gradient effects.

## 🛠️ Tech Stack

*   **Framework**: React 19
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **Bundler**: (Assumed Vite/Webpack based on module usage)

## 📂 Project Structure

```
├── components/
│   ├── DocsPage.tsx       # Main documentation logic, sidebar, and content
│   ├── Hero.tsx           # Landing page hero with canvas animation
│   ├── Navbar.tsx         # Global navigation and view switching
│   ├── Benchmarks.tsx     # Recharts performance comparisons
│   ├── AgentCommands.tsx  # Copy-paste command generator for MCP
│   ├── CodeDemo.tsx       # Interactive terminal simulation
│   ├── Features.tsx       # Feature grid
│   ├── Impact.tsx         # Stat counters and metrics
│   └── ...
├── App.tsx                # Main entry, handles 'home' vs 'docs' routing
├── index.tsx              # React DOM mounting
└── types.ts               # Shared TypeScript interfaces
```

## 💻 Getting Started

### Prerequisites

*   Node.js 18+
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/bekirdag/docdex-website.git
    cd docdex-website
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

## 🎨 Design System

The project uses a custom Tailwind configuration defined in `index.html` (or `tailwind.config.js` in a standard build):

*   **Colors**:
    *   `brand-400` (#facc15): Primary Gold/Yellow accent.
    *   `page` (#030303): Deep black background.
    *   `surface-*`: Grayscale variations for cards and panels.
*   **Typography**: `Inter` for UI text, `JetBrains Mono` for code blocks.

## 🤝 Contributing

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Note: This repository is for the website only. For the Docdex CLI tool and Rust engine, please visit the [main Docdex repository](https://github.com/bekirdag/docdex).*