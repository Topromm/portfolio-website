import { useLoader, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';



export default function Road({ speedModifier = 1 }) {
  const materials = useLoader(
    MTLLoader,
    '/assets/nobrakes/road/Road.mtl'
  );
  const [object, setObject] = useState(null);
  // (Old SEGMENT_COUNT, REPEAT_OFFSET, segRefs, positions removed)

  const BASE_SPEED = 0.4;
  const SPEED = BASE_SPEED * speedModifier;
  const SPAWN_Z = 20;
  const DESPAWN_Z = 10;
  const [segments, setSegments] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const loader = new OBJLoader();
    loader.setMaterials(materials);
    loader.load('/assets/nobrakes/road/Road.obj', setObject);
  }, [materials]);

  // Distance-based spawning: always keep enough segments to cover the visible road
  const ROAD_LENGTH = 100; // Blender model length
  useEffect(() => {
    if (!object) return;
    // Spawn the first segment at SPAWN_Z
    setSegments(prev => prev.length === 0 ? [{ id: nextId.current++, z: SPAWN_Z }] : prev);
  }, [object]);

  useFrame(() => {
    setSegments(prev => {
      // Move all segments forward
      const moved = prev.map(seg => ({ ...seg, z: seg.z + SPEED }));
      // Remove oldest if more than 7
      let result = moved;
      if (result.length > 7) {
        result = result.slice(1);
      }
      // Spawn a new segment if the last one is far enough forward
      if (
        result.length === 0 ||
        (result[result.length - 1].z >= SPAWN_Z + ROAD_LENGTH - 0.5)
      ) {
        result = [
          ...result,
          { id: nextId.current++, z: SPAWN_Z }
        ];
      }
      return result;
    });
  });

  return object ? (
    <>
      {segments.map(seg => (
        <group key={seg.id} position={[0, 0, seg.z]}>
          <primitive object={object} />
        </group>
      ))}
    </>
  ) : null;
}
