# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the Haven Communities project.

## Available Workflows

### 1. Test Workflow (`test.yml`)
**Trigger:** Push to main/develop or PR to main/develop

**Actions:**
- Installs dependencies
- Runs all tests with Vitest
- Generates coverage reports
- Uploads coverage to Codecov

**Matrix:** Tests against Node.js 18.x and 20.x

---

### 2. Build Workflow (`build.yml`)
**Trigger:** Push to main/develop or PR to main/develop

**Actions:**
- Installs dependencies
- Builds the Vite application
- Validates build output (dist directory)
- Uploads build artifacts (7-day retention)

---

### 3. Docker Workflow (`docker.yml`)
**Trigger:** Push to main, tags (v*), or manual dispatch

**Actions:**
- Builds Docker image using the Dockerfile
- Pushes to Docker Hub (requires credentials)
- Supports semantic versioning tags

**Required Secrets:**
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub access token

**To set up:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add `DOCKER_USERNAME` and `DOCKER_PASSWORD`
3. Update image name in workflow: `${{ secrets.DOCKER_USERNAME }}/haven-communities`

---

### 4. Deploy Workflow (`deploy.yml`)
**Trigger:** Push to main or manual dispatch

**Actions:**
- Runs all tests
- Builds application
- Uploads production build artifacts (30-day retention)
- Ready for integration with hosting services

**To configure deployment:**
1. Uncomment the `deploy` job section
2. Add your hosting provider's deployment commands
3. Add required secrets for your hosting service

**Example providers:**
- **Vercel:** Add `VERCEL_TOKEN` secret, use `npx vercel --prod --token`
- **Netlify:** Add `NETLIFY_AUTH_TOKEN`, use `netlify deploy --prod`
- **AWS:** Add AWS credentials, use AWS CLI commands
- **Docker:** Combine with docker.yml workflow

---

## Dockerfile Configuration

The included `Dockerfile`:
- Uses `node:18-alpine` base image
- Installs dependencies: `npm install`
- Builds with: `npm run build`
- Exposes port `4173`
- Runs preview server: `npm run preview`

**To customize:**
- For production use: Replace `npm run preview` with a production web server (nginx, etc.)
- For environment variables: Add `ENV` commands or use `.dockerignore`

---

## npm Scripts

Ensure these scripts exist in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0 --port 4173",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Status Badges

Add these badges to your README.md to display workflow status:

```markdown
![Tests](https://github.com/ObeeJ/HavenCommunitiesWebApp/actions/workflows/test.yml/badge.svg)
![Build](https://github.com/ObeeJ/HavenCommunitiesWebApp/actions/workflows/build.yml/badge.svg)
![Docker](https://github.com/ObeeJ/HavenCommunitiesWebApp/actions/workflows/docker.yml/badge.svg)
```

---

## Troubleshooting

**Tests fail in CI but pass locally:**
- Ensure all environment variables are set in GitHub Secrets
- Check Node.js version compatibility
- Verify mock data generators match test expectations

**Docker build fails:**
- Ensure `Dockerfile` exists in repo root
- Check that `.dockerignore` doesn't exclude critical files
- Verify `npm run build` works locally

**Deployment fails:**
- Verify secrets are configured correctly
- Check that build artifact paths are correct
- Ensure deployment service credentials are valid

---

## Next Steps

1. **Test locally:** `npm test -- --run`
2. **Build locally:** `npm run build`
3. **Push to GitHub:** Workflows will run automatically
4. **Monitor actions:** Check GitHub Actions tab for workflow status
5. **Configure deployment:** Uncomment and customize `deploy.yml` for your hosting service
