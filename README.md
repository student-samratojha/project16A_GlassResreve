# GlassReserve

A sleek, macOS-inspired component booking system built with modern web technologies. GlassReserve provides a beautiful glass UI for managing component reservations, user authentication, and administrative controls.

![GlassReserve](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=GlassReserve+Screenshot)

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login with role-based access control (User/Admin)
- **📦 Component Management**: Add, edit, and manage components with images, types, and descriptions
- **📅 Booking System**: Easy date-based booking with status tracking (pending, confirmed, cancelled, completed)
- **👨‍💼 Admin Dashboard**: Comprehensive panel for managing users, bookings, components, and audit logs
- **👤 User Dashboard**: Personal booking management with cancel functionality
- **📊 Audit Logging**: Detailed action tracking for security and compliance
- **🎨 Glass UI Theme**: Beautiful macOS-inspired design with blur effects and gradients
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Frontend
- **EJS** - Templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Client-side scripting

### Development
- **Nodemon** - Development server
- **dotenv** - Environment variable management


## 📁 Project Structure

```
glassreserve/
├── src/
│   ├── controllers/     # Route controllers
│   ├── db/
│   │   ├── models/      # Mongoose models
│   │   └── db.js        # Database connection
│   ├── middleware/      # Custom middleware
│   └── routes/          # Route definitions
├── views/               # EJS templates
├── public/              # Static assets
├── server.js            # Application entry point
├── src/app.js           # Express app setup
├── package.json
├── .env                 # Environment variables
├── .gitignore
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

**GlassReserve** - Where elegance meets functionality! ✨
