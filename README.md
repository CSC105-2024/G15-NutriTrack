# NutriTrack

NutriTrack is a diet planning web app that helps users manage meals, and track nutrition.

## Features

- 🥗 Personalized meal planning
- 🔢 Nutrition tracking (calories, nutrients)
- 📅 Grocery list generator (TBD)
- 🍳 Recipe suggestions
- 🔐 Secure authentication

## Tech Stack

- **Frontend:** Vite + React.js
- **Backend:** Node.js + Express + PostgreSQL (TBD)
- **Database ORM:** TBD
- **Authentication:** JWT
- **API Integration:** Spoonacular API (for recipes) (+more, TBD)

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/NutriTrack-CS25/NutriTrack.git
   cd NutriTrack
   ```

2. **Install dependencies:**

   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Configure `.env` files** for API keys and database credentials.
4. **Run the app:**

   ```sh
   # Start backend
   cd backend && npm run dev

   # Start frontend
   cd ../frontend && npm run dev
   ```

## 📝 Contributing

To contribute:

1. **Fork the repository**
2. **Create a feature branch** (`feature-branch-name`)
3. **Make your changes and commit** (`git commit -m "Your message"`)
4. **Push the changes** (`git push origin feature-branch-name`)
5. **Open a Pull Request (PR)** to the `dev` branch

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines.

## 🔐 Security

We use **CodeQL** for automated security scanning. If you find a vulnerability, please report it.

## 📜 License

This project is licensed under the MIT License.
