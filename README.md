# CineBook

CineBook is a MERN stack movie ticket booking application. It allows users to browse movies, view showtimes, select seats, make bookings, and view their booking history.

The project was built as part of a theatre booking and management system, with a focus on learning real-world full-stack development step by step.

## Features

- User signup and login
- Movie listing
- Movie details page
- Theatre and showtime selection
- Seat selection with different seat categories
- Auto-select nearby seats option
- Guest login redirect without losing selected seats
- Payment confirmation flow
- My Bookings page
- Booking cancellation
- Admin movie management section

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

## Project Structure

```txt
cine-book/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
