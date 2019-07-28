(function() {

    var isSavedCookie = getCookie("userName") && getCookie("dateOfBirth");
    var userName;
    var dayOfBirth;
    var monthOfBirth;
    var yearofBirth;
    var userDayOfBirth;

    //если куки не добавлены то вызываем ф-цию
    if (!isSavedCookie) {
        askInfo()
    };

    //функция получить куки
    function getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        });
        return cookie[name];
    };

    function askInfo() {
        var today = new Date();

        askName();
        askDayofBirth();
        askMonthofBirth();
        askYearofBirth();

        function askName() {
            userName = prompt('Введите Ваше Имя');
            if (userName == null || userName == "" || !isNaN(userName)) {
                alert('Введите текстовое значение в поле Имя');
                askName();
                return userName;
            };
        };

        function askDayofBirth() {
            dayOfBirth = prompt('Введите день в который вы родились в формате "dd"');
            if (dayOfBirth == null || dayOfBirth == "" || dayOfBirth <= "0" || isNaN(dayOfBirth) || dayOfBirth.length > 2 || dayOfBirth > "31") {
                alert('Введите положительное число в формате "dd"');
                askDayofBirth();
                return dayOfBirth
            };
        };

        function askMonthofBirth() {
            monthOfBirth = prompt('Введите месяц в который вы родились в формате "mm"');
            if (monthOfBirth == null || monthOfBirth == "" || monthOfBirth <= "0" || isNaN(monthOfBirth) || monthOfBirth.length > 2 || monthOfBirth > "12") {
                alert('Введите положительное число в формате "mm"');
                askMonthofBirth();
                return monthOfBirth;
            };
        };

        function askYearofBirth() {
            yearofBirth = prompt('Введите год в который вы родились в формате "yyyy"');
            if (yearofBirth == null || yearofBirth == "" || yearofBirth <= "0" || isNaN(yearofBirth) || yearofBirth.length > 4 || yearofBirth > today.getFullYear() || yearofBirth < "1900") {
                alert('Введите положительное число в формате "yyyy"');
                askYearofBirth();
                return yearofBirth;
            };
        };

        //создаем куки
        var dd = dayOfBirth;
        var mm = monthOfBirth;

        (dd < 10 && dd.charAt(0) !== "0") ? dd = '0' + dd: dd;
        (mm < 10 && mm.charAt(0) !== "0") ? mm = '0' + mm: mm;

        var yyyy = yearofBirth;
        userDayOfBirth = `${yyyy}-${mm}-${dd}`;

        var expire = new Date();
        expire.setDate(expire.getDate() + 1);
        document.cookie = "userName=" + userName + ";expires =" + expire.toUTCString() + ";";
        document.cookie = "dateOfBirth=" + userDayOfBirth + ";expires =" + expire.toUTCString() + ";";
    };

    //добавляем заголовки, таймер и открытку
    var section = document.getElementById('section');
    var wraper = document.createElement('div');
    wraper.id = 'wraper';
    wraper.style.cssText = 'width:700px;height:1000px;';
    section.appendChild(wraper);

    var headline = document.createElement('p');
    headline.id = 'title';
    headline.style.cssText = 'font-family: Georgia, "Times New Roman", Times, serif;font-weight: 700;font-size: 35px; margin-bottom: 10px;';
    headline.innerHTML = `<span>Здравствуйте</span><span>${getCookie("userName")}!</span>`;
    wraper.appendChild(headline);

    var timerSpan = document.createElement('div');
    timerSpan.id = 'timerId';
    timerSpan.style.cssText = 'font-family: Georgia, "Times New Roman", Times, serif;font-weight: 700;font-size:27px; margin-bottom: 20 px;line-height: 1.5;';
    timerSpan.innerHTML = `<span>До Вашего дня рождения осталось:</span><div id="container"><div class="item"><span id="months_data"></span><span class="label">Mесяцев</span></div><div class="item"><span id="days_data"></span><span class="label" >Дней</span></div><div class="item"><span id="hours_data"></span><span class="label">Часов</span></div><div class="item"><span id="mins_data"></span><span class="label">Минут</span></div><div class="item"><span id="secs_data"></span><span class="label">Секунд</span></div></div>`;
    wraper.appendChild(timerSpan);

    var image = document.createElement('img');
    image.id = 'image';
    image.setAttribute('src', '/img/birth.jpg');
    wraper.appendChild(image);

    setInterval(timer, 1000);

    //функция таймера
    function timer() {
        var date_birth = getCookie("dateOfBirth").split('-');
        var today = new Date();
        var birthday = new Date(date_birth);

        birthday.setFullYear(today.getFullYear());

        if (today > birthday) {
            birthday.setFullYear(today.getFullYear() + 1);
        };

        var months = (birthday.getFullYear() - today.getFullYear()) * 12 + birthday.getMonth() - today.getMonth();
        today.setMonth(today.getMonth() + months);

        if (today.getDate() > birthday.getDate()) {
            months--
        };

        let days = 0;
        while (birthday.getDate() - 1 !== today.getDate()) {
            days++;
            today.setDate(today.getDate() + 1);
        };

        t = new Date();
        b = new Date(date_birth);

        var difference = t.getTime() - b.getTime();
        //var months = (birthday.getFullYear() - today.getFullYear()) * 12 + birthday.getMonth() - today.getMonth();
        var day = Math.floor(difference / (1000 * 60 * 60 * 24)); //делим на количество милисекунд в 1 дне
        var hours = 24 - Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)); //получаем остаток от предыд расчета и делим на количество милисекунд в 1 часу
        var mins = 60 - Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)); //остаток минут делим на количество милисекунд в 1 минуте
        var secs = 60 - Math.floor(difference % (1000 * 60) / 1000); //остаток секунд делим на количество милисекунд в 1 секунде

        document.getElementById('hours_data').innerHTML = addZero(hours);
        document.getElementById('mins_data').innerHTML = addZero(mins);
        document.getElementById('secs_data').innerHTML = addZero(secs);

        document.getElementById('months_data').innerHTML = addZero(months);
        document.getElementById('days_data').innerHTML = addZero(days);

        function addZero(num) {
            return (parseInt(num, 10) < 10 ? "0" : "") + num;
        };

    };

}())