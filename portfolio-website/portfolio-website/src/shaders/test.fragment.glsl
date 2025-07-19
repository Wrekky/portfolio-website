uniform float iTime;
uniform vec2 iResolution;
uniform vec2 mousePos;

varying vec2 vUv;
void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    
    vec3 col = 0.5 + 0.5*cos(iTime + vUv.xyx + vec3(0,2,4));

    gl_FragColor = vec4(col,1);
    //drawing over color on mouse coords.
    if (fragCoord.x > iResolution.x / 2.0) {
        gl_FragColor = vec4(0,1,2,1);
    }
} 