# YouthPortal Backend

API server for the YouthPortal MERN app.

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Run: `npm run dev` (requires `nodemon`) or `npm start`.

Endpoints

- `POST /api/auth/register` - { name, email, password }
- `POST /api/auth/login` - { email, password }
- `GET /api/users/me` - (auth)
- `PUT /api/users/me` - (auth)
- `POST /api/opportunities` - (auth)
- `GET /api/opportunities` - public (only approved returned)
- `POST /api/chat` - { message }
