import Swiper, { Lazy, Pagination } from 'swiper';
import youtube from 'youtube-iframe-player';
import { vpInstance } from './videoplayer';
const player = vpInstance();
const slidesQuantityWelcome = document.querySelectorAll(
  '.swiper-slide--welcome'
).length;
const onScreenImage = document.querySelector('.screen__image');
const videoProgressBar = document.querySelector('.video__controls_progress');
const videoPlayButton = document.querySelector('.video__controls_play-btn');
const slideCurrentNumber = document.querySelector('.slide-current');
const nextSlideButtonWelcome = document.querySelector(
  '.button__slider-welcome--next'
);
const prevSlideButtonWelcome = document.querySelector(
  '.button__slider-welcome--prev'
);
const prevSlideButtonVideo = document.querySelector(
  '.button__slider-video--prev'
);
const nextSlideButtonVideo = document.querySelector(
  '.button__slider-video--next'
);
const videoPlayer = document.querySelector('.video__player');
const videoSrcMain = [
  'assets/video/video3.mp4',
  'assets/video/video1.mp4',
  'assets/video/video2.mp4',
  'assets/video/video4.mp4',
  'assets/video/video0.mp4',
  'assets/video/video3.mp4',
  'assets/video/video1.mp4',
];
const videoPosters = [
  'assets/video/poster3.webp',
  'assets/video/poster1.webp',
  'assets/video/poster2.webp',
  'assets/video/poster4.webp',
  'assets/video/poster0.webp',
  'assets/video/poster3.webp',
  'assets/video/poster1.webp',
];
let youtubePlayer1;
let youtubePlayer2;
let youtubePlayer3;
let youtubePlayer4;
let youtubePlayer5;

videoPlayer.poster = videoPosters[1];
videoPlayer.src = videoSrcMain[1];
Swiper.use([Lazy, Pagination]);
function sliderWelcome() {
  let welcomeSlider = new Swiper('.welcome__slider', {
    speed: 600,
    lazy: true,
    loop: true,
    grabCursor: true,
    mousewheel: {
      invert: true,
    },
    pagination: {
      el: '.swiper-pagination--welcome',
      clickable: true,
    },
  });

  welcomeSlider.on('slideChange', () => {
    let activeIndex = welcomeSlider.activeIndex;
    if (activeIndex === 6) {
      activeIndex = activeIndex - slidesQuantityWelcome;
    } else if (activeIndex === 0) {
      activeIndex = slidesQuantityWelcome;
    }
    slideCurrentNumber.innerText = '0' + activeIndex;
  });

  nextSlideButtonWelcome.addEventListener('click', () => {
    welcomeSlider.slideNext();
  });
  prevSlideButtonWelcome.addEventListener('click', () => {
    welcomeSlider.slidePrev();
  });
  nextSlideButtonWelcome.addEventListener('touchend', () => {
    welcomeSlider.slideNext();
  });
  prevSlideButtonWelcome.addEventListener('touchend', () => {
    welcomeSlider.slidePrev();
  });
}

function sliderExplore() {
  const img = document.querySelector('.img__overlay');
  let clicked;
  let slider;
  let w;
  let h;

  w = img.offsetWidth;
  h = img.offsetHeight;

  img.style.width = w / 2 + 80 + 'px';

  slider = document.createElement('DIV');
  slider.setAttribute('class', 'img-comp-slider');

  img.parentElement.insertBefore(slider, img);

  slider.style.top = h / 2 - slider.offsetHeight / 2 + 11 + 'px';
  slider.style.left = w / 2 - slider.offsetWidth / 2 + 80 + 'px';

  slider.addEventListener('mousedown', slideReady);

  slider.addEventListener('mouseup', slideFinish);

  slider.addEventListener('touchstart', slideReady);

  slider.addEventListener('touchstop', slideFinish);
  function slideReady(e) {
    e.preventDefault();

    clicked = 1;

    window.addEventListener('mousemove', slideMove);
    window.addEventListener('touchmove', slideMove);
  }
  function slideFinish() {
    clicked = 0;
  }
  function slideMove(e) {
    let pos;

    if (clicked == 0) return false;

    pos = getCursorPos(e);

    if (pos < 0) pos = 0;
    if (pos > w) pos = w;

    slide(pos);
  }
  function getCursorPos(e) {
    let a,
      x = 0;
    e = e || window.event;

    a = img.getBoundingClientRect();

    x = e.pageX - a.left;

    x = x - window.scrollX;

    return x;
  }
  function slide(x) {
    img.style.width = x + 'px';
    slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
  }
}

