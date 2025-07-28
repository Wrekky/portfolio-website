uniform sampler2D testImage;
uniform vec2 mousePos;
//uniform float linePos;
varying vec2 vUv;
void main() {
  //TODO: Add a distorted dither behind the moving line.
  //TODO: Slant the line based on mouse speed & position. Make the line chase the mouse not be set to it.
  //size of the strip splitting the image
  const float bandSize = 0.01;
  //attempting to apply blur: 
  //area around the pixel to sample.
  const float kernalSize = 8.0;
  const int halfSize = 4;

  const float coefficient = 1.0 / (kernalSize * kernalSize);

  //offsets the image, higher numbers here can show repeated images, maybe worth doing something with.
  //can also swap to horizontal or vertical blur by making only one of these smaller.
  const vec2 dx = vec2(0.002, 0.0);
  const vec2 dy = vec2(0.0, 0.002);

  vec4 pixel_color = vec4(0.0, 0.0, 0.0, 0.0);

  if(vUv.x > mousePos.x - bandSize) {
    for(int x = -halfSize; x <= halfSize; x++) {
      for(int y = -halfSize; y <= halfSize; y++) {
        pixel_color += coefficient * texture2D(testImage, vUv + (float(x) * dx) + (float(y) * dy));
      }
    }
  } else {
    pixel_color = texture2D(testImage, vUv);
  }
  //angles the line, multiply by -1 to change angle direction, will be based on
  //speed in the future.
  float angleMulti = 0.005;
  float angleModifier = (angleMulti * 2.0 * vUv.y);

  if(mousePos.x - (angleMulti * -1.0) > (vUv.x - bandSize + angleModifier) && mousePos.x - (angleMulti * -1.0) < (vUv.x + bandSize + angleModifier)) {
    pixel_color *= vec4(0.18, 0.91, 0.18, 0.12);
  }
  gl_FragColor = pixel_color;
}