/**
 * Agentic AI Interactive Experience
 * Cutting-edge portfolio enhancement with neural networks and AI chat
 */

// ============================================
// Neural Network Canvas Animation
// ============================================
class NeuralNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.createNodes();
    this.createConnections();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createNodes() {
    const nodeCount = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 15000));
    this.nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: this.getRandomColor(),
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  getRandomColor() {
    const colors = [
      'rgba(0, 212, 255, 0.8)',   // Cyan
      'rgba(124, 58, 237, 0.8)',  // Purple
      'rgba(16, 185, 129, 0.8)',  // Green
      'rgba(245, 158, 11, 0.6)'   // Orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createConnections() {
    this.connections = [];
    const maxDistance = 150;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          this.connections.push({
            from: i,
            to: j,
            distance: distance
          });
        }
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
      this.createConnections();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  update() {
    const time = Date.now() * 0.001;

    this.nodes.forEach((node, index) => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          node.vx += (dx / distance) * force * 0.02;
          node.vy += (dy / distance) * force * 0.02;
        }
      }

      // Limit velocity
      const maxVel = 1;
      const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (vel > maxVel) {
        node.vx = (node.vx / vel) * maxVel;
        node.vy = (node.vy / vel) * maxVel;
      }

      // Pulse effect
      node.currentRadius = node.radius * (1 + 0.2 * Math.sin(time * 2 + node.pulsePhase));
    });

    // Update connections
    this.createConnections();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    this.connections.forEach((conn) => {
      const from = this.nodes[conn.from];
      const to = this.nodes[conn.to];
      const opacity = 1 - conn.distance / 150;

      // Data flow animation
      const gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      const flowPosition = (Date.now() * 0.001) % 1;

      gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity * 0.3})`);
      gradient.addColorStop(flowPosition, `rgba(124, 58, 237, ${opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(16, 185, 129, ${opacity * 0.3})`);

      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    // Draw nodes
    this.nodes.forEach((node) => {
      // Glow effect
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.currentRadius * 4
      );
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(1, 'transparent');

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.currentRadius * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Core node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.currentRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color;
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// AI Chat Assistant
// ============================================
const aiResponses = {
  skills: {
    text: "I specialize in cloud engineering with expertise in:\n\n• **Kubernetes & Docker** - Container orchestration at scale\n• **Terraform** - Infrastructure as Code\n• **HashiCorp Vault** - Secrets management\n• **AWS, Azure, GCP** - Multi-cloud architecture\n• **CI/CD Pipelines** - GitHub Actions, GitLab CI, Jenkins\n• **DevSecOps** - Security-first development practices\n\nI'm passionate about building resilient, scalable systems!",
    followUp: ["Tell me about your experience", "What is Agentic AI?", "What projects have you worked on?"]
  },
  experience: {
    text: "I've had an exciting journey in cloud engineering:\n\n**WALT Labs** (2023-Present)\nHead of Engineering, EMEA - Leading engineering teams across the region\n\n**Aqua Security** (2021-2022)\nDevSecOps Engineer - Securing cloud-native applications and supply chains\n\n**GlobalLogic** (2016-2021)\nDelivery Consultant - Digital transformation and engineering solutions\n\n**QA Consulting** (2015-2016)\nDevOps Consultant - Building CI/CD pipelines and automation",
    followUp: ["What are your skills?", "What is Agentic AI?", "How can I contact you?"]
  },
  agentic: {
    text: "**Agentic AI** represents the next evolution in artificial intelligence!\n\nUnlike traditional AI that responds to commands, agentic AI systems can:\n\n• **Plan autonomously** - Break down complex goals into steps\n• **Take action** - Execute tasks without constant guidance\n• **Learn & adapt** - Improve from outcomes and feedback\n• **Collaborate** - Work with other agents and humans\n\nIn cloud engineering, this means self-healing infrastructure, intelligent auto-scaling, and autonomous incident response. The future is autonomous!",
    followUp: ["Tell me about your skills", "How do you apply AI in your work?", "What's your experience?"]
  },
  contact: {
    text: "I'd love to connect! Here's how you can reach me:\n\n**Email:** morgan.atkins@mea-tech.co.uk\n**Website:** mea-tech.co.uk\n**GitHub:** @morgantatkins\n**LinkedIn:** /in/morgantatkins\n**YouTube:** @morganatkins\n\nAlways happy to chat about cloud engineering, DevOps, or agentic AI!",
    followUp: ["What are your skills?", "Tell me about your experience"]
  },
  projects: {
    text: "I'm constantly working on exciting projects in the cloud engineering space!\n\n• **Container Platforms** - Building enterprise Kubernetes solutions\n• **Secret Management** - Implementing HashiCorp Vault at scale\n• **DevSecOps Pipelines** - Security-integrated CI/CD workflows\n• **Infrastructure Automation** - Terraform modules for multi-cloud\n\nCheck out my GitHub @morgantatkins for open-source contributions!",
    followUp: ["What technologies do you use?", "Tell me about your experience"]
  },
  default: {
    text: "That's a great question! While I'm a simulated AI assistant representing Morgan, I can tell you about:\n\n• Cloud engineering expertise\n• DevOps and DevSecOps practices\n• Agentic AI and its applications\n• Career experience and projects\n\nWhat would you like to know more about?",
    followUp: ["What are your skills?", "Tell me about your experience", "What is Agentic AI?"]
  }
};

function toggleAI() {
  const panel = document.querySelector('.ai-panel');
  panel.classList.toggle('active');
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById('ai-input');
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, 'user');
  input.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Simulate AI thinking time
  setTimeout(() => {
    removeTypingIndicator();
    const response = getAIResponse(message);
    addMessage(response.text, 'bot', response.followUp);
  }, 800 + Math.random() * 700);
}

function askQuestion(topic) {
  const response = aiResponses[topic] || aiResponses.default;

  // Remove suggested questions
  const existingSuggestions = document.querySelectorAll('.suggested-questions');
  existingSuggestions.forEach(el => el.remove());

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    addMessage(response.text, 'bot', response.followUp);
  }, 600 + Math.random() * 400);
}

function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('know')) {
    return aiResponses.skills;
  }
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
    return aiResponses.experience;
  }
  if (lowerMessage.includes('agentic') || lowerMessage.includes('autonomous') || lowerMessage.includes('agent')) {
    return aiResponses.agentic;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
    return aiResponses.contact;
  }
  if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('portfolio')) {
    return aiResponses.projects;
  }
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      text: "Hello! Great to meet you! I'm Morgan's AI assistant. I can tell you about cloud engineering, DevOps expertise, career experience, or discuss Agentic AI concepts. What interests you?",
      followUp: ["What are your skills?", "Tell me about Agentic AI", "How can I contact you?"]
    };
  }

  return aiResponses.default;
}

function addMessage(text, type, followUp = null) {
  const messagesContainer = document.getElementById('ai-messages');

  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${type}`;

  const avatarSvg = type === 'bot'
    ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

  // Convert markdown-style bold to HTML
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  let followUpHtml = '';
  if (followUp && followUp.length > 0) {
    followUpHtml = `
      <div class="suggested-questions">
        ${followUp.map(q => `<button onclick="askQuestionFromText('${q}')">${q}</button>`).join('')}
      </div>
    `;
  }

  messageDiv.innerHTML = `
    <div class="message-avatar">${avatarSvg}</div>
    <div class="message-content">
      <p>${formattedText}</p>
      ${followUpHtml}
    </div>
  `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function askQuestionFromText(question) {
  // Remove existing suggested questions
  const existingSuggestions = document.querySelectorAll('.suggested-questions');
  existingSuggestions.forEach(el => el.remove());

  addMessage(question, 'user');
  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const response = getAIResponse(question);
    addMessage(response.text, 'bot', response.followUp);
  }, 600 + Math.random() * 500);
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('ai-messages');

  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message bot';
  typingDiv.id = 'typing-indicator';

  typingDiv.innerHTML = `
    <div class="message-avatar">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
    </div>
    <div class="message-content">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// ============================================
// Typing Animation
// ============================================
class TypeWriter {
  constructor(element, phrases, typeSpeed = 80, deleteSpeed = 50, pauseTime = 2000) {
    this.element = element;
    this.phrases = phrases;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.type();
  }

  type() {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + (counter.nextElementSibling.textContent.includes('%') ? '' : '+');
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Card Animation on Scroll
// ============================================
function animateCardsOnScroll() {
  const cards = document.querySelectorAll('.capability-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Neural Network
  const canvas = document.getElementById('neural-network');
  if (canvas) {
    new NeuralNetwork(canvas);
  }

  // Initialize Typing Animation
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    new TypeWriter(typingElement, [
      'Meets Cloud Engineering',
      'Powers DevOps Excellence',
      'Transforms Infrastructure',
      'Enables Self-Healing Systems',
      'Drives Innovation Forward'
    ]);
  }

  // Initialize Counter Animation
  animateCounters();

  // Initialize Card Animations
  animateCardsOnScroll();

  // Add keyboard shortcut to toggle AI (Ctrl/Cmd + K)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleAI();
    }
  });

  console.log('%c Agentic AI Experience Loaded ',
    'background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
});
