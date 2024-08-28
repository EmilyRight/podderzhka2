import { WOW } from './vendor/wow.min';
import Swiper from './vendor/swiper.min';
import { openMenu, openModal } from './components/modal';
import swiperOptions from './constants/swiperOptions';
import { switchVideo, playVideoSlider, handlePlayPause } from './components/videoSeries';
import AnimationOnScroll from './components/scrollEvents';
import GTMEvents from './gtmEvents';

const wow = new WOW();
const GTM = new GTMEvents();
GTM.addEventListeners();
const animation = new AnimationOnScroll();

document.addEventListener('DOMContentLoaded', () => {
  wow.init();
  GTM.addEventListeners();
  animation.init();
  setEventListeners();
  handleFaqOpening();
  openPopup();
  handleSlider();
  getCurrentYear();
  scrollTeaser();
  switchVideo();
  handlePlayPause();
  playVideoSlider();
});

function setActive(arr) {
  const activeClassName = 'active';
  arr.forEach((el) => {
    const itemText = el.querySelector('.item__text');
    if (el.classList.contains(activeClassName)) {
      itemText.style.transition = 'none';
      el.classList.remove(activeClassName);
    }
  });
}

function handleFaqOpening() {
  const itemsList = document.querySelectorAll('.openup-list__item');
  const activeClassName = 'active';
  itemsList.forEach((item) => {
    item.addEventListener('click', () => {
      const section = item.closest('.section');
      const itemText = item.querySelector('.item__text');
      if (item.classList.contains(activeClassName)) {
        itemText.style.transition = 'none';
        section.classList.remove(activeClassName);
        item.classList.remove(activeClassName);
      } else {
        setActive(itemsList);
        itemText.style.transition = '0.2s ease-in-out';
        section.classList.add(activeClassName);
        item.classList.add(activeClassName);
      }
    });
  });
}

// open pop-up modal
function openPopup() {
  const popupLinksList = document.querySelectorAll('.open-popup-modal');
  popupLinksList.forEach((link) => {
    const { popup, id } = link.dataset;
    link.removeEventListener('click', openModal);
    link.addEventListener('click', () => {
      console.log('click');
      openModal(`#${popup}`, id);
    });
  });
}

function handleSlider() {
  const sliderSections = document.querySelectorAll('.section-slider');
  sliderSections.forEach((section) => {
    const { id } = section;
    const swiperContainer = section.querySelector('.swiper-container');
    const [optionsObj] = swiperOptions.filter((option) => option.id === id);
    const swiper = new Swiper(swiperContainer, optionsObj.options);
    swiper.init();
    swiper.on('activeIndexChange', openPopup);
  });
}

function getCurrentYear() {
  const yearSpan = document.querySelectorAll('.current-year');
  yearSpan.forEach((span) => {
    span.innerHTML = new Date().getFullYear().toString();
  });
}

function scrollToElement(el, header) {
  const offs = 0;
  const headerHeight = header || 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs - headerHeight;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser() {
  const { hash } = window.location;
  if (hash) {
    const id = hash.slice(1);
    const section = document.getElementById(id);
    scrollToElement(section);
  }
}

function handleMenu(event) {
  const noscroll = 'modal-box-viewed';
  const { body } = document;
  const { section } = event.currentTarget.dataset;
  const sectionsList = document.querySelectorAll('.section');
  const burgerIcon = document.querySelector('.burger-icon');
  const header = document.querySelector('.header');
  const y = header.getBoundingClientRect().bottom;
  sectionsList.forEach((item) => {
    if (item.id === section) {
      scrollToElement(item, y);
      openMenu(burgerIcon);
      body.classList.remove(noscroll);
    }
  });
}

function setEventListeners() {
  const menuItems = document.querySelectorAll('.menu__item');
  const burgerIcon = document.querySelector('.burger-icon');
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => handleMenu(e));
  });
  burgerIcon.addEventListener('click', () => openMenu(burgerIcon));
}
