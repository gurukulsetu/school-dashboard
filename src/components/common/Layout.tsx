import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleToggleSidebar = () => setSidebarVisible((v) => !v);
  const handleCloseSidebar = () => setSidebarVisible(false);

  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} sidebarVisible={sidebarVisible} />
      <Sidebar
        visible={sidebarVisible}
        onClose={handleCloseSidebar}
      />
      <main className="main-content">
        {children}
      </main>
    </>
  );
};

export default Layout;
