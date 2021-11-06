const wrapper = document.querySelector('.video__player_wrapper');
const video = document.querySelector('.video__player');
const videoPlayButton = document.querySelector('.video__controls_play-btn');
const onScreenImage = document.querySelector('.screen__image');
const videoFullscreenButton = document.querySelector(
  '.video__controls_fullscreen-btn'
);
const videoVolumeBar = document.querySelector('.video__controls_volume');
const videoProgressBar = document.querySelector('.video__controls_progress');
const videoVolumeButton = document.querySelector('.video__controls_volume-btn');
const videoControls = document.querySelector('.video__controls');
const videoControlsHeight = videoControls.offsetHeight;
const videoSpeedText = document.querySelector('.video__speed');
let vp = null;
class Player {
  constructor(instance) {
    this.volume = 0.42;
    this.videoDuration = 0;
    this.videoCurrentTime = 0;
    this.videoPlayer = instance;
    this.videoProgressValue = 0;
    this.videoPlayer.addEventListener('loadeddata', () => {
      this.videoDuration = this.videoPlayer.duration;
      this.videoCurrentTime = this.videoPlayer.currentTime;
      videoProgressBar.value = 0;
      this.setBackgroundGradient(videoProgressBar, 0);
    });
    this.videoPlayer.addEventListener('ended', () => {
      videoPlayButton.style.backgroundImage = 'url(assets/img/png/play.png)';
      onScreenImage.style.opacity = 1;
      videoProgressBar.value = 0;
      this.setBackgroundGradient(videoProgressBar, 0);
    });
    this.videoPlayer.addEventListener('timeupdate', this.progress);
    this.setBackgroundGradient(videoVolumeBar, this.volume * 100);
  }
  videoManage() {
    if (this.videoPlayer.paused) {
      this.videoPlayer.play(), (onScreenImage.style.opacity = 0);
      videoPlayButton.style.backgroundImage = 'url(assets/img/png/pause.png)';
      import('./slider').then((module) => {
        let youTubePlayerArr = module.youtubePlayerInstance();
        youTubePlayerArr.forEach((ytplayer) => {
          ytplayer.stopVideo();
        });
      });
    } else {
      this.videoPlayer.pause(),
        (onScreenImage.style.opacity = 1),
        (videoPlayButton.style.backgroundImage =
          'url(assets/img/png/play.png)');
    }
  }
  toggleFullscreenMode() {
    if (document.fullscreenElement?.className === 'video__player_wrapper') {
      document.exitFullscreen();
      videoControls.style.bottom = `${-videoControlsHeight}` + 'px';
      videoFullscreenButton.style.backgroundImage =
        'url(assets/img/png/fullscreen.png)';
    } else {
      wrapper.requestFullscreen();
      videoControls.style.bottom = '0';
      videoFullscreenButton.style.backgroundImage =
        'url(assets/img/png/fullscreen_exit.png)';
    }
  }
  mute() {
    if (this.videoPlayer.muted) {
      videoVolumeButton.style.backgroundImage =
        'url(assets/img/png/volume.png)';
      this.videoPlayer.volume = this.volume;
      this.videoPlayer.muted = false;
      videoVolumeBar.value = this.volume * 100;
      this.setBackgroundGradient(videoVolumeBar, this.volume * 100);
    } else {
      videoVolumeBar.value = 0;
      this.videoPlayer.muted = true;
      videoVolumeButton.style.backgroundImage = 'url(assets/img/png/mute.png)';
      videoVolumeBar.style.background = '#c4c4c4';
    }
  }

  progress = () => {
    let videoProgress = Math.round(
      this.videoPlayer.currentTime / (this.videoDuration / 100)
    );

    videoProgressBar.value = videoProgress;
    this.setBackgroundGradient(videoProgressBar, videoProgress);
  };
  videoChangeTime = () => {
    this.videoProgressValue = videoProgressBar.value;
    this.videoPlayer.currentTime =
      (this.videoProgressValue * this.videoDuration) / 100;
    this.setBackgroundGradient(videoProgressBar, this.videoProgressValue);
  };
  videoSetVolume = () => {
    this.volume = videoVolumeBar.value / 100;
    this.videoPlayer.volume = this.volume;
    this.videoPlayer.volume === 0
      ? (videoVolumeButton.style.backgroundImage =
          'url(assets/img/png/mute.png)')
      : ((videoVolumeButton.style.backgroundImage =
          'url(assets/img/png/volume.png)'),
        (this.videoPlayer.muted = false));
    this.setBackgroundGradient(videoVolumeBar, this.volume * 100);
  };
  videoSpeed = (how) => {
    if (!this.videoPlayer.paused) {
      let currentSpeed = this.videoPlayer.playbackRate;
      if (how === 'faster') {
        if (currentSpeed !== 2) {
          this.videoPlayer.playbackRate = currentSpeed + 0.25;
        }
        videoSpeedText.style.opacity = '1';
        videoSpeedText.innerText = `x ${this.videoPlayer.playbackRate}`;
        setTimeout(() => {
          videoSpeedText.style.opacity = '0';
        }, 1000);
      } else if (how === 'slower') {
        if (currentSpeed !== 0.25) {
          this.videoPlayer.playbackRate = currentSpeed - 0.25;
        }
        videoSpeedText.style.opacity = '1';
        videoSpeedText.innerText = `x ${this.videoPlayer.playbackRate}`;
        setTimeout(() => {
          videoSpeedText.style.opacity = '0';
        }, 1000);
      }
    }
  };
  setBackgroundGradient = (element, value) => {
    element.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  };
  keyboardControl = (event) => {
    event.preventDefault();
    switch (event.key) {
      case ' ':
        this.videoManage();
        break;
      case 'm':
      case 'M':
      case 'ь':
      case 'Ь':
        this.mute();
        break;
      case 'f':
      case 'F':
      case 'а':
      case 'A':
        this.toggleFullscreenMode();
        break;
      case '>':
        this.videoSpeed('faster');
        break;
      case '<':
        this.videoSpeed('slower');
        break;
      default:
        break;
    }
  };

  pause = () => {
    this.videoPlayer.pause();
  };
  progressReset = () => {
    let videoProgress = (this.videoPlayer.currentTime = 0.5);

    videoProgressBar.value = videoProgress;
    videoProgressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${videoProgress}%, #c4c4c4 ${videoProgress}%, #c4c4c4 100%)`;
  };
}
vp = new Player(video);
function vpInstance() {
  return vp;
}
function videoPlayer() {
  videoPlayButton.addEventListener('click', () => {
    vp.videoManage();
  });
  videoFullscreenButton.addEventListener('click', () => {
    vp.toggleFullscreenMode();
  });
  videoVolumeButton.addEventListener('click', () => {
    vp.mute();
  });
  videoProgressBar.addEventListener('input', vp.videoChangeTime);
  videoVolumeBar.addEventListener('input', vp.videoSetVolume);
  video.addEventListener('click', () => {
    vp.videoManage();
  });

  function keypressEvent(event) {
    vp.keyboardControl(event);
  }

  window.addEventListener('scroll', () => {
    if (
      window.scrollY + window.innerHeight + video.height / 2 >
        video.getBoundingClientRect().top + window.scrollY &&
      video.getBoundingClientRect().bottom > 0
    ) {
      document.addEventListener('keypress', keypressEvent);
    } else {
      document.removeEventListener('keypress', keypressEvent);
    }
  });
}

export { videoPlayer, vpInstance };
