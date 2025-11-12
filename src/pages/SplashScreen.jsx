import { useState, useEffect } from 'react'

export default function SplashScreen({ onComplete }) {
  const [isOpening, setIsOpening] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Auto redirect after 5 seconds if user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpening) {
        handleOpenBox()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isOpening])

  function handleOpenBox() {
    if (isOpening) return

    setIsOpening(true)

    // Show content reveal after box opens (increased to 1.5s to let explosion finish)
    setTimeout(() => {
      setShowContent(true)
    }, 1500)

    // Complete splash and navigate to main page (increased timing)
    setTimeout(() => {
      onComplete()
    }, 3000)
  }

  return (
    <div className="splash-screen">
      <div className="splash-background">
        {/* Main content */}
        <div className="splash-content">
          {!showContent ? (
            <>
              {/* Beautiful Unified Gift Box */}
              <div
                className={`gift-box ${isOpening ? 'opening' : ''}`}
                onClick={handleOpenBox}
              >
                {/* Box Body - Main Container */}
                <div className="box-wrapper">
                  {/* Front Face */}
                  <div className="box-face box-front">
                    <span className="gift-icon">🎁</span>
                  </div>
                  
                  {/* Top Face (Lid) */}
                  <div className={`box-face box-top ${isOpening ? 'lid-open' : ''}`}></div>
                  
                  {/* Left Face */}
                  <div className="box-face box-left"></div>
                  
                  {/* Right Face */}
                  <div className="box-face box-right"></div>
                  
                  {/* Ribbon Horizontal */}
                  <div className="ribbon-h"></div>
                  
                  {/* Ribbon Vertical */}
                  <div className="ribbon-v"></div>
                </div>

                {/* Bow on Top */}
                <div className="bow">
                  <div className="bow-part bow-left-part"></div>
                  <div className="bow-part bow-right-part"></div>
                  <div className="bow-center-part"></div>
                </div>
              </div>

              {/* Instructions */}
              <div className={`splash-instructions ${isOpening ? 'fade-out' : ''}`}>
                <h1 className="splash-title">
                  Welcome to <span className="brand-text">blindBOX</span>
                </h1>
                <p className="splash-subtitle">
                  🎁 Click to open your surprise!
                </p>
                {!isOpening && (
                  <p className="auto-hint">Auto-opens in a few seconds...</p>
                )}
              </div>
            </>
          ) : (
            /* Content reveal */
            <div className="content-reveal">
              <div className="surprise-items">
                <div className="item">🎮</div>
                <div className="item">🦄</div>
                <div className="item">⭐</div>
                <div className="item">🎨</div>
                <div className="item">💎</div>
                <div className="item">🌟</div>
              </div>
              <h2 className="welcome-text">Welcome to blindBOX!</h2>
              <p className="enter-text">Entering the world of surprises...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}