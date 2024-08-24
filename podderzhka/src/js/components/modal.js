import galleryData from '../constants/gallery';

const hidden = 'popup-modal-hidden';
const active = 'modal-box-active';
const noscroll = 'modal-box-viewed';
const closeIconClassName = 'close';
const { body } = document;

export function openModal(modalBoxId, imageId) {
  const modalBox = document.querySelector(modalBoxId);
  const modalContainer = modalBox.closest('.popup-modal');
  const img = modalBox.querySelector('.popup-modal__img');
  body.style.paddingRight = `${getScrollbarWidth()}px`;
  body.classList.add(noscroll);
  modalContainer.classList.remove(hidden);
  modalBox.classList.add(active);

  if (img) {
    setImgSrc(img, imageId);
  }

  function setImgSrc(image, id) {
    const [galleryItem] = galleryData.filter((item) => item.id === id);
    image.src = galleryItem.src;
  }

  // закрыть эту модалку
  modalContainer.addEventListener('click', (e) => {
    const { target } = e;
    const closeModalButton = (
      target.classList.contains(closeIconClassName))
      ? target
      : target.closest(`.${closeIconClassName}`);

    if (!target.closest('.modal-box') || closeModalButton) {
      closeModal(modalBoxId);
    }
  });
}

function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  const windowsWidth = window.innerWidth;
  const scrollbarWidth = windowsWidth - documentWidth;
  return scrollbarWidth;
}

export function closeModal(modalBoxId) {
  const modalBox = document.querySelector(modalBoxId);
  body.classList.remove(noscroll);
  modalBox.classList.remove(active);
  body.style.paddingRight = '0px';
  modalBox.closest('.popup-modal').classList.add(hidden);
}

export function openMenu(icon) {
  const navMenu = document.querySelector('.header-nav');
  navMenu.classList.toggle('_opened');
  icon.classList.toggle('_opened');
  body.classList.toggle(noscroll);
}
