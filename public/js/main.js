const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const data_hidden = document.querySelector(".middle_layer");

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    console.log(cityVal);

    if(cityVal === ""){
        city_name.innerText = 'Please write the name before you search';
        data_hidden.classList.add('data_hidden');
    } else {
        try{
            let url =  `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=32e40bcfbfd2ea19ad91142d021c610c`;
            const resp = await fetch(url);
            const dataj = await resp.json()
            //console.log(dataj);
            const arrData = [dataj];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            console.log(arrData[0].weather[0].main);
            const tempMood = temp_status.innerText = arrData[0].weather[0].main;

            // Condition to check sunny or cloudy
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class= 'fas fa-sun' style='color: #eccc68;'></i>" ;
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class= 'fas fa-cloud' style='color: #f1f2f6;'></i>" ;
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class= 'fas fa-cloud-rain' style='color: #a4b0be;'></i>" ;
            } else {
                temp_status.innerHTML = "<i class= 'fas fa-cloud' style='color: #f1f4f6;'></i>" ;
            }
             data_hidden.classList.remove('data_hidden');

        } catch(e){
            city_name.innerText = 'Please enter the name properly';
            data_hidden.classList.add('data_hidden');

        }
    }
}
submitBtn.addEventListener('click', getInfo);





