import { utcToZonedTime } from 'date-fns-tz'

class Clock {
  constructor(el){
    this.clockEl = el;
    this.UI = {};
    this.initializeClock();
  }
  
  updateClock = () => {
  // GETTING TIME
  const date = new Date();
  const now = utcToZonedTime(date, this.clockEl.dataset.locale);
  // const date = now.getDate();
  const seconds = (now.getSeconds() + now.getMilliseconds() / 1000) / 60 * 360;
  const minutes = (now.getMinutes() + now.getSeconds() / 60) / 60 * 360;
  const hours = (now.getHours() + now.getMinutes() / 60) / 12 * 360;
  // UI Update
  this.UI.date.textContent = now.getDate();
  this.UI.am_pm.textContent = now.getHours() > 12 ? 'PM' : 'AM';
  this.UI.second.style.transform = `rotate(${seconds}deg)`;
  this.UI.minute.style.transform = `rotate(${minutes}deg)`;
  this.UI.hour.style.transform = `rotate(${hours}deg)`;
  requestAnimationFrame(this.updateClock)
  }

  initializeClock() {
    this.clockEl.innerHTML = `<svg class="clockface" width="300" height="300" viewBox="-150 -150 300 300">
            <circle class="ring ring--seconds" r="145" pathlength="60" />
            <circle class="ring ring--hours" r="145" pathlength="12" />
            <text x="50" y="-5" class="date">23</text>
            <text x="50" y="10" class="am-pm">am</text>
            <line class="hand hand--minute" x1="0" y1="2" x2="0" y2="-110" />
            <line class="hand hand--hour" x1="0" y1="2" x2="0" y2="-60" />
            <circle class="ring ring--center" r="3" />
            <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-130" />
          </svg>`
  this.UI.date = this.clockEl.querySelector('.date');
  this.UI.am_pm = this.clockEl.querySelector('.am-pm');
  this.UI.second = this.clockEl.querySelector('.hand--second');
  this.UI.minute = this.clockEl.querySelector('.hand--minute');
  this.UI.hour = this.clockEl.querySelector('.hand--hour');
  requestAnimationFrame(this.updateClock)
}
}

const clocks = document.querySelectorAll('.clock');
clocks.forEach(el => new Clock(el))
