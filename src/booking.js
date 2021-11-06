const buyButton = document.querySelector('.tickets__button-buy');
const map = document.querySelector('#map');
const overlay = document.querySelector('.overlay');
const bookForm = document.querySelector('.booking');
const bookFormCloseButton = document.querySelector('.booking-close');
const dateInput = document.querySelector('.datepicker-input');
const dateInputData = document.querySelector('.date-data');
const timeInput = document.querySelector('.timepicker-input');
const timeInputData = document.querySelector('.time-data');
const selectInput = document.querySelector('.booking__input-customer--select');
const ticketTypeText = document.querySelector(
  '.booking__input-customer--select span'
);

const dateInfo = document.querySelector('.date-info');
const timeInfo = document.querySelector('.time-info');
const ticketInfo = document.querySelector('.ticket-info');

const selectOptions = document.querySelector('.select');
const selectChoiceType = document.querySelector('.select > select');
const cardMonthInput = document.querySelector('.payment__card-date');
const cardYearInput = document.querySelector('#card-year-input');
const increaseCardMonthButton = document.querySelector('#increase-card-month');
const decreaseCardMonthButton = document.querySelector('#decrease-card-month');
const paymentButton = document.querySelector('.payment__card-button');
const totalCost = document.querySelector('.total__number');
const totalCostPayment = document.querySelector('.payment__amount');

const countBasic = document.querySelector('[data-id=basic]');
const countSenior = document.querySelector('[data-id=senior]');
const ticketCountButtons = document.querySelectorAll(
  '[data-id=tickets-count-btn]'
);
const ticketEntryCountButtons = document.querySelectorAll(
  '[data-id=tickets-entry-count-btn]'
);
const costBasicForm = document.querySelector('.cost-basic-form');
const costSeniorForm = document.querySelector('.cost-senior-form');
const countBasicForm = document.querySelector('[data-id=basic-form]');
const countSeniorForm = document.querySelector('[data-id=senior-form]');
const countBasicPayment = document.querySelector('.payment-basic-count');
const countSeniorPayment = document.querySelector('.payment-senior-count');
const costBasicText = document.querySelector('.text-basic');
const costSeniorText = document.querySelector('.text-senior');
const totalBasic = document.querySelector('.total-basic');
const totalSenior = document.querySelector('.total-senior');
const nameInput = document.querySelector('input[type=text]');
const emailInput = document.querySelector('input[type=email]');
const phoneInput = document.querySelector('input[type=tel]');
const errName = document.querySelector('.error-message-name');
const errEmail = document.querySelector('.error-message-email');
const errPhone = document.querySelector('.error-message-phone');
let currentDay = new Date().getDate();
const currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
const currentHour = new Date().getHours();
const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
const costBasic = [20, 25, 40];
const costSenior = [10, 12.5, 20];
let radioInput = '';
function inputForm() {
  nameInput.addEventListener('input', (e) => {
    if (e.target.validity.valid) {
      errName.style.display = 'none';
      errName.innerText = '';
    }
    if (e.target.validity.tooShort) {
      errName.style.display = 'block';
      errName.innerText = 'At least 3 characters are required';
    } else if (e.target.validity.patternMismatch) {
      errName.style.display = 'block';
      errName.innerText = 'Name should include letters only';
    }
  });
  nameInput.addEventListener('focus', (e) => {
    if (e.target.validity.valid) {
      errName.style.display = 'none';
      errName.innerText = '';
    } else {
      errName.style.display = 'block';
      errName.innerText = 'At least 3 characters are required';
    }
  });

  emailInput.addEventListener('input', (e) => {
    let latinPattern = new RegExp('[А-Яа-я]{1}');
    let latinPatternDomen = new RegExp('[A-za-z]{3,}@[А-Яа-я]{1,}');
    if (e.target.validity.valid) {
      errEmail.style.display = 'none';
      errEmail.innerText = '';
    } else if (e.target.validity.tooShort) {
      errEmail.style.display = 'block';
      errEmail.innerText = "At least 3 characters are required in 'username'";
    } else if (e.target.validity.patternMismatch) {
      errEmail.style.display = 'block';
      errEmail.innerText =
        'E-male should have the following formats: username@example.com; 123@example.com user-name@example.com; user name@example.com\n';
      ("At least 3 latin characters are required in 'username' ");
    }
    if (latinPattern.test(emailInput.value)) {
      errEmail.innerText = '';
      errEmail.innerText = 'Only latin characters are allowed';
    }
    if (emailInput.value.includes('@')) {
      if (latinPatternDomen.test(emailInput.value)) {
        errEmail.innerText = 'Only latin characters are allowed';
      }
    }
  });

  emailInput.addEventListener('focus', (e) => {
    if (e.target.validity.valid) {
      errEmail.style.display = 'none';
      errEmail.innerText = '';
    } else {
      errEmail.style.display = 'block';
      errEmail.innerText =
        "E-male should have the following formats: username@example.com; 123@example.com; user-name@example.com; user name@example.com\n\n At least 3 latin characters are required in 'username'";
    }
  });

  phoneInput.addEventListener('input', (e) => {
    if (e.target.validity.valid) {
      errPhone.style.display = 'none';
      errPhone.innerText = '';
    }
    if (e.target.validity.patternMismatch) {
      errPhone.style.display = 'block';
      errPhone.innerText =
        'Phone number should have the following format: \n\ne.g. 12345678910; 11-22-33-44-55; 123-456-789-0';
    }
  });

  phoneInput.addEventListener('focus', (e) => {
    if (e.target.validity.valid) {
      errPhone.style.display = 'none';
      errPhone.innerText = '';
    }

    errPhone.style.display = 'block';
    errPhone.innerText =
      'Phone number should have the following format:\n\n e.g. 12345678910; 11-22-33-44-55; 123-456-789-0';
  });
}

