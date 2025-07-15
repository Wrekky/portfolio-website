import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei"
import vertexShader from "../shaders/test.vertex.glsl?raw"
import fragmentShader from "../shaders/test.fragment.glsl?raw"
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'

function FullscreenPlane() {
  const { camera, size } = useThree()

  const [width, height] = useMemo(() => {
    const fov = (camera.fov * Math.PI)
    const distance = camera.position.z
    const height = 2 * Math.tan(fov / 2) * distance
    const width = height * (size.width / size.height)
    return [width, height]
  }, [camera, size])

  return (
    <mesh>
      <planeGeometry args={[width, height, 16, 16]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  )
}

export default function ThreeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <FullscreenPlane />
    </Canvas>
  )
}