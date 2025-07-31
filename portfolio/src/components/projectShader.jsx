import vertexShader from "../shaders/generic.vertex.glsl?raw"
import fragmentShader from "../shaders/project.fragment.glsl?raw"
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader, Vector2 } from "three";
import {useRef} from 'react'
function ShaderEffect({imagePath}) {
  const colorMap = useLoader(TextureLoader, imagePath)
  const meshRef = useRef();
  const mousePos = useRef({value: new Vector2(0.0, 0.0)})
  const barPos = useRef({value: new Vector2(0.5, 0.0)})
  const width = 16;
  const height = 9;
  //moving view bar
  useFrame((state) => {
    var distance = Math.abs(mousePos.current.value.x - barPos.current.value.x) * 6
    if (distance > 0.01) {
      if (mousePos.current.value.x > barPos.current.value.x) {
        barPos.current.value.set(barPos.current.value.x + 0.01 * distance, 0.0)
      }
      else if (mousePos.current.value.x < barPos.current.value.x) {
        barPos.current.value.set(barPos.current.value.x - 0.01 * distance, 0.0)
      }
    }
  })
  return (
    <mesh
    ref={meshRef}
    onPointerMove={
      (event) =>{
        const worldPoint = event.point.clone();
        mousePos.current.value.set((worldPoint.x / width) + 0.5, (worldPoint.y / height) + 0.5)
      }
    }
    >
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={{ testImage: { value: colorMap }, mousePos: mousePos.current, barPos: barPos.current }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
    </mesh>
  )
}

export default function ProjectShader({imagePath}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ShaderEffect imagePath={imagePath} />
    </Canvas>
  )
}