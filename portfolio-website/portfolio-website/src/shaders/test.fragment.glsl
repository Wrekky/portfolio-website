varying vec3 v_normal;
void main() {
    vec3 lightPos = vec3(2.0,2.0,0.0);

    float diffuseAmount = dot(lightPos, v_normal);

    gl_FragColor = vec4(v_normal,1.0);
}