function defaultValues() {
  radioInput = localStorage.getItem('radioButton') ?? 'Permanent exhibition';
  let radioInputs = document.querySelectorAll('input[type=radio]');
  radioInputs.forEach((el) => {
    let attr = el.getAttribute('data-type');
    if (attr === radioInput) {
      el.setAttribute('checked', 'checked');
    }
  });
  totalCost.innerText =
    localStorage.getItem('totalCost') ??
    `${countBasic.value * costBasic[0] + countSenior.value * costSenior[0]}`;
  totalCostPayment.innerText = `${
    countBasic.value * costBasic[0] + countSenior.value * costSenior[0]
  } €`;
  countBasic.value = localStorage.getItem('countBasic') ?? 1;
  countSenior.value = localStorage.getItem('countSenior') ?? 1;

  ticketTypeText.innerText = radioInput;
  ticketInfo.innerText = radioInput;
  if (ticketTypeText.innerText === 'Permanent exhibition') {
    selectChoice(0);
  } else if (ticketTypeText.innerText === 'Temporary exhibition') {
    selectChoice(1);
  } else if (ticketTypeText.innerText === 'Combined Admission') {
    selectChoice(2);
  }
  countBasicForm.value = countBasic.value;
  countSeniorForm.value = countSenior.value;
  calcTotalForm();
}
function radioChoice(num) {
  totalCost.innerText = `${
    countBasic.value * costBasic[num] + countSenior.value * costSenior[num]
  }`;
  totalCostPayment.innerText = `${
    countBasic.value * costBasic[num] + countSenior.value * costSenior[num]
  } €`;
  costBasicForm.innerText = costBasic[num];
  costSeniorForm.innerText = costSenior[num];
  costBasicText.innerText = `Basic (${costBasic[num]} €)`;
  costSeniorText.innerText = `Senior (${costSenior[num]} €)`;
  totalBasic.innerText = `${countBasic.value * costBasic[num]} €`;
  totalSenior.innerText = `${countSenior.value * costSenior[num]} €`;
  localStorage.setItem('totalCost', totalCost.innerText);
}

function selectChoice(num) {
  costBasicForm.innerText = costBasic[num];
  costSeniorForm.innerText = costSenior[num];
  costBasicText.innerText = `Basic (${costBasic[num]} €)`;
  costSeniorText.innerText = `Senior (${costSenior[num]} €)`;
  totalBasic.innerText = `${countBasicForm.value * costBasic[num]} €`;
  totalSenior.innerText = `${countSeniorForm.value * costSenior[num]} €`;
  totalCostPayment.innerText = `${
    countBasicForm.value * costBasic[num] +
    countSeniorForm.value * costSenior[num]
  } €`;
}

function setTotalCost(num) {
  totalCost.innerText = `${
    countBasic.value * costBasic[num] + countSenior.value * costSenior[num]
  }`;
  totalCostPayment.innerText = `${
    countBasic.value * costBasic[num] + countSenior.value * costSenior[num]
  } €`;
  totalBasic.innerText = `${countBasic.value * costBasic[num]} €`;
  totalSenior.innerText = `${countSenior.value * costSenior[num]} €`;
  localStorage.setItem('totalCost', totalCost.innerText);
}
function setTotalCostForm(num) {
  totalBasic.innerText = `${countBasicForm.value * costBasic[num]} €`;
  totalSenior.innerText = `${countSeniorForm.value * costSenior[num]} €`;
  totalCostPayment.innerText = `${
    countBasicForm.value * costBasic[num] +
    countSeniorForm.value * costSenior[num]
  } €`;
}

function calcTotalForm() {
  countBasicPayment.innerText = countBasicForm.value;
  countSeniorPayment.innerText = countSeniorForm.value;
  if (ticketTypeText.innerText === 'Permanent exhibition') {
    setTotalCostForm(0);
  } else if (ticketTypeText.innerText === 'Temporary exhibition') {
    setTotalCostForm(1);
  } else {
    setTotalCostForm(2);
  }
}

function calcTotal() {
  countBasicForm.value = countBasic.value;
  countSeniorForm.value = countSenior.value;
  countBasicPayment.innerText = countBasic.value;
  countSeniorPayment.innerText = countSenior.value;
  localStorage.setItem('countBasic', countBasic.value);
  localStorage.setItem('countSenior', countSenior.value);
  if (radioInput === 'Permanent exhibition') {
    setTotalCost(0);
  } else if (radioInput === 'Temporary exhibition') {
    setTotalCost(1);
  } else {
    setTotalCost(2);
  }
}

