import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Box = () => {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.002;
    ref.current.rotation.y += 0.002;
  });

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
};

export default function BackgroundShader({ }) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <Box />
    </Canvas>
  );
}