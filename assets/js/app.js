/**
 * Main Application Controller for Kashinath B R Portfolio & Behance Showcase
 * Includes:
 * 1. Project Filter & Categorization
 * 2. Behance / Dribbble Modal Deep Dives & Architecture Breakdowns
 * 3. Toast Notifications & Quick Contact Actions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  initProjectFiltering();
  initModals();
  initToastActions();
  initNavigation();
});

/* ==========================================================================
   1. BEHANCE & DRIBBBLE PROJECT FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-800/80', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   2. BEHANCE CASE STUDY MODALS & DEEP DIVES
   ========================================================================== */
const PROJECT_MODAL_DATA = {
  cisnn: {
    title: "Optimization & Parallelization of Cerebellum Inspired Spiking Neural Network (CISNN)",
    tag: "Bio-Inspired AI & Neural Modeling",
    period: "Jan 2025 – Jun 2025",
    organization: "Amrita Mind Brain Center (AMBC)",
    badge: "Flagship Academic Project",
    summary: "Developed biophysical Spiking Neural Network (CISNN) models in MATLAB and Python for high-fidelity sensory-motor perception. Parallelized computation using multiprocessing & vectorized LIF equations, achieving 35x energy efficiency and sub-millisecond inference over conventional CNN/LSTM baselines.",
    industryImpact: "Directly applicable to autonomous agent execution loops, low-latency streaming inference, and ultra-efficient edge AI deployment. Bio-inspired sparse coding reduces computational overhead and compute power in continuous perception tasks.",
    techStack: ["MATLAB", "Python", "NumPy", "Scikit-Learn", "Matplotlib", "Parallel Computing", "Neural Networks", "Biological Modeling"],
    highlights: [
      "Engineered multi-compartment cerebellar microcircuits: Mossy Fibers, Granule Cells, Purkinje Cells, and DCN.",
      "Vectorized Leaky Integrate-and-Fire (LIF) and dynamical formulations in Python/NumPy.",
      "Benchmarked alongside CNN, MLP, LSTM, SOM, and SVM for sensorimotor pattern classification.",
      "Achieved 91.4% network activation sparsity, minimizing redundant weight updates and compute overhead."
    ]
  },
  bioremediation: {
    title: "Biodegradation and Decolorization of Industrial Dyes Using Microbial Isolates",
    tag: "Biotechnology & Environmental Systems",
    period: "Oct 2024 – Dec 2024",
    organization: "Amrita School of Biotechnology (ASBT)",
    badge: "Published Experimental Study",
    summary: "Evaluated bioremediation potential of Pseudomonas putida and Bacillus subtilis by screening enzymatic degradation on toxic azo & triphenylmethane industrial dyes (Malachite Green, Congo Red), reaching up to 96.8% decolorization efficiency in 72 hours.",
    industryImpact: "Exemplifies rigorous scientific methodology, high-dimensional biological data capture, spectrophotometric curve fitting, and deep domain knowledge in wet-lab and computational microbiology—vital for Bio-AI and industrial sustainability analytics.",
    techStack: ["Pseudomonas putida", "Bacillus subtilis", "Decolorization Assays", "Spectrophotometry", "Microbial Isolation", "GLP"],
    highlights: [
      "Quantified enzyme kinetics of microbial azoreductase and laccase systems across varying dye concentrations.",
      "Generated reproducible time-series decolorization profiles validating microbial resilience under toxic thresholds.",
      "Conducted Thin Layer Chromatography (TLC) and spectrophotometric assays to verify non-toxic degradation metabolites."
    ]
  },
  biomedical: {
    title: "Basic Model of Blood Flow in Arteries (Amrita Virtual Lab)",
    tag: "Biomedical Engineering & Hemodynamic Modeling",
    period: "Jan 2026 – Apr 2026",
    organization: "Amrita Mind Brain Center • Ministry of Education Virtual Labs",
    badge: "Official MoE Virtual Lab",
    liveUrl: "https://ibe-amrt.vlabs.ac.in/exp/blood-flow-model/simulation.html",
    summary: "Developed the official interactive educational web simulation module for the 'Basic Model of Blood Flow in Arteries' under the Introduction to Biomedical Engineering Instrumentation Virtual Lab at Amrita Vishwa Vidyapeetham. Built with HTML5, modern CSS3, JavaScript, and Chart.js, the platform allows biomedical students to investigate arterial hemodynamics, plaque progression (Fatty Streak, Fibrofatty Plaque, Complicated Plaque), and volumetric flow rate behavior under Hagen-Poiseuille equations.",
    industryImpact: "Deployed nationwide on India's official Ministry of Education Virtual Labs portal (ibe-amrt.vlabs.ac.in). Demonstrates real-world production frontend development, fluid mechanics mathematical modeling, and interactive scientific UI engineering.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Hagen-Poiseuille Law", "Hemodynamics", "Atherosclerosis Modeling", "Virtual Labs"],
    highlights: [
      "Modelled the 4 histological stages of atherosclerosis: Healthy Artery, Fatty Streak, Fibrofatty Plaque, and Complicated Plaque.",
      "Engineered dynamic interactive parameter controls for arterial radius (150-350 µm), driving pressure gradient (1-100 mmHg), and blood flow velocity.",
      "Integrated real-time volumetric flow rate calculations following Hagen-Poiseuille flow (Q = π·ΔP·r⁴ / 8·η·L) and velocity profiles with Chart.js.",
      "Live deployment on Ministry of Education Virtual Labs: https://ibe-amrt.vlabs.ac.in/exp/blood-flow-model/simulation.html"
    ]
  },
  tataGenai: {
    title: "Tata GenAI Powered Data Analytics & Risk Modeling Simulation",
    tag: "Generative AI & Data Analytics",
    period: "Jun 2025",
    organization: "Forage Job Simulation",
    badge: "Industry Certified",
    summary: "Completed enterprise-grade exploratory data analysis (EDA), predictive risk modeling, and strategic AI solution roadmap formulation for corporate stakeholders.",
    industryImpact: "Demonstrates practical enterprise AI consulting skills, executive storytelling, business metric derivation, and structured generative AI strategy aligned with modern enterprise data and automation pipelines.",
    techStack: ["GenAI Strategy", "Exploratory Data Analysis", "Risk Modeling", "Python", "Pandas", "Data Storytelling"],
    highlights: [
      "Formulated AI adoption frameworks for automated risk scoring and anomaly detection.",
      "Delivered executive dashboards communicating model trade-offs, ROI metrics, and governance requirements."
    ]
  },
  cppAlgorithms: {
    title: "High-Performance Data Structures & OOP in C++ (CS104 & CS105)",
    tag: "Systems Programming & Algorithmic Optimization",
    period: "Oct 2024",
    organization: "Udemy Masterclass",
    badge: "Certified Masterclass",
    summary: "Engineered memory-efficient data structures (dynamic arrays, binary trees, graph traversals) and object-oriented architectures in C++ for computational performance optimization.",
    industryImpact: "Demonstrates low-level systems programming proficiency, memory management, and algorithmic complexity optimization essential for high-throughput computational modeling and bio-simulation backends.",
    techStack: ["C++", "Object-Oriented Programming", "Memory Management", "Pointers & References", "Algorithms", "Time Complexity"],
    highlights: [
      "Mastered custom dynamic memory allocation and pointer arithmetic in modern C++.",
      "Implemented standard data structures: Hash Maps, Binary Search Trees, and Graph BFS/DFS traversal.",
      "Optimized algorithmic execution time and space complexity."
    ]
  }
};

function initModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalContent) return;

  document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseKey = btn.dataset.openCase;
      const data = PROJECT_MODAL_DATA[caseKey];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span class="badge-tag bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs mb-2">
                ${data.tag}
              </span>
              <h2 class="text-2xl font-bold font-display text-white mt-1">${data.title}</h2>
              <p class="text-sm text-slate-400 mt-1">${data.organization} • <span class="font-mono text-cyan-400">${data.period}</span></p>
            </div>
            <div class="flex items-center gap-2">
              ${data.liveUrl ? `
                <a href="${data.liveUrl}" target="_blank" rel="noreferrer" class="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-semibold flex items-center gap-1 transition">
                  <span>Open Live Virtual Lab</span>
                  <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                </a>
              ` : ''}
              <span class="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                ${data.badge}
              </span>
            </div>
          </div>

          <!-- Applied Impact Callout -->
          <div class="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/30">
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 mt-0.5">
                <i data-lucide="sparkles" class="w-5 h-5"></i>
              </div>
              <div>
                <h4 class="text-sm font-bold text-cyan-200 uppercase tracking-wider font-mono">Applied Value & Real-World Impact</h4>
                <p class="text-sm text-slate-300 mt-1 leading-relaxed">${data.industryImpact}</p>
              </div>
            </div>
          </div>

          <!-- Overview & Tech Stack -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">Overview</h4>
            <p class="text-slate-300 leading-relaxed text-sm">${data.summary}</p>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">Technologies & Tools</h4>
            <div class="flex flex-wrap gap-2">
              ${data.techStack.map(t => `<span class="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-cyan-300 font-mono border border-slate-700">${t}</span>`).join('')}
            </div>
          </div>

          <!-- Key Highlights -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">Key Accomplishments & Architecture</h4>
            <ul class="space-y-2">
              ${data.highlights.map(h => `
                <li class="flex items-start gap-2 text-sm text-slate-300">
                  <span class="text-cyan-400 font-bold mt-0.5">▹</span>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;

      if (window.lucide) lucide.createIcons();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ==========================================================================
   3. TOAST NOTIFICATIONS & COPY ACTIONS
   ========================================================================== */
function initToastActions() {
  const toast = document.getElementById('toast-msg');

  window.showToast = function (text) {
    if (!toast) return;
    toast.innerText = text;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
  };

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.dataset.copy;
      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied to clipboard: ${val}`);
      }).catch(() => {
        showToast(`Contact: ${val}`);
      });
    });
  });
}

