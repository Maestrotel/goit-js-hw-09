const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
}

refs.start.addEventListener('click', changeColor);
refs.stop.addEventListener('click', stopChange);

refs.stop.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function Background() {
  return (document.body.style.background = getRandomHexColor());
}

let Id = null;

function changeColor() {
  Id = setInterval(() => {
    Background();
  }, 1000);

  refs.stop.removeAttribute('disabled');
  refs.start.setAttribute('disabled', true);
}

function stopChange() {
  clearInterval(Id);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', true);
}