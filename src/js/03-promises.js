const form = document.querySelector('.form');
form.addEventListener("submit", formSubmit);

// const elements = null;

function formSubmit(e) {
  e.preventDefault();

  const formField = e.target;
 let delay = Number(formField.elements.delay.value);
 const amount = Number(formField.elements.amount.value);
 const step = Number(formField.elements.step.value);

  console.log(delay, step, amount);

  for (let i=1; i<= amount; i += 1) {
    createPromise(i, delay)
    .then(({position, delay}) => console.log(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({ position, delay }) => console.log(`❌ Rejected promise ${position} in ${delay}ms`));

    delay += step;

};
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
  setTimeout(() => { 
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  }
}, delay);

});
}
