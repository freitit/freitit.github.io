# FREITIT Tools

A modern web application built with Nuxt.js for container number utilities.

> **Note**: This project uses yarn as the preferred package manager. Please use `yarn` commands instead of `npm` for consistency.

## Features

- **Container Number Generator**: Generate valid container numbers with proper check digits
- **Container Number Checker**: Validate container numbers and verify check digits
- **Modern UI**: Built with Tailwind CSS and Vue 3
- **Static Site Generation**: Deployed automatically to GitHub Pages

## 🛠 **Development Commands**

```bash
# Install dependencies (recommended: yarn)
yarn install

# Start development server
yarn dev

# Generate static site
yarn generate

# Preview static build
npx serve .output/public
```

> **Important**: Always use `yarn` instead of `npm` for this project to ensure consistency and avoid potential issues with lock files.

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the `master` branch.

### CI/CD Pipeline

The deployment workflow (`.github/workflows/deploy.yml`) includes:

1. **Build**: Install dependencies and generate static files
2. **Deploy**: Deploy to GitHub Pages

> **Note**: The CI/CD pipeline uses npm for consistency with GitHub Actions, but local development should use yarn.

### Manual Deployment

To manually trigger deployment:

1. Go to the repository's Actions tab
2. Select "Deploy Nuxt to GitHub Pages"
3. Click "Run workflow"

## Project Structure

```
├── .github/workflows/    # GitHub Actions workflows
├── assets/css/           # Global CSS files
├── components/           # Vue components
├── pages/               # Nuxt.js pages (auto-routed)
├── utils/               # Utility functions
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Dependencies and scripts
```

## Technologies Used

- **Nuxt.js 3**: Vue.js framework for production
- **Vue 3**: Progressive JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **GitHub Actions**: CI/CD automation
- **GitHub Pages**: Static site hosting

## License

MIT License