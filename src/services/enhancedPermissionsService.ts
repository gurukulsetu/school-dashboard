import { 
  UserRole, 
  QuickActionItem, 
  UserPermissions, 
  SystemFeature, 
  SchoolPermissions, 
  FeatureAction,
  School,
  User
} from '../types';

export class EnhancedPermissionsService {
  // Mock API data - Replace with real API calls
  private static mockSchoolData: Record<string, School> = {
    'school_a': {
      id: 'school_a',
      name: 'Greenwood Academy',
      subscription: 'enterprise',
      features: [
        { feature: 'student_management', enabled: true },
        { feature: 'staff_management', enabled: true },
        { feature: 'class_management', enabled: true },
        { feature: 'fee_management', enabled: true },
        { feature: 'exam_management', enabled: true },
        { feature: 'attendance_management', enabled: true },
        { feature: 'library_management', enabled: true },
        { feature: 'reports_analytics', enabled: true },
        { feature: 'notifications', enabled: true },
        { feature: 'settings_config', enabled: true }
      ]
    },
    'school_b': {
      id: 'school_b',
      name: 'Riverside High School',
      subscription: 'premium',
      features: [
        { feature: 'student_management', enabled: true },
        { feature: 'staff_management', enabled: true },
        { feature: 'class_management', enabled: true },
        { feature: 'fee_management', enabled: true },
        { feature: 'exam_management', enabled: false }, // SchoolB restriction
        { feature: 'attendance_management', enabled: false }, // SchoolB restriction
        { feature: 'library_management', enabled: true },
        { feature: 'reports_analytics', enabled: true },
        { feature: 'notifications', enabled: true },
        { feature: 'settings_config', enabled: true }
      ]
    }
  };

