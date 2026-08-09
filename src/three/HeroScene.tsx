import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleField from "./ParticleField";
import FloatingShape from "./FloatingShape";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={80} color="#ff4e2d" />
        <pointLight position={[-5, -3, -2]} intensity={40} color="#8bff5c" />

        <ParticleField count={500} radius={7} />

        <FloatingShape
          position={[2.4, 0.6, -1]}
          geometry="icosahedron"
          scale={1.1}
          color="#ff4e2d"
          distort
          speed={0.8}
        />
        <FloatingShape
          position={[-2.6, -0.8, -2]}
          geometry="torus"
          scale={0.8}
          color="#f5f3ee"
          wireframe
          speed={1.1}
        />
        <FloatingShape
          position={[1.2, -1.6, -3]}
          geometry="octahedron"
          scale={0.55}
          color="#8bff5c"
          speed={1.4}
        />
        <FloatingShape
          position={[-1.6, 1.5, -1.5]}
          geometry="sphere"
          scale={0.5}
          color="#ff9d5c"
          glass
          speed={0.6}
        />
      </Suspense>
    </Canvas>
  );
}
