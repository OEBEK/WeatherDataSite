const currentDate = new Date().toLocaleDateString('en-CA');

function updateMaxValue(elementId, data, attribute) {
    const maxValueInfo = findMaxValueWithTimestamp(data, attribute);
    document.getElementById(elementId).innerHTML = maxValueInfo.value;
    document.getElementById(elementId + 'Date').innerHTML = maxValueInfo.time_stamp;
}

function fetchData() {
    fetch('weatherData' + currentDate + '.json')
        .then(response => response.json())
        .then(data => {
            updateMaxValue('maxTemperatur', data, 'Temperature');

            const MaxHumidity = findMaxValueWithTimestamp(data, "Humidity");
            document.getElementById('maxLuftfeuchte').innerHTML = MaxHumidity.value
            document.getElementById('maxLuftfeuchteDate').innerHTML = MaxHumidity.time_stamp

            const MaxPressure = findMaxValueWithTimestamp(data, "Pressure");
            document.getElementById('maxLuftdruck').innerHTML = MaxPressure.value
            document.getElementById('maxLuftdruckDate').innerHTML = MaxPressure.time_stamp

            const MaxAltitude = findMaxValueWithTimestamp(data, "Altitude");
            document.getElementById('maxHöhe').innerHTML = MaxAltitude.value
            document.getElementById('maxHöheDate').innerHTML = MaxAltitude.time_stamp

            const minTemperature = findMinValueWithTimestamp(data, "Temperature");
            document.getElementById('minTemperatur').innerHTML = minTemperature.value
            document.getElementById('minTemperaturDate').innerHTML = minTemperature.time_stamp

            const minHumidity = findMinValueWithTimestamp(data, "Humidity");
            document.getElementById('minLuftfeuchte').innerHTML = minHumidity.value
            document.getElementById('minLuftfeuchteDate').innerHTML = minHumidity.time_stamp

            const minPressure = findMinValueWithTimestamp(data, "Pressure");
            document.getElementById('minLuftdruck').innerHTML = minPressure.value
            document.getElementById('minLuftdruckDate').innerHTML = minPressure.time_stamp

            const minAltitude = findMinValueWithTimestamp(data, "Altitude");
            document.getElementById('minHöhe').innerHTML = minAltitude.value
            document.getElementById('minHöheDate').innerHTML = minAltitude.time_stamp

            if (Array.isArray(data) && data.length > 0) {
                const lastItem = data[data.length - 1];
                document.getElementById('aktuellTemperatur').innerHTML = lastItem['Temperature'];
                document.getElementById('aktuellLuftfeuchte').innerHTML = lastItem['Humidity'];
                document.getElementById('aktuellLuftdruck').innerHTML = lastItem['Pressure'];
                document.getElementById('aktuellHöhe').innerHTML = lastItem['Altitude'];

                // Output the last item to the HTML body
            } else {
                console.log('No data in the JSON file or the data is not an array.');
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

setInterval(fetchData, 5000);

fetchData();


function loadPHPContent() {
    var xhr = new XMLHttpRequest();

    // Replace 'your_php_file.php' with the actual path to your PHP file
    xhr.open('GET', 'Createjson.php', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the content of the 'result' div with the response
        }
    };

    xhr.send();
}

setInterval(loadPHPContent, 5000);

loadPHPContent();

function findMaxValueWithTimestamp(data, attributeName) {
    let maxEntry = { value: -Infinity, time_stamp: null };

    data.forEach(entry => {
        const value = parseFloat(entry[attributeName]);
        if (!isNaN(value) && value > maxEntry.value) {
            maxEntry.value = value;
            maxEntry.time_stamp = entry.time_stamp;
        }
    });

    return maxEntry;
}

function findMinValueWithTimestamp(data, attributeName) {
    let minEntry = { value: Infinity, time_stamp: null };

    data.forEach(entry => {
        const value = parseFloat(entry[attributeName]);
        if (!isNaN(value) && value < minEntry.value) {
            minEntry.value = value;
            minEntry.time_stamp = entry.time_stamp;
        }
    });

    return minEntry;
}