import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  console.log("showInstallButton",showInstallButton);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log('beforeinstallprompt event fired');
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    });
  };
  return (
    <div>
    {showInstallButton && (
      <button onClick={handleInstallClick}>
        Install App
      </button>
    )}
    <h1>hello</h1>
  </div>
   
    
  );
}

export default App;
