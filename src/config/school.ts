// Configuration settings for the school management system
// These values can be overridden by environment variables

export interface SchoolConfig {
  name: string;
  subtitle: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export const getSchoolConfig = (): SchoolConfig => {
  return {
    name: process.env.REACT_APP_SCHOOL_NAME || 'EduAdmin School',
    subtitle: process.env.REACT_APP_SCHOOL_SUBTITLE || 'School Management System',
    logo: process.env.REACT_APP_SCHOOL_LOGO || '🎓',
    address: process.env.REACT_APP_SCHOOL_ADDRESS || '123 Education Street, Learning City, 12345',
    phone: process.env.REACT_APP_SCHOOL_PHONE || '+1 (555) 123-4567',
    email: process.env.REACT_APP_SCHOOL_EMAIL || 'info@eduadmin.com',
    website: process.env.REACT_APP_SCHOOL_WEBSITE,
    theme: {
      primaryColor: process.env.REACT_APP_THEME_PRIMARY || '#2c3e50',
      secondaryColor: process.env.REACT_APP_THEME_SECONDARY || '#3498db',
      accentColor: process.env.REACT_APP_THEME_ACCENT || '#e74c3c',
    }
  };
};

// Export default instance
export const schoolConfig = getSchoolConfig();