function sliderVideo() {
  //const swiperSlidesVideo = document.querySelectorAll('.swiper-slide--video');
  /*  const videoSrc = [
    'https://www.youtube.com/embed/aWmJ5DgyWPI',
    'https://www.youtube.com/embed/Vi5D6FKhRmo',
    'https://www.youtube.com/embed/NOhDysLnTvY',
    'https://www.youtube.com/embed/2OR0OCr6uRE',
    'https://www.youtube.com/embed/zp1BXPX8jcU',
  ]; */
  /*   const videoSrc = [
    'aWmJ5DgyWPI',
    'Vi5D6FKhRmo',
    'NOhDysLnTvY',
    '2OR0OCr6uRE',
    'zp1BXPX8jcU',
  ]; */
  youtube.init(function () {
    youtubePlayer1 = youtube.createPlayer('player-1', {
      videoId: 'aWmJ5DgyWPI',
      host: 'https://www.youtube.com',
      events: {
        onStateChange: onPlayer1StateChange,
      },
    });
    youtubePlayer2 = youtube.createPlayer('player-2', {
      videoId: 'Vi5D6FKhRmo',
      host: 'https://www.youtube.com',
      events: {
        onStateChange: onPlayer2StateChange,
      },
    });
    youtubePlayer3 = youtube.createPlayer('player-3', {
      videoId: 'NOhDysLnTvY',
      host: 'https://www.youtube.com',
      events: {
        onStateChange: onPlayer3StateChange,
      },
    });
    youtubePlayer4 = youtube.createPlayer('player-4', {
      videoId: '2OR0OCr6uRE',
      host: 'https://www.youtube.com',
      events: {
        onStateChange: onPlayer4StateChange,
      },
    });

    youtubePlayer5 = youtube.createPlayer('player-5', {
      videoId: 'zp1BXPX8jcU',
      host: 'https://www.youtube.com',
      events: {
        onStateChange: onPlayer5StateChange,
      },
    });
    function checkMainPlayer() {
      if (!player.paused) {
        player.pause();
        player.progressReset();
        onScreenImage.style.opacity = '1';

        videoProgressBar.style.background =
          'linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)';
        videoProgressBar.value = 0;
        videoPlayButton.style.backgroundImage = 'url(assets/img/png/play.png)';
      }
    }
    function onPlayer1StateChange() {
      if (youtubePlayer1.getPlayerState() === 1) {
        checkMainPlayer();
      }

      if (youtubePlayer2.getPlayerState() === 1) {
        youtubePlayer2.stopVideo();
      }
      if (youtubePlayer3.getPlayerState() === 1) {
        youtubePlayer3.stopVideo();
      }
      if (youtubePlayer4.getPlayerState() === 1) {
        youtubePlayer4.stopVideo();
      }
      if (youtubePlayer5.getPlayerState() === 1) {
        youtubePlayer5.stopVideo();
      }
    }
    function onPlayer2StateChange() {
      if (youtubePlayer2.getPlayerState() === 1) {
        checkMainPlayer();
      }
      if (youtubePlayer1.getPlayerState() === 1) {
        youtubePlayer1.stopVideo();
      }
      if (youtubePlayer3.getPlayerState() === 1) {
        youtubePlayer3.stopVideo();
      }
      if (youtubePlayer4.getPlayerState() === 1) {
        youtubePlayer4.stopVideo();
      }
      if (youtubePlayer5.getPlayerState() === 1) {
        youtubePlayer5.stopVideo();
      }
    }
    function onPlayer3StateChange() {
      if (youtubePlayer3.getPlayerState() === 1) {
        checkMainPlayer();
      }
      if (youtubePlayer1.getPlayerState() === 1) {
        youtubePlayer1.stopVideo();
      }
      if (youtubePlayer2.getPlayerState() === 1) {
        youtubePlayer2.stopVideo();
      }
      if (youtubePlayer4.getPlayerState() === 1) {
        youtubePlayer4.stopVideo();
      }
      if (youtubePlayer5.getPlayerState() === 1) {
        youtubePlayer5.stopVideo();
      }
    }
    function onPlayer4StateChange() {
      if (youtubePlayer4.getPlayerState() === 1) {
        checkMainPlayer();
      }
      if (youtubePlayer1.getPlayerState() === 1) {
        youtubePlayer1.stopVideo();
      }
      if (youtubePlayer2.getPlayerState() === 1) {
        youtubePlayer2.stopVideo();
      }
      if (youtubePlayer3.getPlayerState() === 1) {
        youtubePlayer3.stopVideo();
      }
      if (youtubePlayer5.getPlayerState() === 1) {
        youtubePlayer5.stopVideo();
      }
    }
    function onPlayer5StateChange() {
      if (youtubePlayer5.getPlayerState() === 1) {
        checkMainPlayer();
      }
      if (youtubePlayer1.getPlayerState() === 1) {
        youtubePlayer1.stopVideo();
      }
      if (youtubePlayer2.getPlayerState() === 1) {
        youtubePlayer2.stopVideo();
      }
      if (youtubePlayer3.getPlayerState() === 1) {
        youtubePlayer3.stopVideo();
      }
      if (youtubePlayer4.getPlayerState() === 1) {
        youtubePlayer4.stopVideo();
      }
    }

    /*   videoSrc.map((value, index) => {
    const iframe = document.createElement('iframe');
    iframe.src = value;
    iframe.loading = 'lazy';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowfullscreen = 'true';
    iframe.title = 'YouTube video player';
    swiperSlidesVideo[index].append(iframe);
  }); */

    let videoSlider = new Swiper('.video__slider', {
      slidesPerView: 3,
      spaceBetween: 42,
      speed: 600,
      lazy: true,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination--video',
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 42,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        420: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        375: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });

    videoSlider.on('slideChange', () => {
      let activeIndex = videoSlider.activeIndex;
      videoPlayer.poster = videoPosters[activeIndex - 2];
      videoPlayer.src = videoSrcMain[activeIndex - 2];

      onScreenImage.style.opacity = 1;
      videoProgressBar.value = 0;
      videoProgressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${0}%, #c4c4c4 ${0}%, #c4c4c4 100%)`;
      videoPlayButton.style.backgroundImage = 'url(assets/img/png/play.png)';
      if (youtubePlayer1.getPlayerState() === 1) {
        youtubePlayer1.stopVideo();
      }
      if (youtubePlayer2.getPlayerState() === 1) {
        youtubePlayer2.stopVideo();
      }
      if (youtubePlayer3.getPlayerState() === 1) {
        youtubePlayer3.stopVideo();
      }
      if (youtubePlayer4.getPlayerState() === 1) {
        youtubePlayer4.stopVideo();
      }
      if (youtubePlayer5.getPlayerState() === 1) {
        youtubePlayer5.stopVideo();
      }
    });
    nextSlideButtonVideo.addEventListener('click', () => {
      videoSlider.slideNext();
    });
    prevSlideButtonVideo.addEventListener('click', () => {
      videoSlider.slidePrev();
    });
    nextSlideButtonVideo.addEventListener('touchend', () => {
      videoSlider.slideNext();
    });
    prevSlideButtonVideo.addEventListener('touchend', () => {
      videoSlider.slidePrev();
    });
  });
}
function youtubePlayerInstance() {
  return [
    youtubePlayer1,
    youtubePlayer2,
    youtubePlayer3,
    youtubePlayer4,
    youtubePlayer5,
  ];
}
export { sliderWelcome, sliderExplore, sliderVideo, youtubePlayerInstance };
