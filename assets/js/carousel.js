
    // Function to initialize the carousel
    function initializeCarousel() {
        const carousel = document.querySelector('[data-carousel]');
        const slides = carousel.querySelectorAll('[data-slides] > .slide');
        const totalSlides = slides.length;
        let currentSlide = 0;

        // Function to show the current slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        // Function to navigate to the previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Function to navigate to the next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Event listeners for previous and next buttons
        carousel.querySelector('[data-carousel-button="prev"]').addEventListener('click', prevSlide);
        carousel.querySelector('[data-carousel-button="next"]').addEventListener('click', nextSlide);

        // Show the initial slide
        showSlide(currentSlide);
    }

    // Call the function to initialize the carousel
    initializeCarousel();