function bookTickets() {
  defaultValues();
  if (currentDay < 10) currentDay = '0' + currentDay;
  if (currentMonth < 10) currentMonth = '0' + currentMonth;
  if (currentDay == daysInMonth) {
    if (currentMonth + 1 < 10 && currentHour > 18) {
      currentMonth = '0' + (+currentMonth + 1);
    } else {
      currentMonth = +currentMonth + 1;
    }
    currentDay = '01';
  }
  dateInput.setAttribute('min', `${currentYear}-${currentMonth}-${currentDay}`);
  cardMonthInput.value = '01';
  cardYearInput.value = currentYear;
  cardYearInput.setAttribute('min', cardYearInput.value);

  buyButton.addEventListener('click', () => {
    overlay.style.opacity = '1';
    overlay.style.zIndex = '1';
    map.style.position = 'relative';
    map.style.zIndex = '-2';
    setTimeout(() => {
      bookForm.style.left = '0' + 'px';
    }, 200);
  });

  document.querySelectorAll('input[type=radio]').forEach((el) => {
    el.addEventListener('input', (e) => {
      radioInput = e.target.dataset.type;
      localStorage.setItem('radioButton', radioInput);

      switch (radioInput) {
        case 'Permanent exhibition':
          radioChoice(0);
          break;
        case 'Temporary exhibition':
          radioChoice(1);

          break;
        case 'Combined Admission':
          radioChoice(2);

          break;
        default:
          break;
      }

      ticketTypeText.innerText = radioInput;
      ticketInfo.innerText = radioInput;
    });
  });

  bookFormCloseButton.addEventListener('click', () => {
    const overlayWidth = overlay.offsetWidth;
    bookForm.style.left = `${-overlayWidth}` + 'px';

    map.style.zIndex = '1';
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.zIndex = '-1';
    }, 500);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.value === 'overlay') {
      const overlayWidth = overlay.offsetWidth;
      bookForm.style.left = `${-overlayWidth}` + 'px';

      map.style.zIndex = '1';
      setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.zIndex = '-1';
      }, 500);
    }
  });

  timeInput.addEventListener('input', (event) => {
    timeInputData.innerText = event.target.value;
    let time = event.target.value.matchAll(/[\d][\d]/g);
    time = Array.from(time);
    let hours = time[0][0];
    let min = time[1][0];
    timeInfo.innerText = `${hours}` + ' ' + ':' + ' ' + `${min}`;
  });

  dateInput.addEventListener('input', (event) => {
    dateInputData.innerText = event.target.value;
    console.log(event.target.value);
    let date = event.target.value.matchAll(/[\d][\d]/g);
    date = Array.from(date);
    let days = [
      'Sunday',
      'Monday',
      'Thursday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let yearFull = date[0][0] + date[1][0];
    let yearShort = date[1][0];
    let month = date[2][0];
    console.log(typeof month);
    let day = date[3][0];
    if (day < 10) {
      day = +day;
    }
    let weekDay = new Date(yearFull, month - 1, day).getDay();
    dateInfo.innerText =
      `${days[weekDay]},` + ' ' + `${months[month - 1]}` + ' ' + yearShort;
  });

  selectInput.addEventListener('click', () => {
    selectOptions.classList.toggle('show');
    selectInput.classList.toggle('booking__input-customer--select-open');
  });

  selectChoiceType.addEventListener('input', (e) => {
    ticketTypeText.innerText = e.target.value;
    ticketInfo.innerText = e.target.value;
    let event = new Event('changed');
    ticketTypeText.dispatchEvent(event);
  });

  ticketTypeText.addEventListener('changed', (e) => {
    if (e.target.innerText === 'Permanent exhibition') {
      selectChoice(0);
    } else if (e.target.innerText === 'Temporary exhibition') {
      selectChoice(1);
    } else if (e.target.innerText === 'Combined Admission') {
      selectChoice(2);
    }
  });

  increaseCardMonthButton.addEventListener('click', () => {
    let currentValue = cardMonthInput.value;

    if (currentValue === '12') {
      cardMonthInput.value = '12';
      return;
    }
    currentValue++;
    if (+currentValue < 10) {
      cardMonthInput.value = '0' + currentValue;
    } else {
      cardMonthInput.value = currentValue;
    }
  });
  decreaseCardMonthButton.addEventListener('click', () => {
    let currentValue = cardMonthInput.value;
    currentValue--;
    if (currentValue === 0) {
      cardMonthInput.value = '01';
      return;
    }

    if (+currentValue < 10) {
      cardMonthInput.value = '0' + currentValue;
    } else {
      cardMonthInput.value = currentValue;
    }
  });

  paymentButton.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  paymentButton.addEventListener('click', (e) => {
    const xInside = e.offsetX;
    const yInside = e.offsetY;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    paymentButton.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });

  ticketCountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calcTotal();
    });
  });

  ticketEntryCountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calcTotalForm();
    });
  });

  inputForm();
}

export default bookTickets;
