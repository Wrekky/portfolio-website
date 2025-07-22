import { Canvas, useLoader } from "@react-three/fiber";
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import vertexShader from "../shaders/generic.vertex.glsl?raw"
import fragmentShader from "../shaders/project.fragment.glsl?raw"
import { TextureLoader } from "three";
function ShaderEffect() {
  const colorMap = useLoader(TextureLoader, '../src/resources/images/tempImage.png')
  return (
    <mesh>
      <planeGeometry args={[16, 9]} />
      <shaderMaterial 
      uniforms={{testImage: {value: colorMap}}}
      vertexShader={vertexShader} 
      fragmentShader={fragmentShader} />
    </mesh>
  )
}

export default function ProjectShader() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ShaderEffect />
    </Canvas>
  )
}