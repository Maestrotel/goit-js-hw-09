import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayElem = document.querySelector('input[name="delay"]');
const stepElem = document.querySelector('input[name="step"]');
const amountElem = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const firstDelay = Number(`${delayElem.value}`);
  const stepDelay = Number(`${stepElem.value}`);
  const promiseCount = Number(`${amountElem.value}`);
  
  console.log(firstDelay);
  console.log(stepDelay);
  console.log(promiseCount);

  let currentDelay = firstDelay;
  for (let i = 0; i < promiseCount; i++ ) {
    if (currentDelay !== 0) {
      currentDelay += stepDelay;
    }
    createPromise(i + 1, currentDelay);
  }
}

function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        // Fulfill
        if (shouldResolve) {
          resolve({ position, delay });
        }
        // Reject
        else {
          reject({ position, delay });
        }
      }, delay);
    });
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
}