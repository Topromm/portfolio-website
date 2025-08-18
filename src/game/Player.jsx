import { useFrame, useLoader, extend } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import Road from './Road';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'


export default function Player() {
  const ref = useRef();
  const [lane, setLane] = useState(1); // 0: left, 1: middle, 2: right
  const [slowing, setSlowing] = useState(false);

  const materials = useLoader(
    MTLLoader,
    '/assets/nobrakes/bmw-m5-e60/2009_BMW_M5_E60.mtl'
  );
  const obj = useMemo(() => {
    const loader = new OBJLoader();
    loader.setMaterials(materials);
    return loader.loadAsync('/assets/nobrakes/bmw-m5-e60/2009_BMW_M5_E60.obj');
  }, [materials]);

  const [object, setObject] = useState(null);
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
  }, [obj]);

  // Keyboard controls for lane switching and slowing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        setLane(l => Math.max(0, l - 1));
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        setLane(l => Math.min(2, l + 1));
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        setSlowing(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === 's' || e.key === 'ArrowDown') {
        setSlowing(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    if (ref.current) {
      // Dramatic lane spacing for clear movement
      const lanePositions = [-4.2, 0, 4.2];
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        lanePositions[lane],
        0.2
      );
      // Move car further down if slowing, but not so far it clips the ground
      const targetY = slowing ? 1.45 : 1.8;
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.2);
      // Move car visually back if slowing
      const targetZ = slowing ? -2.5 : 0;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.2);

      // Camera stays centered at X=0, follows Z and Y only
      const carPos = ref.current.position;
      camera.position.lerp(
        new THREE.Vector3(0, carPos.y + 7, carPos.z + 18),
        0.1
      );
      // Camera always looks straight ahead, not at car's X
      camera.lookAt(0, carPos.y, carPos.z);
    }
  });

  return (
    <>
      <Road speedModifier={slowing ? 0.5 : 1} />
      <group ref={ref} position={[0, 1.8, 1.5]}>
        {object && <primitive object={object} scale={0.4}/>}
      </group>
    </>
  );
}

