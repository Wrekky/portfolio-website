varying vec2 pos;
uniform vec2 uMouse;
void main() {
    gl_FragColor = vec4(uMouse.x, 0.0, 1.0, 1.0);
}