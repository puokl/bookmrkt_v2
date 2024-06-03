# Book_markt: Second-Hand Book Marketplace
Fourth project at CODAC Berlin. -> temporary demo: https://bookmrkt-v2.vercel.app/

Welcome to the Second-Hand Book Marketplace! This project is a dynamic and user-friendly web application built using the MERN stack with TypeScript. 
The platform serves as a hub for users to buy and sell second-hand books.

## Features

- **User Authentication:** Users can register and log in to their accounts securely. I use a session-based login procedure for authentication, with sessions lasting for 15 minutes.
- **Access Tokens and Refresh Tokens:** To manage sessions, I utilize access tokens that grant users access to protected routes, and refresh tokens that are used to obtain new access tokens without requiring users to log in again.
- **Product Listing:** Sellers can easily add books they wish to sell, providing book details and images.
- **Contact Seller:** Interested buyers can directly reach out to sellers through the platform.
- **Edit and Delete:** Sellers have the ability to manage their listings by editing or removing their products.


## Technologies Used

- Frontend:
  - React (with TypeScript)
  - Redux Toolkit (for state management)
  - TailwindCss(for styling)
  - Zod (for data validation)
  - Cookies (for session managament)

- Backend:
  - Node.js (with TypeScript)
  - Express.js (RESTful API)
  - MongoDB (database)
  - Zod (for data validation)
  - Multer (for handling file uploads)
  - Cloudinary (for image hosting)
  - Sessions for authentication
  - Access Tokens, Refresh Tokens and Cookies for session management
