const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity= document.querySelector('#city');
const nameCountry= document.querySelector('#country');

form.addEventListener('submit',(Element)=> {
  Element.preventDefault();
  if(nameCity.value.trim() === ""|| nameCountry.value.trim() === ""){
    /* console.log("prueba") */
    ShowError('Ambos campos son obligatorios');
  }
  callApi(nameCity.value, nameCountry.value)
  /* console.log(nameCity)
  console.log(nameCountry) */
})

//consumir api de clima
function callApi(city,country){
  const apiId ='01e7720aa30f567f9ff15c3cfe243d1b'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

  fetch(url)
  .then(data => {
    return data.json()
  })
  .then(dataJSON => {
    if(dataJSON.cod == '404'){
      ShowError('Cuidad no encontrada')
    }else{
      clearHTML();
      ShowWeather(dataJSON);
    }
  /*   console.log(dataJSON); */
  })
  .catch(err => {
    console.log(err);
  })
  
} 
//funcion de mostrar tiempo
function ShowWeather(data) {
  const {name,main:{temp,temp_max,temp_min},weather:[arr]} = data;
  const degress = kelvinToCentigrade(temp);
  const Max = kelvinToCentigrade(temp_max);
  const Min = kelvinToCentigrade(temp_min);
  const content = document.createElement('div');
  content.innerHTML = `
    <h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    <h2>${degress}°C</h2>
    <p>Max: ${Max}°C</p>
    <p>Min: ${Min}°C</p> `;
    result.appendChild(content);
 /*  console.log(name);
  console.log(temp);
  console.log(temp_min);
  console.log(temp_max);
  console.log(arr.icon); */
}
function ShowError(message) {
/*   console.log(message); */
  const alert = document.createElement('p');
  alert.classList.add('alert-message');
  alert.innerHTML = message;

  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  },3000);


}

function kelvinToCentigrade(temp){
  return parseInt(temp - 273.15);
}

// funcion de limpiar
function clearHTML(){
  result.innerHTML = '';
}