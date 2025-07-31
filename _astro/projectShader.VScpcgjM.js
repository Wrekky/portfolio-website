import{j as a,C as d,b as v,V as u,a as x,v as g,T as h}from"./react-three-fiber.esm.VBhtxWbG.js";import{r as o}from"./index.6otl1p8d.js";const m=`uniform sampler2D testImage;\r
uniform vec2 mousePos;\r
uniform vec2 barPos;\r
varying vec2 vUv;\r
void main() {\r
  //size of the strip splitting the image\r
  const float bandSize = 0.005;\r
  //attempting to apply blur: \r
  //area around the pixel to sample.\r
  const float kernalSize = 8.0;\r
  const int halfSize = 4;\r
\r
  const float coefficient = 1.0 / (kernalSize * kernalSize);\r
\r
  //offsets the image, higher numbers here can show repeated images, maybe worth doing something with.\r
  //can also swap to horizontal or vertical blur by making only one of these smaller.\r
  const vec2 dx = vec2(0.002, 0.0);\r
  const vec2 dy = vec2(0.0, 0.002);\r
\r
  vec4 pixel_color = vec4(0.0, 0.0, 0.0, 0.0);\r
\r
\r
  //angles the line, multiply by -1 to change angle direction.\r
  //TODO: Add additional blur near bar based on bar speed.\r
  float speedMult = abs(mousePos.x - barPos.x) * 10.0;\r
  float angleMulti = 0.020 * -1.0;\r
  if((mousePos.x - barPos.x) < 0.0) {\r
    angleMulti = angleMulti * -1.0;\r
  }\r
\r
  if (speedMult > 0.1) {\r
    angleMulti = angleMulti * speedMult;\r
  }\r
  else {\r
    angleMulti = 0.0;\r
  }\r
  float angleModifier = (angleMulti * 2.0 * vUv.y);\r
\r
  //drawing blur effect, needs to understand bar angle and size.\r
  if(barPos.x - (angleMulti * -1.0) < (vUv.x + bandSize + angleModifier)) {\r
    for(int x = -halfSize; x <= halfSize; x++) {\r
      for(int y = -halfSize; y <= halfSize; y++) {\r
        pixel_color += coefficient * texture2D(testImage, vUv + (float(x) * dx) + (float(y) * dy));\r
      }\r
    }\r
  } else {\r
    pixel_color = texture2D(testImage, vUv);\r
  }\r
  //drawing bar\r
  if(barPos.x - (angleMulti * -1.0) > (vUv.x - bandSize + angleModifier) && barPos.x - (angleMulti * -1.0) < (vUv.x + bandSize + angleModifier)) {\r
    //kinda forcing opacity, cant figure out another way to do this without layering shaders on top of each other.\r
    float colorMult = 0.3;\r
    pixel_color *= vec4(colorMult, colorMult, colorMult, 1.0);\r
  }\r
  gl_FragColor = pixel_color;\r
}`;function p({imagePath:t}){const c=v(h,t),f=o.useRef(),n=o.useRef({value:new u(0,0)}),e=o.useRef({value:new u(.5,0)}),l=16,i=9;return x(s=>{var r=Math.abs(n.current.value.x-e.current.value.x)*6;r>.01&&(n.current.value.x>e.current.value.x?e.current.value.set(e.current.value.x+.01*r,0):n.current.value.x<e.current.value.x&&e.current.value.set(e.current.value.x-.01*r,0))}),a.jsxs("mesh",{ref:f,onPointerMove:s=>{const r=s.point.clone();n.current.value.set(r.x/l+.5,r.y/i+.5)},children:[a.jsx("planeGeometry",{args:[l,i]}),a.jsx("shaderMaterial",{uniforms:{testImage:{value:c},mousePos:n.current,barPos:e.current},vertexShader:g,fragmentShader:m})]})}function y({imagePath:t}){return a.jsx(d,{camera:{position:[0,0,5],fov:75},children:a.jsx(p,{imagePath:t})})}export{y as default};
