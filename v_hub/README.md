# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 🚀 Resolving SPA 404 on Refresh (Production & Local Preview)

This application utilizes React Router with client-side history URLs (e.g. `/finance`, `/gtm`). When refreshing the page or accessing a route directly, the host server must fall back to `/index.html`.

We have already configured this automatically for common providers:
- **Netlify / Cloudflare Pages**: Handled via [public/_redirects](file:///mnt/bridge/dev/internships/vois_hub/v_hub/public/_redirects).
- **Vercel**: Handled via [vercel.json](file:///mnt/bridge/dev/internships/vois_hub/v_hub/vercel.json).

### Running Locally (Production Build)

If you build the project and serve it locally, make sure to use a server that supports Single Page Application (SPA) redirect rules:

1. **Vite Preview** (Recommended):
   ```bash
   npm run preview
   ```
   Vite's preview server will automatically handle SPA routing fallbacks.

2. **Serve** (Static server):
   Install `serve` globally and run it with the `-s` (single page app fallback) flag:
   ```bash
   npm install -g serve
   serve -s dist
   ```

3. **HTTP Server**:
   Run with the `--spa` flag:
   ```bash
   npx http-server dist --spa
   ```

