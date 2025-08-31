// Route configuration with page titles
export const routeConfig = {
  '/': { title: 'Dashboard', icon: '📊' },
  '/student/add': { title: 'Add Student', icon: '👨‍🎓' },
  '/fees/pay': { title: 'Pay Fee', icon: '💰' },
  '/fees/manage': { title: 'Manage Fee', icon: '💰' },
  '/fees/configure': { title: 'Configure Fee', icon: '⚙️' },
  '/students': { title: 'Students', icon: '👨‍🎓' },
  '/students/list': { title: 'All Students', icon: '👨‍🎓' },
  '/students/reports': { title: 'Student Reports', icon: '📊' },
  '/students/attendance': { title: 'Attendance', icon: '📅' },
  '/staff': { title: 'Staff', icon: '👨‍🏫' },
  '/staff/list': { title: 'All Staff', icon: '👨‍🏫' },
  '/staff/add': { title: 'Add Staff', icon: '👨‍🏫' },
  '/staff/schedule': { title: 'Schedule', icon: '📅' },
  '/staff/payroll': { title: 'Payroll', icon: '💰' },
  '/classes': { title: 'Classes', icon: '🏫' },
  '/classes/list': { title: 'All Classes', icon: '🏫' },
  '/classes/add': { title: 'Add Class', icon: '🏫' },
  '/classes/timetable': { title: 'Timetable', icon: '📅' },
  '/classes/curriculum': { title: 'Curriculum', icon: '📚' },
  '/exams': { title: 'Exams', icon: '📝' },
  '/exams/schedule': { title: 'Schedule Exam', icon: '📝' },
  '/exams/results': { title: 'Exam Results', icon: '📊' },
  '/exams/questions': { title: 'Question Bank', icon: '❓' },
  '/exams/grades': { title: 'Grade Book', icon: '🎓' },
  '/reports': { title: 'Reports', icon: '📈' },
  '/settings': { title: 'Settings', icon: '⚙️' },
};

// Helper function to get page title from path
export const getPageTitle = (path: string): { title: string; icon: string } => {
  return routeConfig[path as keyof typeof routeConfig] || { title: 'Page', icon: '📄' };
};
