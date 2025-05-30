# Post-Change Workflow Prompt

## Context

This prompt runs after every codebase change to ensure code quality and proper version control.

## Task

When you complete any code changes, automatically follow these steps:

### 1. Git Commit

1. **Check git status and changes**
   ```bash
   git status
   git diff
   ```

2. **Analyze changes and create commit**
   - Review all changes made
   - Create a descriptive commit message
   - Include the prompt name that was executed
   - Commit all changes

### 2. Code Quality Checks

After committing, run all available checks for both backend and frontend:

#### Backend Checks (/src)
```bash
# Linting and formatting
yarn lint      # ESLint with auto-fix
yarn format    # Prettier formatting

# Testing (if applicable)
yarn test      # Run unit tests
yarn build     # TypeScript compilation check
```

#### Frontend Checks (/web)
```bash
# Linting
yarn lint      # ESLint

# Type checking and build
yarn build     # TypeScript compilation + Vite build
```

### 3. Fix Any Issues

If any checks fail:
1. Fix the reported issues
2. Create an additional commit with fixes
3. Re-run all checks until they pass

## Workflow Summary

1. **Commit changes**
   - Review with `git status` and `git diff`
   - Create descriptive commit with prompt name
   
2. **Backend checks**
   - `yarn lint`
   - `yarn format`
   - `yarn test` (if tests exist)
   - `yarn build`

3. **Frontend checks**
   - `yarn lint`
   - `yarn build`

4. **Fix and re-commit if needed**

## Important Notes

- Always include the prompt name in commit messages
- Run ALL checks, don't skip any
- Fix all issues before considering the task complete
- If a check command doesn't exist, skip it but mention it
- Use clear, descriptive commit messages that explain what changed

## Example Commit Message

```
feat: implement products API with Redux integration (API_GENERATION prompt)

- Added ProductsService API client
- Created Redux RTK Query slice for products
- Updated store configuration
- Added product-related types

> Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```