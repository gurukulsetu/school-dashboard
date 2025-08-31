import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AddStudent from '../pages/students/AddStudent';

// Import other student components as you create them
// import StudentList from '../pages/students/StudentList';
// import StudentReports from '../pages/students/StudentReports';
// import StudentAttendance from '../pages/students/StudentAttendance';

export const studentRoutes = [
  <Route 
    key="/student/add"
    path="/student/add" 
    element={
      <ProtectedRoute requiredScope="add_student">
        <AddStudent />
      </ProtectedRoute>
    } 
  />,
  // Add more student routes here
  // <Route 
  //   key="/students/list"
  //   path="/students/list" 
  //   element={
  //     <ProtectedRoute requiredScope="view_students">
  //       <StudentList />
  //     </ProtectedRoute>
  //   } 
  // />,
];
