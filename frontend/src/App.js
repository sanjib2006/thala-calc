import React, { useState } from 'react';
import './App.css';
import thalaBg from './files/thala_pc.jpg';

function App() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setReason('');
    setIsLoading(true);
    setCopied(false);

    try {
      const response = await fetch('https://thala-calc.onrender.com/check', {
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

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 50%, transparent 70%), url(${thalaBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px'
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <div className="header">
          <h1>Thala for a Reason</h1>
          <p className="subtitle">Discover why your input is special!</p>
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
  );
}

export default App;