  private static mockSchoolPermissions: Record<string, SchoolPermissions> = {
    'school_a': {
      schoolId: 'school_a',
      schoolName: 'Greenwood Academy',
      enabledFeatures: [
        'student_management', 'staff_management', 'class_management', 
        'fee_management', 'exam_management', 'attendance_management',
        'library_management', 'reports_analytics', 'notifications', 'settings_config'
      ],
      rolePermissions: {
        admin: {
          student_management: { view: true, create: true, edit: true, delete: true, admin: true },
          staff_management: { view: true, create: true, edit: true, delete: true, admin: true },
          class_management: { view: true, create: true, edit: true, delete: true, admin: true },
          fee_management: { view: true, create: true, edit: true, delete: true, admin: true },
          exam_management: { view: true, create: true, edit: true, delete: true, admin: true },
          attendance_management: { view: true, create: true, edit: true, delete: true, admin: true },
          library_management: { view: true, create: true, edit: true, delete: true, admin: true },
          reports_analytics: { view: true, create: true, edit: true, delete: true, admin: true },
          notifications: { view: true, create: true, edit: true, delete: true, admin: true },
          settings_config: { view: true, create: true, edit: true, delete: true, admin: true }
        },
        accountant: {
          student_management: { view: true, create: false, edit: true, delete: false, admin: false },
          staff_management: { view: true, create: false, edit: false, delete: false, admin: false },
          class_management: { view: false, create: false, edit: false, delete: false, admin: false }, // No class management
          fee_management: { view: true, create: true, edit: true, delete: false, admin: false },
          exam_management: { view: true, create: false, edit: false, delete: false, admin: false },
          attendance_management: { view: true, create: false, edit: false, delete: false, admin: false },
          library_management: { view: false, create: false, edit: false, delete: false, admin: false },
          reports_analytics: { view: true, create: false, edit: false, delete: false, admin: false },
          notifications: { view: true, create: false, edit: false, delete: false, admin: false },
          settings_config: { view: false, create: false, edit: false, delete: false, admin: false }
        },
        staff: {
          student_management: { view: true, create: false, edit: true, delete: false, admin: false },
          staff_management: { view: true, create: false, edit: false, delete: false, admin: false },
          class_management: { view: true, create: false, edit: true, delete: false, admin: false },
          fee_management: { view: true, create: false, edit: false, delete: false, admin: false }, // No fee payment
          exam_management: { view: true, create: true, edit: true, delete: false, admin: false },
          attendance_management: { view: true, create: true, edit: true, delete: false, admin: false },
          library_management: { view: true, create: false, edit: true, delete: false, admin: false },
          reports_analytics: { view: true, create: false, edit: false, delete: false, admin: false },
          notifications: { view: true, create: false, edit: false, delete: false, admin: false },
          settings_config: { view: false, create: false, edit: false, delete: false, admin: false }
        },
        student: {
          student_management: { view: false, create: false, edit: false, delete: false, admin: false },
          staff_management: { view: false, create: false, edit: false, delete: false, admin: false },
          class_management: { view: true, create: false, edit: false, delete: false, admin: false },
          fee_management: { view: true, create: false, edit: false, delete: false, admin: false },
          exam_management: { view: true, create: false, edit: false, delete: false, admin: false },
          attendance_management: { view: true, create: false, edit: false, delete: false, admin: false },
          library_management: { view: true, create: false, edit: false, delete: false, admin: false },
          reports_analytics: { view: false, create: false, edit: false, delete: false, admin: false },
          notifications: { view: true, create: false, edit: false, delete: false, admin: false },
          settings_config: { view: false, create: false, edit: false, delete: false, admin: false }
        }
      }
    },
    'school_b': {
      schoolId: 'school_b',
      schoolName: 'Riverside High School',
      enabledFeatures: [
        'student_management', 'staff_management', 'class_management', 
        'fee_management', 'library_management', 'reports_analytics', 'notifications', 'settings_config'
        // Note: exam_management and attendance_management are disabled for SchoolB
      ],
      rolePermissions: {
        admin: {
          student_management: { view: true, create: true, edit: true, delete: true, admin: true },
          staff_management: { view: true, create: true, edit: true, delete: true, admin: true },
          class_management: { view: true, create: true, edit: true, delete: true, admin: true },
          fee_management: { view: true, create: true, edit: true, delete: true, admin: true },
          exam_management: { view: false, create: false, edit: false, delete: false, admin: false }, // Disabled for SchoolB
          attendance_management: { view: false, create: false, edit: false, delete: false, admin: false }, // Disabled for SchoolB
          library_management: { view: true, create: true, edit: true, delete: true, admin: true },
          reports_analytics: { view: true, create: true, edit: true, delete: true, admin: true },
          notifications: { view: true, create: true, edit: true, delete: true, admin: true },
          settings_config: { view: true, create: true, edit: true, delete: true, admin: true }
        },
        accountant: {
          student_management: { view: true, create: false, edit: true, delete: false, admin: false },
          staff_management: { view: true, create: false, edit: false, delete: false, admin: false },
          class_management: { view: false, create: false, edit: false, delete: false, admin: false },
          fee_management: { view: true, create: true, edit: true, delete: false, admin: false },
          exam_management: { view: false, create: false, edit: false, delete: false, admin: false },
          attendance_management: { view: false, create: false, edit: false, delete: false, admin: false },
          library_management: { view: false, create: false, edit: false, delete: false, admin: false },
          reports_analytics: { view: true, create: false, edit: false, delete: false, admin: false },
          notifications: { view: true, create: false, edit: false, delete: false, admin: false },
          settings_config: { view: false, create: false, edit: false, delete: false, admin: false }
        },
        staff: {
          student_management: { view: true, create: false, edit: true, delete: false, admin: false },
          staff_management: { view: true, create: false, edit: false, delete: false, admin: false },
          class_management: { view: true, create: false, edit: true, delete: false, admin: false },
          fee_management: { view: true, create: false, edit: false, delete: false, admin: false },
          exam_management: { view: false, create: false, edit: false, delete: false, admin: false },
          attendance_management: { view: false, create: false, edit: false, delete: false, admin: false },
          library_management: { view: true, create: false, edit: true, delete: false, admin: false },
          reports_analytics: { view: true, create: false, edit: false, delete: false, admin: false },
          notifications: { view: true, create: false, edit: false, delete: false, admin: false },
          settings_config: { view: false, create: false, edit: false, delete: false, admin: false }
        },
        student: {
          student_management: { view: false, create: false, edit: false, delete: false, admin: false },
          staff_management: { view: false, create: false, edit: false, delete: false, admin: false },
          class_management: { view: true, create: false, edit: false, delete: false, admin: false },
          fee_management: { view: true, create: false, edit: false, delete: false, admin: false },
          exam_management: { view: false, create: false, edit: false, delete: false, admin: false },
          attendance_management: { view: false, create: false, edit: false, delete: false, admin: false },
          library_management: { view: true, create: false, edit: false, delete: false, admin: false },
          reports_analytics: { view: false, create: false, edit: false, delete: false, admin: false },
          notifications: { view: true, create: false, edit: false, delete: false, admin: false },
          settings_config: { view: false, create: false, edit: false, delete: false, admin: false }
        }
      }
    }
  };

