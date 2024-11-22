# Odin-book - Frontend

This is the frontend for the LinkedIn Clone, a web application that replicates core features of LinkedIn. Users can register as individuals or companies, create posts, build networks, explore job opportunities, and interact with others in a professional environment. I made this app as the final project of [The Odin Project](https://www.theodinproject.com).

## See the Page Live  
Explore the app live at [Odin-book Live Demo](https://serene-liger-43f45f.netlify.app/).  

---

# Tech stack
The frontend is built using the following technologies:  

- **React**
- **CSS Modules**
- **JavaScript (ES6)**
- **HTML5**
- **React Router**

## Features

### General
- **User Types**: During sign-up, users can choose between being an individual or a company.
- **Responsive Design**: The application is fully responsive, ensuring optimal user experience on various devices.
- **JWT Authentication**: Secure login and authentication are handled using JSON Web Tokens.

### Homepage (Index)
- **Feed**: Displays recent posts from all users and companies.
- **Interactions**: Like and comment on posts directly from the feed.

### Profile
- **User Profiles**:
  - Display user information, including connections & followers count, summary, posts & comments, experience, education, and skills.
  - Only displays sections with available data.
- **Company Profiles**:
  - Showcase company name, location, follower count, summary, posts, and job posts.
  - Companies can publish/unpublish as well as see all the applicants of their job posts.

### Networking
- **Grow Section**: Showcases a list of all users, allowing individuals to discover and connect with others.
- **My Network Section**: Shows the user's connections, allowing easy management with buttons to remove connection and send a message.

### Job Posts
- **Job Listings**:
  - Browse all available job posts from companies.
- **Job Details**:
  - Click on any job from the list to view specific job information, including description, required experience, salary and more.
  - Skills matching functionality shows the number of skills the user has that match the requirements of a job post.

### Notifications
- **Stay Updated**:
  - Receive notifications for connection requests, new followers, and interactions on posts.

### Messaging
- **Chat with other users**: Message other users and view conversation history to keep track of past messages.

### Post Creation and Interaction
- **Create Posts**: Share updates. Companies can also share announcements or promotional content.
- **View and Interact**: Like and comment on posts from any user or company. 
- **Redirect from Profile**: Click on a specific post in a user's or company's profile to view it in detail.

### Additional Features
- **404 Page**: Friendly page displayed when a non-existent route is accessed.
- **Dynamic UX UI**: Polished user experience for both individuals and companies.

Feel free to explore the app and experience a professional networking platform designed from the ground up!

---

### Run it locally
To run this project locally, follow these steps:  
1. **Clone the repository**
   ```bash  
   git clone https://github.com/Lucatonello/odin-book.git  
   cd odin-book
2. **Install dependencies and start the session**
   make sure you have Node.js installed, then run:
   ```bash
  npm install
  npm run dev

3. **Acces the app**
   Open your browser and navigate to http://localhost:5173

---

### Check out the backend
- [See the backend here](https://github.com/Lucatonello/odin-book-backend)
