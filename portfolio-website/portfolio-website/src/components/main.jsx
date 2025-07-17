import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei"
import vertexShader from "../shaders/test.vertex.glsl?raw"
import fragmentShader from "../shaders/test.fragment.glsl?raw"
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { Vector2 } from "three";
import {useRef, useState} from 'react'

//TODO: Mouse input recognized in shader, should be the light source.
function FullscreenPlane() {
  const { camera, size } = useThree()
  const [width, height] = useMemo(() => {
    const fov = (camera.fov * Math.PI)
    const distance = camera.position.z
    const height = 2 * Math.tan(fov / 2) * distance
    const width = height * (size.width / size.height)
    return [width, height]
  }, [camera, size])
  const materialRef = useRef()

  const uMouse = useRef(new Vector2(0.5,0.5))

  useFrame(() => {
    if (materialRef.current?.uniforms?.uMouse) {
      materialRef.current.uniforms.uMouse.value.copy(uMouse.current)
    }
  })

  const onPointerMove = (event) => {
    const x = event.clientX / size.width
    const y = 1 - event.clientY / size.height
    uMouse.current.set(x,y)
  }
  return (
    <mesh onPointerMove={onPointerMove}>
      <planeGeometry args={[width, height, 16, 16]} />
      <shaderMaterial 
      ref={materialRef}
      uniforms={{uMouse: uMouse.current}}
      vertexShader={vertexShader} 
      fragmentShader={fragmentShader} />
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