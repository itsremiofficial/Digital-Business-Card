function createContact() {
  // Get values from the form
  const name = "Shivani Mehta (Digital Marketer)";
  const phone = "+926849876914";
  const email = "growdigitalwithshivani@gmail.com";
  const website = "www.growdigitalwithshivani.com";

  // Generate a vCard string
  const vCard = `
    BEGIN:VCARD
    VERSION:3.0
    N:${name}
    FN:${name}
    TEL;TYPE=CELL:${phone}
    EMAIL:${email}
    URL:${website}
    END:VCARD
  `;

  // Check if device is mobile (using a basic heuristic)
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // Open default contacts app (limited cross-browser support)
    window.location.href = `tel:${phone}?action=add`; // Android example
  } else {
    // Create a Blob for the vCard file
    const blob = new Blob([vCard], { type: "text/vcard" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, "_")}.vcf`;

    // Simulate a click to trigger download
    link.click();
  }
}

window.onload = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform
      ? "transform"
      : "fixed",
  });

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
