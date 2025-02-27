let ApiKey = "284cafb4b5434027fd152e1c710b6962";
let button = document.querySelector(".Search-Box button");
let WeatherIcon = document.querySelector(".Weather-item")
button.onclick = function () {
  let Country = document.querySelector(".Search-Box input").value.trim(); 

  if (Country === "") {
    Swal.fire({
      title: "Oops!",
      text: "Please enter a city name before searching.",
      imageUrl: "./images/sweetalertimg/ANGRY.png",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Custom image",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        text: "custom-swal-text",
        image: "custom-swal-image"
      }
    });
    
    
    return;

  }

  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${Country}&appid=${ApiKey}&units=metric&lang=en`;

  fetch(Url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        document.querySelector(".title h1").innerHTML=`${data.name} <span>${data.sys.country}</span>`;
        document.querySelector(".sky").innerHTML=`${data.weather[0].description}`;
        document.querySelector(".humidity").innerHTML=`${data.main.humidity} %`;
        document.querySelector(".wind").innerHTML = `${(data.wind.speed * 3.6).toFixed(0)} km/h`;
        document.querySelector(".Weather-Temperature h1").innerHTML=`${data.main.temp.toFixed(0)} <span>°C</span>`;

        if(data.weather[0].main === "Clear"){
          WeatherIcon.src=`images/weatheritem/Clear.png`
        }else if(data.weather[0].main === "Clouds"){
          WeatherIcon.src=`images/weatheritem/Clouds.png`
        }else if(data.weather[0].main === "Drizzle"){
          WeatherIcon.src=`images/weatheritem/Drizzle.png`
        }else if(data.weather[0].main === "Rain"){
          WeatherIcon.src=`images/weatheritem/Rain.png`
        }else if(data.weather[0].main === "Snow"){
          WeatherIcon.src=`images/weatheritem/Snow.png`
        }else if(data.weather[0].main === "Thunderstorm"){
          WeatherIcon.src=`images/weatheritem/Thunderstorm.png`
        }


      }else{
        Swal.fire({
          title: "City Not Found!",
          text: "Please enter a valid city name.",
          imageUrl: "./images/sweetalertimg/ANGRY.png",  // استبدل الصورة بصورة مناسبة
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: "Error image",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            text: "custom-swal-text",
            image: "custom-swal-image"
          }
        });
      }
        document.querySelector(".Search-Box input").value = "";

    })
    .catch(error => console.error("حدث خطأ:", error));
};


document.querySelector(".Search-Box input").addEventListener("keydown", function(event){
  if (event.key === "Enter"){
    button.click()
  }
})