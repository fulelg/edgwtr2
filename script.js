class Slider {
    constructor(sliderSelector, trackSelector, indicatorsSelector, buttonId, isReverse = false) {
        this.isReverse = isReverse;
        this.sliderTrack = document.querySelector(trackSelector);
        this.indicators = document.querySelectorAll(indicatorsSelector);
        this.nextButton = document.getElementById(buttonId);
        // динамически определяем количество слайдов
        this.totalSlides = this.sliderTrack ? this.sliderTrack.children.length : 5;
        this.stepPercent = 100 / this.totalSlides;
        this.currentSlide = 0;
        this.init();
    }
    init() {
        // установить ширину трека и каждого слайда под количество элементов
        if (this.sliderTrack) {
            this.sliderTrack.style.width = `${this.totalSlides * 100}%`;
            Array.from(this.sliderTrack.children).forEach((el) => {
                el.style.width = `${this.stepPercent}%`;
                el.style.flexShrink = '0';
            });
        }
        // Обработчик для кнопки "следующий"
        this.nextButton?.addEventListener('click', () => {
            this.nextSlide();
        });
        // Обработчики для индикаторов
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        // Первичное применение состояния
        this.updateSlider();
        // Автоматическое переключение каждые 5 секунд
        this.autoPlay();
    }
    nextSlide() {
        if (this.isReverse) {
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        } else {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        }
        this.updateSlider();
    }
    goToSlide(index) {
        if (index < 0) index = 0;
        if (index > this.totalSlides - 1) index = this.totalSlides - 1;
        this.currentSlide = index;
        this.updateSlider();
    }
    updateSlider() {
        // Обновляем позицию слайдера
        let translateX;
        if (this.isReverse) {
            translateX = -((this.totalSlides - 1 - this.currentSlide) * this.stepPercent);
        } else {
            translateX = -(this.currentSlide * this.stepPercent);
        }
        if (this.sliderTrack) {
            this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        }
        // Обновляем активный индикатор
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    autoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

class AmenitiesGallery {
    constructor() {
        this.currentIndex = 0;
        this.totalItems = 1;
        this.track = document.querySelector('.amenities-track');
        this.prevButton = document.querySelector('.amenity-prev');
        this.nextButton = document.querySelector('.amenity-next');
        this.init();
    }
    init() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prevItem();
            });
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextItem();
            });
        }
    }
    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateGallery();
    }
    prevItem() {
        this.currentIndex = this.currentIndex === 0 ? this.totalItems - 1 : this.currentIndex - 1;
        this.updateGallery();
    }
    updateGallery() {
        const translateX = -this.currentIndex * 20;
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

class ProjectsGallery {
    constructor() {
        this.currentIndex = 0;
        this.totalItems = 5;
        this.track = document.querySelector('.projects-track');
        this.prevButton = document.querySelector('.project-prev');
        this.nextButton = document.querySelector('.project-next');
        this.init();
    }
    init() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prevItem();
            });
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextItem();
            });
        }
    }
    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateGallery();
    }
    prevItem() {
        this.currentIndex = this.currentIndex === 0 ? this.totalItems - 1 : this.currentIndex - 1;
        this.updateGallery();
    }
    updateGallery() {
        const translateX = -this.currentIndex * 20;
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

class HorizontalGallery {
    constructor(trackSelector, prevSelector, nextSelector, totalItems = 5) {
        this.currentIndex = 0;
        this.totalItems = totalItems;
        this.track = document.querySelector(trackSelector);
        this.prevButton = document.querySelector(prevSelector);
        this.nextButton = document.querySelector(nextSelector);
        if (!this.track) return;
        this.init();
    }
    init() {
        this.prevButton?.addEventListener('click', () => this.prev());
        this.nextButton?.addEventListener('click', () => this.next());
    }
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.apply();
    }
    prev() {
        this.currentIndex = this.currentIndex === 0 ? this.totalItems - 1 : this.currentIndex - 1;
        this.apply();
    }
    apply() {
        const translateX = -this.currentIndex * 20;
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

function enableSwipeSlider(trackSelector, slidesCount, isReverse = false, indicatorsSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  let current = isReverse ? slidesCount - 1 : 0;
  let startX = 0;
  let isTouch = false;
  const container = track.parentElement;
  const indicators = indicatorsSelector ? document.querySelectorAll(indicatorsSelector) : null;
  function setActiveDot() {
    if (!indicators) return;
    indicators.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function update() {
    const step = 100 / slidesCount;
    const percent = -current * step;
    track.style.transition = 'transform 0.35s ease';
    track.style.transform = `translateX(${percent}%)`;
    setActiveDot();
  }
  function onStart(e) {
    isTouch = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    track.style.transition = 'none';
  }
  function onMove(e) {
    if (!isTouch) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const dx = x - startX;
    const percentDx = (dx / container.clientWidth) * (100 / slidesCount);
    const step = 100 / slidesCount;
    const base = -current * step;
    track.style.transform = `translateX(${base + percentDx}%)`;
  }
  function onEnd(e) {
    if (!isTouch) return;
    isTouch = false;
    const x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
    const dx = x - startX;
    const threshold = container.clientWidth * 0.15;
    if (Math.abs(dx) > threshold) {
      if (dx < 0) current = Math.min(current + 1, slidesCount - 1);
      else current = Math.max(current - 1, 0);
    }
    update();
  }
  container.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchmove', onMove, { passive: true });
  container.addEventListener('touchend', onEnd);
  container.addEventListener('mousedown', onStart);
  container.addEventListener('mousemove', onMove);
  container.addEventListener('mouseup', onEnd);
  container.addEventListener('mouseleave', onEnd);
  update();
}

function enableSwipeSliderByItemWidth(trackSelector, itemSelector) {
    const tracks = document.querySelectorAll(trackSelector);
    if (!tracks.length) return;
    tracks.forEach((track) => {
        const container = track.parentElement;
        const items = track.querySelectorAll(itemSelector);
        if (items.length === 0 || !container) return;
        const getGap = () => {
            const cs = getComputedStyle(track);
            const g = (cs.gap || cs.columnGap || '0').toString();
            const val = parseFloat(g);
            return isNaN(val) ? 0 : val;
        };
        function measure() {
            const gap = getGap();
            const itemWidth = items[0].getBoundingClientRect().width;
            const stepPx = itemWidth + gap;
            const maxIndex = Math.max(0, Math.floor((track.scrollWidth - container.clientWidth + 1) / stepPx));
            return { stepPx, maxIndex };
        }
        let { stepPx, maxIndex } = measure();
        let current = 0;
        let startX = 0;
        let isTouch = false;
        function apply() {
            track.style.transition = 'transform 0.35s ease';
            track.style.transform = `translateX(${-current * stepPx}px)`;
        }
        function onStart(e) {
            isTouch = true;
            startX = (e.touches ? e.touches[0].clientX : e.clientX);
            track.style.transition = 'none';
        }
        function onMove(e) {
            if (!isTouch) return;
            const x = (e.touches ? e.touches[0].clientX : e.clientX);
            const dx = x - startX;
            track.style.transform = `translateX(${(-current * stepPx) + dx}px)`;
        }
        function onEnd(e) {
            if (!isTouch) return;
            isTouch = false;
            const x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
            const dx = x - startX;
            const threshold = container.clientWidth * 0.15;
            if (Math.abs(dx) > threshold) {
                if (dx < 0) current = Math.min(current + 1, maxIndex);
                else current = Math.max(current - 1, 0);
            }
            apply();
        }
        window.addEventListener('resize', () => {
            const m = measure();
            stepPx = m.stepPx;
            maxIndex = m.maxIndex;
            apply();
        });
        container.addEventListener('touchstart', onStart, { passive: true });
        container.addEventListener('touchmove', onMove, { passive: true });
        container.addEventListener('touchend', onEnd);
        container.addEventListener('mousedown', onStart);
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseup', onEnd);
        container.addEventListener('mouseleave', onEnd);
        apply();
    });
}

// Инициализация слайдеров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // EW слайдеры
    new Slider('.section-ew', '.section-ew .slider-track', '.section-ew .indicator', 'ewNext', false);
    new Slider('.ew-2', '.ew-2 .slider-track', '.ew-2 .indicator', 'ewNext2', false);
    new Slider('.ew-3', '.ew-3 .slider-track', '.ew-3 .indicator', 'ewNext3', false);

    // AMENITIES: outdoor (обычное направление)
    new Slider('.amenities-outdoor', '.amenities-outdoor .slider-track', '.amenities-outdoor .indicator', 'amenOutNext', false);
    // AMENITIES: indoor (обратное направление) — стрелка слева
    new Slider('.amenities-indoor', '.amenities-indoor .slider-track-reverse', '.amenities-indoor .indicator', 'amenInPrev', true);

    // Interior galleries (living/bedroom/bathroom)
    new HorizontalGallery('.living-track', '.living-prev', '.living-next', 13);
    new HorizontalGallery('.bedroom-track', '.bedroom-prev', '.bedroom-next', 14);
    new HorizontalGallery('.bathroom-track', '.bathroom-prev', '.bathroom-next', 4);
}); 

// Инициализация свайп-слайдеров на мобильных
window.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    enableSwipeSlider('.amenities-outdoor .slider-track', 5, false, '.amenities-outdoor .indicator');
    enableSwipeSlider('.amenities-indoor .slider-track-reverse', 3, true, '.amenities-indoor .indicator');
    enableSwipeSlider('.section-ew .slider-track', 5, false, '.section-ew .indicator');
    enableSwipeSlider('.ew-2 .slider-track', 5, false, '.ew-2 .indicator');
    enableSwipeSlider('.ew-3 .slider-track', 5, false, '.ew-3 .indicator');
    enableSwipeSliderByItemWidth('.projects-track', '.project-item');
  }
});

