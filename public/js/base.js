const cityForm = document.querySelector('#city-form');
const cityField = document.querySelector('input[name="city"]');
const apiErrorField = document.querySelector('#api-error');
const apiSuccessField = document.querySelector('#api-success');

cityForm.addEventListener('submit', loadWhether);

function loadWhether(e) {
  e.preventDefault();

  fetch(`/whether?city=${cityField.value}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          console.log(data.error);
          apiErrorField.textContent = data.error;
        } else {
          console.log(data);
          apiSuccessField.textContent = JSON.stringify(data);
        }
      })
    })
    .catch(error => {
      apiErrorField.textContent = data.error;
    });
}


