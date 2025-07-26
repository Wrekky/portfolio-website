import { Canvas, useLoader } from "@react-three/fiber";
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import vertexShader from "../shaders/generic.vertex.glsl?raw"
import fragmentShader from "../shaders/project.fragment.glsl?raw"
import { TextureLoader } from "three";
import { Vector2 } from "three";
import {useRef} from 'react'
function ShaderEffect() {
  const colorMap = useLoader(TextureLoader, '../src/resources/images/tempImage.png')
  const meshRef = useRef();
  const mousePos = useRef({value: new Vector2(0.0, 0.0)})
  const width = 16;
  const height = 9;
  return (
    <mesh
    ref={meshRef}
    onPointerMove={
      (event) =>{
        const worldPoint = event.point.clone();
        //change to uv coordinates (0,1)
        mousePos.current.value.set((worldPoint.x / width) + 0.5, (worldPoint.y / height) + 0.5)
        //console.log(mousePos.current.value.x, "x", mousePos.current.value.y, "y");
      }
    }
    >
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={{ testImage: { value: colorMap }, mousePos: mousePos.current }}
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