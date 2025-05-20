import React, { useState, useEffect } from 'react';
import './App.css';
import thalaPc from './files/thala_pc.jpg';
import thalaPh from './files/thala_ph.jpg';
import confetti from 'canvas-confetti';

function App() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(thalaPc);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setBackgroundImage(window.innerWidth > 768 ? thalaPc : thalaPh);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (reason) {
      // Thala-themed confetti (blue and yellow colors)
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4a6bff', '#ffd700', '#ffffff']
      });

      // Side bursts with delay
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4a6bff', '#ff6b6b']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4a6bff', '#ff6b6b']
        });
      }, 300);
    }
  }, [reason]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setReason('');
    setIsLoading(true);
    setCopied(false);

    try {
      const response = await fetch(`${API_URL}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.reason);
      } else {
        setReason(data.reason);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reason);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMobile = windowWidth <= 768;
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 50%, transparent 80%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: isMobile ? 'center' : 'center right',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start',
    alignItems: 'center',
    padding: isMobile ? '1rem' : '2rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={backgroundStyle}>
      <div style={isMobile ? { 
        width: '100%', 
        maxWidth: '500px',
        padding: '0 0rem'
      } : { 
        width: '100%',
        maxWidth: '600px',
        position: 'absolute',
        left: '100px'
      }}>
        <div className="container">
          <div className="header">
            <h1>Thala For A Reason</h1>
            <p className="subtitle">Discover why your Name is special!✨</p>
          </div>

          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter a name, word, or phrase..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-box"
              />
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  'Check Reason'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="result-container error">
              <div className="result-icon">⚠️</div>
              <p className="error-message">{error}</p>
            </div>
          )}

          {reason && (
            <div className="result-container success">
              <div className="result-header">
                <div className="result-icon">🎉</div>
                <button 
                  onClick={copyToClipboard} 
                  className="copy-button"
                  title="Copy to clipboard"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                readOnly
                value={reason}
                rows={5}
                className="result-box"
              />
            </div>
          )}

          <div className="footer">
            <p>Made with ❤️ for Thala fans</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;