# DSFL Project

This is a full-stack application with separate frontend and backend components.

## Project Structure

- `frontend/`: Contains the frontend application
- `backend/`: Contains the backend server
- `Players.csv`: Data file containing player information

## Setup

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```

The backend server will run on `http://localhost:5001` by default.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

## Important Notes

- **Start the backend server first** before starting the frontend to avoid proxy errors
- Ensure the backend is running on port 5001 before the frontend attempts to connect
- If you encounter proxy errors, verify that the backend server is running and accessible

## Technologies Used

- Frontend: React.js
- Backend: Python with Flask
- Database: SQLite