document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});
function initializeWebsite() {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('loaded');
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1000);
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        updateActiveNavLink();
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    animateCounters();
    initFAQ();
    initTheme();
    initPreviewFeatures();
    initTestimonials();
    initScrollAnimations();
    initForms();
    addResponsiveClasses();
    initLazyLoading();
}
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('+') ? '+' : '';
        const isDecimal = target % 1 !== 0;
        const animate = () => {
            const current = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
            const increment = target / 100;
            if (current < target) {
                let next = current + increment;
                if (isDecimal) {
                    next = parseFloat(next.toFixed(1));
                } else {
                    next = Math.ceil(next);
                }
                if (next > target) next = target;
                counter.textContent = isDecimal ? next.toFixed(1) + suffix : next.toLocaleString() + suffix;
                setTimeout(animate, 20);
            }
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    otherQuestion.classList.remove('active');
                    otherAnswer.classList.remove('active');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
            question.classList.toggle('active');
            answer.classList.toggle('active');
            if (answer.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}
function initTheme() {
    const themeToggle = document.querySelector('[onclick="toggleDarkMode()"]');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    window.toggleDarkMode = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };
    function updateThemeIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}
function initPreviewFeatures() {
    const features = document.querySelectorAll('.preview-feature');
    let currentIndex = 0;
    function rotateFeatures() {
        features.forEach((feature, index) => {
            feature.classList.toggle('active', index === currentIndex);
        });   
        currentIndex = (currentIndex + 1) % features.length;
    }
    if (features.length > 0) {
        setInterval(rotateFeatures, 3000);
    }
}
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    function showNextTestimonial() {
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0.5';
            testimonial.style.transform = 'scale(0.95)';
        });
        testimonials[currentTestimonial].style.opacity = '1';
        testimonials[currentTestimonial].style.transform = 'scale(1)';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000);
        showNextTestimonial();
    }
}
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.feature-card, .step, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error)';
                } else {
                    input.style.borderColor = '';
                }
            });
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                submitBtn.disabled = true;
                submitBtn.style.background = 'var(--success)';
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }
        });
    });
}
function addResponsiveClasses() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    if (isMobile) {
        document.body.classList.add('is-mobile');
    } else if (isTablet) {
        document.body.classList.add('is-tablet');
    } else {
        document.body.classList.add('is-desktop');
    }
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('is-mobile', 'is-tablet', 'is-desktop');
            addResponsiveClasses();
        }, 250);
    });
}
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}
function openVideoModal() {
    alert('Video demo would play here. This is a demo website.');
}
function openSupportModal() {
    const modal = document.getElementById('supportModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeModal() {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}
function scrollToDownload() {
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = downloadSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (email && email.includes('@')) {
            const button = this.querySelector('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'var(--success)';
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                this.querySelector('input').value = '';
            }, 2000);
        }
    });
}
const downloadModal = document.getElementById('downloadModal');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
function startDownload() {
    downloadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    simulateDownload();
    setTimeout(triggerDownload, 1500);
}
function simulateDownload() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressText.textContent = 'Download Complete!';
            setTimeout(() => {
                closeModal();
                showDownloadCompleteToast();
            }, 2000);
        }
        progressFill.style.width = progress + '%';
        if (progress < 30) {
            progressText.textContent = 'Preparing download...';
        } else if (progress < 60) {
            progressText.textContent = 'Downloading...';
        } else if (progress < 90) {
            progressText.textContent = 'Almost done...';
        } else {
            progressText.textContent = 'Finishing up...';
        }
    }, 100);
}
function triggerDownload() {
    const link = document.createElement('a');
    link.href = 'downloads/CyberActivator Setup.exe';
    link.download = 'Package\CyberActivator Setup.exe';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    updateDownloadCount();
}
function forceDownload() {
    window.location.href = 'downloads/CyberActivator Setup.exe';
    updateDownloadCount();
    closeModal();
}
function downloadMirror(service) {
    let url = '';
    let serviceName = '';
    switch (service) {
        case 'google':
            url = 'Portable Version.zip';
            serviceName = 'Google Drive';
            break;
        case 'mega':
            url = 'https://mega.nz/file/your-file-id';
            serviceName = 'MEGA';
            break;
        case 'github':
            url = 'https://github.com/yourusername/CyberActivator/releases/latest';
            serviceName = 'GitHub';
            break;
    }
    showMirrorRedirect(serviceName, url);
}
function showMirrorRedirect(serviceName, url) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow=''">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <div class="modal-icon">
                    <i class="fas fa-external-link-alt"></i>
                </div>
                <h3>Redirecting to ${serviceName}</h3>
                <p>You'll be redirected in a few seconds</p>
            </div>
            <div class="modal-body">
                <div class="redirect-countdown">
                    <p>Opening ${serviceName} in <span id="countdown">5</span> seconds...</p>
                </div>
                <div class="redirect-link">
                    <p>If you're not redirected, click the link below:</p>
                    <a href="${url}" target="_blank" class="btn btn-outline">
                        <i class="fas fa-external-link-alt"></i>
                        Open ${serviceName}
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    let countdown = 5;
    const countdownElement = modal.querySelector('#countdown');
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            window.open(url, '_blank');
            modal.remove();
            document.body.style.overflow = '';
        }
    }, 1000);
}
function updateDownloadCount() {
    let count = localStorage.getItem('cyberactivator_downloads') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('cyberactivator_downloads', count);
    const downloadCountElement = document.querySelector('.spec-value:nth-child(3)');
    if (downloadCountElement) {
        const currentCount = parseInt(downloadCountElement.textContent.replace(/[^0-9]/g, ''));
        downloadCountElement.textContent = (currentCount + 1).toLocaleString() + '+';
    }
}
function showDownloadCompleteToast() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Download Complete!</strong>
                <p>Check your downloads folder</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--success);
                color: white;
                padding: 16px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 350px;
            }
            .toast-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .toast-content i:first-child {
                font-size: 24px;
            }
            .toast strong {
                display: block;
                font-size: 14px;
                margin-bottom: 4px;
            }
            .toast p {
                color: rgba(255,255,255,0.9);
                font-size: 12px;
                margin: 0;
            }
            .toast-close {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                margin-left: auto;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}
window.addEventListener('DOMContentLoaded', () => {
    const savedCount = localStorage.getItem('cyberactivator_downloads');
    if (savedCount) {
        const downloadCountElement = document.querySelector('.spec-value:nth-child(3)');
        if (downloadCountElement) {
            downloadCountElement.textContent = parseInt(savedCount).toLocaleString() + '+';
        }
    }
});
function openTutorialModal() { alert('Tutorials page would open here.'); }
function openForumModal() { alert('Community forum would open here.'); }
function openReportModal() { alert('Report issue page would open here.'); }
function openPrivacyModal() { alert('Privacy policy would open here.'); }
function openTermsModal() { alert('Terms of service would open here.'); }
function openDisclaimerModal() { alert('Disclaimer would open here.'); }
function openCookieModal() { alert('Cookie policy would open here.'); }