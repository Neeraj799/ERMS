# 🛠️ Engineering Resource Management System (ERMS)

A web application that helps engineering managers efficiently manage engineers, assign projects, monitor team capacity, and optimize resource utilization.

---

## 🚀 Features

### 👨‍💼 Manager Pages
- **Team Overview** – View engineers with capacity bars and skill tags.
- **Create Assignments** – Assign engineers to projects with a specified percentage.
- **Project Management** – Create and edit projects, define required skills.

### 👨‍🔧 Engineer Pages
- **My Assignments** – Track current and upcoming project allocations.
- **Profile** – Update skills, seniority level, and department.

### 📊 Key UI Elements
- **Capacity Bars** – Visual workload indicators.
- **Skill Tags** – Highlights engineer and project skillsets.
- **Assignment Timeline** – Simplified calendar view.
- **Search & Filter** – Find engineers by skill/department.
- **Analytics Charts** – Bar charts showing team utilization.

---

## ⚙️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui + Recharts
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based login
- **State Management**: React Context API
- **Charting**: Recharts
- **UI Components**: shadcn/ui

---

## 🧩 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Neeraj799/ERMS.git
cd erms

### 2. Clone the repository
cd server
npm install

Create a .env file in server/ and add:
PORT=5000
MONGO_URI=mongodb://localhost:27017/erms
JWT_SECRET=your_secret_key

Seed initial data (users, projects, assignments)
node seed/engineer.js

Start the backend server:
npm run dev

3. Set up the Frontend
cd client
npm install

Start the frontend:
npm run dev

📚 AI Assistance Documentation
🤖 AI Tools Used
ChatGPT (GPT-4) – Assisted in designing the architecture, writing backend routes, validating schemas, and improving UI/UX.

GitHub Copilot – Used for auto-completing boilerplate code and catching small issues during development.

 Examples of AI Acceleration
Generated reusable Formik + Tailwind forms in seconds.

Wrote Mongoose validation rules and error handling in one shot.

Auto-generated UI components using shadcn/ui.

🧠 Challenges Faced
AI sometimes provided outdated syntax or incomplete suggestions.

Generated code for incorrect libraries (e.g., Chakra UI instead of shadcn).

Required manual validation and testing for logic and schema correctness.

✅ Our Approach to Validating AI Suggestions
Carefully reviewed all AI-generated logic and UI.

Ran unit and integration tests for critical backend logic.

Used Prettier and ESLint to maintain consistent formatting and catch issues.

🛡️ Security & Best Practices
Passwords hashed using bcrypt.

JWT tokens for session management.

Input validation for forms and APIs.

📌 Future Improvements
Add Gantt chart for assignment timeline.

Real-time collaboration with WebSockets.

Export reports in PDF format.

Admin dashboard for analytics.

🧑‍💻 Contributors
Neeraj P C – Full Stack Developer

📄 License
This project is licensed under the MIT License.


