Daily Quotes — React + Node.js + MongoDB (Vite + Tailwind)
------------------------------------------------------------

Setup:

1) Backend
cd backend
cp .env.example .env
# edit .env and fill <db_password>
npm install
npm run dev
# optionally seed initial quotes:
node seed.js

2) Frontend
cd frontend
npm install
npm run dev

Open http://localhost:5173
API runs on http://localhost:5000
