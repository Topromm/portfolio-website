import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Player from './game/Player'

export default function GamePage() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }} style={{ width: '100vw', height: '100vh' }}>
        <ambientLight />
        <directionalLight position={[10, 10, 5]} />
        <Player />
        <OrbitControls />
      </Canvas>
      <div className="ui-overlay" style={{ position: 'absolute', top: 20, left: 20, color: '#fff', fontSize: 24 }}>Score: 123</div>
    </div>
  )
}
