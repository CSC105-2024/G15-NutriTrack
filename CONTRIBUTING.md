# Contributing to NutriTrack

## Branching Strategy

- `main` → Stable production code
- `dev` → Active development branch
- `feature-xxx` → New features (e.g., `feature-auth`, `feature-api`)

## 🔄 Contribution Workflow

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/yourusername/NutriTrack.git`
3. **Create a feature branch**: `git checkout -b feature-xxx`
4. **Commit your changes**:

   ```sh
   git add .
   git commit -m "Added new feature"
   ```

5. **Push to GitHub**: `git push origin feature-xxx`
6. **Create a Pull Request** to `dev` branch and request a review

## ✅ Code Guidelines

- Follow best practices for **React & Express.js**
- Keep commits **small and meaningful**
- Write **clear commit messages**
- Run `npm run lint` before submitting PRs

## 🛡️ Security & Best Practices

- **Use environment variables** (`.env`) for API keys & secrets
- **Validate user input** to prevent SQL injection
- **Run tests before merging**

---

Need help? Contact us via GitHub Issues!
