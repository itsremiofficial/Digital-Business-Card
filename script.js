window.onload = () => {
  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fade").forEach((fadeInUp, index) => {
    gsap.fromTo(
      fadeInUp,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: fadeInUp,
          start: "top 90%",
          end: "bottom 100%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};
