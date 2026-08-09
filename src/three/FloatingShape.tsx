import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "sphere" | "octahedron";
  scale?: number;
  color?: string;
  speed?: number;
  wireframe?: boolean;
  distort?: boolean;
  glass?: boolean;
}

export default function FloatingShape({
  position,
  geometry,
  scale = 1,
  color = "#ff4e2d",
  speed = 1,
  wireframe = false,
  distort = false,
  glass = false,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + offset.current;
    meshRef.current.rotation.x = t * 0.18;
    meshRef.current.rotation.y = t * 0.24;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.35;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.4) * 0.2 + state.pointer.x * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[1, 0.35, 32, 100]} />}
      {geometry === "sphere" && <sphereGeometry args={[1, 64, 64]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}

      {glass ? (
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0}
          transparent
          opacity={0.35}
          transmission={0.4}
          clearcoat={1}
        />
      ) : distort ? (
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.3}
          distort={0.35}
          speed={1.4}
          wireframe={wireframe}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.4}
          wireframe={wireframe}
        />
      )}
    </mesh>
  );
}
