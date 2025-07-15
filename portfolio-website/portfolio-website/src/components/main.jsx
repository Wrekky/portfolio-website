import { Canvas, useFrame } from "@react-three/fiber";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import * as THREE from 'three'
const Scene = () => {
  return <mesh>
    <PlaneGeometry/>
    <ShaderMaterial/>
  </mesh>
}

export default function BackgroundShader({ }) {
  const [vertex, setVertex] = useState('');
  const [fragment, setFragment] = useState('');

  useEffect(()=> {
    axios.get('src/shaders/vertexShader.glsl').then(res => setVertex(res.data));
    axios.get('src/shaders/testShader.glsl').then(res => setFragment(res.data));
  },[]) 

  if (vertex == '' || fragment == '') return null;

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