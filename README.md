UrgencyResponse 🚨
AI-Powered Crisis Response & Volunteer Coordination Platform
🌍 Overview

UrgencyResponse is an AI-driven platform designed to help NGOs respond faster and smarter during crises. It identifies high-priority areas using real-time data and intelligently assigns volunteers based on their skills, location, and availability.

🚀 Live Prototype

👉 https://ai.studio/apps/e01cea92-576c-426c-92ff-1212ba865f27

🧠 Core Features
🔹 NGO Admin Dashboard
📍 Urgency Heatmap (Google Maps API) with color-coded crisis zones
📸 Data Collection Options:
Upload survey images (OCR via Google Cloud Vision AI)
Connect Google Forms
Manual data entry
🤖 Smart Task Assignment:
AI suggests Top 3 volunteers based on:
Skill match
Geographic proximity
📊 Impact Analytics Dashboard:
Tasks completed
People helped
🔹 Volunteer Experience
👤 Profile setup (skills, location, availability)
📋 Personalized task feed
✅ Accept / ❌ Decline assigned tasks
🛠️ Tech Stack
Google AI Studio
Google Maps API
Google Cloud Vision AI
AI/ML-based recommendation system
Node.js (for local execution)
🎯 Problem Statement

NGOs often face delays in identifying urgent situations and assigning the right volunteers efficiently. This leads to slower response times and reduced impact during critical moments.

💡 Solution

UrgencyResponse leverages AI to:

Detect and prioritize high-urgency zones
Automate volunteer-task matching
Improve coordination and response efficiency
🌟 Future Enhancements
🔔 Real-time emergency alerts
🤝 Multi-NGO collaboration system
📈 Predictive crisis detection using historical data
⚙️ Run Locally (Optional)

This step is only needed if you want to run the project on your system.

Install dependencies:

npm install
Add your Gemini API key in .env.local

Run the application:

npm run dev
