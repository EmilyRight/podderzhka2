/* eslint-disable no-param-reassign */
export default class AnimationOnScroll {
  scrollInitBlock = document.querySelector('.scroll-event');

  smallDigits = document.querySelectorAll('.js-count-small');

  largeDigits = document.querySelector('.js-count-large');

  sectionLayers = document.querySelector('.section--tree');

  lastScroll = 0;

  setAnimationOnScroll(scrollElement, elementsArray, animationStep, timingFunction) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setAnimationOnDigits(elementsArray, animationStep, timingFunction);
        }
      });
    });
    observer.observe(scrollElement);
  }

  setOnPoint(section, className) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleClassList(section, className);
        }
      });
    });
    observer.observe(section);
  }

  scrollDetect() {
    let direction = '';
    const currentScroll = document.documentElement.scrollTop
    || document.body.scrollTop;
    if (currentScroll > 0 && this.lastScroll <= currentScroll) {
      this.lastScroll = currentScroll;
      direction = 'down';
    } else if (currentScroll > 0 && this.lastScroll >= currentScroll) {
      this.lastScroll = currentScroll;
      direction = 'up';
    }
    return direction;
  }

  handleClassList(section, className) {
    const direction = this.scrollDetect();
    if (section.classList.contains(className) && direction === 'up') {
      section.classList.remove(className);
    } else {
      section.classList.add(className);
    }
  }

  setInterval(item, animationStep, timingFunction) {
    let initialNumber = 0;
    const finalNumber = Number(item.innerHTML);
    const step = animationStep;
    const interval = setInterval(() => {
      initialNumber += step;
      if (initialNumber === finalNumber) {
        clearInterval(interval);
      }

      item.innerHTML = `${initialNumber}`;
    }, timingFunction);
  }

  setAnimationOnDigits(elements, animationStep, timingFunction) {
    if (elements.length) {
      elements.forEach((element) => {
        this.setInterval(element, animationStep, timingFunction);
      });
    } else {
      this.setInterval(elements, animationStep, timingFunction);
    }
  }

  handleScroll() {
    this.setOnPoint(this.sectionLayers, 'on_point');
  }

  init() {
    this.setAnimationOnScroll(this.scrollInitBlock, this.smallDigits, 1, 100);
    this.setAnimationOnScroll(this.scrollInitBlock, this.largeDigits, 1, 7);
  }
}
