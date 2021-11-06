const burgerButton = document.querySelector('.menu__burger-button');
const menu = document.querySelector('.menu__nav');
const welcomeContent = document.querySelector('.welcome__content');
const welcomeSlider = document.querySelector('.welcome__slider');
const welcomeSliderControl = document.querySelector('.slider-control');
const menuImageBlock = document.querySelector('.menu__images');
const menuImageBlockSD = document.querySelector('.menu__images--sd');
const menuSocial = document.querySelector('.menu__social');
function toogleMenu() {
  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('close');
    menu.classList.toggle('open');
    welcomeContent.classList.toggle('hide');

    if (window.innerWidth <= 768) {
      welcomeSlider.classList.toggle('hide');
      welcomeSliderControl.classList.toggle('hide');
      menuSocial.classList.toggle('show');
      menuImageBlock.classList.toggle('show');
      menuImageBlockSD.classList.toggle('show');
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      if (burgerButton.classList.contains('close')) {
        burgerButton.classList.toggle('close');
        menu.classList.toggle('open');
        menuImageBlock.classList.toggle('show');
        menuImageBlockSD.classList.toggle('show');
        welcomeContent.classList.toggle('hide');
        welcomeSlider.classList.toggle('hide');
        welcomeSliderControl.classList.toggle('hide');
        menuSocial.classList.remove('show');
      }
    }
  });
}
export default toogleMenu;
