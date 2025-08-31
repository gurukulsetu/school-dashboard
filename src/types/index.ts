export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  schoolId: string;
  scopes?: string[];
}

export interface School {
  id: string;
  name: string;
  features: SchoolFeature[];
  subscription: 'basic' | 'premium' | 'enterprise';
}

export interface SchoolFeature {
  feature: SystemFeature;
  enabled: boolean;
  restrictions?: string[];
}

export type SystemFeature = 
  | 'student_management'
  | 'staff_management' 
  | 'class_management'
  | 'fee_management'
  | 'exam_management'
  | 'attendance_management'
  | 'library_management'
  | 'reports_analytics'
  | 'notifications'
  | 'settings_config';

export type UserRole = 'admin' | 'staff' | 'student' | 'accountant';

export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  grade: string;
  admissionDate: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  parentContact: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  salary: number;
  phone: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacher: string;
  studentCount: number;
  subjects: string[];
}

export interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  totalClasses: number;
  pendingFees: number;
  upcomingExams: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Quick Action Types for Role-Based Access Control
export interface QuickActionItem {
  id: string;
  title: string;
  icon: string;
  color: 'success' | 'warning' | 'info' | 'danger';
  type: 'button' | 'dropdown';
  action?: () => void;
  options?: QuickActionOption[];
  permissions: UserRole[];
}

export interface QuickActionOption {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  permissions: UserRole[];
}

export interface RolePermissions {
  role: UserRole;
  allowedActions: string[];
  allowedStats: string[];
}

export interface UserPermissions {
  quickActions: QuickActionItem[];
  statistics: string[];
}

// New Two-Level Permission System
export interface PermissionCheck {
  schoolFeature: SystemFeature;
  userRoleAccess: string[];
}

export interface SchoolPermissions {
  schoolId: string;
  schoolName: string;
  enabledFeatures: SystemFeature[];
  rolePermissions: Record<UserRole, RoleFeaturePermissions>;
}

export interface RoleFeaturePermissions {
  [feature: string]: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    admin: boolean;
  };
}

export interface FeatureAction {
  id: string;
  feature: SystemFeature;
  action: string;
  title: string;
  icon: string;
  color: 'success' | 'warning' | 'info' | 'danger';
  type: 'button' | 'dropdown';
  requiredPermissions: {
    schoolFeature: SystemFeature;
    roleAccess: UserRole[];
    actionLevel: 'view' | 'create' | 'edit' | 'delete' | 'admin';
  };
  onClick?: () => void;
  options?: FeatureActionOption[];
}

export interface FeatureActionOption {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  requiredPermissions: {
    roleAccess: UserRole[];
    actionLevel: 'view' | 'create' | 'edit' | 'delete' | 'admin';
  };
}
