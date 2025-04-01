# E-Commerce System

A full-featured e-commerce platform with a React frontend and Node.js backend, designed to provide a comprehensive online shopping experience. The system supports the entire e-commerce lifecycle from product discovery to post-purchase support.

### Customer Features
- Payment online via banking and pay after received products
- Browse and search products with advanced filtering
- Rating product after purchased
- Detailed product views with images, specifications, and reviews
- Secure account management with order history
- Shopping cart with saved items and guest checkout
- Real-time chat with customer support representatives
- Order tracking and notification system
- Responsive desgined, compatible with both mobile and laptop
- Wishlist functionality for future purchases
  
### Admin Features
- Comprehensive dashboard with sales analytics and metrics
- Complete product management (add, edit, delete, categorize)
- Inventory management with low stock alerts
- Order processing workflow management
- Customer data management with privacy controls
- Export functionality for products and sales data to Excel
- Support products management with real-time chat interface
- User role management with customizable permissions
- Content management for promotional banners and featured products

## Tech Stack

### Frontend
- **React 19** - Modern UI library for building user interfaces
- **React Router 7** - For application routing
- **Redux Toolkit** - State management with Redux Persist for local storage
- **Material UI 6** - Component library for consistent design
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Chart Components** - Data visualization with MUI X Charts
- **Swiper** - Touch slider for product galleries
- **React Photo View** - Image viewing functionality
- **React Export Table to Excel** - Export data to Excel files

### Backend
- **Express** - Web application framework
- **Sequelize** - ORM for database interactions
- **MySQL/PostgreSQL** - Database options
- **Socket.io** - Real-time bidirectional event-based communication
- **JSON Web Token** - Secure authentication
- **Bcrypt** - Password hashing
- **Nodemon** - Development server with hot reload
- **Babel** - JavaScript compiler
- **EJS** - Templating engine for server-side rendering

## Prerequisites

- Node.js (v14 or higher)
- MySQL or PostgreSQL database
- npm or yarn package manager





## Build for Production

### Backend
```bash
cd BE
npm run build-src
npm run build
```

### Frontend
```bash
cd FE
npm run build
```

## Project Structure

```
E-Commerce/
├── BE/                   # Backend code
│   ├── src/              # Source files
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Request controllers
│   │   ├── middlewares/  # Express middlewares
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   └── sever.js      # Entry point
│   └── package.json      # Backend dependencies
│
└── FE/                   # Frontend code
    ├── public/           # Static files
    ├── src/              # Source files
    │   ├── assets/       # Images, fonts, etc.
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── redux/        # Redux store and slices
    │   ├── services/     # API services
    │   ├── utils/        # Utility functions
    │   ├── App.js        # Main component
    │   └── index.js      # Entry point
    └── package.json      # Frontend dependencies
```

## Development Notes

- The frontend uses CRACO for configuration override, allowing customization without ejecting from Create React App
- The backend uses Babel to enable modern JavaScript features
- Authentication is handled with JWT tokens and secure cookies
- The system uses Sequelize ORM for database interactions, supporting both MySQL and PostgreSQL
- Included both pagination and infinity scroll for reduce time from fetching data.



## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

BaoDuy - [GitHub](https://github.com/vitmetmoi)
