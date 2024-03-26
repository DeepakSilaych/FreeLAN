## Project Tracking Dashboard

### Overview

This project is a live project tracking dashboard developed for a fictional freelancing company. It provides an overview of the company's ongoing projects, including their status and deadlines. The dashboard has different login types: Client and Developer, each with specific permissions and capabilities.

### Features

1. **Authentication**:
   - Users can log in as either a Client or Developer, with appropriate permissions.

    Client: ussername: sohum, password: 1234567890
    Developer : username : deepaksilaych, password: 1234567890
    Admin (django superuser) : username: 1, password: 1

2. **Dashboard Home**:
   - Provides an overview of ongoing projects.
   - Allows filtering projects by status and category.
   - Displays project details, including name, client, description, deadline.
   - Supports estimated time and progress reporting.

3. **Permissions**:
   - Developers can edit their clients' Estimated Time of Arrival (ETA) and Progress.
   - Admins have superuser privileges to edit all information.

4. **Project Management**:
   - Admins can create, edit, and delete projects.

5. **Real-Time Updates**:
   - Dashboard updates in real-time to reflect changes made by team members.

### Technologies Used

- Frontend: ReactJS
- Backend: Django REST Framework
- Database: SQLite (for development)
- Deployment: Netlify (for frontend), Heroku (for backend)

### Folder Structure

- `client`: Contains frontend code (ReactJS).
- `server`: Contains backend code (Django).

### Setup Instructions

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the `client` directory and install dependencies: `cd client && npm install`
3. Navigate to the `server` directory and install dependencies: `cd ../server && pip install -r requirements.txt`
4. Run the Django server: `python manage.py runserver`
5. Run the React development server: `cd ../client && npm start`
6. Access the dashboard in your browser: `http://localhost:3000`

