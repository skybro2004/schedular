function launch(){
    location.href = "../meal"
}

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value + ';path=/';
}

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}

function format(){
    var args = Array.prototype.slice.call (arguments, 1)
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index){
        return args[index];
    });
}

function update(grade, schlClass, date){
    var url = 'https://api.skybro2004.com/schedular'
    url += "?date=" + date
    url += "&grade=" + grade
    url += "&class=" + schlClass
    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    }
    fetch(url, config)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(data => {
            console.log("data")
            console.log(data)
            console.log("code : ", data.code)
            if(data.code==200){
                clear()
                for(const item of data.data){
                    //console.log(item.weekday_str + item.period + "|" + item.item);
                    document.getElementById("info").innerHTML = grade + "학년 " + schlClass + "반 시간표"
                    document.getElementById("mobile-info").innerHTML = grade + "학년 " + schlClass + "반 시간표"
                    var subject = String(item.item)
                    if(subject.startsWith('선택')){
                        if(getCookie("select" + subject.charAt(subject.length-1))!=undefined){
                            subject = getCookie("select" + subject.charAt(subject.length-1))
                        }
                    }
                    console.log(String(item.weekday_str + item.period))
                    console.log(document.getElementsByClassName(String(item.weekday_str + item.period)))
                    document.getElementsByClassName(String(item.weekday_str + item.period))[0].innerHTML = subject
                    document.getElementsByClassName(String(item.weekday_str + item.period))[1].innerHTML = subject
                }
                var dateFrom = data.header.dateFrom
                var dateTo = data.header.dateTo
                document.getElementsByClassName("week")[0].innerHTML = format("{0}월 {1}일 ~ {2}월 {3}일 시간표", dateFrom.substr(4, 2), dateFrom.substr(6, 2), dateTo.substr(4, 2), dateTo.substr(6, 2))
                document.getElementsByClassName("week")[1].innerHTML = format("{0}/{1}~{2}/{3}", dateFrom.substr(4, 2), dateFrom.substr(6, 2), dateTo.substr(4, 2), dateTo.substr(6, 2))
            }
            else if(data.code==404){
                alert("시간표 정보가 없어요!")
            }
        })
        .catch(err => {
            console.log("error")
            console.log(err)
        })
}

function clear(){
    for(var weekday of ["MON", "TUE", "WED", "THU", "FRI"]){
        for(var period=1; period<8; period++){
            document.getElementsByClassName(String(weekday + period)).innerHTML = " "
        }
    }

}

function nextWeek(){
    console.log(date, jsdate, "=>")
    jsdate.setDate(jsdate.getDate() + 7)
    date = String(jsdate.getFullYear()) + (jsdate.getMonth() + 1).toString().padStart(2,'0') + jsdate.getDate().toString().padStart(2,'0')
    console.log(date, jsdate)
    update(getCookie("grade"), getCookie("class"), date)
    }

function prevWeek(){
    console.log(date, jsdate, "=>")
    jsdate.setDate(jsdate.getDate() - 7)
    date = String(jsdate.getFullYear()) + (jsdate.getMonth() + 1).toString().padStart(2,'0') + jsdate.getDate().toString().padStart(2,'0')
    console.log(date, jsdate)
    update(getCookie("grade"), getCookie("class"), date)
}

function todayWeek(){
    console.log(date, jsdate, "=>")
    jsdate = new Date()
    date = String(jsdate.getFullYear()) + (jsdate.getMonth() + 1).toString().padStart(2,'0') + jsdate.getDate().toString().padStart(2,'0')
    console.log(date, jsdate)
    update(getCookie("grade"), getCookie("class"), date)
}