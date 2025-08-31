# School Admin Dashboard

A comprehensive React.js + TypeScript admin dashboard for school management with modern design, responsive layout, and configurable settings.

## 🎓 Features

### Authentication
- **Role-based login** (Admin, Staff, Student)
- **Demo credentials** provided for testing
- **Secure authentication** with context management

### Dashboard
- **Real-time statistics**: Student count, Staff count, Class count, Pending fees
- **Quick action buttons**: Add Student, Pay Fees, Generate Reports, Schedule Exams, Send Reminders
- **Recent activities** feed
- **Responsive design** for desktop and mobile

### Navigation & Header
- **Fixed sidebar** navigation (no sliding)
- **Mobile-responsive** with hamburger menu toggle
- **Professional header** with user profile and notifications
- **Logout functionality** integrated in user dropdown

### Design Improvements
- **Smaller statistics cards** for better space utilization
- **Larger action buttons** for improved user interaction
- **Modern color scheme** with CSS custom properties
- **Bootstrap integration** for responsive components
- **Smooth animations** and hover effects

### Configuration
- **Environment-based settings** (.env file)
- **Configurable school information** (name, logo, address, etc.)
- **Theme customization** support
- **API-ready architecture** for future integrations

## 🚀 Quick Start

### Demo Credentials
```
Admin:   admin@school.com   / admin123
Staff:   staff@school.com   / staff123
Student: student@school.com / student123
```

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Configure school settings** (optional)
Edit `.env` file to customize your school information:
```env
REACT_APP_SCHOOL_NAME=Your School Name
REACT_APP_SCHOOL_SUBTITLE=Your School Subtitle
REACT_APP_SCHOOL_LOGO=🎓
REACT_APP_SCHOOL_ADDRESS=Your School Address
REACT_APP_SCHOOL_PHONE=Your Phone Number
REACT_APP_SCHOOL_EMAIL=info@yourschool.com
```

3. **Start development server**
```bash
npm start
```

4. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Top navigation with user menu
│   ├── Login.tsx       # Authentication component
│   └── Sidebar.tsx     # Fixed navigation sidebar
├── config/             # Configuration files
│   └── school.ts       # School configuration management
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Main page components
│   └── Dashboard.tsx   # Main dashboard page
├── styles/             # Global styles and themes
│   └── globals.css     # CSS custom properties and styles
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## 🎨 Design Features

### Responsive Layout
- **Desktop (≥992px)**: Fixed sidebar always visible
- **Tablet (768px-991px)**: Collapsible sidebar with hamburger menu
- **Mobile (<768px)**: Hidden sidebar with overlay toggle

### Header Components
- **School branding**: Configurable name and logo
- **Notifications**: Dropdown with activity feed
- **User profile**: Avatar, name, role, and logout options
- **Mobile toggle**: Hamburger menu for sidebar

### Statistics Cards (Smaller)
- **Compact design**: Reduced padding and icon sizes
- **Interactive**: Click to navigate to relevant sections
- **Color-coded**: Different gradients for each metric
- **Responsive**: Adapt to screen size

### Action Buttons (Larger)
- **Enhanced size**: Bigger buttons for better usability
- **Grid layout**: Responsive grid for different screen sizes
- **Color variety**: Different button styles for actions
- **Touch-friendly**: Optimized for mobile interaction

## ⚙️ Configuration

### School Settings (.env)
```env
# School Information
REACT_APP_SCHOOL_NAME=EduAdmin School
REACT_APP_SCHOOL_SUBTITLE=School Management System
REACT_APP_SCHOOL_LOGO=🎓
REACT_APP_SCHOOL_ADDRESS=123 Education Street, Learning City, 12345
REACT_APP_SCHOOL_PHONE=+1 (555) 123-4567
REACT_APP_SCHOOL_EMAIL=info@eduadmin.com

# Theme Colors (optional)
REACT_APP_THEME_PRIMARY=#2c3e50
REACT_APP_THEME_SECONDARY=#3498db
REACT_APP_THEME_ACCENT=#e74c3c
```

### API Integration Ready
The configuration system is designed to support:
- Dynamic data loading from APIs
- Runtime configuration updates
- Multiple school instances
- Custom branding per school

## 📱 Mobile Responsiveness

### Breakpoints
- **Large (≥992px)**: Full desktop layout
- **Medium (768px-991px)**: Tablet-optimized
- **Small (<768px)**: Mobile-optimized

### Mobile Features
- **Hamburger menu**: Toggle sidebar visibility
- **Touch-optimized**: Larger buttons and touch targets
- **Responsive typography**: Scalable text sizes
- **Optimized spacing**: Better mobile layout

## 🔧 Technologies Used

- **React 18** with TypeScript
- **React Bootstrap** for UI components
- **React Router** for navigation
- **Context API** for state management
- **CSS Custom Properties** for theming
- **Bootstrap 5** for responsive grid
- **Environment Variables** for configuration

## 🎯 Recent Improvements

### Navigation
- ✅ Fixed sidebar (no sliding behavior)
- ✅ Mobile hamburger menu
- ✅ Overlay for mobile sidebar
- ✅ Auto-close on mobile after selection

### Header
- ✅ User information moved to header
- ✅ Notifications dropdown
- ✅ Professional user profile menu
- ✅ Logout integration
- ✅ School branding display

### Dashboard Layout
- ✅ Smaller statistics cards
- ✅ Larger action buttons
- ✅ Improved responsive grid
- ✅ Better space utilization

### Configuration
- ✅ Environment-based settings
- ✅ Centralized school config
- ✅ API-ready architecture
- ✅ Theme customization support

## 🏗️ Future API Integration

The dashboard is designed to easily integrate with backend APIs:

```typescript
// Example API integration in AuthContext
const login = async (credentials: LoginCredentials): Promise<boolean> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (response.ok) {
    const userData = await response.json();
    setUser(userData);
    return true;
  }
  return false;
};
```

## 📄 License

This project is licensed under the ISC License.
