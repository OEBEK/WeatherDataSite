import { findMinValueWithTimestamp, findMaxValueWithTimestamp, updateDOM } from './functions.js';

function loadPHPContent() {
    fetch('Createjson.php')
        .then(response => response.text())
        .then(data => {
            console.log("php wurde geladen")
        })
        .catch(error => console.error('Error fetching PHP content:', error));
}


function fetchData() {
    const currentDate = new Date().toLocaleDateString('en-CA');
    const dataUrl = `weatherData${currentDate}.json`;
    loadPHPContent()
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Invalid data format:', data);
                return;
            }
            const MaxTemperature = findMaxValueWithTimestamp(data, "Temperature");
            updateDOM('maxTemperatur', MaxTemperature.value, 'maxTemperaturDate', MaxTemperature.time_stamp);

            const MaxHumidity = findMaxValueWithTimestamp(data, "Humidity");
            updateDOM('maxLuftfeuchte', MaxHumidity.value, 'maxLuftfeuchteDate', MaxHumidity.time_stamp);

            const MaxPressure = findMaxValueWithTimestamp(data, "Pressure");
            updateDOM('maxLuftdruck', MaxPressure.value, 'maxLuftdruckDate', MaxPressure.time_stamp);

            const MaxAltitude = findMaxValueWithTimestamp(data, "Altitude");
            updateDOM('maxHöhe', MaxAltitude.value, 'maxHöheDate', MaxAltitude.time_stamp);

            const minTemperature = findMinValueWithTimestamp(data, "Temperature");
            updateDOM('minTemperatur', minTemperature.value, 'minTemperaturDate', minTemperature.time_stamp);

            const minHumidity = findMinValueWithTimestamp(data, "Humidity");
            updateDOM('minLuftfeuchte', minHumidity.value, 'minLuftfeuchteDate', minHumidity.time_stamp);

            const minPressure = findMinValueWithTimestamp(data, "Pressure");
            updateDOM('minLuftdruck', minPressure.value, 'minLuftdruckDate', minPressure.time_stamp);

            const minAltitude = findMinValueWithTimestamp(data, "Altitude");
            updateDOM('minHöhe', minAltitude.value, 'minHöheDate', minAltitude.time_stamp);

            if (data.length > 0) {
                const lastItem = data[data.length - 1];
                document.getElementById('aktuellTemperatur').innerHTML = lastItem['Temperature'];
                document.getElementById('aktuellLuftfeuchte').innerHTML = lastItem['Humidity'];
                document.getElementById('aktuellLuftdruck').innerHTML = lastItem['Pressure'];
                document.getElementById('aktuellHöhe').innerHTML = lastItem['Altitude'];
            } else {
                console.log('No data in the JSON file or the data is not an array.');
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

setInterval(fetchData, 30000);
fetchData();

