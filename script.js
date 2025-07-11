const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.navbar ul');
  const menuIcon = document.querySelector('#menu-icon');

  // Toggle mobile menu
  function toggleMenu() {
    menu.classList.toggle('active');
    menuIcon.innerHTML = menu.classList.contains('active') ? '&#10005;' : '&#9776;'; // ✕ or ☰
  }

  // Toggle glass background on scroll
  function updateNavbarGlass() {
    if (window.scrollY > 30) {
      navbar.classList.add('glass');
    } else {
      navbar.classList.remove('glass');
    }
  }

  window.addEventListener('scroll', updateNavbarGlass);
  window.addEventListener('load', updateNavbarGlass); // Run on page load too

  // Smooth scroll for navbar links
  document.querySelectorAll('.navbar ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile menu on click
      menu.classList.remove('active');
      menuIcon.innerHTML = '&#9776;';
    });
  });
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.1
  });

  const elementsToAnimate = document.querySelectorAll('.section-title, .skill-description, .title, .about-details, .title2, .card, .card1, .ct, .container ');
  elementsToAnimate.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // Animate circular progress bar
        if (entry.target.classList.contains("skills-wrapper")) {
          const skills = entry.target.querySelectorAll('.skill');
          skills.forEach(skill => {
            const circle = skill.querySelector('.progress-ring__circle');
            const text = skill.querySelector('.circle-text');
            const percentage = parseInt(skill.dataset.value);
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;

            let current = 0;
            const interval = setInterval(() => {
              if (current >= percentage) {
                clearInterval(interval);
              } else {
                current++;
                const offset = circumference - (current / 100) * circumference;
                circle.style.strokeDashoffset = offset;
                text.textContent = `${current}%`;
              }
            }, 20);
          });
        }
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.3
  });

  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => observer.observe(el));
});
  document.addEventListener("DOMContentLoaded", () => {
    emailjs.init('bY-dvoqF5GZYi2fkO'); // Replace with your EmailJS Public Key

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const templateParams = {
        name: form.name.value,
        email: form.email.value,
        comment: form.comment.value
      };

      document.querySelector(".send-btn").textContent = "Sending...";

      emailjs.send("service_2elyjhl", "template_58gapqe", templateParams)
        .then(() => {
          form.reset();
          document.getElementById("notification").style.display = "flex";
        })
        .catch((error) => {
          alert("Error sending message: " + (error.text || 'Please check console.'));
          console.error("EmailJS Error:", error);
        })
        .finally(() => {
          document.querySelector(".send-btn").textContent = "Send";
        });
    });
   });
