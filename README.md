# 🚦 TrafficGuard - Smart Traffic Enforcement & Reporting Platform

A comprehensive traffic violation detection system with AI-powered number plate recognition, real-time monitoring, and government reporting capabilities.

![TrafficGuard](https://img.shields.io/badge/TrafficGuard-v1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2.7-38B2AC.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.149.0-000000.svg)

## 🌟 Features

### 🔐 **Authentication & User Management**
- **Secure Login/Signup** with vehicle registration
- **Role-based Access Control** (Citizens vs Government Officials)
- **Vehicle Number Plate Validation** with Indian format support
- **JWT-based Authentication** with persistent sessions

### 🤖 **AI-Powered Violation Detection**
- **Real-time OCR** using Tesseract.js for number plate recognition
- **Computer Vision** for violation type detection:
  - No Helmet Detection
  - Overspeeding Monitoring
  - Red Light Violations
  - Wrong Lane Driving
  - Mobile Phone Usage
  - No Seatbelt Detection
- **Live Camera Feed** and image upload support
- **Confidence Scoring** for AI predictions

### 🗺️ **Interactive Map Integration**
- **Real-time Traffic Monitoring** with violation hotspots
- **GPS Location Tracking** for violation incidents
- **Traffic Camera Status** monitoring
- **Heatmap Visualization** for violation patterns
- **Search and Filter** capabilities

### 💰 **Fine Management System**
- **Automated Fine Calculation** based on violation type
- **Payment Gateway Integration** (Card, UPI, Net Banking)
- **Fine Status Tracking** (Pending, Paid, Disputed)
- **Payment History** and receipt generation
- **Overdue Fine Notifications**

### 📊 **Advanced Dashboard & Analytics**
- **Real-time Statistics** with interactive charts
- **Violation Trends** analysis using Recharts
- **Revenue Tracking** for government officials
- **Performance Metrics** and KPI monitoring
- **Export Capabilities** (PDF, CSV)

### 🎮 **3D Visualizations**
- **Interactive 3D Models** using Three.js and React Three Fiber
- **Traffic Scenario Simulations** for different violation types
- **Vehicle and Traffic Light Models** with realistic animations
- **Educational Visualizations** for violation awareness

### 🌙 **Modern UI/UX**
- **Dark/Light Mode** with system preference detection
- **Responsive Design** optimized for all devices
- **Smooth Animations** using Framer Motion
- **Accessibility Features** with ARIA compliance
- **Progressive Web App** capabilities

## 🛠️ Technology Stack

### **Frontend**
- **React 19.1.1** - Modern React with hooks and context
- **Tailwind CSS 3.2.7** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Efficient form handling
- **React Hot Toast** - Beautiful notifications

### **3D Graphics & Visualization**
- **Three.js 0.149.0** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### **Maps & Location**
- **Mapbox GL** - Interactive maps (ready for integration)
- **React Map GL** - React wrapper for Mapbox

### **AI & Computer Vision**
- **Tesseract.js** - OCR for number plate recognition
- **React Webcam** - Camera access and capture
- **React Dropzone** - File upload with drag & drop

### **Charts & Analytics**
- **Recharts** - Composable charting library
- **Date-fns** - Modern date utility library

### **Development Tools**
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code linting
- **React Scripts** - Build tools and configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with camera access
- Internet connection for map services

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/traffic-violation-system.git
cd traffic-violation-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

**Government Official:**
- Email: `admin@traffic.gov`
- Password: `admin123`

**Citizen:**
- Email: Any valid email
- Password: Any password (6+ characters)

## 📱 Usage Guide

### For Citizens

1. **Register Your Vehicle**
   - Sign up with vehicle number plate
   - Provide required documents
   - Verify your identity

2. **Monitor Violations**
   - View your violation history
   - Check fine status and amounts
   - Access evidence and details

3. **Pay Fines**
   - Secure online payment options
   - Multiple payment methods
   - Instant payment confirmation

4. **Report Violations**
   - Capture violations using camera
   - Upload evidence images/videos
   - AI-powered violation detection

### For Government Officials

1. **Monitor Traffic**
   - Real-time violation dashboard
   - Traffic camera management
   - Violation hotspot analysis

2. **Manage Cases**
   - Review and approve violations
   - Generate detailed reports
   - Export data for analysis

3. **Analytics & Insights**
   - Traffic pattern analysis
   - Revenue tracking
   - Performance metrics

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── AuthPage.js
│   ├── dashboard/            # Dashboard components
│   │   └── Dashboard.js
│   ├── violations/           # Violation management
│   │   ├── ViolationDetection.js
│   │   └── ViolationList.js
│   ├── map/                  # Map integration
│   │   └── TrafficMap.js
│   ├── fines/                # Fine management
│   │   └── FineManagement.js
│   ├── layout/               # Layout components
│   │   ├── Navbar.js
│   │   └── Sidebar.js
│   └── 3d/                   # 3D visualizations
│       └── VehicleVisualization.js
├── contexts/                 # React contexts
│   └── AuthContext.js
├── App.js                    # Main application
└── index.js                  # Application entry point
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_PAYMENT_GATEWAY_KEY=your_payment_key
```

### API Integration
The application is designed to work with a backend API. Update the API endpoints in:
- `src/contexts/AuthContext.js`
- Individual component files for data fetching

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update `src/index.css` for global styles
- Component-specific styles using Tailwind classes

### 3D Models
- Add new 3D models in `src/components/3d/`
- Customize vehicle and scene models
- Implement new violation scenarios

### Violation Types
- Update violation types in detection components
- Modify fine amounts and severity levels
- Add new AI detection algorithms

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@trafficguard.com
- 📞 Phone: +91-1234567890
- 🌐 Website: https://trafficguard.com

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Three.js Community** for 3D graphics capabilities
- **OpenCV & Tesseract** for computer vision features
- **Government of India** for traffic violation guidelines

---

**Built with ❤️ for safer roads and smarter traffic management**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
