 // --- THEME TOGGLE SCRIPT ---
        const themeToggle = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        // Mobile theme toggle elements
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
        const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

        function applyTheme(isDark) {
            if (isDark) {
                document.documentElement.classList.add('dark');
                // Toggle desktop icons
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
                // Toggle mobile icons
                darkIconMobile.classList.add('hidden');
                lightIconMobile.classList.remove('hidden');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                // Toggle desktop icons
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
                // Toggle mobile icons
                darkIconMobile.classList.remove('hidden');
                lightIconMobile.classList.add('hidden');
                localStorage.setItem('theme', 'light');
            }
        }

        // Apply theme on initial load
        const savedTheme = localStorage.getItem('theme');
        // Default to dark mode if no theme is saved
        applyTheme(savedTheme ? savedTheme === 'dark' : true);

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            applyTheme(!isDark);
        });
        // Add event listener for the mobile toggle
        themeToggleMobile.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            applyTheme(!isDark);
        });

        // --- NEW MOBILE MENU SCRIPT ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');

        const openMenu = () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        const closeMenu = () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        };

        mobileMenuButton.addEventListener('click', openMenu);
        mobileMenuCloseButton.addEventListener('click', closeMenu);
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            // --- AOS INITIALIZATION ---
            AOS.init({
                duration: 1000, // values from 0 to 3000, with step 50ms
                once: true, // whether animation should happen only once - while scrolling down
            });

            // --- TYPING EFFECT SCRIPT ---
            const typingText = document.getElementById('typing-text');
            const words = ["Developer.", "Designer.", "Mobile Developer.", "Freelancer."];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                if (!typingText) return;
                const currentWord = words[wordIndex];
                
                let displayText = isDeleting 
                    ? currentWord.substring(0, charIndex--) 
                    : currentWord.substring(0, charIndex++);

                typingText.textContent = displayText;

                let typeSpeed = 150;
                if (isDeleting) {
                    typeSpeed /= 2;
                }

                if (!isDeleting && displayText === currentWord) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && displayText === '') {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500;
                }
                
                setTimeout(type, typeSpeed);
            }
            if (typingText) {
                 setTimeout(type, 1000);
            }

            // --- PORTFOLIO SEE MORE/LESS SCRIPT ---
            const workSection = document.getElementById('work');
            if (workSection) {
                const projectCards = Array.from(workSection.querySelectorAll('.grid > div'));
                const toggleBtn = document.getElementById('toggle-projects-btn');
                const toggleBtnContainer = toggleBtn ? toggleBtn.parentElement : null;
                const mobileBreakpoint = 768; // Tailwind's md breakpoint

                if (!toggleBtn || !toggleBtnContainer || projectCards.length <= 3) {
                    if (toggleBtnContainer) toggleBtnContainer.classList.add('hidden');
                } else {
                    const initialVisibleCount = 3;
                    let isExpanded = false;

                    function updateView() {
                        const isMobile = window.innerWidth < mobileBreakpoint;

                        if (isMobile) {
                            toggleBtnContainer.classList.remove('hidden');
                        } else {
                            toggleBtnContainer.classList.add('hidden');
                        }

                        projectCards.forEach((card, index) => {
                            if (!isMobile || (isMobile && index < initialVisibleCount) || (isMobile && isExpanded)) {
                                card.classList.remove('hidden');
                            } else {
                                card.classList.add('hidden');
                            }
                        });

                        toggleBtn.textContent = isExpanded ? 'See Less' : 'See More';
                    }

                    toggleBtn.addEventListener('click', () => {
                        isExpanded = !isExpanded;
                        updateView();
                    });

                    window.addEventListener('resize', updateView);
                    updateView(); // Initial call
                }
            }

            // --- TESTIMONIAL SLIDER SCRIPT ---
            const testimonials = document.querySelectorAll('.testimonial-item');
            const dotsContainer = document.getElementById('testimonial-dots');
            if (testimonials.length && dotsContainer) {
                let currentTestimonial = 0;

                // Create dots
                testimonials.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition-colors', 'duration-300');
                    if (i === 0) {
                        dot.classList.add('bg-custom-yellow');
                    } else {
                        dot.classList.add('bg-gray-300', 'dark:bg-slate-700');
                    }
                    dot.addEventListener('click', () => {
                        showTestimonial(i);
                    });
                    dotsContainer.appendChild(dot);
                });
                
                const dots = dotsContainer.querySelectorAll('button');

                function showTestimonial(index) {
                    testimonials.forEach((testimonial, i) => {
                        testimonial.classList.add('hidden');
                        dots[i].classList.remove('bg-custom-yellow');
                        dots[i].classList.add('bg-gray-300', 'dark:bg-slate-700');
                    });

                    testimonials[index].classList.remove('hidden');
                    dots[index].classList.add('bg-custom-yellow');
                    dots[index].classList.remove('bg-gray-300', 'dark:bg-slate-700');
                    currentTestimonial = index;
                }

                function nextTestimonial() {
                    let nextIndex = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(nextIndex);
                }

                setInterval(nextTestimonial, 5000); // Auto-play
            }

            // --- FAQ ACCORDION SCRIPT ---
            const faqToggles = document.querySelectorAll('.faq-toggle');
            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const answer = toggle.nextElementSibling;
                    const icon = toggle.querySelector('i');

                    const isOpening = !answer.style.maxHeight;

                    // Close all other answers
                    faqToggles.forEach(otherToggle => {
                        if (otherToggle !== toggle) {
                            otherToggle.nextElementSibling.style.maxHeight = null;
                            otherToggle.querySelector('i').classList.remove('rotate-90');
                        }
                    });

                    // Toggle current answer
                    if (isOpening) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                        icon.classList.add('rotate-90');
                    } else {
                        answer.style.maxHeight = null;
                        icon.classList.remove('rotate-90');
                    }
                });
            });

            // --- SCROLL TO TOP SCRIPT ---
            const scrollToTopBtn = document.getElementById('scroll-to-top');
            if (scrollToTopBtn) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 400) {
                        scrollToTopBtn.classList.remove('hidden');
                    } else {
                        scrollToTopBtn.classList.add('hidden');
                    }
                });

                scrollToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        });