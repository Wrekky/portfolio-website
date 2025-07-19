uniform float iTime;
uniform vec2 iResolution;
uniform vec2 mousePos;

varying vec2 vUv;
void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec3 col = 0.5 + 0.5*cos(iTime + vUv.xyx + vec3(0,2,4));
    //Mouse pos is passed as 0-1 for both x and y, need to translate these to resolution based.
    vec2 mousePosByRes = vec2(mousePos.x * iResolution.x, iResolution.y - (mousePos.y * iResolution.y));
    //Calculating distance for lighting effect.
    float coordDistance = sqrt((pow(fragCoord.x - mousePosByRes.x, 2.0)) + (pow(fragCoord.y - mousePosByRes.y,2.0)));
    float coordDistanceNormalized = 1.0-(coordDistance / (iResolution.x + iResolution.y));
    col = col * coordDistanceNormalized;
    //Darkening everything a bit.
    col = col * 0.8;
    gl_FragColor = vec4(col,1);
} 