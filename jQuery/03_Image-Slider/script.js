$(document).ready(function () {
  const slides = $(".slide");
  const dots = $(".dot");
  let currentSlide = 0;
  let autoPlayInterval;
  const slideInterval = 3000; // 3 seconds

  // Preload all images
  function preloadImages() {
    $(".slide img").each(function () {
      const img = new Image();
      img.src = $(this).attr("src");
    });
  }

  // Initialize the slider
  function initSlider() {
    preloadImages();

    // Hide all slides except first
    slides.not(".active").hide();

    // Start auto-play
    startAutoPlay();

    // Set up event listeners
    $("#prevBtn").click(prevSlide);
    $("#nextBtn").click(nextSlide);

    // Dot navigation
    dots.click(function () {
      goToSlide($(this).index());
    });

    // Auto-play toggle
    $("#autoPlayToggle").change(function () {
      if ($(this).is(":checked")) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    });
  }

  // Show a specific slide
  function showSlide(index) {
    // Wrap around if at ends
    if (index >= slides.length) {
      index = 0;
    } else if (index < 0) {
      index = slides.length - 1;
    }

    // Fade out current slide
    slides.eq(currentSlide).fadeOut(500, function () {
      $(this).removeClass("active");
    });

    // Fade in new slide
    slides.eq(index).fadeIn(500).addClass("active");

    // Update dots
    dots.removeClass("active");
    dots.eq(index).addClass("active");

    currentSlide = index;
  }

  // Go to next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
    // Reset auto-play timer when manually navigating
    resetAutoPlay();
  }

  // Go to previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
    // Reset auto-play timer when manually navigating
    resetAutoPlay();
  }

  // Go to specific slide
  function goToSlide(index) {
    showSlide(index);
    // Reset auto-play timer when manually navigating
    resetAutoPlay();
  }

  // Auto-play functions
  function startAutoPlay() {
    if (!autoPlayInterval) {
      autoPlayInterval = setInterval(nextSlide, slideInterval);
    }
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }

  function resetAutoPlay() {
    if ($("#autoPlayToggle").is(":checked")) {
      stopAutoPlay();
      startAutoPlay();
    }
  }

  // Initialize the slider
  initSlider();
});
