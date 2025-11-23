# YouthPortal

A professional MERN stack platform for youth in the Eastern Cape to access bursaries, careers, medical info via an interactive chatbot, and business funding .

## Project structure

```
YouthPortal/
├── backend/       – Express/MongoDB API
└── frontend/      – React/Vite UI
```

## Quick start

**Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT_SECRET
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` after starting both servers.

## Features

- **Auth**: Register/login with JWT
- **User profile**: Update name, bio, location, phone
- **Chatbot**: Ask about bursaries, careers, medical info, business funding
- **Admin dashboard**: Approve/reject opportunities, view users
- **Opportunities**: Create and browse listings (bursary, career, medical, business)

## Tech stack

- **Backend**: Node.js, Express, MongoDB, JWT
- **Frontend**: React, Vite, Material-UI, axios, react-router-dom

## Next steps

1. Create an admin user in MongoDB (set `role: 'admin'` manually or add seed script)
2. Populate opportunities via admin or API
3. Enhance chatbot with more advanced NLP or LLM integration
4. Add multilingual support (isiXhosa, Zulu)
5. Deploy to Render/Heroku (backend) and Vercel/Netlify (frontend)
