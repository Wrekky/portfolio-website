uniform sampler2D testImage;
uniform vec2 mousePos;

varying vec2 vUv;
void main() {
  vec4 colors = texture2D(testImage, vUv);
  if(mousePos.x > 0.5) {
    gl_FragColor = colors * 0.8;
  } else {
    gl_FragColor = colors * 1.2;
  }
}