# Whenever CLINE creates next js app, it creates a new git repo, within the /frontend folder.

DO the following to fix the issue:
```bash
rm -rf frontend/.git 
git init
touch .gitignore

```
Add the following to .gitignore:
```
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*.pyo
*.pyd
*.pkl
*.pyc

# FastAPI specific
instance/
*.db
*.sqlite3
*.sqlite

# Environment variables
.env
.env.*

# Docker
*.log
docker-compose.override.yml
*.pid
*.seed
*.pid.lock
docker-compose.override.yaml
.dockerignore
.docker/
Dockerfile.*

# Node.js specific (Next.js)
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
.pnpm-debug.log*
.cache/
.next/

# Static files
*.lock
*.swp
*.swo
*.tmp
*.bak

# Testing
coverage/
*.coverage
*.pytest_cache/
nosetests.xml
coverage.xml
*.codecov

# Build artifacts
build/
dist/
*.egg-info/
.eggs/
*.egg

# Editor-specific files
.vscode/
.idea/
*.iml
*.sublime-workspace
*.sublime-project

# OS generated files
.DS_Store
Thumbs.db
ehthumbs.db
*.stackdump
*.dump
Icon?

# Logs
*.log
logs/

```
Stage all changes and commit:
```bash
git add .
git commit -m "Initial commit"
```

Add the remote repo:
```bash
git remote add origin https://github.com/omkarh25/som.git
git push -u origin main
```
Create Staging and Development branches:
```bash
git checkout -b staging
git checkout -b dev
```
Start coding in the dev branch. Create a feature branch from dev when needed.
```bash
git checkout -b {feature/<feature-name>}
```
For fixing a bug, create a bug branch from staging.
```bash
git checkout -b {issue/<issue-name>}
```
To merge a feature branch to dev, create a PR in Github and merge it into dev.
```bash
git checkout dev
git merge {feature/<feature-name>}
git push
```
