/**
 * BHODT - PROJECTS & PORTFOLIO LOGIC
 * Filtering and Interactive Showcase
 */

(function () {
  'use strict';

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Toggle active button state
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterCategory = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (filterCategory === 'all' || cardCategory === filterCategory) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Project Detail Data for Modal Inspection
  const projectDatabase = {
    'sentinel-shield': {
      title: 'SentinelShield Security Verification Platform',
      category: 'Security Testing [Demo Case]',
      tagline: 'Authorized vulnerability assessment architecture and compliance scanner.',
      description:
        'A comprehensive demo platform for simulating authorized web application penetration testing, automated OWASP Top 10 dependency auditing, and real-time vulnerability scoring for security teams.',
      technologies: ['TypeScript', 'Node.js', 'Docker', 'OWASP ZAP Core', 'TailwindCSS'],
      scope: 'Authorized Ethical Security Review & Perimeter Posture Assessment',
      status: 'Demo Platform / Production Ready Architecture'
    },
    'nexus-cloud': {
      title: 'NexusCloud Enterprise Management Console',
      category: 'Web Applications',
      tagline: 'High-throughput enterprise dashboard with multi-tenant access control.',
      description:
        'Modern cloud operations portal engineered with role-based access control, distributed audit trails, high-performance client caching, and real-time telemetry visualizers.',
      technologies: ['React 19', 'TypeScript', 'TailwindCSS', 'REST / GraphQL', 'Chart.js'],
      scope: 'Full-Stack Web Engineering & UI/UX Design System',
      status: 'Functional Architecture Prototype'
    },
    'omni-neural': {
      title: 'OmniNeural AI Analytics & Predictive Pipeline',
      category: 'AI Integration',
      tagline: 'Streamlined intelligent data ingestion and natural language query service.',
      description:
        'Demonstrates integration of advanced LLMs and neural models for automated document synthesis, semantic vector search, and automated incident triage assistance.',
      technologies: ['Python API', 'TypeScript', 'Vector DB', 'FastAPI', 'TailwindCSS'],
      scope: 'AI Integration & Intelligent Dashboard Architecture',
      status: 'Active Internal Showcase'
    },
    'apex-commerce': {
      title: 'ApexCore High-Speed Digital Storefront',
      category: 'Websites / E-Commerce',
      tagline: 'Ultra-fast headless commerce platform with 99.8+ Lighthouse performance.',
      description:
        'Demonstration of a modern headless commercial web platform featuring sub-100ms page transitions, edge-rendered catalogs, accessible checkout flow, and resilient state synchronization.',
      technologies: ['HTML5', 'Vanilla JS', 'TailwindCSS', 'Stripe API Stubs', 'Edge Workers'],
      scope: 'Frontend Performance Engineering & Responsive Design',
      status: 'Showcase Implementation'
    },
    'vertex-academy': {
      title: 'VertexEdu Interactive Learning Environment',
      category: 'Websites / Education',
      tagline: 'Accessible online learning management portal with real-time progress tracking.',
      description:
        'Structured modular curriculum portal with interactive assessment checkpoints, dynamic student progress tracking, and accessible courseware delivery.',
      technologies: ['HTML5', 'Modern CSS', 'Vanilla JavaScript', 'Local Storage DB'],
      scope: 'Responsive Web Design & Web Application Development',
      status: 'Showcase Implementation'
    },
    'aegis-identity': {
      title: 'AegisAuth Secure Access & Audit Suite',
      category: 'Security / Custom App',
      tagline: 'Multi-factor authentication gate and secure session management prototype.',
      description:
        'Designed to model zero-trust session governance, signed JWT token lifecycles, and brute-force protection mechanisms with complete transparency.',
      technologies: ['OAuth 2.0 / OIDC', 'Node.js', 'Web Crypto API', 'TailwindCSS'],
      scope: 'Authorized Security Architecture & Access Governance',
      status: 'Demo Platform / Security Reference'
    }
  };

  window.openProjectModal = function (projectId) {
    const data = projectDatabase[projectId];
    if (!data) return;

    const modalTitle = document.getElementById('modalProjectTitle');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalTech = document.getElementById('modalProjectTech');
    const modalScope = document.getElementById('modalProjectScope');
    const modalStatus = document.getElementById('modalProjectStatus');

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalScope) modalScope.textContent = data.scope;
    if (modalStatus) modalStatus.textContent = data.status;

    if (modalTech) {
      modalTech.innerHTML = data.technologies
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join(' ');
    }

    const modal = document.getElementById('projectDetailModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };
})();
