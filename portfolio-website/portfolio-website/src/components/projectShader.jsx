import { Canvas, useLoader } from "@react-three/fiber";
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import vertexShader from "../shaders/generic.vertex.glsl?raw"
import fragmentShader from "../shaders/project.fragment.glsl?raw"
import { TextureLoader } from "three";
function ShaderEffect() {
  const colorMap = useLoader(TextureLoader, '../src/resources/images/tempImage.png')
  //Plane info, making the plane the size of the screen.
  const {gl, camera, size } = useThree()
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