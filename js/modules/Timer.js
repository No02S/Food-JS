import {getZero} from './services/services';

function timer ({deadLine,timerWrap}) {
    
    setClock(timerWrap, deadLine);
    
    function setClock (selector,endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timesInterval = setInterval(updateClock,1000);
        updateClock();
        function  updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <=0) {
                clearInterval(timesInterval);
            }
        }
    }

    function getTimeRemaining (endTime) {
        const timer = {
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds:0
        };
        timer.total = Date.parse(endTime) - Date.parse(new Date());

        if (timer.total <= 0) {
            return timer;
        } else {
            timer.days = Math.floor(timer.total / (1000*60*60*24));
            timer.hours = Math.floor((timer.total / (1000*60*60)% 24));
            timer.minutes = Math.floor((timer.total /1000/60) %60);
            timer.seconds = Math.floor((timer.total /1000) %60);
            return timer;
        }
    }
}

export default timer;