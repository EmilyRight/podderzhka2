/* eslint-disable import/no-unresolved */
const { default: videoData } = require('../constants/videoData');

const CLASS_SERIES_BTN = 'js-play-serial';
const CLASS_VIDEO_BOX = 'video-box__frame';
const CLASS_VIDEO = 'video-series';
const CLASS_VIDEO_PLAY_BTN = 'video__play-button';
const CLASS_VIDEO_ISPLAYING = '_isPlaying';
const CLASS_BTN_ACTIVE = '_active';
const videoBtns = document.querySelectorAll(`.${CLASS_SERIES_BTN}`);
const videoBox = document.querySelector(`.${CLASS_VIDEO_BOX}`);
const video = document.querySelector(`.${CLASS_VIDEO}`);
const videoPlayBtn = document.querySelector(`.${CLASS_VIDEO_PLAY_BTN}`);
const videoShortsList = document.querySelectorAll('.video-shorts');

function switchVideo() {
  videoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      clearActive(videoBtns);
      btn.classList.add(CLASS_BTN_ACTIVE);
      pauseVideo(video, videoBox);
      const { series } = btn.dataset;
      const [videoDataItem] = videoData.filter((item) => item.id === Number(series));
      video.src = videoDataItem.src;
      video.poster = videoDataItem.posterSrc;
      playVideo();
    });
  });
}

function playVideoSlider() {
  videoShortsList.forEach((videoItem) => {
    const slide = videoItem.closest('.swiper-slide');
    const videoShorts = slide.querySelector('.video-shorts');
    videoItem.addEventListener('click', () => {
      if (videoShorts.paused) {
        clearPlaying();
        playVideo(videoShorts, slide);
      } else {
        pauseVideo(videoShorts, slide);
      }
    });

    videoItem.addEventListener('ended', () => {
      endVideo(videoShorts, slide);
    });
  });
}

function clearPlaying() {
  videoShortsList.forEach((videoItem) => {
    const slide = videoItem.closest('.swiper-slide');
    if (slide.classList.contains('_isPlaying')) {
      endVideo(videoItem, slide);
    }
  });
}

function clearActive(elementsArr) {
  elementsArr.forEach((el) => el.classList.remove(CLASS_BTN_ACTIVE));
}

function handlePlayPause() {
  video.addEventListener('play', () => {
    videoBox.classList.add(CLASS_VIDEO_ISPLAYING);
  });

  video.addEventListener('pause', () => {
    videoBox.classList.remove(CLASS_VIDEO_ISPLAYING);
  });

  video.addEventListener('pause', () => {
    videoBox.classList.remove(CLASS_VIDEO_ISPLAYING);
  });

  video.addEventListener('ended', () => {
    endVideo(video, videoBox);
  });

  videoPlayBtn.addEventListener('click', () => {
    if (video.paused) {
      playVideo(video, videoBox);
    }
  });
}
function playVideo(videoElem, boxElem) {
  boxElem.classList.add(CLASS_VIDEO_ISPLAYING);
  videoElem.play();
}

function pauseVideo(videoElem, boxElem) {
  boxElem.classList.remove(CLASS_VIDEO_ISPLAYING);
  videoElem.pause();
}

function endVideo(videoElem, boxElem) {
  boxElem.classList.remove(CLASS_VIDEO_ISPLAYING);
  videoElem.pause();
  videoElem.currentTime = 0;
}

export { switchVideo, handlePlayPause, playVideoSlider };
