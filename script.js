const schedule = [
    { time: '7:45', activity: 'niet vroeger douchen' },
    { time: '8:15', activity: 'wekken' },
    { time: '8:30', activity: 'eten' },
    { time: '9:15', activity: 'verzamelen arena - lesmoment 1' },
    { time: '10:45', activity: 'pauze - bar - inschrijven activiteiten' },
    { time: '11:05', activity: 'lesmoment 2' },
    { time: '12:30', activity: 'middageten en vrij' },
    { time: '13:45', activity: 'verzamelen arena - lesmoment 3' },
    { time: '15:15', activity: 'pauze - verzamelen' },
    { time: '15:20', activity: 'verzamelen bronne - start nammidagactiviteiten' },
    { time: '17:45', activity: 'vrij' },
    { time: '18:30', activity: 'avondeten - vrij' },
    { time: '19:45', activity: 'verzamelen arena - start avondactiviteiten' },
    { time: '21:30', activity: 'vrij - bar' },
    { time: '22:00', activity: 'niet meer douchen' },
    { time: '22:00', activity: 'slapen gaan 1e graad blauw bandje' },
    { time: '22:30', activity: 'slapen gaan 2e graad groen bandje' },
    { time: '22:45', activity: 'slapen gaan 3e graad geel/roze bandje' }
];

const betterSchedule = [];

schedule.forEach((item, index, array) => {
    const [hour, minute] = item.time.split(':').map(Number);

    const timeInMinutes = hour * 60 + minute;

    let newvalue = { activity: item.activity, startTime: item.time };

    newvalue.startMinutes = timeInMinutes;

    const nextItem = array[(index + 1) % array.length];

    const nextMinutes = timeStringToMinutes(nextItem.time);

    newvalue.endMinutes = nextMinutes;

    newvalue.endTime = nextItem.time;

    betterSchedule.push(newvalue);

});

function timeStringToMinutes(timeString) {
    const [hour, minute] = timeString.split(':').map(Number);
    return hour * 60 + minute;
}



function createTable() {
    const tbody = document.querySelector('#schedule-table tbody');

    schedule.forEach((item, index) => {
        const [hour, minute] = item.time.split(':').map(Number)

        const row = document.createElement('tr')
        row.setAttribute('hour', hour)
        row.setAttribute('minute', minute)
        row.classList.add('activity');

        const hourStr = String(hour).padStart(2, '0');
        const minuteStr = String(minute).padStart(2, '0');

        const timeCell = document.createElement('td');
        timeCell.classList.add('cell');
        timeCell.classList.add('cell-time');
        timeCell.innerHTML = `<span class="hour">${hourStr}</span>:<span class="minute">${minuteStr}</span>`;
        row.appendChild(timeCell);

        const activityCell = document.createElement('td');
        activityCell.classList.add('cell');
        activityCell.classList.add('cell-activity');
        activityCell.innerText = item.activity;
        row.appendChild(activityCell);

        tbody.appendChild(row);
    })
}

function updateCurrentTime() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentTimeText = String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');
    document.querySelector('#currentTime').innerHTML = currentTimeText;

    betterSchedule.forEach((item, index) => {
        if (currentMinutes >= item.startMinutes && currentMinutes < item.endMinutes) {

            document.querySelector('#currentActivity').innerHTML = item.activity;
            document.querySelector("#currentActivityFrom").innerHTML = item.startTime;
            document.querySelector("#currentActivityTo").innerHTML = item.endTime;
        }

    })
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime();
createTable()