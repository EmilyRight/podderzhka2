// const video1 = require('../../video/serial/s01.mp4');
// const video2 = require('../../video/serial/s02.mp4');
const video1 = 'https://podderzhka.tele2.ru/src/video/serial/s01.mp4';
const video2 = 'https://podderzhka.tele2.ru/src/video/serial/s02.mp4';
const posterSrc1 = require('../../video/serial/poster-s01.jpg');
const posterSrc2 = require('../../video/serial/poster-s02.jpg');

const videoData = [
  {
    id: 1,
    src: video1,
    posterSrc: posterSrc1,
  },
  {
    id: 2,
    src: video2,
    posterSrc: posterSrc2,
  },
];

export default videoData;
