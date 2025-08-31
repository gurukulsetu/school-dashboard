import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    // Check if user has already dismissed the install prompt
    const hasUserDismissed = localStorage.getItem('pwa-install-dismissed');
    if (hasUserDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the banner after 30 seconds
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 30000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
        localStorage.setItem('pwa-install-dismissed', 'true');
      }
      
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isInstalled || !showInstallBanner || !deferredPrompt) {
    return null;
  }

  return (
    <Alert 
      variant="primary" 
      className="pwa-install-banner show position-fixed"
      style={{ 
        bottom: 0, 
        left: 0, 
        right: 0, 
        margin: 0, 
        borderRadius: 0,
        zIndex: 1050 
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <i className="bi bi-download me-2"></i>
          <div>
            <strong>Install School Admin App</strong>
            <div className="small">Add to your home screen for easy access</div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleInstallClick}
            className="me-2"
          >
            Install
          </Button>
          <Button 
            variant="outline-light" 
            size="sm" 
            onClick={handleDismiss}
          >
            ✕
          </Button>
        </div>
      </div>
    </Alert>
  );
};

export default PWAInstallPrompt;
