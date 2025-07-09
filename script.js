const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const height = parseFloat(document.querySelector('#height').value);
  const weight = parseFloat(document.querySelector('#weight').value);
  const results = document.querySelector('#results');
  const message = document.querySelector('#message');

  if (!height || height <= 0) {
    results.innerHTML = 'Please enter a valid height';
    return; // Exit the function
  } else if (!weight || weight <= 0) {
    results.innerHTML = 'Please enter a valid weight';
    return; // Exit the function
  }

  const bmi = (weight / ((height * height) / 10000)).toFixed(2);
  results.innerHTML = `<span>${bmi}</span>`;

  if (bmi < 18.6) {
    message.innerHTML = 'Underweight';
    message.style.color = 'red';
  } else if (bmi >= 18.6 && bmi < 24.9) {
    message.innerHTML = 'Normal';
    message.style.color = 'green';
  } else {
    message.innerHTML = 'Overweight';
    message.style.color = 'brown';
  }

  fetch('save_data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `height=${height}&weight=${weight}&bmi=${bmi}&status=${message.textContent}`
  })
  .then(response => response.text())
  .then(data => console.log('Server response:', data))
  .catch(error => console.error('Error saving BMI:', error));
});