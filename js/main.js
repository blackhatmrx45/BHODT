/**
 * BHODT (BLACK_HAR_OFFICIAL_DEVELOPING_TEAM)
 * Core Application Logic & Interactivity
 */

(function () {
  'use strict';

  // 1. THEME MANAGEMENT (Dark / Light Mode)
  const THEME_KEY = 'bhodt_theme_preference';
  const rootElement = document.documentElement;
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Default to dark as per BHODT core cyber identity
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      rootElement.setAttribute('data-theme', 'light');
    } else {
      rootElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);

    themeToggleButtons.forEach((btn) => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    });
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  themeToggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = rootElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = current === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  });

  // 2. HEADER SCROLL DETECTION
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      },
      { passive: true }
    );
  }

  // 3. RESPONSIVE MOBILE NAVIGATION
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navZone = document.querySelector('.nav-zone');

  if (mobileMenuBtn && navZone) {
    const toggleMobileMenu = () => {
      const isOpen = navZone.classList.contains('mobile-open');
      if (isOpen) {
        navZone.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        navZone.classList.add('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close on link click
    const navLinks = navZone.querySelectorAll('.nav-link, .mobile-cta a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navZone.classList.contains('mobile-open')) {
          toggleMobileMenu();
        }
      });
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navZone.classList.contains('mobile-open')) {
        toggleMobileMenu();
      }
    });
  }

  // 4. ACTIVE NAVIGATION LINK DETECTION
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Check match for root or specific page
    const pageName = href.replace('.html', '').replace('./', '');
    if (
      (currentPath.endsWith(href) ||
        (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/index.html'))) ||
        (pageName && currentPath.includes(pageName)))
    ) {
      link.classList.add('active');
    }
  });

  // 5. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  const contactForm = document.getElementById('projectContactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const whatsapp = document.getElementById('whatsapp');
      const projectType = document.getElementById('projectType');
      const budget = document.getElementById('budget');
      const projectDetails = document.getElementById('projectDetails');
      const submitBtn = document.getElementById('submitBtn');

      function validateField(field, condition, errorMsg) {
        const errorContainer = field.parentElement.querySelector('.form-error-msg');
        if (!condition) {
          field.classList.add('error');
          if (errorContainer) {
            errorContainer.textContent = errorMsg;
            errorContainer.style.display = 'block';
          }
          isValid = false;
        } else {
          field.classList.remove('error');
          if (errorContainer) {
            errorContainer.style.display = 'none';
          }
        }
      }

      // Validate Full Name
      validateField(
        fullName,
        fullName && fullName.value.trim().length >= 2,
        'Please provide your full name.'
      );

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(
        email,
        email && emailRegex.test(email.value.trim()),
        'Please enter a valid email address.'
      );

      // Validate WhatsApp Number (allow international format or local digits)
      const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
      validateField(
        whatsapp,
        whatsapp && phoneRegex.test(whatsapp.value.trim()),
        'Please provide a valid phone or WhatsApp number.'
      );

      // Validate Project Type
      validateField(
        projectType,
        projectType && projectType.value !== '',
        'Please select a project type.'
      );

      // Validate Budget
      validateField(
        budget,
        budget && budget.value !== '',
        'Please select an estimated budget range.'
      );

      // Validate Project Details
      validateField(
        projectDetails,
        projectDetails && projectDetails.value.trim().length >= 15,
        'Please describe your project requirements in at least 15 characters.'
      );

      if (!isValid) return;

      // Simulate sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          PROCESSING REQUEST...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();

          if (formSuccessAlert) {
            formSuccessAlert.classList.add('active');
            formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 1200);
      }
    });
  }

  // 6. GLOBAL MODAL HELPER
  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modals on ESC or overlay click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
})();
