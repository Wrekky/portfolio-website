varying vec2 vUv;
void main() {
    vUv = uv;
    vec4 t_position = vec4(position, 1.0);
    t_position.xy = position.xy * 2.0 - 1.0;
    gl_Position = t_position;
}