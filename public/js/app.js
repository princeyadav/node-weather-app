console.log('running from client side')

const WeatherForm =document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')





WeatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent='Loading...'
    

    fetch('/weather?address='+location).then((response)=>{
     
    response.json().then((data)=>{
        const forecast = "It is currently " + data.temp + " degree out and "+data.description+" in "+data.name;
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent =''
            document.getElementById('img-icon').src='/img/weather.png'
        }
        else {
            
            messageOne.textContent=data.location
            messageTwo.textContent=forecast
            if(data.description=='clear sky' || data.description=='sunny' ){
                document.getElementById('img-icon').src='/img/sun-moon.png'
            }
            else if (data.description=='scattered clouds' || data.description=='overcast clouds' || data.description=='few clouds' || data.description=='clouds' || data.description=='broken clouds'){
                document.getElementById('img-icon').src='/img/clouds.png'
            }
            else if(data.description=='light rain' || data.description=='heavy rain' || data.description=='rain'){
                document.getElementById('img-icon').src='/img/rain.png'
            }
            else{
                document.getElementById('img-icon').src='/img/haze.png'
            }
        }
    })      
     
})
    
})