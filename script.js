$(document).ready(function () {
  $(".squares-container").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    infinite: false,
    speed: 300,
  });

  $(".left-arrow").on("click", function () {
    $(".squares-container").slick("slickPrev");
  });

  $(".right-arrow").on("click", function () {
    $(".squares-container").slick("slickNext");
  });
});
let sketch = function (p) {
  let slider;
  let isMoon = false;
  let asteroid;

  let stars = [];
  let clouds = [];

  p.setup = function () {
    let canvas = p.createCanvas(600, 600);
    canvas.parent("sketch-holder");

    slider = p.createSlider(0, 255, 50);
    slider.style("width", "580px");

    asteroid = {
      x: -50,
      y: p.random(p.height),
      speed: p.random(1, 3),
      size: p.random(10, 30),
    };

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(1, 3),
      });
    }
  };

  p.draw = function () {
    if (isMoon) {
      p.background(0);
      p.fill(200);
      p.ellipse(p.width / 2, p.height / 2, 200);

      for (let i = 0; i < stars.length; i++) {
        p.fill(255);
        p.noStroke();
        p.ellipse(stars[i].x, stars[i].y, stars[i].size);
      }

      asteroid.x += asteroid.speed;
      p.noStroke();
      p.fill(200);
      p.ellipse(asteroid.x, asteroid.y, asteroid.size);

      clouds = [];
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(30);
    } else {
      p.background(0, 128, 255);
      p.noStroke();
      let sunSize = p.map(slider.value(), 0, 255, 50, 200);
      let glowSize = sunSize / 5;
      let alpha = p.map(slider.value(), 0, 255, 50, 150);
      let maxAlpha = 150;

      for (let i = glowSize; i >= 0; i--) {
        let r = sunSize + i;
        let a = p.map(i, 0, glowSize, maxAlpha, alpha);
        p.fill(255, 255, 0, a);
        p.ellipse(p.width / 2, p.height / 2, r, r);
      }

      p.fill(255, 255, 0);
      p.ellipse(p.width / 2, p.height / 2, sunSize, sunSize);

      for (let i = 0; i < clouds.length; i++) {
        p.noStroke();
        p.fill(255, 255, 255, 200);
        p.ellipse(clouds[i].x, clouds[i].y, clouds[i].size, clouds[i].size);
        clouds[i].x += asteroid.speed;

        if (clouds[i].x > p.width + clouds[i].size / 2) {
          clouds[i].x = -clouds[i].size / 2;
          clouds[i].y = p.random(p.height / 2);
        }
      }

      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(30);
    }

    if (isMoon) {
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(30);
      p.text("Moon", p.width / 2, p.height / 2 + 170);
    } else {
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(30);
      p.text("Sun", p.width / 2, p.height / 2 + 170);
    }
  };

  p.mouseClicked = function () {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 100) {
      isMoon = !isMoon;
    }

    // Add a new cloud to the array when the sun is showing
    if (!isMoon) {
      clouds.push({
        x: p.random(p.width),
        y: p.random(p.height / 2),
        size: p.random(20, 80),
        speed: p.random(1, 3),
      });
    }
  };
};

new p5(sketch);
