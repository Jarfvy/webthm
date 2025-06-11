function toggleMenu() {
  const menu = document.getElementById('navbarMenu');
  const btn = document.getElementById('hamburgerBtn');
  menu.classList.toggle('show');
  btn.classList.toggle('active');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document
      .querySelector(anchor.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });

    const menu = document.getElementById('navbarMenu');
    const btn = document.getElementById('hamburgerBtn');
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      btn.classList.remove('active');
    }
  });
});

// Animasi scroll fade-in
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el);
});

// Filter berita berdasarkan input
function filterBerita() {
  const input = document.getElementById('searchBerita').value.toLowerCase();
  const items = document.querySelectorAll('#beritaList .gallery-item');
  items.forEach((item) => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(input) ? 'block' : 'none';
  });
}

// SLIDER GALERI DAN BERITA
const slideState = {
  gallery: 0,
  beritaList: 0,
};

function nextImage(id) {
  const container = document.getElementById(id);
  const items = container.querySelectorAll('.gallery-item');
  if (slideState[id] < items.length - 1) {
    slideState[id]++;
    updateSlider(container, slideState[id]);
  }
}

function prevImage(id) {
  const container = document.getElementById(id);
  if (slideState[id] > 0) {
    slideState[id]--;
    updateSlider(container, slideState[id]);
  }
}

function updateSlider(container, index) {
  const items = container.querySelectorAll('.gallery-item');
  const itemWidth = items[0].offsetWidth;

  container.style.transform = `translateX(-${itemWidth * index}px)`;

  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

// Inisialisasi slide pertama aktif saat load
window.addEventListener('DOMContentLoaded', () => {
  ['gallery', 'beritaList'].forEach((id) => {
    const container = document.getElementById(id);
    const items = container?.querySelectorAll('.gallery-item');
    if (items?.length) {
      items[0].classList.add('active');
    }
  });
});
