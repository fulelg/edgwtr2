class Slider {
    constructor(sliderSelector, trackSelector, indicatorsSelector, buttonId, isReverse = false) {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.isReverse = isReverse;
        
        this.sliderTrack = document.querySelector(trackSelector);
        this.indicators = document.querySelectorAll(indicatorsSelector);
        this.nextButton = document.getElementById(buttonId);
        
        this.init();
    }
    
    init() {
        // Обработчик для кнопки "следующий"
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Обработчики для индикаторов
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Автоматическое переключение каждые 5 секунд
        this.autoPlay();
    }
    
    nextSlide() {
        if (this.isReverse) {
            // Для обратного слайдера двигаемся влево (уменьшаем индекс)
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        } else {
            // Для обычного слайдера двигаемся вправо (увеличиваем индекс)
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        }
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        // Обновляем позицию слайдера
        let translateX;
        if (this.isReverse) {
            // Для обратного направления: начинаем с последнего слайда и двигаемся влево
            translateX = -((this.totalSlides - 1 - this.currentSlide) * 20);
            console.log('Reverse slider - currentSlide:', this.currentSlide, 'translateX:', translateX);
        } else {
            translateX = -this.currentSlide * 20; // Для обычного направления
        }
        this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        
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
        }, 5000); // 5 секунд
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
        const translateX = -this.currentIndex * 20; // 20% на каждый элемент (5 элементов)
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
        const translateX = -this.currentIndex * 20; // 20% на каждый элемент (5 элементов)
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

function enableSwipeSlider(trackSelector, slidesCount, isReverse = false, indicatorsSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  let current = isReverse ? slidesCount - 1 : 0;
  let startX = 0;
  let isTouch = false;

  const container = track.parentElement; // .slider-container
  const indicators = indicatorsSelector ? document.querySelectorAll(indicatorsSelector) : null;

  function setActiveDot() {
    if (!indicators) return;
    indicators.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function update() {
    const step = 100 / slidesCount; // ширина одного слайда в процентах
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
    const track = document.querySelector(trackSelector);
    if (!track) return;
    const container = track.parentElement;
    const items = track.querySelectorAll(itemSelector);
    if (items.length === 0) return;

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
}

// Инициализация слайдеров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Первый слайдер (обычное направление)
    new Slider('.section-2-slider', '.slider-track', '.section-2-slider .indicator', 'nextSlide', false);
    
    // Второй слайдер (обратное направление)
    new Slider('.section-3-slider', '.slider-track-reverse', '.section-3-slider .indicator', 'prevSlide', true);
    
    // Галерея удобств
    new AmenitiesGallery();
    
    // Галерея проектов
    new ProjectsGallery();
}); 

// Инициализация свайп-слайдеров на мобильных
window.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    enableSwipeSlider('.section-2 .slider-track', 5, false, '.section-2 .indicator');
    enableSwipeSlider('.section-3 .slider-track-reverse', 5, true, '.section-3 .indicator');
    enableSwipeSlider('.amenities-track', 4, false, '.amenities-indicators .indicator');
    // Секция 6: шаг по ширине карточки (item + gap), сохраняет превью и делает свайп "большим"
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

  // Download & open brochure PDF
  const brochureBtn = document.querySelector('.section-1-brochure-button');
  brochureBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const url = 'pdf/Brochure.pdf';
    // open in new tab
    // window.open(url, '_blank');
    // trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Brochure.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}); 