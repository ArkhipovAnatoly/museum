import 'normalize.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import './style.css';
import { sliderWelcome, sliderExplore } from './slider';
import { videoPlayer } from './videoplayer';
import toogleMenu from './menu';
import bookTickets from './booking';
import imageGallery from './gallery';

const map = document.querySelector('#map');
const mainVideoPlayer = document.querySelector('.video__player');
const preloader = document.querySelector('.preloader');
document.addEventListener('DOMContentLoaded', () => {
  preloader.style.display = 'none';

  sliderWelcome();
  sliderExplore();
  videoPlayer();
  toogleMenu();
  bookTickets();
  imageGallery();
  window.addEventListener('scroll', showMap);
  window.addEventListener('scroll', showVideoSlider);

  function showVideoSlider() {
    if (
      window.scrollY + window.innerHeight >
      mainVideoPlayer.getBoundingClientRect().top + window.scrollY
    ) {
      import('./slider').then((module) => {
        module.sliderVideo();
      });

      window.removeEventListener('scroll', showVideoSlider);
    }
  }

  function showMap() {
    if (
      window.scrollY + window.innerHeight >
      map.getBoundingClientRect().top + window.scrollY
    ) {
      import('./map').then((module) => {
        module.default();
      });
      window.removeEventListener('scroll', showMap);
    }
  }
});
