var cardinal_is_active = true;
var normal_is_active = false;

const cvt2digit = (num) => {
    if(num >= 0 && num < 10) return "0" + num;
    else return num;
};

const timeval_tag = (tval, text) => {
    var cvtstr = cvt2digit(tval);
    return `${cvtstr}<a class="value-name">${text}</a>`;
};

function sleep(ms) {
    var old_time = new Date().getTime();
    while((new Date().getTime() - old_time) < ms)
    {
        continue;
    }
    return;
}

function activate_normal() 
{
    document.body.classList.remove("cardinal-alph");
    document.body.classList.add("normal-alph");
    document.getElementById("nf-button").classList.remove("inactive");
    document.getElementById("nf-button").classList.add("active");
    document.getElementById("cf-button").classList.remove("active");
    document.getElementById("cf-button").classList.add("inactive");
    normal_is_active = true;
    cardinal_is_active = false;
}

function activate_cardinal() 
{
    document.body.classList.remove("normal-alph");
    document.body.classList.add("cardinal-alph");
    document.getElementById("nf-button").classList.remove("active");
    document.getElementById("nf-button").classList.add("inactive");
    document.getElementById("cf-button").classList.remove("inactive");
    document.getElementById("cf-button").classList.add("active");
    normal_is_active = false;
    cardinal_is_active = true;
}

let countDownDate_UTC = new Date("May 14, 2022 14:00:00").getTime();
let countDownDate_Locale = countDownDate_UTC - new Date().getTimezoneOffset() * 60 * 1000;
var timer_is_set = false;

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate_Locale - now;

    var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
    var days = Math.floor(distance %  (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(weeks > 1 || weeks == 0) document.getElementById("week").innerHTML = timeval_tag(weeks, "WEEKS");
    else document.getElementById("week").innerHTML = timeval_tag(weeks, "WEEK");

    if(days > 1 || days == 0) document.getElementById("day").innerHTML = timeval_tag(days, "DAYS");
    else document.getElementById("day").innerHTML = timeval_tag(days, "DAY");

    if(hours > 1 || hours == 0) document.getElementById("hour").innerHTML = timeval_tag(hours, "HOURS");
    else document.getElementById("hour").innerHTML = timeval_tag(hours, "HOUR");
    
    if(minutes > 1 || minutes == 0) document.getElementById("minute").innerHTML = timeval_tag(minutes, "MINUTES");
    else document.getElementById("minute").innerHTML = timeval_tag(minutes, "MINUTE");

    if(seconds > 1 || seconds == 0) document.getElementById("second").innerHTML = timeval_tag(seconds, "SECONDS");
    else document.getElementById("second").innerHTML = timeval_tag(seconds, "SECOND");

    //var time_elem = document.getElementsByClassName("timer")[0];
    var time_vals = document.getElementsByClassName("time-value");
    var val_names = document.getElementsByClassName("value-name");
    var time_elem = document.getElementsByClassName("timer")[0];

    if(!timer_is_set)
    {
        time_elem.style.opacity = 0;
        time_elem.hidden = false;
        time_elem.setAttribute("class", "timer anim-fade-in-down");
        timer_is_set = true;
        var z = setTimeout(function(){time_elem.style.opacity = 1; clearInterval(z);}, 1400);
    }
    
    for(i = 0; i < time_vals.length; i++)
    {
        let px_value = (time_vals[i].clientWidth - val_names[i].clientWidth)/2;
        val_names[i].style.paddingLeft = `${px_value}px`;
    }
    
    if(weeks <= 0 && days <= 0 && hours <= 0 && minutes <= 0 && seconds < 60)
    {
        time_elem.setAttribute("class", "timer anim-blink-white-red");
        time_elem.style.animationDuration = "1000ms";
            
        if (seconds <= 0) 
        {
            sleep(100);
            time_elem.style.opacity = 0;
            time_elem.style.animationDuration = "3000ms";
            time_elem.style.fontWeight = "bolder";
            time_elem.innerHTML = '<a>THE CHAPTER HAS BEEN UPLOADED</a>';
            time_elem.setAttribute("class", "timer anim-fade-in-out");

            clearInterval(x);

            setTimeout(function() { 
                time_elem.style.display = "none";
                document.getElementById("action-list").setAttribute("class", "menu-list anim-fade-in-up");
                document.getElementById("action-list").style.animationDuration = "800ms";
                document.getElementById("action-list").style.opacity = 1;
                document.getElementById("action-list").style.display = "block";
            }, 3000);
        }
    }
}, 1000);

