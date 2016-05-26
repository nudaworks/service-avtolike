
var countdowns = document.body.querySelectorAll('.countdown');
for (var i = 0; i < countdowns.length; i++) {
    new Countdown(countdowns[i]);
    console.log(countdowns[i]);
}


function Countdown(countdownNode){
    var that = this;
    this.rootEl = countdownNode;
    this.daysCell = this.rootEl.querySelector('.countdown__item--days .countdown__digit');
    this.hoursCell = this.rootEl.querySelector('.countdown__item--hours .countdown__digit');
    this.minutesCell = this.rootEl.querySelector('.countdown__item--minutes .countdown__digit');
    this.secondsCell = this.rootEl.querySelector('.countdown__item--seconds .countdown__digit');

    this.name = this.rootEl.getAttribute('data-countdown-name');
    this.lapse = +this.rootEl.getAttribute('data-countdown-lapse');
    this.prolongate = function(){
        return 3600 * 24 * 3;
    };
    this.isStarted = function(){
        if (getCookie(this.name) === undefined) {
            console.log('aaa', getCookie('sdsdf'));return false;

        } else return true;
        console.log('bbb', getCookie(this.name));
    };
    this.resume = function(){
        setInterval((function(){
            var lapsed = +getCookie(that.name);
            setCookie(that.name, lapsed - 1, { expires: lapsed - 1 });

            var days = parseInt(  lapsed / (3600 * 24)  );
            var daysL = lapsed % (3600 * 24);
            var hours = parseInt(  daysL / 3600  );
            var hoursL = daysL % 3600;
            var minutes = parseInt(  hoursL / 60  );
            var minutesL = hoursL % 60;
            var seconds = minutesL;

            if (days < 10) days = '0' + days;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;

            that.daysCell.innerHTML = days;
            that.hoursCell.innerHTML = hours;
            that.minutesCell.innerHTML = minutes;
            that.secondsCell.innerHTML = seconds;

        }), 1000);
    };
    this.reset = function(){
        setCookie(this.name, this.lapse, { expires: this.lapse });
        console.log('a', this.name, 'b', this.lapse);
    };
    this.init = function(){
        if (this.isStarted()) {
            this.resume();
            console.log('resume');
        } else {
            this.reset();
            this.resume();
            console.log('resume reset');
        }
    };

    this.init();
}