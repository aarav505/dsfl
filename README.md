# DSFL Project

This is a full-stack application with separate frontend and backend components.

## Project Structure

- `src/`: Contains the React frontend application components
- `public/`: Contains public assets for the frontend
- `backend/`: Contains the backend server
- `backend/Players.csv`: Data file containing player information

## Setup

### Backend
1. Navigate to the backend directory from the project root:
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
1. From the project root directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

## Important Notes

- **Start the backend server first** before starting the frontend to avoid proxy errors
- Ensure you are in the project root directory when running frontend commands
- Ensure the backend is running on port 5001 before the frontend attempts to connect
- If you encounter proxy errors, verify that the backend server is running and accessible

## Technologies Used

- Frontend: React.js
- Backend: Python with Flask
- Database: SQLite