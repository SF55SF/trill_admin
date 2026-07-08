document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
  
    const closeMenu = () => {
      mainNav?.classList.remove('is-open');
      menuButton?.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    };
  
    menuButton?.addEventListener('click', () => {
      const isOpen = mainNav?.classList.toggle('is-open') ?? false;
  
      menuButton.classList.toggle('is-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  
    const leadForm = document.querySelector('#lead-form');
    const formNote = document.querySelector('.form-note');
  
    leadForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      if (formNote) {
        formNote.textContent = 'Отправляем заявку...';
      }
  
      const formData = new FormData(leadForm);
  
      try {
        const response = await fetch(leadForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });
  
        if (response.ok) {
          leadForm.reset();
  
          if (formNote) {
            formNote.textContent = 'Спасибо! Заявка отправлена.';
          }
        } else if (formNote) {
          formNote.textContent = 'Ошибка отправки. Попробуйте ещё раз.';
        }
      } catch {
        if (formNote) {
          formNote.textContent = 'Ошибка соединения. Попробуйте позже.';
        }
      }
    });
  
    const createLightbox = () => {
      let lightbox = document.querySelector('.image-lightbox');
  
      if (lightbox) {
        return lightbox;
      }
  
      lightbox = document.createElement('dialog');
      lightbox.className = 'image-lightbox';
      lightbox.setAttribute('aria-label', 'Просмотр изображения');
  
      lightbox.innerHTML = `
        <button class="image-lightbox-close" type="button" aria-label="Закрыть">
          ×
        </button>
        <img class="image-lightbox-img" src="" alt="" />
      `;
  
      document.body.appendChild(lightbox);
  
      const closeButton = lightbox.querySelector('.image-lightbox-close');
  
      closeButton?.addEventListener('click', () => {
        lightbox.close();
      });
  
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
          lightbox.close();
        }
      });
  
      lightbox.addEventListener('close', () => {
        document.body.classList.remove('lightbox-open');
      });
  
      return lightbox;
    };
  
    document.addEventListener('click', (event) => {
      const target = event.target;
  
      if (!(target instanceof Element)) {
        return;
      }
  
      const button = target.closest('.image-open-button');
  
      if (!button) {
        return;
      }
  
      const imageSrc = button.getAttribute('data-lightbox-src');
      const imageAlt = button.getAttribute('data-lightbox-alt') || '';
  
      if (!imageSrc) {
        return;
      }
  
      const lightbox = createLightbox();
      const lightboxImg = lightbox.querySelector('.image-lightbox-img');
  
      if (!lightboxImg) {
        return;
      }
  
      lightboxImg.src = imageSrc;
      lightboxImg.alt = imageAlt;
  
      lightbox.showModal();
      document.body.classList.add('lightbox-open');
    });
  });