// Player.jsx
import { useFrame, useLoader, extend } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'


export default function Player() {
  const ref = useRef()
  const [lane, setLane] = useState(1) // middle lane

  // Load MTL and OBJ with materials
  const materials = useLoader(
    MTLLoader,
    '/assets/NoBrakes/bmw-m5-e60/2009_BMW_M5_E60.mtl'
  )
  const obj = useMemo(() => {
    const loader = new OBJLoader()
    loader.setMaterials(materials)
    return loader.loadAsync('/assets/NoBrakes/bmw-m5-e60/2009_BMW_M5_E60.obj')
  }, [materials])

  const [object, setObject] = useState(null)
useEffect(() => {
  obj.then(loadedObj => {
    loadedObj.traverse(child => {
      if (
        child.isMesh &&
        child.material &&
        child.material.map &&
        child.material.map.name &&
        child.material.map.name.toLowerCase().includes('skirtspaint1_diff')
      ) {
        child.material.metalness = 10;
        child.material.roughness = 0.2;
        child.material.needsUpdate = true;
      }
    });
    setObject(loadedObj);
  });
}, [obj])

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        [-2, 0, 2][lane],
        0.1
      )
      ref.current.position.z -= 0.1 // move forward

      // Camera follows behind and above the car
      const carPos = ref.current.position
      camera.position.lerp(
        new THREE.Vector3(carPos.x, carPos.y + 5, carPos.z + 10),
        0.1
      )
      camera.lookAt(carPos.x, carPos.y, carPos.z)
    }
  })

  // Add event listeners for keyboard/swipe to call setLane(...)
  // Clamp lane between 0 and 2

  return (
    <group ref={ref} position={[0, 1, 0]}>
      {object && <primitive object={object} scale={0.5} />}
    </group>
  )
}

