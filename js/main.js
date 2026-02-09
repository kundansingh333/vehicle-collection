// Wait for page to load completely
document.addEventListener("DOMContentLoaded", function () {
  // Call all functions
  initBackToTop();
  initSmoothScroll();
  initNavbar();
  initCounters();

  console.log("Website loaded successfully!");
});

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
  // Get the button
  var backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    // Show button when user scrolls down 300px
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling
      });
    });
  }
}

// ===== SMOOTH SCROLLING FOR LINKS =====
function initSmoothScroll() {
  // Get all links that start with #
  var links = document.querySelectorAll('a[href^="#"]');

  // Add click event to each link
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Get the target element
      var targetId = this.getAttribute("href");

      // Skip if href is just #
      if (targetId === "#") return;

      var targetElement = document.querySelector(targetId);

      // If target exists, scroll to it
      if (targetElement) {
        e.preventDefault(); // Stop normal link behavior

        // Calculate position
        var offsetTop = targetElement.offsetTop - 70;

        // Smooth scroll to element
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== NAVBAR BACKGROUND CHANGE ON SCROLL =====
function initNavbar() {
  var navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      // If scrolled more than 50px
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(33, 37, 41, 0.95)";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
      } else {
        navbar.style.background = "#212529";
        navbar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      }
    });
  }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  // Get all counter elements
  var counters = document.querySelectorAll(".counter");

  // Check if counters exist
  if (counters.length > 0) {
    // Track if animation has run
    var hasRun = false;

    // Function to animate counter
    function animateCounter(element, target) {
      var current = 0;
      var increment = target / 50;

      // Update counter every 30ms
      var timer = setInterval(function () {
        current += increment;

        // Stop at target
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 30);
    }

    // Check if counters are visible on scroll
    window.addEventListener("scroll", function () {
      if (hasRun) return; // Only run once

      var statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        var rect = statsSection.getBoundingClientRect();
        var isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        // If stats section is visible
        if (isVisible) {
          hasRun = true;

          // Animate each counter
          counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute("data-target"));
            animateCounter(counter, target);
          });
        }
      }
    });
  }
}

// ===== FILTER GALLERY (for gallery page) =====
function filterGallery(category) {
  // Get all gallery items
  var items = document.querySelectorAll(".gallery-item");

  // Show/hide based on category
  items.forEach(function (item) {
    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// ===== FORM VALIDATION (for contact page) =====
function validateForm(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form fields
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Simple validation
  if (name === "") {
    alert("Please enter your name");
    return false;
  }

  if (email === "") {
    alert("Please enter your email");
    return false;
  }

  // Simple email validation
  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email");
    return false;
  }

  if (message === "") {
    alert("Please enter a message");
    return false;
  }

  // If all validation passes
  alert("Thank you! Your message has been sent.");

  // Reset form
  document.getElementById("contactForm").reset();

  return true;
}

// ===== MOBILE MENU AUTO CLOSE =====
// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  var navbar = document.querySelector(".navbar-collapse");
  var toggler = document.querySelector(".navbar-toggler");

  // Check if menu is open
  if (navbar && navbar.classList.contains("show")) {
    // If click is outside navbar
    if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
      toggler.click(); // Close menu
    }
  }
});

// ===== SIMPLE IMAGE MODAL =====
function openImageModal(imageSrc) {
  // Create modal elements
  var modal = document.createElement("div");
  modal.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer;";

  var img = document.createElement("img");
  img.src = imageSrc;
  img.style.cssText = "max-width:90%;max-height:90%;";

  modal.appendChild(img);
  document.body.appendChild(modal);

  // Close modal on click
  modal.addEventListener("click", function () {
    document.body.removeChild(modal);
  });
}

// ===== CONSOLE MESSAGE =====
console.log(
  "%c Vehicle Collection Website ",
  "background: #0d6efd; color: white; font-size: 20px; padding: 10px;",
);
console.log(
  "%c Built with HTML, CSS, JavaScript & Bootstrap ",
  "color: #666; font-size: 12px;",
);
