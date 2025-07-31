uniform sampler2D testImage;
uniform vec2 mousePos;
uniform vec2 barPos;
varying vec2 vUv;
void main() {
  //size of the strip splitting the image
  const float bandSize = 0.005;
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


  //angles the line, multiply by -1 to change angle direction.
  //TODO: Add additional blur near bar based on bar speed.
  float speedMult = abs(mousePos.x - barPos.x) * 10.0;
  float angleMulti = 0.020 * -1.0;
  if((mousePos.x - barPos.x) < 0.0) {
    angleMulti = angleMulti * -1.0;
  }

  if (speedMult > 0.1) {
    angleMulti = angleMulti * speedMult;
  }
  else {
    angleMulti = 0.0;
  }
  float angleModifier = (angleMulti * 2.0 * vUv.y);

  //drawing blur effect, needs to understand bar angle and size.
  if(barPos.x - (angleMulti * -1.0) < (vUv.x + bandSize + angleModifier)) {
    for(int x = -halfSize; x <= halfSize; x++) {
      for(int y = -halfSize; y <= halfSize; y++) {
        pixel_color += coefficient * texture2D(testImage, vUv + (float(x) * dx) + (float(y) * dy));
      }
    }
  } else {
    pixel_color = texture2D(testImage, vUv);
  }
  //drawing bar
  if(barPos.x - (angleMulti * -1.0) > (vUv.x - bandSize + angleModifier) && barPos.x - (angleMulti * -1.0) < (vUv.x + bandSize + angleModifier)) {
    //kinda forcing opacity, cant figure out another way to do this without layering shaders on top of each other.
    float colorMult = 0.3;
    pixel_color *= vec4(colorMult, colorMult, colorMult, 1.0);
  }
  gl_FragColor = pixel_color;
}