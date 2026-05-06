# SaaSSkul Studio & Store

A production-grade platform built with React, Vite, and Tailwind CSS. Based in **Karachi, Pakistan**, SaaSSkul is a digital studio and store specializing in high-fidelity SaaS instruments, Notion templates, and strategic framework education.

## 🎨 Design & Branding
The project follows a **Minimalist Technical** aesthetic. Key visual elements include:
- **Typography:** Inter (Sans) for UI/Data, Playfair Display (Serif) for headings and narrative.
- **Color Palette:** Warm off-whites (`#FDFCFB`), clean grays (`#8C8C8C`), and deep charcoal (`#1A1A1A`).
- **Logo:** A vibrant geometric Hexagon-S gradient (`#00BDFF` to `#7A22FF`).

## 🚀 Key Modules
- **Studio:** Creative, Strategic, and Technical chat modes for founder guidance.
- **Store:** Curated apps (AI Lead Engine) and templates for digital entrepreneurs.
- **Solutions Grid:** Strategic frameworks for CRM sync, API architecture, and Neural workflows.
- **Internationalization:** Full Urdu/English toggle with RTL support.

## 🛠 Instructions & Tutorial

### 1. Adding a New Product to the Store
Modify `src/constants.ts`:
- Add an entry to `STORE_APPS` or `STORE_TEMPLATES`.
- Ensure you provide a `price`, `tag`, and `icon` from Lucide.

### 2. Extending the AI Logic
To add new 'Logic Protocols' (Services):
- Update the `SERVICES` array in `constants.ts`.
- Include `metaTitle` and `metaDescription` for SEO.
- Add `features` to the list for the detailed view logic in `App.tsx`.

### 3. Localizing Content
The `LanguageSwitcher` in header handles state. To add translations:
- Update the `LANGUAGES` constant.
- Use ternary operations in `App.tsx` based on the `lang` state (e.g., `lang === 'ur' ? 'ہیلو' : 'Hello'`).

### 4. Styling Conventions
- Use **Tailwind utility classes** exclusively.
- Use the predefined CSS variables in `index.css` for mode transitions (`--bg`, `--ink`, `--accent`).
- For directional changes (RTL), rely on the `dir` attribute set on `#app-root`.

## 📦 Deployment

### GitHub Pages (via GitHub Actions)
To deploy this project to GitHub Pages:
1.  **Build Command:** `npm run build`
2.  **Output Directory:** `dist`

### Recommended GitHub Action Workflow
Create a file at `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
