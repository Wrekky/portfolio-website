uniform sampler2D testImage;
uniform vec2 mousePos;

varying vec2 vUv;
void main() {
  vec4 colors = texture2D(testImage, vUv);
  //vec2 mousePosByRes = vec2(mousePos.x * iResolution.x, iResolution.y - (mousePos.y * iResolution.y));
  if(vUv.x > mousePos.x) {
    gl_FragColor = colors * 0.9;
    //TODO: Apply some effect down the middle
  } else {
    gl_FragColor = colors * 1.2;
  }
  //TODO: Apply a filter afterwards?
}