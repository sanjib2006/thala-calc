import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCopy, FaCheck, FaInfoCircle } from 'react-icons/fa';
import './App.css';
import thalaPc from './files/thala_pc.jpg';
import thalaPh from './files/thala_ph.jpg';
import confetti from 'canvas-confetti';

const GITHUB_URL = 'https://github.com/sanjib2006';
const LINKEDIN_URL = 'https://linkedin.com/in/sanjib-behera06';
const DEVELOPER_NAME = 'Sanjib Behera';

function App() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    typeof window !== 'undefined' && window.innerWidth > 768 ? thalaPc : thalaPh
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [showAbout, setShowAbout] = useState(false);
  const aboutRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
      setWindowWidth(width);
      setBackgroundImage(width > 768 ? thalaPc : thalaPh);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (reason && typeof window !== 'undefined') {
      const thalaColors = ['#f9d616', '#0057e7', '#ffffff', '#ffd700'];
      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 },
        colors: thalaColors,
        shapes: ['circle']
      });

      const intervals = [
        setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 65, origin: { x: 0 }, colors: thalaColors }), 300),
        setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 65, origin: { x: 1 }, colors: thalaColors }), 600),
        setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.8 }, colors: thalaColors }), 900)
      ];

      return () => intervals.forEach(clearTimeout);
    }
  }, [reason]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name or phrase');
      setReason('');
      return;
    }
    setError('');
    setIsLoading(true);
    setCopied(false);

    try {
      const response = await fetch(`${API_URL}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (response.ok) {
        setReason(data.reason);
        setError('');
      } else {
        setError(data.reason || 'Something went wrong');
        setReason('');
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
      setReason('');
    } finally {
      setIsLoading(false);
    }
  }, [name, API_URL]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reason);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy!');
    }
  }, [reason]);

  const toggleAbout = useCallback(() => {
    setShowAbout(prev => !prev);
  }, []);

  const handleOutsideClick = (e) => {
    if (aboutRef.current && !aboutRef.current.contains(e.target)) {
      setShowAbout(false);
    }
  };

  useEffect(() => {
    if (showAbout) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showAbout]);

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

  const innerWrapperStyle = isMobile
    ? { width: '100%', maxWidth: '500px', padding: '0 0rem' }
    : { width: '100%', maxWidth: '600px', position: 'absolute', left: '100px' };

  return (
    <div style={backgroundStyle}>
      {/* Social Links */}
      <div className="social-links">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </div>

      {/* Main Card Area */}
      <div style={innerWrapperStyle}>
        <motion.div className="container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="header">
            <h1>Thala For A Reason</h1>
            <p className="subtitle">Discover why your Name is special! ✨</p>
          </div>

          <form onSubmit={handleSubmit} className="form-container" autoComplete="off">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter a name, word, or phrase..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-box"
                autoFocus
              />
              <motion.button
                type="submit"
                className="submit-button"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <span className="spinner"></span> : 'Check Reason'}
              </motion.button>
            </div>
          </form>

          <div aria-live="polite">
            <AnimatePresence>
              {error && (
                <motion.div className="result-container error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="result-icon">⚠️</div>
                  <p className="error-message">{error}</p>
                </motion.div>
              )}
              {reason && (
                <motion.div className="result-container success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="result-header">
                    <div className="result-icon">🎉</div>
                    <motion.button onClick={copyToClipboard} className="copy-button">
                      {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
                    </motion.button>
                  </div>
                  <textarea readOnly value={reason} rows={5} className="result-box" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button className="about-button" onClick={toggleAbout} whileHover={{ scale: 1.05 }}>
            <FaInfoCircle /> {showAbout ? 'Hide About' : 'About'}
          </motion.button>

          <div className="footer">
            <p>Made with ❤️ for Thala fans</p>
          </div>
        </motion.div>
      </div>

      {/* Overlay Section */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            className="about-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="about-content"
              ref={aboutRef}
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <button className="close-button" onClick={() => setShowAbout(false)}>✖</button>
              <h2>About</h2>
<p>
They told me not everything is Thala. I took it personally.<br />
This app turns names into numbers, numbers into sevens, and skeptics into believers. 
Call it math, call it madness — either way, it’s #ThalaForAReason.
</p>

<h3>About the Developer</h3>
<p>
I’m {DEVELOPER_NAME} — student at IIT(ISM) Dhanbad, part-time engineer, full-time overthinker.<br />
I built this app when I should’ve been studying — Sab Moh Maya Hai🔥... oh wait, that’s just my WiFi hotspot name.<br />
I don’t chase bugs, they chase me. Suggestions...? Let’s connect before I accidentally prove you’re Thala too.
</p>

<div className="about-links">
  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
</div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
