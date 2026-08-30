/**
 * Christian Tindoc - Portfolio Redesign Script
 * Features: Mobile Nav, Section Spy, Project Filtering, Interactive Modals, Toast Alerts, Contact Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Navigation Active Link Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);

  // 4. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Toast Notification System
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // 6. Copy Email to Clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'christianemanuelwijaya@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  }

  // 7. Interactive Modal for Project Details
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalTags = document.getElementById('modalTags');
  const modalGithubLink = document.getElementById('modalGithubLink');

  // Detailed project data dictionary
  const projectDetails = {
    'banking': {
      title: 'Banking System Simulation',
      category: 'Python & Desktop GUI',
      description: 'A modular, object-oriented desktop application built in Python utilizing CustomTkinter for modern UI aesthetics. It features full account management, secure PIN authentication, deposit and withdrawal transactions, peer-to-peer money transfers, real-time balance calculations, and persistent transactional event logs.',
      tags: ['Python 3', 'CustomTkinter', 'OOP', 'Data Validation', 'File I/O'],
      github: 'https://github.com/thechristdev/Banking-System-Simulation'
    },
    'perjaka': {
      title: 'Website Kelas XII-C SMAN Perjaka',
      category: 'Web Development',
      description: 'The official interactive class portal for XII-C students at SMAN 1 Purwareja Klampok. Features dynamic class photo gallery, student and teacher profiles, interactive assignment calendar, announcement board, and responsive mobile-optimized UI.',
      tags: ['JavaScript', 'HTML5', 'CSS3 / Tailwind', 'Responsive UI', 'GitHub Pages'],
      github: 'https://github.com/thechristdev'
    },
    'guard': {
      title: 'Exposthree System Guard',
      category: 'Server Security & Addon',
      description: 'An administrative and server protection addon for Minecraft Bedrock vanilla multiplayer servers. Developed in JavaScript using the Bedrock Scripting API, featuring automated cheat detection, chat moderation, custom administrative commands, and automated player security checks.',
      tags: ['JavaScript', 'Bedrock Script API', 'Anti-Cheat Logic', 'Automation'],
      github: 'https://github.com/thechristdev/Exposthree-System-Guard'
    },
    'vision': {
      title: 'Vision Multimedia Website',
      category: 'Web & Media Showcase',
      description: 'A high-converting studio showcase website built for a multimedia agency. Designed with dark neo-glassmorphism, video embeds, portfolio galleries, responsive testimonials, and an interactive quote booking form.',
      tags: ['JavaScript', 'Modern CSS', 'Glassmorphism', 'Responsive Design'],
      github: 'https://github.com/thechristdev'
    },
    'excel-invoice': {
      title: 'Automated Excel Invoice & Ledger',
      category: 'Data & Automation',
      description: 'A comprehensive business tool built with advanced Microsoft Excel formulas and VBA automation. Enables instant invoice creation, automated tax/discount calculations, client database management, and sales reporting dashboards.',
      tags: ['Microsoft Excel', 'VBA / Macros', 'Data Modeling', 'Financial Formulas'],
      github: 'https://github.com/thechristdev/Excel-Invoice'
    }
  };

  const detailButtons = document.querySelectorAll('.open-modal-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.textContent = data.description;
        modalGithubLink.href = data.github;

        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = tag;
          modalTags.appendChild(span);
        });

        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && projectModal) {
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 8. Contact Form Handling & Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.');
        return;
      }

      // Simple email format regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending...`;

      setTimeout(() => {
        showToast('Thank you! Your message has been sent.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    });
  }

  // 9. Stats Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function checkStatsScroll() {
    if (animatedStats || statNumbers.length === 0) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      animatedStats = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        let count = 0;
        const duration = 1200;
        const increment = target / (duration / 25);

        const counter = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(counter);
          } else {
            stat.textContent = Math.ceil(count);
          }
        }, 25);
      });
    }
  }
  window.addEventListener('scroll', checkStatsScroll);
  checkStatsScroll();
});

