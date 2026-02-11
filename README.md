# Full-Stack Project Setup Guide
----------------------------------

This project is organized in the following structure:
v1/
 ├── frontend/
 └── backend/

## Backend Setup
1. Open a terminal and run:
```bash
cd backend
npm install express pg dotenv cors bcryptjs
node server.js
```

2. Rename the file:
   `v1/backend/.envcopy` → `v1/backend/.env`

## Frontend Setup
1. Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```

## 🧩 Tech Stack / Libraries Used

### **Frontend**
- React.js
- React Router DOM
- Fetch API
- CSS Modules / Custom CSS

### **Backend**
- Node.js
- Express.js
- bcryptjs
- jsonwebtoken (JWT)
- crypto
- pg (node-postgres) 

### **Database**
- PostgreSQL

### **Testing**
- Jest



## Running Tests (CI)
To run all the test, go to the root of the `v1/` project directory,
```bash
npm run test:all
```

### Test for Backend or Frontend separately
If you want to test either backend or frontend:

**FRONTEND**
  Go to the `v1/frontend`
```bash
npx jest --config jest.config.cjs
```

**BACKEND**
  Go to the `v1/backend`
```bash
npx jest --config jest.config.cjs
```

**Coverage**
```bash
npx jest --config jest.config.cjs --coverage
```

## Conventional Commits

Use these prefixes for your commit messages:

feat: new features added
fix: resolving bugs
docs: update usage instructions in README
style: updating styles in a page
refactor: simplify database query logic


## Naming Conventions
classNames: this-sample-classname
id: this-is-sample-id
folder: this_is_sample_folder
imports: FirstLetterIsUpperCaseSampleImport
files: this.foldername.filename

## Notes
- Ensure both backend and frontend run on compatible ports.
- Modify your environment variables in the .env file.
- Follow Conventional Commits for consistent history.

## API Used
- Philippine Standard Geographic Code (PSGC)

## CI/CD (GitHub Actions)
If you are using GitHub Actions, create the file:
.github/workflows/test.yml

And paste this:

name: Run Backend Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd v1/backend
          npm ci

      - name: Run tests
        run: |
          cd v1/backend
          npm test -- --passWithNoTests


## Author Information
Author: **Tristan Ehron Abogadie Tumbaga**
Version: v1
License: MIT
