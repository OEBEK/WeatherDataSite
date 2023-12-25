const minEntry = { value: Infinity, time_stamp: null };

export function findMinValueWithTimestamp(data, attributeName) {
    minEntry.value = Infinity;
    minEntry.time_stamp = null;

    data.forEach(entry => {
        const value = parseFloat(entry[attributeName]);
        if (!isNaN(value) && value < minEntry.value) {
            minEntry.value = value;
            minEntry.time_stamp = entry.time_stamp;
        }
    });

    return { ...minEntry };
}

export const maxEntry = { value: -Infinity, time_stamp: null };

export function findMaxValueWithTimestamp(data, attributeName) {
    maxEntry.value = -Infinity;
    maxEntry.time_stamp = null;

    data.forEach(entry => {
        const value = parseFloat(entry[attributeName]);
        if (!isNaN(value) && value > maxEntry.value) {
            maxEntry.value = value;
            maxEntry.time_stamp = entry.time_stamp;
        }
    });

    return { ...maxEntry };
}


export function updateDOM(id, value, timestampId, timestamp) {
    document.getElementById(id).innerHTML = value;
    document.getElementById(timestampId).innerHTML = timestamp;
}
