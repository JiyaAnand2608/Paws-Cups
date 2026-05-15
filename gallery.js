/*gallery.js */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.gal-filter-btn');
  const galItems   = document.querySelectorAll('.gal-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const f = btn.dataset.filter;
      galItems.forEach(item => {
        const show = f === 'all' || item.dataset.cat === f;
        if (show) {
          item.style.display = 'block';
          requestAnimationFrame(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 280);
        }
      });
    });
  });
  const lightbox  = document.getElementById('galLightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  let lbIndex = 0;
  let lbList  = [];  
  function getLbList() {
    return Array.from(document.querySelectorAll('.gal-item[style*="display: none"]')).length > 0
      ? Array.from(document.querySelectorAll('.gal-item')).filter(i => i.style.display !== 'none')
      : Array.from(document.querySelectorAll('.gal-item'));
  }
  function openLb(index) {
    lbList  = getLbList();
    lbIndex = index;
    const img = lbList[lbIndex].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = lbList[lbIndex].querySelector('.gal-overlay span')?.textContent || '';
    lightbox.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('lb-open');
    document.body.style.overflow = '';
  }
  // Attach click to existing items
  galItems.forEach((item, i) => {
    item.addEventListener('click', () => openLb(i));
  });
  // Oscar strip thumbnails also open lightbox
  document.querySelectorAll('.oscar-strip-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      lbImg.src = thumb.dataset.src;
      lbCaption.textContent = thumb.querySelector('img').alt;
      lightbox.classList.add('lb-open');
      document.body.style.overflow = 'hidden';
    });
  });
  lbClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
  lbNext.addEventListener('click', () => {
    lbList  = getLbList();
    lbIndex = (lbIndex + 1) % lbList.length;
    const img = lbList[lbIndex].querySelector('img');
    lbImg.src = img.src;
    lbCaption.textContent = lbList[lbIndex].querySelector('.gal-overlay span')?.textContent || '';
  });
  lbPrev.addEventListener('click', () => {
    lbList  = getLbList();
    lbIndex = (lbIndex - 1 + lbList.length) % lbList.length;
    const img = lbList[lbIndex].querySelector('img');
    lbImg.src = img.src;
    lbCaption.textContent = lbList[lbIndex].querySelector('.gal-overlay span')?.textContent || '';
  });
  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('lb-open')) return;
    if (e.key === 'Escape')       closeLb();
    if (e.key === 'ArrowRight')   lbNext.click();
    if (e.key === 'ArrowLeft')    lbPrev.click();
  });
  /*  UPLOAD */
  const dropZone        = document.getElementById('dropZone');
  const fileInput       = document.getElementById('fileInput');
  const previewWrap     = document.getElementById('uploadPreviewWrap');
  const previewImg      = document.getElementById('uploadPreview');
  const removeBtn       = document.getElementById('removePreviewBtn');
  const submitBtn       = document.getElementById('uploadSubmitBtn');
  const galGrid         = document.getElementById('galGrid');

  let selectedFile = null;
  function showPreview(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
      dropZone.style.display    = 'none';
      previewWrap.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
  // File input change
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) showPreview(fileInput.files[0]);
  });
  // Drag over styling
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) showPreview(e.dataTransfer.files[0]);
  });
  // Remove preview
  removeBtn.addEventListener('click', () => {
    selectedFile = null;
    previewImg.src = '';
    fileInput.value = '';
    previewWrap.style.display = 'none';
    dropZone.style.display    = 'flex';
  });
  // Submit — add to gallery instantly
  submitBtn.addEventListener('click', () => {
    if (!selectedFile) {
      alert('Please choose a photo first! 🐾');
      return;
    }
    const name    = document.getElementById('uploaderName').value.trim() || 'A Happy Guest';
    const pet     = document.getElementById('petName').value.trim()      || 'Furry Friend';
    const caption = document.getElementById('uploadCaption').value.trim() || `${name} & ${pet}`;
    const reader = new FileReader();
    reader.onload = e => {
      // Build new gallery card
      const newItem = document.createElement('div');
      newItem.className = 'gal-item gal-item-new';
      newItem.dataset.cat = 'guests';
      newItem.innerHTML = `
        <img src="${e.target.result}" alt="${caption}">
        <div class="gal-overlay"><span>${caption}</span></div>
        <div class="gal-uploaded-badge">📤 New!</div>
      `;
      // Insert at beginning of grid
      galGrid.insertBefore(newItem, galGrid.firstChild);
      // Attaches lightbox click
      const allItems = document.querySelectorAll('.gal-item');
      newItem.addEventListener('click', () => {
        lbList  = Array.from(allItems);
        lbIndex = 0;
        openLb(0);
      });
      requestAnimationFrame(() => {
        newItem.style.opacity   = '0';
        newItem.style.transform = 'scale(0.85)';
        requestAnimationFrame(() => {
          newItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          newItem.style.opacity    = '1';
          newItem.style.transform  = 'scale(1)';
        });
      });
      // Show success toast
      showToast(`🐾 Photo added! Thanks, ${name}!`);
      // Reset form
      selectedFile = null;
      fileInput.value = '';
      previewImg.src  = '';
      previewWrap.style.display = 'none';
      dropZone.style.display    = 'flex';
      document.getElementById('uploaderName').value  = '';
      document.getElementById('petName').value       = '';
      document.getElementById('uploadCaption').value = '';
      // Scroll to gallery
      document.querySelector('.guest-gallery-section').scrollIntoView({ behavior: 'smooth' });
    };
    reader.readAsDataURL(selectedFile);
  });
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'gal-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('gal-toast-show'));
    setTimeout(() => {
      toast.classList.remove('gal-toast-show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
});