/* ==========================================================================
   4. DYNAMIC NAVIGATION & ACTIVE INDICATOR (SCROLLSPY)
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  let isManualScroll = false;
  let scrollTimeout = null;

  function setActiveLink(activeNav) {
    navLinks.forEach(link => {
      const dot = link.querySelector('.nav-dot');
      if (link.dataset.nav === activeNav) {
        link.classList.add('text-cyan-400');
        link.classList.remove('text-slate-300');
        if (dot) dot.classList.remove('hidden');
      } else {
        link.classList.remove('text-cyan-400');
        link.classList.add('text-slate-300');
        if (dot) dot.classList.add('hidden');
      }
    });
  }

  // Smooth scroll and immediate active state on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          isManualScroll = true;
          setActiveLink(link.dataset.nav);

          targetSection.scrollIntoView({ behavior: 'smooth' });

          if (history.pushState) {
            history.pushState(null, null, targetId);
          }

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isManualScroll = false;
          }, 800);
        }
      }
    });
  });

  // ScrollSpy with IntersectionObserver
  const sections = [
    { id: 'hero', nav: 'about' },
    { id: 'about', nav: 'about' },
    { id: 'showcase', nav: 'showcase' },
    { id: 'skills', nav: 'skills' },
    { id: 'education', nav: 'education' },
    { id: 'resume', nav: 'resume' }
  ];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (isManualScroll) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const match = sections.find(s => s.id === entry.target.id);
          if (match) {
            setActiveLink(match.nav);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
  }
}
