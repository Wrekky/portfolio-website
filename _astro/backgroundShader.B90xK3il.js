import{j as e,C as c,u as l,V as u,a as d,v as m}from"./react-three-fiber.esm.VBhtxWbG.js";import{r as n}from"./index.6otl1p8d.js";const v=`uniform float iTime;\r
uniform vec2 iResolution;\r
uniform vec2 mousePos;\r
\r
varying vec2 vUv;\r
void main() {\r
    vec2 fragCoord = gl_FragCoord.xy;\r
    vec3 col = 0.5 + 0.5*cos(iTime + vUv.xyx + vec3(0,2,4));\r
    //Mouse pos is passed as 0-1 for both x and y, need to translate these to resolution based.\r
    vec2 mousePosByRes = vec2(mousePos.x * iResolution.x, iResolution.y - (mousePos.y * iResolution.y));\r
    //Calculating distance for lighting effect.\r
    float coordDistance = sqrt((pow(fragCoord.x - mousePosByRes.x, 2.0)) + (pow(fragCoord.y - mousePosByRes.y,2.0)));\r
    float coordDistanceNormalized = 1.0-(coordDistance / (iResolution.x + iResolution.y));\r
    col = col * coordDistanceNormalized;\r
    //Darkening everything a bit.\r
    col = col * 0.8;\r
    gl_FragColor = vec4(col,1);\r
} `;function f(){const{gl:r}=l(),s=n.useRef({value:0}),t=n.useRef({value:new u(0,0)}),i=n.useRef({value:new u(0,0)});return n.useEffect(()=>{const o=a=>{i.current.value.set(a.clientX/window.innerWidth,a.clientY/window.innerHeight)};return window.addEventListener("mousemove",o),()=>window.removeEventListener("mousemove",o)},[]),d(o=>{s.current.value=o.clock.getElapsedTime(),t.current.value.set(r.domElement.width,r.domElement.height)}),e.jsxs("mesh",{children:[e.jsx("shaderMaterial",{uniforms:{iResolution:t.current,iTime:s.current,mousePos:i.current},vertexShader:m,fragmentShader:v}),e.jsx("planeGeometry",{args:[window.innerWidth,window.innerHeight,16,16]})]})}function x(){return e.jsx(c,{camera:{position:[0,0,5],fov:75},style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,pointerEvents:"none"},children:e.jsx(f,{})})}export{x as default};
