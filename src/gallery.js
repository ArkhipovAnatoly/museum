const pictureInnerContainer = document.querySelector(
  '.picture__inner-container'
);

const imgSrc = [
  'assets/img/jpg/galery/galery1.webp',
  'assets/img/jpg/galery/galery2.webp',
  'assets/img/jpg/galery/galery3.webp',
  'assets/img/jpg/galery/galery4.webp',
  'assets/img/jpg/galery/galery5.webp',
  'assets/img/jpg/galery/galery6.webp',
  'assets/img/jpg/galery/galery7.webp',
  'assets/img/jpg/galery/galery8.webp',
  'assets/img/jpg/galery/galery9.webp',
  'assets/img/jpg/galery/galery10.webp',
  'assets/img/jpg/galery/galery11.webp',
  'assets/img/jpg/galery/galery12.webp',
  'assets/img/jpg/galery/galery13.webp',
  'assets/img/jpg/galery/galery14.webp',
  'assets/img/jpg/galery/galery15.webp',
];

function imageGallery() {
  shuffle(imgSrc);

  imgSrc.map((value, index) => {
    const img = document.createElement('img');
    img.classList.add('gallery__img');
    img.classList.add(`gallery__img--${index + 1}`);
    img.src = value;
    img.alt = `gallery${index + 1}`;
    img.loading = 'lazy';
    if (index < 12) {
      pictureInnerContainer.append(img);
    }
  });

  const images = document.querySelectorAll('.gallery__img');
  function checkImage() {
    images.forEach((image) => {
      const slideAt = window.scrollY + window.innerHeight - image.height / 2;
      const ishalfShown =
        slideAt > image.getBoundingClientRect().top + window.scrollY;
      if (ishalfShown) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', checkImage);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default imageGallery;