// Mobile menu toggle
window.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  const links = document.querySelectorAll('.mobile-link');
  function closeMenu() {
    burger?.classList.remove('active');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }
  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    const opened = mobileMenu.classList.contains('open');
    document.body.style.overflow = opened ? 'hidden' : '';
  });
  closeBtn?.addEventListener('click', closeMenu);
  links.forEach((l) => l.addEventListener('click', closeMenu));
  const brochureBtn = document.querySelector('.section-1-brochure-button');
  brochureBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const url = 'pdf/Brochure.pdf';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Brochure.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  // CONTACT US (footer section-building) — поведение как у кнопки в хедере
  const headerContactBtn = document.querySelector('.contact-us');
  const buildingContactBtn = document.querySelector('.cta-contact-us');
  buildingContactBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    headerContactBtn?.click();
  });
}); 

// Header video: use a lighter/mobile teaser video on small screens
(function() {
    const LOCAL_MOBILE = 'vid/preview.mp4';
    const LOCAL_DESKTOP = 'vid/preview.mp4';
    const IS_GITHUB_PAGES = /github\.io$/.test(location.hostname);
    const MOBILE_SRC = LOCAL_MOBILE;
    const DESKTOP_SRC = LOCAL_DESKTOP;
    const LOCAL_DESKTOP_POSTER = 'img/Copy of A_Pti4ka_1 1.png';
    const LOCAL_MOBILE_POSTER = 'img/image copy.png';
  
    function setHeaderVideoByViewport() {
      const video = document.querySelector('.header-video');
      if (!video) return;
      const source = video.querySelector('source');
      if (!source) return;
      // Гарантируем параметры для iOS автоплея
      video.muted = true;
      video.setAttribute('muted', 'muted');
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const target = isMobile ? MOBILE_SRC : DESKTOP_SRC;
      const poster = isMobile ? LOCAL_MOBILE_POSTER : LOCAL_DESKTOP_POSTER;
      const messengerText = document.querySelectorAll('.messenger-text');
      messengerText[0].textContent = !isMobile ? 'WhatsApp' : '';
      messengerText[1].textContent = !isMobile ? 'Instagram' : '';
  
      if (video.getAttribute('poster') !== poster) {
        video.setAttribute('poster', poster);
      }
      if (source.getAttribute('src') === target) return;
      source.setAttribute('src', target);
      video.load();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {});
      }
      // iOS Chrome/Safari: запустить при первом взаимодействии
      const onFirstTouch = () => {
        video.play().catch(() => {});
        window.removeEventListener('touchstart', onFirstTouch);
        window.removeEventListener('click', onFirstTouch);
      };
      window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });
      window.addEventListener('click', onFirstTouch, { once: true });
    }
  
    window.addEventListener('DOMContentLoaded', setHeaderVideoByViewport);
    window.addEventListener('resize', setHeaderVideoByViewport);
  })();