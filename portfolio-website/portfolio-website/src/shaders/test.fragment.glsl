uniform float iTime;
uniform vec2 iResolution;
uniform vec2 mousePos;
void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord/iResolution;
    
    vec3 col = 0.5 + 0.5*cos(iTime + uv.xyx + vec3(0,2,4));
    gl_FragColor = vec4(col,1);
} 