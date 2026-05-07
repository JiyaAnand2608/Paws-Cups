// Ensure the DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // HOME PAGE FEATURES (Used primarily on index2.html)
  // ==========================================

  // --- FEATURE 1: Dynamic Greeting ---
  // Checks the time of day and updates the <p id="status"> tag.
  const statusElement = document.getElementById("status");
  if (statusElement) {
    let hour = new Date().getHours();
    let greetingText = "";

    if (hour < 12) {
      greetingText = "Good Morning! Have a pawsome day! 🐾";
    } else if (hour < 18) {
      greetingText = "Good Afternoon! Time for a coffee break! ☕";
    } else {
      greetingText = "Good Evening! Come relax with your pets! 🌙";
    }
    statusElement.innerText = greetingText;
  }

  // --- FEATURE 2: Fun Secret Message ---
  // Changes the text of the small top tag when clicked.
  let topTag = document.querySelector(".top-tag");
  if (topTag) {
    topTag.onclick = function() {
      topTag.innerText = "Surprise! You just gave a virtual belly rub to a puppy! 🐶💕";
    };
  }


  // ==========================================
  // GLOBAL NAVBAR FEATURES (Used on ALL HTML pages)
  // ==========================================

  // --- Mobile Menu Toggle ---
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuIcon && navLinks) {
      menuIcon.addEventListener('click', () => {
          navLinks.classList.toggle('active');
      });
  }

  // ==========================================
  // MENU PAGE FEATURES (Used primarily on menu2.html)
  // ==========================================

  // --- Menu Search Filter ---
  const searchInput = document.getElementById('menuSearch');
  const menuCards = document.querySelectorAll('.menu-card');

  if (searchInput) {
      searchInput.addEventListener('input', function() {
          const filter = this.value.toLowerCase();
          
          menuCards.forEach(card => {
              const menuItems = card.querySelectorAll('.menu-list li');
              let cardMatches = false;

              menuItems.forEach(item => {
                  const itemName = item.querySelector('span:first-child').textContent.toLowerCase();
                  if (itemName.includes(filter)) {
                      item.style.display = 'flex';
                      cardMatches = true;
                  } else {
                      item.style.display = 'none';
                  }
              });

              if (cardMatches || filter === "") {
                  card.style.display = 'block'; // Show card if any item matches
                  if (filter === "") {
                      menuItems.forEach(item => item.style.display = 'flex');
                  }
              } else {
                  card.style.display = 'none'; // Hide card if no match
              }
          });
      });
  }

  // --- Advanced Cart Functionality ---
  let cartTotal = 0;
  let cartCount = 0;
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');

  // Track quantities for each unique item
  const itemQuantities = {};

  function updateCartUI() {
      if (cartCountEl && cartTotalEl) {
          cartCountEl.textContent = cartCount;
          cartTotalEl.textContent = `₹${cartTotal}`;
      }
  }

  if (cartCountEl && cartTotalEl) {
      const menuItems = document.querySelectorAll('.menu-list li');
      menuItems.forEach(item => {
          // Find the elements inside the list item
          const nameEl = item.querySelector('span:first-child');
          const priceEl = item.querySelector('.price');
          
          if (!nameEl || !priceEl) return;

          const itemName = nameEl.textContent.trim();
          const priceText = priceEl.textContent.replace('₹', '').trim();
          const price = parseInt(priceText, 10);
          
          if (isNaN(price)) return;

          // Initialize this item's quantity to 0
          itemQuantities[itemName] = 0;

          // Create the + / - quantity controls (hidden by default)
          const qtyControl = document.createElement('div');
          qtyControl.className = 'qty-control';
          qtyControl.style.display = 'none'; // Hidden until item is added to cart

          const minusBtn = document.createElement('button');
          minusBtn.className = 'qty-btn';
          minusBtn.textContent = '-';

          const qtyText = document.createElement('span');
          qtyText.className = 'qty-text';
          qtyText.textContent = '1';

          const plusBtn = document.createElement('button');
          plusBtn.className = 'qty-btn';
          plusBtn.textContent = '+';

          qtyControl.appendChild(minusBtn);
          qtyControl.appendChild(qtyText);
          qtyControl.appendChild(plusBtn);

          // Append it to the list item
          item.appendChild(qtyControl);

          // Main click handler: adding the item for the first time
          item.addEventListener('click', (e) => {
              // If user clicks on the + or - buttons, ignore this handler
              if (e.target.closest('.qty-control')) return;

              if (itemQuantities[itemName] === 0) {
                  itemQuantities[itemName] = 1;
                  cartCount++;
                  cartTotal += price;
                  updateCartUI();

                  // Show the controls and update the number
                  qtyText.textContent = itemQuantities[itemName];
                  qtyControl.style.display = 'flex';

                  // Brief visual flash effect to show it was added to cart
                  const originalBg = item.style.backgroundColor;
                  item.style.backgroundColor = 'rgba(122, 202, 181, 0.4)'; // green tint
                  setTimeout(() => {
                      item.style.backgroundColor = originalBg;
                  }, 300);
              }
          });

          // Plus button handler
          plusBtn.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent the main list item from clicking
              itemQuantities[itemName]++;
              cartCount++;
              cartTotal += price;
              qtyText.textContent = itemQuantities[itemName];
              updateCartUI();
          });

          // Minus button handler
          minusBtn.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent the main list item from clicking
              if (itemQuantities[itemName] > 0) {
                  itemQuantities[itemName]--;
                  cartCount--;
                  cartTotal -= price;
                  
                  if (itemQuantities[itemName] === 0) {
                      // Completely removed from cart, so hide the controls
                      qtyControl.style.display = 'none';
                  } else {
                      qtyText.textContent = itemQuantities[itemName];
                  }
                  updateCartUI();
              }
          });
      });
  }


  // ==========================================
  // CONTACT PAGE FEATURES (Used primarily on contact2.html)
  // ==========================================

  /* ── Mode Toggle ── */
  const toggle = document.getElementById('modeToggle');
  const lblH   = document.getElementById('lbl-human');
  const lblP   = document.getElementById('lbl-pet');
  let petMode  = false;
  
  const swapMap = {
    'eyebrow-text': ['Visit Us',           'Sniff Us Out'],
    'hero-heading': ['Come Say Hello',     'Wag Your Way Here'],
    'hero-sub':     ['We\'d love to meet you and your furry companion — reservations welcome.',
                     'Treats, belly rubs & great coffee — reservations welcome.'],
    'info-title':   ['Find Us',            'Paw Your Way To Us'],
    'map-title':    ['Our Location',       'Follow the Paw Prints'],
    'mapPinIcon':   ['☕',                 '🐾'],
    'bookBtnText':  ['Confirm Reservation','Secure My Spot'],
  };
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      petMode = !petMode;
      toggle.classList.toggle('active', petMode);
      document.body.classList.toggle('pet-mode', petMode);
      if (lblH) lblH.classList.toggle('on', !petMode);
      if (lblP) lblP.classList.toggle('on', petMode);
    
      Object.entries(swapMap).forEach(([id, vals]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.transition = 'opacity .25s';
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = vals[petMode ? 1 : 0];
          el.style.opacity = '1';
        }, 250);
      });
    });
  }
  
  /* ── Seat Pills ── */
  document.querySelectorAll('.seat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seat-pill').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
    });
  });
  
  /* ── Birthday Toggle ── */
  const bdayToggle = document.getElementById('bdayToggle');
  let isBday = false;
  if (bdayToggle) {
    bdayToggle.addEventListener('click', () => {
      isBday = !isBday;
      bdayToggle.classList.toggle('on', isBday);
      if (isBday) launchConfetti();
    });
  }
  
  /* ── Book Button ── */
  const bookBtn = document.getElementById('bookBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', function(e) {
      const btn  = this;
      const r    = document.createElement('span');
      r.className = 'btn-ripple';
      const rect = btn.getBoundingClientRect();
      const sz   = Math.max(rect.width, rect.height) * 2;
      r.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;
      btn.appendChild(r);
      setTimeout(() => r.remove(), 560);
    
      const pet = document.getElementById('pet-name').value.trim() || 'your furry friend';
      const modalEmoji = document.getElementById('modalEmoji');
      const modalTitle = document.getElementById('modalTitle');
      const modalMsg = document.getElementById('modalMsg');

      if (modalEmoji) modalEmoji.textContent = isBday ? '🎂' : '🐾';
      if (modalTitle) modalTitle.textContent = isBday ? `Happy Birthday, ${pet}!` : 'Table Reserved!';
      if (modalMsg) modalMsg.textContent = isBday
        ? `We're preparing something special for ${pet}. Can't wait to celebrate!`
        : `We can't wait to meet ${pet}. See you soon!`;
    
      const backdrop = document.getElementById('modalBackdrop');
      if (backdrop) backdrop.classList.add('show');
      if (isBday) launchConfetti();
    });
  }

  window.closeModal = function() {
    const backdrop = document.getElementById('modalBackdrop');
    if (backdrop) backdrop.classList.remove('show');
  };

  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }
  
  /* ── Send Message ── */
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name  = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const st    = document.getElementById('status');
      if (!name || !email) {
        if (st) {
          st.style.color = '#b03030';
          st.textContent = 'Please fill in your name and email.';
        }
        return;
      }
      if (st) {
        st.style.color = 'var(--green)';
        st.textContent = `Thank you, ${name}. We'll be in touch soon.`;
      }
    });
  }
  
  /* ── Confetti ── */
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const palette = [
      '#DDC5A2','#E89D9D','#A9CDE5',
      '#3C2A21','#F9F6F0',
      '#D68181','#c9924a',
      '#a07850','#7a5230',
      '#e07070','#f4a0a0',
    ];
  
    const DURATION = 3800;
    const count    = 140;
  
    const particles = Array.from({ length: count }, () => {
      const type = Math.random();
      return {
        x:    Math.random() * canvas.width,
        y:    -10 - Math.random() * 120,
        vx:   (Math.random() - 0.5) * 4,
        vy:   Math.random() * 3 + 1.5,
        rot:  Math.random() * 360,
        rotV: (Math.random() - 0.5) * 5.5,
        colour: palette[Math.floor(Math.random() * palette.length)],
        shape: type < 0.55 ? 0 : type < 0.8 ? 1 : 2,
        w: Math.random() * 9 + 4,
        h: Math.random() * 4 + 2,
        opacity: 0.82 + Math.random() * 0.18,
      };
    });
  
    let start = null;
    function draw(ts) {
      if (!start) start = ts;
      const elapsed  = ts - start;
      const fade     = Math.max(0, 1 - elapsed / DURATION);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach(p => {
        p.x   += p.vx;
        p.y   += p.vy;
        p.vy  += 0.035;
        p.rot += p.rotV;
  
        ctx.save();
        ctx.globalAlpha = p.opacity * fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.colour;
  
        if (p.shape === 0) {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w, -p.h / 4, p.w * 2, p.h / 2);
        }
        ctx.restore();
      });
  
      if (elapsed < DURATION) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(draw);
  }
  // PLAYZONE PAGE FEATURES 
  const cupsContainer = document.getElementById("cups-container");
  const gameMsg = document.getElementById("game-message");

  if (cupsContainer && gameMsg) {
    initPlayzone();

    function initPlayzone() {
      cupsContainer.innerHTML = "";
      gameMsg.textContent = "Pick a cup to help Bruno find his treat!";
      gameMsg.style.color = "var(--dark)";
      
      let winningIndex = Math.floor(Math.random() * 3);
      let gameOver = false;

      for (let i = 0; i < 3; i++) {
        const cup = document.createElement("div");
        cup.className = "cup";
        cup.textContent = "☕";
        
        cup.onclick = () => {
          if (gameOver) return;
          gameOver = true;
          
          if (i === winningIndex) {
            cup.textContent = "🦴"; 
            cup.classList.add("win-animation");
            gameMsg.textContent =  "Hurray!Treat for your dog! 🦴";
            gameMsg.classList.add("win-text");
          } else {

            cup.textContent = "❌";
            gameMsg.textContent = "Better luck next time! 🐾";
            gameMsg.classList.add("lose-text");
          }

      
        };
        
        cupsContainer.appendChild(cup);
      }
    }
  }
});

