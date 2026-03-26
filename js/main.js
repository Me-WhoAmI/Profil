// Main JavaScript for smooth scrolling and progress bars
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
    
    // Funktion zur Ermittlung der aktuellen Header-Höhe
    function getHeaderHeight() {
        return header ? header.offsetHeight : 70;
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a[href^=\"#\"]");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = getHeaderHeight();
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, // dynamische Header-Höhe
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for animating progress bars
    const animateProgressBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.dataset.percentage;
                progressBar.style.width = percentage + "%";
                observer.unobserve(progressBar);
            }
        });
    };

    const progressBarObserver = new IntersectionObserver(animateProgressBars, {
        root: null,
        threshold: 0.5
    });

    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach(bar => {
        progressBarObserver.observe(bar);
    });
});
