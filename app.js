window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  )
  let temperatureDegree = document.querySelector('.temperature-degree')
  let temperatureTimezone = document.querySelector('.location-timezone')
  let temperatureCountry = document.querySelector('.country')
  let degreeSection = document.querySelector('.degree-section')
  let degreeSpan = document.querySelector('.degree-section span')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=<your_app_id>`

      fetch(api)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)

          const { main, description, icon } = data.weather[0]
          const temper = data.main.temp
          const zone = data.name
          const country = data.sys.country

          console.log(description, main, temper, zone, country, icon)

          temperatureDegree.textContent = temper
          temperatureDescription.textContent = description
          temperatureTimezone.textContent = zone
          temperatureCountry.textContent = country

          //formula for temperature change
          let celsius = (temper - 32) * (5 / 9)

          //set the icons
          setIcon(icon)

          //celsius fehranite change
          degreeSection.addEventListener('click', () => {
            if (degreeSpan.textContent === 'F') {
              degreeSpan.textContent = 'C'
              temperatureDegree.textContent = Math.round(celsius * 100) / 100
            } else {
              degreeSpan.textContent = 'F'
              temperatureDegree.textContent = temper
            }
          })
        })
    })
  }

  function setIcon(apiIcon) {
    var img = document.createElement('img')
    img.src = `http://openweathermap.org/img/wn/${apiIcon}@2x.png`
    var temperatureIcon = document.getElementById('icon')
    temperatureIcon.appendChild(img)
  }
})
