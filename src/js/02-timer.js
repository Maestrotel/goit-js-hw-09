import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handlerOnClose(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

let intervalId = null;

function handlerOnClose(date) {
  refs.btnStart.disabled = false;
  if (date.getTime() <= Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future', () => {});
    return;
  }

  refs.btnStart.addEventListener('click', () => {
    updateClockMarkup(date);
    intervalId = setInterval(() => {
      updateClockMarkup(date);
    }, 1000);
  });
}

function updateClockMarkup(date) {
  let currentTime = Date.now();
  let deltaTime = date.getTime() - currentTime;
  const times = convertMs(deltaTime);

  createIndividualTextContent(times);

  if (
    refs.days.textContent === '00' &&
    refs.hours.textContent === '00' &&
    refs.minutes.textContent === '00' &&
    refs.seconds.textContent === '00'
  ) {
    Notiflix.Notify.success('Time is over');
    clearInterval(intervalId);
    return;
  }
}

function createIndividualTextContent(times) {
  const { days, hours, minutes, seconds } = times;
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}











// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';


// const inputEl = document.querySelector('input[type = "text"]');
// const btnStartEl = document.querySelector('button[data-start]');
// const refs = {
//   dataDaysEl: document.querySelector('[data-days]'),
//   dataHoursEl: document.querySelector('[data-hours]'),
//   dataMinutesEl: document.querySelector('[data-minutes]'),
//   dataSecondsEl: document.querySelector('[data-seconds]'),
// };

// let selectedDate = 0;
// btnStartEl.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     const dateNow = new Date().getTime();
//     selectedDate = selectedDates[0].getTime();

//     if (dateNow > selectedDate) {
//       return Notiflix.Notify.failure('Please choose a date in the future');
//     }
//     btnStartEl.disabled = false;
//     btnStartEl.addEventListener('click', onBtnStartElClick);
//   },
// };

// const calendar = flatpickr(inputEl, options);

// function onBtnStartElClick(e) {
//   if (e.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   timerEl.start();
// }


// const timerEl = {
  
//   intervalId: null,
//   isActive: false,
//   start() {
//     btnStartEl.disabled = true;
//     if (this.isActive) {
//       return;
//     }
//     this.isActive = true;
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = selectedDate - currentTime;

//       if (deltaTime <= 1000) {
//         return clearInterval(this.intervalId);
//       }
//       const time = convertMs(deltaTime);
//       updateTimer(time);
//     }, 1000);
//   },
//   stop() {
//     clearInterval(this.intervalId);
//   },
// };

// function updateTimer({ days, hours, minutes, seconds }) {
//   refs.dataDaysEl.textContent = `${days}`;
//   refs.dataHoursEl.textContent = `${hours}`;
//   refs.dataMinutesEl.textContent = `${minutes}`;
//   refs.dataSecondsEl.textContent = `${seconds}`;
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
 
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}





















// // startBtn.addEventListener('click', () => {
// //   let timer = setInterval(() => {
// //     let countdown = new Date(inputEl.value) - new Date();
// //     startBtn.disabled = true;
// //     if (countdown > 0) {
// //       let timeObj = convertMs(countdown);
// //       days.textContent = addLeadingZero(timeObj.days);
// //       hours.textContent = addLeadingZero(timeObj.hours);
// //       minutes.textContent = addLeadingZero(timeObj.minutes);
// //       second.textContent = addLeadingZero(timeObj.seconds);
// //       if (countdown <= 10000) {







// // const refs = {
// //   pickerEl: document.querySelector('#datetime-picker'),
// //   buttonEl: document.querySelector('[data-start]'),
// //   days: document.querySelector('span[data-days]'),
// //   hours: document.querySelector('span[data-hours]'),
// //   minutes: document.querySelector('span[data-minutes]'),
// //   seconds: document.querySelector('span[data-seconds]'),
// // };

// // document.getElementById('startBtn').disabled = true;





// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// refs.buttonEl.addEventListener('click', () => {
//   let timer = setInterval(() => {
//     let dateTimer = new Date(refs.pickerEl.value) - new Date();
//     if (dateTimer > 0) {
//       let timeObg = convertMs(dateTimer);
//       refs.days.textContent = addLeadingZero(timeObg.days);
//       refs.hours.textContent = addLeadingZero(timeObg.hours);
//       refs.minutes.textContent = addLeadingZero(timeObg.minutes);
//       refs.seconds.textContent = addLeadingZero(timeObg.seconds);
//     } else {
//       clearInterval(timer)
//     }
//   }, 1000);
// });