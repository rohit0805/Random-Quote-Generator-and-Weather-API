import '../scss/style.scss';
import axios from 'axios';

import apiconfig from './config';


var QuoteController=(function(){
    const api_key_quote=apiconfig.quoteKey;
    const year_track=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const day_track=['Sunday','Monday','Tuesday','Wednesday','Friday','Saturaday'];
    var quote_error_flag=0;
    var selector={
        quote:document.querySelector('.quote p'),
        cqbutton:document.querySelector('.button'),
        date:document.querySelector('.date p'),
        day:document.querySelector('.date h5'),
        time:document.querySelector('.date h3')
    };
    async function RandomQuote(){
        try{
            var data=await axios("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "quotes15.p.rapidapi.com",
                    "x-rapidapi-key": `${api_key_quote}`
                }
            });
            return data;
        }
        catch{
            console.log("quote error");
        }
    };
    return{
        UpdateDate:function(){
            var now=new Date;
            selector.date.innerHTML=`${now.getDate()}, ${year_track[now.getMonth()]}, ${now.getFullYear()}`;
            selector.day.innerHTML=`${day_track[now.getDay()]}`;
            setInterval(function(){
                var now=new Date();
                var hour=now.getHours(),min=now.getMinutes();
                var check=' AM';
                if(parseInt(min/10)===0){
                    min='0'+min;
                }
                if(hour>12){
                    hour=hour-12;
                    check=' PM';
                }
                selector.time.innerHTML=`${hour} : ${min} ${check}`;
            },1000);
        },
        QuoteGenerator:function(){
            RandomQuote().then((res)=>{
                var p=selector.quote;
                var data=res.data.content;
                p.innerHTML=`"${data}"`
            });
        },
        getSelector:function(){
            return selector;
        }
    };
})();

var WeatherController=(function(){
    const api_key_weather=apiconfig.weatherKey;
    var weather_error_flag=0;
    var selector={
        temp:document.querySelector('.temp p'),
        city:document.querySelector('.temp h3'),
        location:document.querySelector('.temp h5'),
        update_weather:document.querySelector('.update_again')
    };
    async function WeatherData(){
        try{
            const city=await prompt("Enter you city name..");
            var data=await axios(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key_weather}`,{
                "method":"GET"
            });
            weather_error_flag=0;
            return data;
        }
        catch{
            weather_error_flag=1;
            console.log('weather error')
        }
    };

    var GetWeather=function(){
        WeatherData().then((res)=>{
            if(weather_error_flag==0){
                selector.temp.innerHTML=`Temp: ${(res.data.main.temp-273.15).toFixed(2)} \u00B0C`;
                selector.city.innerHTML=`${res.data.name}`;
                selector.location.innerHTML=`lat: ${res.data.coord.lat}, lon: ${res.data.coord.lon}`;
            }
            else{
                alert("Wrong city. Touch the right top snowflake to re-enter the city.");
                selector.update_weather.style.animationName="Sizer";
            }
        });
    };

    return{
        UpdateWeather:function(){
            GetWeather();
        },
        getSelector:function(){
            return selector;
        }
    };
})();

var Controller=(function(QuoteCtrl,WeatherCtrl){
    const quote_selector=QuoteCtrl.getSelector();
    const weather_selector=WeatherCtrl.getSelector();
    var ChangeQuote=function(){
        quote_selector.quote.innerHTML=`<i class="far fa-snowflake fa-2x"></i>`;
        QuoteCtrl.QuoteGenerator();
    };

    var SetupEventListener=function(){
        quote_selector.cqbutton.addEventListener('click',ChangeQuote);
        weather_selector.update_weather.addEventListener('click',WeatherCtrl.UpdateWeather);
    };
    return{
        init:function(){
            QuoteCtrl.QuoteGenerator();
            SetupEventListener();
            QuoteCtrl.UpdateDate();
            setTimeout(function(){
                WeatherCtrl.UpdateWeather();
            },3000);
        },
        api:function(){
        }

    };
})(QuoteController,WeatherController);

Controller.init();
