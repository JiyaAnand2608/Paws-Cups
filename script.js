// Ensure the DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
 
  // ==========================================
  // HOME PAGE FEATURES (Used primarily on index.html)
  // ==========================================
 
  // --- FEATURE 1: Dynamic Greeting ---
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
  let topTag = document.querySelector(".top-tag");
  if (topTag) {
    topTag.onclick = function() {
      topTag.innerText = "Surprise! You just gave a virtual belly rub to a puppy! 🐶💕";
    };
  }
 
  // ==========================================
  // GLOBAL NAVBAR FEATURES
  // ==========================================
 
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
          card.style.display = 'block';
          if (filter === "") {
            menuItems.forEach(item => item.style.display = 'flex');
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
 
  // --- Advanced Cart Functionality ---
  let cartTotal = 0;
  let cartCount = 0;
  const cartCountEl = document.getElementById('cart-cou
