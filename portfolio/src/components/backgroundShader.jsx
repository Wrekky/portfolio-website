import vertexShader from "../shaders/generic.vertex.glsl?raw"
import fragmentShader from "../shaders/background.fragment.glsl?raw"
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from 'react'
import { Vector2 } from "three";

function ShaderEffect() {
  //Plane info, making the plane the size of the screen.
  const { gl } = useThree()

  //Shader toy standins
  const iTime = useRef({value: 0.0})
  const iResolution = useRef({value: new Vector2(0.0, 0.0)}) 

  const mousePos = useRef({value: new Vector2(0.0, 0.0)})

  useEffect(()=>{
    const handleMouseMovement = (e) => {
      mousePos.current.value.set(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    }
    //TODO: add something for when mouse scrolled. Effect currently breaks when scrolling due to grabbing mouse position from css rather than canvas.
    
    window.addEventListener('mousemove', handleMouseMovement)
    return () => window.removeEventListener('mousemove', handleMouseMovement)
  }, [])

  useFrame((state) => {
    iTime.current.value = (state.clock.getElapsedTime())
    iResolution.current.value.set(gl.domElement.width,gl.domElement.height)
  })

  return (
    <mesh>
      <shaderMaterial 
      uniforms={{iResolution: iResolution.current, iTime: iTime.current, mousePos: mousePos.current}}
      vertexShader={vertexShader} 
      fragmentShader={fragmentShader} />
      <planeGeometry args={[window.innerWidth, window.innerHeight, 16, 16]} />
    </mesh>
  )
}

export default function BackgroundCanvas() {
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
        pointerEvents: 'none'
      }}
    >
      <ShaderEffect />
    </Canvas>
  )
}