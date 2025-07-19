import { Canvas, useFrame } from "@react-three/fiber";
import vertexShader from "../shaders/test.vertex.glsl?raw"
import fragmentShader from "../shaders/test.fragment.glsl?raw"
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Vector2 } from "three";
import {useRef, useState} from 'react'

//TODO: Mouse input recognized in shader. Not sure how to do this yet, Can overlay a canvas with zero opacity but then any buttons become unclickable.
//I want some form of lighting around the mouse -- potentially going to have the mouse be the only fully visible portion of the screen.
function FullscreenPlane() {

  //Plane info, making the plane the size of the screen.
  const {gl, camera, size } = useThree()
  const [width, height] = useMemo(() => {
    const fov = (camera.fov * Math.PI)
    const distance = camera.position.z
    const height = 2 * Math.tan(fov / 2) * distance
    const width = height * (size.width / size.height)
    return [width, height]
  }, [camera, size])

  //Shader toy standins
  const iTime = useRef({value: 0.0})
  const iResolution = useRef({value: new Vector2(size.width, size.height)}) 
  
  const mousePos = useRef({value: new Vector2(0.0, 0.0)})

  useEffect(()=>{
    const handleMouseMovement = (e) => {
      mousePos.current.value.set(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    }
    
    //TODO: add something for when mouse is out of the canvas area? Add scroll perfecntage in pixels to window.innerHeight before dividing?
    
    window.addEventListener('mousemove', handleMouseMovement)
    return () => window.removeEventListener('mousemove', handleMouseMovement)
  }, [])

  useFrame((state) => {
    iTime.current.value = (state.clock.getElapsedTime())
    iResolution.current.value.set(gl.domElement.width,gl.domElement.height)
  })

  return (
    <mesh>
      <planeGeometry args={[width, height, 16, 16]} />
      <shaderMaterial 
      uniforms={{iResolution: iResolution.current, iTime: iTime.current, mousePos: mousePos.current}}
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
        pointerEvents: 'none'
      }}
    >
      <FullscreenPlane />
    </Canvas>
  )
}