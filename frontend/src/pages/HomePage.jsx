import React from 'react';
import './HomePage.css';

function HomePage() {
  // This function would typically navigate the user to the groups page
  const handleGetStarted = () => {
    // In a real app with a router, you would navigate programmatically.
    // For now, we can just log to the console.
    console.log("Navigate to the Groups page!");
    alert("This would take you to the Groups page!");
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Stop Arguing, Start Splitting.</h1>
          <p className="hero-subtitle">
            The simplest way to track and settle shared expenses with friends and family.
            Fair, transparent, and hassle-free.
          </p>
          <button onClick={handleGetStarted} className="hero-cta-button">
            Get Started for Free
          </button>
        </div>
      </section>

      <section className="previews-section">
        <h2 className="previews-title">See How It Works</h2>
        <div className="video-previews-container">
          {/* Video Placeholder 1 */}
          <div className="video-placeholder">
            <div className="video-placeholder-content">
              <span>▶</span>
              <p>Creating a Group</p>
            </div>
          </div>
          {/* Video Placeholder 2 */}
          <div className="video-placeholder">
            <div className="video-placeholder-content">
              <span>▶</span>
              <p>Adding an Expense</p>
            </div>
          </div>
          {/* Video Placeholder 3 */}
          <div className="video-placeholder">
            <div className="video-placeholder-content">
              <span>▶</span>
              <p>Settling Balances</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
