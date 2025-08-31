import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Dropdown } from 'react-bootstrap';
import { schoolConfig } from '../config/school';

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
    { id: 'add-student', label: 'Add Student', icon: '👨‍🎓', path: '/student/add' },
    { id: 'pay-fee', label: 'Pay Fee', icon: '💰', path: '/fees/pay' },
    {
      id: 'students',
      label: 'Manage Students',
      icon: '👨‍🎓',
      submenu: [
        { id: 'student-list', label: 'All Students', path: '/students/list' },
        { id: 'student-reports', label: 'Student Reports', path: '/students/reports' },
        { id: 'attendance', label: 'Attendance', path: '/students/attendance' }
      ]
    },
    {
      id: 'staff',
      label: 'Manage Staff',
      icon: '👨‍🏫',
      submenu: [
        { id: 'staff-list', label: 'All Staff', path: '/staff/list' },
        { id: 'add-staff', label: 'Add Staff', path: '/staff/add' },
        { id: 'staff-schedule', label: 'Schedule', path: '/staff/schedule' },
        { id: 'payroll', label: 'Payroll', path: '/staff/payroll' }
      ]
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: '🏫',
      submenu: [
        { id: 'class-list', label: 'All Classes', path: '/classes/list' },
        { id: 'add-class', label: 'Add Class', path: '/classes/add' },
        { id: 'timetable', label: 'Timetable', path: '/classes/timetable' },
        { id: 'curriculum', label: 'Curriculum', path: '/classes/curriculum' }
      ]
    },
    {
      id: 'fees',
      label: 'Fees',
      icon: '💰',
      submenu: [
        { id: 'fee-collection', label: 'Fee Collection', path: '/fees/collection' },
        { id: 'fee-structure', label: 'Fee Structure', path: '/fees/structure' },
        { id: 'pending-fees', label: 'Pending Fees', path: '/fees/pending' },
        { id: 'fee-reports', label: 'Fee Reports', path: '/fees/reports' }
      ]
    },
    {
      id: 'exams',
      label: 'Exams',
      icon: '📝',
      submenu: [
        { id: 'schedule-exam', label: 'Schedule Exam', path: '/exams/schedule' },
        { id: 'exam-results', label: 'Exam Results', path: '/exams/results' },
        { id: 'question-bank', label: 'Question Bank', path: '/exams/questions' },
        { id: 'grade-book', label: 'Grade Book', path: '/exams/grades' }
      ]
    },
    { id: 'reports', label: 'Reports', icon: '📈', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' }
  ];

  const handleSectionChange = (path?: string) => {
    if (path) {
      navigate(path);
    }
    // Close sidebar on mobile after selection
    if (window.innerWidth < 992) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {visible && (
        <div className="sidebar-overlay d-lg-none" onClick={onClose}></div>
      )}
      
      {/* Sidebar */}
      <div className={`sidebar fixed-sidebar ${visible ? 'show' : ''}`}>
        <div className="sidebar-content">
          {/* Logo and brand */}
          <div className="sidebar-header p-3 mb-3">
            <div className="d-flex align-items-center">
              <div className="me-2" style={{ fontSize: '1.5rem' }}>{schoolConfig.logo}</div>
              <div>
                <h5 className="mb-0 text-white">{schoolConfig.name}</h5>
                <small className="text-light">{schoolConfig.subtitle}</small>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <Nav className="flex-column px-2">
            {menuItems.map((item) => (
              item.submenu ? (
                <Dropdown key={item.id} className="nav-dropdown">
                  <Dropdown.Toggle
                    variant=""
                    className="nav-link d-flex align-items-center justify-content-between w-100"
                    style={{ border: 'none', background: 'transparent' }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="sidebar-dropdown-menu">
                    {item.submenu.map((subItem) => (
                      <Dropdown.Item
                        key={subItem.id}
                        onClick={() => handleSectionChange(subItem.path)}
                        className="sidebar-dropdown-item"
                      >
                        {subItem.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  key={item.id}
                  className="nav-link"
                  onClick={() => handleSectionChange(item.path)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="me-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Nav.Link>
              )
            ))}
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