  /**
   * Get school information and enabled features
   */
  static async getSchoolPermissions(schoolId: string): Promise<SchoolPermissions | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.mockSchoolPermissions[schoolId] || null;
  }

  /**
   * Check if a specific feature is enabled for a school
   */
  static async isFeatureEnabledForSchool(schoolId: string, feature: SystemFeature): Promise<boolean> {
    const schoolPermissions = await this.getSchoolPermissions(schoolId);
    return schoolPermissions?.enabledFeatures.includes(feature) || false;
  }

  /**
   * Check if user has permission for a specific feature and action
   */
  static async hasPermission(
    schoolId: string, 
    userRole: UserRole, 
    feature: SystemFeature, 
    action: 'view' | 'create' | 'edit' | 'delete' | 'admin'
  ): Promise<boolean> {
    const schoolPermissions = await this.getSchoolPermissions(schoolId);
    
    if (!schoolPermissions) return false;
    
    // First check if feature is enabled for school
    if (!schoolPermissions.enabledFeatures.includes(feature)) {
      return false;
    }
    
    // Then check if user role has permission for this action
    const rolePermissions = schoolPermissions.rolePermissions[userRole];
    return rolePermissions?.[feature]?.[action] || false;
  }

  /**
   * Get user permissions combining school features and role permissions
   */
  static async getUserPermissions(user: User): Promise<UserPermissions> {
    const schoolPermissions = await this.getSchoolPermissions(user.schoolId);
    
    if (!schoolPermissions) {
      return { quickActions: [], statistics: [] };
    }

    const allowedActions: FeatureAction[] = [];
    const allowedStats: string[] = [];

    // Generate quick actions based on school features and user role permissions
    for (const feature of schoolPermissions.enabledFeatures) {
      const rolePermissions = schoolPermissions.rolePermissions[user.role];
      const featurePermissions = rolePermissions[feature];

      if (!featurePermissions) continue;

      // Add feature-specific actions based on permissions
      switch (feature) {
        case 'student_management':
          if (featurePermissions.view) allowedStats.push('totalStudents');
          if (featurePermissions.create) {
            allowedActions.push({
              id: 'add_student',
              feature: 'student_management',
              action: 'create',
              title: 'Add Student',
              icon: '👨‍🎓',
              color: 'success',
              type: 'button',
              requiredPermissions: {
                schoolFeature: 'student_management',
                roleAccess: ['admin'],
                actionLevel: 'create'
              },
              onClick: () => alert('Add Student feature')
            } as FeatureAction);
          }
          break;

        case 'staff_management':
          if (featurePermissions.view) allowedStats.push('totalStaff');
          if (featurePermissions.create) {
            allowedActions.push({
              id: 'add_staff',
              feature: 'staff_management',
              action: 'create',
              title: 'Add Staff',
              icon: '👨‍🏫',
              color: 'info',
              type: 'button',
              requiredPermissions: {
                schoolFeature: 'staff_management',
                roleAccess: ['admin'],
                actionLevel: 'create'
              },
              onClick: () => alert('Add Staff feature')
            } as FeatureAction);
          }
          break;

        case 'class_management':
          if (featurePermissions.view) allowedStats.push('totalClasses');
          if (featurePermissions.view) {
            allowedActions.push({
              id: 'view_classes',
              feature: 'class_management',
              action: 'view',
              title: 'View Classes',
              icon: '🏫',
              color: 'success',
              type: 'button',
              requiredPermissions: {
                schoolFeature: 'class_management',
                roleAccess: ['admin', 'staff', 'student'],
                actionLevel: 'view'
              },
              onClick: () => alert('View Classes feature')
            } as FeatureAction);
          }
          break;

        case 'fee_management':
          if (featurePermissions.view) allowedStats.push('pendingFees');
          if (featurePermissions.create || featurePermissions.edit) {
            allowedActions.push({
              id: 'manage_fees',
              feature: 'fee_management',
              action: 'create',
              title: 'Manage Fees',
              icon: '💰',
              color: 'warning',
              type: 'dropdown',
              requiredPermissions: {
                schoolFeature: 'fee_management',
                roleAccess: ['admin', 'accountant'],
                actionLevel: 'create'
              },
              options: [
                {
                  id: 'pay_fee',
                  label: '💳 Pay Fee',
                  icon: '💳',
                  action: () => alert('Pay Fee feature'),
                  requiredPermissions: {
                    roleAccess: ['admin', 'accountant'],
                    actionLevel: 'create'
                  }
                },
                {
                  id: 'configure_fee',
                  label: '⚙️ Configure Fee',
                  icon: '⚙️',
                  action: () => alert('Configure Fee feature'),
                  requiredPermissions: {
                    roleAccess: ['admin'],
                    actionLevel: 'admin'
                  }
                },
                {
                  id: 'fee_reports',
                  label: '📊 Fee Reports',
                  icon: '📊',
                  action: () => alert('Fee Reports feature'),
                  requiredPermissions: {
                    roleAccess: ['admin', 'accountant'],
                    actionLevel: 'view'
                  }
                }
              ]
            } as FeatureAction);
          }
          break;

        case 'exam_management':
          if (featurePermissions.view) {
            allowedActions.push({
              id: 'exam_management',
              feature: 'exam_management',
              action: 'view',
              title: 'Exam Management',
              icon: '📝',
              color: 'info',
              type: 'dropdown',
              requiredPermissions: {
                schoolFeature: 'exam_management',
                roleAccess: ['admin', 'staff', 'student'],
                actionLevel: 'view'
              },
              options: [
                {
                  id: 'schedule_exam',
                  label: '📝 Schedule Exam',
                  icon: '📝',
                  action: () => alert('Schedule Exam feature'),
                  requiredPermissions: {
                    roleAccess: ['admin', 'staff'],
                    actionLevel: 'create'
                  }
                },
                {
                  id: 'view_results',
                  label: '📊 View Results',
                  icon: '📊',
                  action: () => alert('View Results feature'),
                  requiredPermissions: {
                    roleAccess: ['admin', 'staff', 'student'],
                    actionLevel: 'view'
                  }
                }
              ]
            } as FeatureAction);
          }
          break;

        case 'attendance_management':
          if (featurePermissions.view) {
            allowedActions.push({
              id: 'attendance_management',
              feature: 'attendance_management',
              action: 'view',
              title: 'Attendance',
              icon: '📋',
              color: 'success',
              type: 'button',
              requiredPermissions: {
                schoolFeature: 'attendance_management',
                roleAccess: ['admin', 'staff', 'student'],
                actionLevel: 'view'
              },
              onClick: () => alert('Attendance Management feature')
            } as FeatureAction);
          }
          break;

        case 'library_management':
          if (featurePermissions.view) {
            allowedActions.push({
              id: 'library_management',
              feature: 'library_management',
              action: 'view',
              title: 'Library',
              icon: '📚',
              color: 'info',
              type: 'button',
              requiredPermissions: {
                schoolFeature: 'library_management',
                roleAccess: ['admin', 'staff', 'student'],
                actionLevel: 'view'
              },
              onClick: () => alert('Library Management feature')
            } as FeatureAction);
          }
          break;

        case 'reports_analytics':
          if (featurePermissions.view) {
            allowedActions.push({
              id: 'reports_analytics',
              feature: 'reports_analytics',
              action: 'view',
              title: 'Generate Reports',
              icon: '📊',
              color: 'info',
              type: 'button',
              requiredPermissions: {
                schoolFeature: 'reports_analytics',
                roleAccess: ['admin', 'accountant', 'staff'],
                actionLevel: 'view'
              },
              onClick: () => alert('Reports & Analytics feature')
            } as FeatureAction);
          }
          break;
      }
    }

    // Convert FeatureActions to QuickActionItems for backward compatibility
    const quickActions: QuickActionItem[] = allowedActions.map(action => ({
      id: action.id,
      title: action.title,
      icon: action.icon,
      color: action.color,
      type: action.type,
      action: action.onClick,
      options: action.options?.map(opt => ({
        id: opt.id,
        label: opt.label,
        icon: opt.icon,
        action: opt.action,
        permissions: opt.requiredPermissions.roleAccess
      })),
      permissions: action.requiredPermissions.roleAccess
    }));

    return {
      quickActions,
      statistics: allowedStats
    };
  }

  /**
   * Get role-based welcome message
   */
  static getWelcomeMessage(role: UserRole): string {
    const messages = {
      admin: 'Welcome back, Administrator! Manage your school with full control.',
      accountant: 'Welcome back! Ready to manage finances and student accounts.',
      staff: 'Welcome back, Educator! Ready to inspire and teach today.',
      student: 'Welcome back! Ready to learn something new today?'
    };
    return messages[role] || 'Welcome to your dashboard';
  }

  /**
   * Check if user can access a specific section
   */
  static async canAccessSection(user: User, section: string): Promise<boolean> {
    const featureMap: Record<string, SystemFeature> = {
      students: 'student_management',
      staff: 'staff_management',
      classes: 'class_management',
      fees: 'fee_management',
      exams: 'exam_management',
      attendance: 'attendance_management',
      library: 'library_management',
      reports: 'reports_analytics',
      settings: 'settings_config'
    };

    const feature = featureMap[section];
    if (!feature) return false;

    return this.hasPermission(user.schoolId, user.role, feature, 'view');
  }

  /**
   * Get list of available schools for testing
   */
  static getAvailableSchools(): School[] {
    return Object.values(this.mockSchoolData);
  }

  /**
   * Get demo users for testing different scenarios
   */
  static getDemoUsers(): User[] {
    return [
      // School A users (all features enabled)
      { id: '1', email: 'admin@schoola.edu', name: 'John Smith', role: 'admin', schoolId: 'school_a' },
      { id: '2', email: 'accountant@schoola.edu', name: 'Jane Doe', role: 'accountant', schoolId: 'school_a' },
      { id: '3', email: 'staff@schoola.edu', name: 'Mike Johnson', role: 'staff', schoolId: 'school_a' },
      { id: '4', email: 'student@schoola.edu', name: 'Sarah Wilson', role: 'student', schoolId: 'school_a' },
      
      // School B users (attendance & exam features disabled)
      { id: '5', email: 'admin@schoolb.edu', name: 'Robert Brown', role: 'admin', schoolId: 'school_b' },
      { id: '6', email: 'accountant@schoolb.edu', name: 'Lisa Davis', role: 'accountant', schoolId: 'school_b' },
      { id: '7', email: 'staff@schoolb.edu', name: 'Tom Anderson', role: 'staff', schoolId: 'school_b' },
      { id: '8', email: 'student@schoolb.edu', name: 'Emily Taylor', role: 'student', schoolId: 'school_b' }
    ];
  }
}
