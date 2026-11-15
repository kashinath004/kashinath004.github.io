/**
 * Neuromorphic Synaptic Canvas Background
 * Simulates biological neurons, axon branching, and dynamic action potential propagation.
 * Created for Kashinath B R Portfolio
 */

(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let neurons = [];
  let spikes = [];
  let mouse = { x: -1000, y: -1000, radius: 180, isHovered: false };

  const CONFIG = {
    neuronCount: 65,
    maxDistance: 150,
    neuronRadius: 2.5,
    neuronColor: 'rgba(6, 182, 212, 0.7)',
    synapseColor: 'rgba(56, 189, 248, 0.15)',
    spikeColor: 'rgba(16, 185, 129, 0.9)',
    spikeSpeed: 1.8,
    maxSpikes: 25
  };

  class Neuron {
    constructor(x, y) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = CONFIG.neuronRadius * (0.8 + Math.random() * 0.5);
      this.baseRadius = this.radius;
      this.fireTimer = Math.random() * 100;
      this.refractory = 0;
      this.membranePotential = -70 + Math.random() * 15; // mV
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on borders
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.isHovered) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 1) {
          const force = (1 - dist / mouse.radius) * 0.8;
          this.vx += (dx / dist) * force * 0.15;
          this.vy += (dy / dist) * force * 0.15;
          // Trigger spike when touched by mouse
          if (this.refractory <= 0 && Math.random() < 0.05) {
            this.fire();
          }
        }
      }

      // Dampen velocity to prevent explosion
      this.vx *= 0.985;
      this.vy *= 0.985;

      // Autonomous firing
      this.fireTimer++;
      if (this.refractory > 0) this.refractory--;
      if (this.fireTimer > 180 + Math.random() * 220) {
        this.fire();
        this.fireTimer = 0;
      }
    }

    fire() {
      if (spikes.length > CONFIG.maxSpikes) return;
      this.refractory = 40;
      // Find connected neighbors and send spikes
      neurons.forEach(neighbor => {
        if (neighbor === this) return;
        const dx = neighbor.x - this.x;
        const dy = neighbor.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.maxDistance && Math.random() < 0.6) {
          spikes.push(new Spike(this, neighbor));
        }
      });
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.refractory > 20 ? 'rgba(52, 211, 153, 0.9)' : CONFIG.neuronColor;
      ctx.shadowColor = this.refractory > 20 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(6, 182, 212, 0.4)';
      ctx.shadowBlur = this.refractory > 20 ? 12 : 5;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  class Spike {
    constructor(fromNeuron, toNeuron) {
      this.from = fromNeuron;
      this.to = toNeuron;
      this.progress = 0; // 0 to 1
      const dx = toNeuron.x - fromNeuron.x;
      const dy = toNeuron.y - fromNeuron.y;
      this.dist = Math.sqrt(dx * dx + dy * dy);
      this.speed = (CONFIG.spikeSpeed / (this.dist || 1));
      this.alive = true;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.alive = false;
        // stimulate receiver neuron
        if (Math.random() < 0.3) {
          this.to.refractory = 25;
        }
      }
    }

    draw() {
      const curX = this.from.x + (this.to.x - this.from.x) * this.progress;
      const curY = this.from.y + (this.to.y - this.from.y) * this.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, 2, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.spikeColor;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNeurons();
  }

  function initNeurons() {
    neurons = [];
    spikes = [];
    const count = Math.min(CONFIG.neuronCount, Math.floor((width * height) / 18000));
    for (let i = 0; i < count; i++) {
      neurons.push(new Neuron());
    }
  }

  function drawSynapses() {
    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const n1 = neurons[i];
        const n2 = neurons[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDistance) {
          const alpha = (1 - dist / CONFIG.maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawSynapses();

    neurons.forEach(n => {
      n.update();
      n.draw();
    });

    for (let i = spikes.length - 1; i >= 0; i--) {
      const s = spikes[i];
      s.update();
      s.draw();
      if (!s.alive) {
        spikes.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isHovered = true;
  });
  window.addEventListener('mouseleave', () => {
    mouse.isHovered = false;
  });
  window.addEventListener('click', e => {
    // Inject burst at click coordinates
    neurons.forEach(n => {
      const dx = n.x - e.clientX;
      const dy = n.y - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        n.fire();
      }
    });
  });

  resize();
  animate();
})();
