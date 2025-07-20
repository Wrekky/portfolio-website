uniform sampler2D testImage;
varying vec2 vUv;
void main() {
    gl_FragColor = texture2D(testImage, vUv);//vec4(0.6, 0.49, 0.86, 0.24);
}