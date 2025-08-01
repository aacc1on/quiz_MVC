# quiz_MVC
# English Quiz MVC Application

A modern English vocabulary quiz application built with Express.js, EJS templating, and MVC architecture.

## Features

### For Students
- 🎯 Interactive vocabulary quizzes with multiple-choice questions
- 📊 Detailed results with wrong answer explanations
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface

### For Administrators
- 🤖 AI-powered quiz generation from text input
- 📈 Comprehensive results dashboard
- 👥 Student performance tracking
- 🔐 Secure admin authentication

### Technical Features
- 🏗️ MVC (Model-View-Controller) architecture
- 🎨 EJS templating engine
- 💾 In-memory data storage (easily extendable to databases)
- 🔒 Session-based authentication
- 📱 Responsive CSS design
- ⚡ Real-time form validation

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd quiz-mvc-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
SESSION_SECRET=your-super-secret-session-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
```

4. **Get OpenRouter API Key**
- Visit [OpenRouter.ai](https://openrouter.ai/)
- Sign up and get your API key
- Add it to your `.env` file

5. **Start the application**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

6. **Access the application**
- Main app: http://localhost:3000
- Take quiz: http://localhost:3000/quiz
- Admin panel: http://localhost:3000/admin

## Project Structure

```
quiz-mvc-app/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md             # Project documentation
│
├── controllers/          # Business logic controllers
│   ├── adminController.js    # Admin panel logic
│   ├── quizController.js     # Quiz functionality
│   └── homeController.js     # Home page logic
│
├── models/              # Data models
│   ├── Quiz.js             # Quiz data model
│   ├── Result.js           # Results data model
│   └── Admin.js            # Admin authentication model
│
├── services/            # External services
│   └── aiService.js        # OpenRouter AI integration
│
├── middlewares/         # Custom middleware
│   └── authMiddleware.js   # Authentication middleware
│
├── routes/              # Route definitions
│   ├── index.js            # Home routes
│   ├── admin.js            # Admin routes
│   └── quiz.js             # Quiz routes
│
├── views/               # EJS templates
│   ├── layouts/
│   │   └── main.ejs        # Main layout template
│   ├── partials/
│   │   ├── header.ejs      # Header component
│   │   ├── footer.ejs      # Footer component
│   │   └── messages.ejs    # Flash messages
│   ├── admin/
│   │   ├── login.ejs       # Admin login page
│   │   ├── dashboard.ejs   # Admin dashboard
│   │   └── results.ejs     # Results management
│   ├── quiz/
│   │   ├── index.ejs       # Quiz taking page
│   │   ├── result.ejs      # Quiz results page
│   │   └── no-quiz.ejs     # No quiz available page
│   ├── index.ejs           # Home page
│   ├── 404.ejs            # 404 error page
│   └── 500.ejs            # 500 error page
│
└── public/              # Static assets
    ├── css/
    │   └── style.css       # Main stylesheet
    ├── js/
    │   └── main.js         # Client-side JavaScript
    └── images/             # Image assets
```

## Usage

### Admin Panel

1. **Login**
   - Navigate to `/admin/login`
   - Use credentials from your `.env` file
   - Default: username `admin`, password `admin123`

2. **Generate Quiz**
   - Go to Admin Dashboard
   - Enter text (minimum 20 characters)
   - Click "Generate Quiz"
   - AI will create 10 questions based on the text

3. **View Results**
   - Click "View Results" to see all submissions
   - Expand details to see question-by-question analysis
   - Track student performance over time

### Taking Quiz

1. **Access Quiz**
   - Navigate to `/quiz`
   - Enter your name and surname
   - Answer all 10 questions

2. **Submit & Review**
   - Click "Submit Quiz"
   - View your score and percentage
   - Review wrong answers with explanations

## API Endpoints

### Public Routes
- `GET /` - Home page
- `GET /quiz` - Take quiz
- `POST /quiz/submit` - Submit quiz answers

### Admin Routes (Protected)
- `GET /admin/login` - Admin login page
- `POST /admin/login` - Process login
- `GET /admin/dashboard` - Admin dashboard
- `POST /admin/generate-quiz` - Generate new quiz
- `GET /admin/results` - View all results
- `POST /admin/logout` - Logout

## Customization

### Styling
- Edit `/public/css/style.css` for visual customization
- Modify EJS templates in `/views/` for layout changes

### Quiz Generation
- Adjust AI prompt in `/services/aiService.js`
- Change number of questions or difficulty level
- Switch to different AI models

### Data Storage
- Currently uses in-memory storage
- Easily extendable to MongoDB, PostgreSQL, etc.
- Models in `/models/` folder are ready for database integration

### Authentication
- Basic session-based auth implemented
- Can be extended with JWT, OAuth, etc.
- User roles and permissions can be added

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

1. **Set environment variables**
```bash
export NODE_ENV=production
export PORT=3000
export ADMIN_USERNAME=your-admin-username
export ADMIN_PASSWORD=your-secure-password
export SESSION_SECRET=your-very-secure-session-secret
export OPENROUTER_API_KEY=your-api-key
```

2. **Start application**
```bash
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Cloud Deployment
- **Heroku**: Add environment variables in dashboard
- **Vercel**: Configure in vercel.json
- **Railway**: Set variables in project settings
- **DigitalOcean**: Use App Platform

## Security Features

- Session-based authentication
- CSRF protection ready (can be enabled)
- Input validation and sanitization
- Environment variable configuration
- Secure cookie settings for production

## Performance

- Lightweight MVC architecture
- Minimal dependencies
- Optimized CSS and JavaScript
- Responsive design for all devices
- Fast in-memory data access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Quiz generation fails**
   - Check OpenRouter API key
   - Verify internet connection
   - Check API rate limits

2. **Admin login fails**
   - Verify ADMIN_USERNAME and ADMIN_PASSWORD in .env
   - Clear browser cookies/session

3. **Port already in use**
   - Change PORT in .env file
   - Kill process using port: `lsof -ti:3000 | xargs kill -9`

### Debug Mode
```bash
DEBUG=* npm run dev
```

## License

MIT License - see LICENSE file for details



