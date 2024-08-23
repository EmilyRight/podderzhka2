const swiperOptions = [
  {
    id: 'office',
    options: {
      slidesPerView: 1.38,
      spaceBetween: 12,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        600: {
          spaceBetween: 24,
          slidesPerView: 3,
        },
      },
    },
  },
  {
    id: 'stories',
    options: {
      slidesPerView: 1.12,
      spaceBetween: 12,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        600: {
          spaceBetween: 24,
          slidesPerView: 3,
        },
      },
    },
  },
  {
    id: 'reviews',
    options: {
      slidesPerView: 1.36,
      spaceBetween: 12,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        600: {
          spaceBetween: 12,
          slidesPerView: 3,
        },
      },
    },
  },

];

export default swiperOptions;
