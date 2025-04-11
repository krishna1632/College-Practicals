$(document).ready(function () {
  // Get references to elements
  const $box = $("#box");
  const $speed = $("#speed");
  const $effect = $("#effect");

  // Apply animation based on selected effect and speed
  function animateBox(animationType) {
    const speed = $speed.val();
    const effect = $effect.val();

    switch (effect) {
      case "slide":
        if (animationType === "show") $box.slideDown(speed);
        else if (animationType === "hide") $box.slideUp(speed);
        else $box.slideToggle(speed);
        break;
      case "fade":
        if (animationType === "show") $box.fadeIn(speed);
        else if (animationType === "hide") $box.fadeOut(speed);
        else $box.fadeToggle(speed);
        break;
      case "toggle":
        $box.toggleClass("animated", speed, function () {
          if (animationType === "show") $box.show();
          else if (animationType === "hide") $box.hide();
        });
        break;
    }
  }

  // Button click handlers
  $("#showBtn").click(function () {
    animateBox("show");
  });

  $("#hideBtn").click(function () {
    animateBox("hide");
  });

  $("#toggleBtn").click(function () {
    animateBox("toggle");
  });

  $("#fadeInBtn").click(function () {
    $box.fadeIn($speed.val());
  });

  $("#fadeOutBtn").click(function () {
    $box.fadeOut($speed.val());
  });

  // Easter egg - rainbow colors on box click
  $box.click(function () {
    const colors = [
      "#4361ee",
      "#3a0ca3",
      "#7209b7",
      "#f72585",
      "#b5179e",
      "#4cc9f0",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $(this).css(
      "background",
      `linear-gradient(135deg, ${randomColor} 0%, ${lightenColor(
        randomColor,
        20
      )} 100%)`
    );
  });

  // Helper function to lighten colors
  function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }
});
