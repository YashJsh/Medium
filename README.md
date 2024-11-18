# Medium Clone

This project is a simplified clone of the Medium platform, allowing users to create, publish, and read articles. It comes with features such as user authentication, article recommendations, and engagement metrics.

## Features

- **User Authentication**: Secure signup and login functionality using JWT.
- **Article Management**: Users can create, edit, and publish articles with ease.
- **User Profiles**: Personalized profiles that showcase user-published content.
- **Recommendations**: Suggested articles based on user preferences.

## Tech Stack

- **Frontend**: React, styled with Tailwind CSS
- **Backend**: Cloudflare Workers for a serverless backend
- **Database**: PostgreSQL, managed using Prisma ORM
- **Authentication**: JSON Web Tokens (JWT) for secure user sessions

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/YashJsh/Medium.git
2. Navigate to the frontend and backend directories to install dependencies:
   cd frontend
   npm install
   cd ../backend
   npm install
3. Configure the environment variables in a .env file:
   **DATABASE_URL**: Your PostgreSQL database URL
   **JWT_SECRET**: A secret key for signing tokens
4. Run the development servers:
   - **Frontend**: npm start
   - **Backend**: npm run dev

## Future Enhancements

- Adding a rich text editor for creating articles
- Improving the article recommendation algorithm
- Enhancing the user interface for a more engaging experience
