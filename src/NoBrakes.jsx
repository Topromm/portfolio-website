import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Player from './game/Player';

export default function GamePage() {

  const [showLogo, setShowLogo] = useState(true);
  const [fade, setFade] = useState(false);
  const [hover, setHover] = useState(false);
  const [showPreGame, setShowPreGame] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const handleLogoClick = () => {
    setFade(true);
    setTimeout(() => {
      setShowLogo(false);
      setShowPreGame(true);
    }, 600);
  };

  const handlePlayClick = () => {
    setShowPreGame(false);
    setShowGame(true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#111' }}>
      {showLogo && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '100vw',
            height: '100vh',
            background: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.6s',
            opacity: fade ? 0 : 1,
          }}
        >
          <img
            src="/assets/nobrakes/NoBrakesLogo1.png"
            alt="NoBrakes Logo"
            onClick={handleLogoClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              maxWidth: '60vw',
              maxHeight: '60vh',
              filter: hover
                ? 'drop-shadow(0 0 40px #ff2a7f) drop-shadow(0 0 80px #ff1a40ff) drop-shadow(0 0 20px #000a)'
                : 'drop-shadow(0 0 20px #000a)',
              userSelect: 'none',
              transition: 'transform 0.4s cubic-bezier(.4,2,.4,1), filter 0.3s',
              transform: hover ? 'scale(1.13)' : 'scale(1)',
              cursor: 'pointer',
            }}
          />
        </div>
      )}

      {showPreGame && !showGame && (
        <>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(24,24,24,0.98)',
            borderRadius: 16,
            boxShadow: '0 8px 32px #000a',
            padding: '40px 60px',
            zIndex: 20,
            minWidth: 340,
            textAlign: 'center',
            color: '#fff',
          }}>
            <h1 style={{ margin: 0, fontSize: 36, letterSpacing: 2 }}>No Brakes</h1>
            <button
              onClick={handlePlayClick}
              style={{
                marginTop: 32,
                padding: '12px 36px',
                fontSize: 22,
                borderRadius: 8,
                border: 'none',
                background: 'linear-gradient(90deg,#ff2a7f,#ff1a40)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0006',
                transition: 'background 0.2s',
              }}
            >Play</button>
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 500,
            transform: 'translateY(-50%)',
            background: 'rgba(24,24,24,0.96)',
            borderRadius: 12,
            boxShadow: '0 4px 16px #000a',
            padding: '28px 24px',
            zIndex: 19,
            minWidth: 180,
            color: '#fff',
          }}>
            <h2 style={{marginTop:0, fontSize:22}}>Select Car</h2>
            <div style={{marginTop:16, fontSize:16, opacity:0.7}}>[Car selection placeholder]</div>
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            right: 500,
            transform: 'translateY(-50%)',
            background: 'rgba(24,24,24,0.96)',
            borderRadius: 12,
            boxShadow: '0 4px 16px #000a',
            padding: '28px 24px',
            zIndex: 19,
            minWidth: 180,
            color: '#fff',
          }}>
            <h2 style={{marginTop:0, fontSize:22}}>Leaderboard</h2>
            <div style={{marginTop:16, fontSize:16, opacity:0.7}}>[Leaderboard placeholder]</div>
          </div>
        </>
      )}

      {showGame && (
        <>
          <Canvas
            camera={{ position: [0, 5, 10], fov: 60 }}
            style={{ width: '100vw', height: '100vh' }}
            fog={{ color: '#111', near: 18, far: 90 }}
          >
            <fog attach="fog" args={["#111", 18, 90]} />
            <ambientLight />
            <directionalLight position={[10, 10, 5]} />
            <Player />
            <OrbitControls />
          </Canvas>
          <div className="ui-overlay" style={{ position: 'absolute', top: 20, left: 20, color: '#fff', fontSize: 24 }}>Score: 123</div>
        </>
      )}
    </div>
  );
}
