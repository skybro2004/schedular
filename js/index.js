function update(grade, schlClass, date){
    var url = 'https://api.skybro2004.com/schedular'
    url += "?date=" + date
    url += "&grade=" + grade
    url += "&class=" + schlClass
    url += "&range=week"
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
                    var subject = String(item.item)
                    if(subject.startsWith('선택')){
                        if(getCookie("select" + subject.charAt(subject.length-1))!=undefined && getCookie("select" + subject.charAt(subject.length-1))!="none"){
                            subject = getCookie("select" + subject.charAt(subject.length-1))
                        }
                    }
                    document.getElementsByClassName(String(item.weekday_str + item.period))[0].innerHTML = subject
                    document.getElementsByClassName(String(item.weekday_str + item.period))[1].innerHTML = subject
                }
                document.getElementById("info").innerHTML = grade + "학년 " + schlClass + "반 시간표"
                document.getElementById("mobile-info").innerHTML = grade + "학년 " + schlClass + "반 시간표"
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
            document.getElementsByClassName(String(weekday + period))[0].innerHTML = " "
            document.getElementsByClassName(String(weekday + period))[1].innerHTML = "-"
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


//==========================================================================================================


var date = getFormattedDate(new Date())
var jsdate = new Date//(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2))
var expdate = new Date('2022-03-09');
if(getCookie("grade")==undefined) setCookie("grade", 1, expdate)
if(getCookie("class")==undefined) setCookie("class", 1, expdate)
update(getCookie("grade"), getCookie("class"), date)

var isMobile = false
var innerWidth = window.innerWidth;
if(innerWidth<716){
    isMobile = true
}
else{
    isMobile = false
}
window.addEventListener('resize', function () {
	var innerWidth = window.innerWidth;
    if(innerWidth<716){
        isMobile = true
    }
    else{
        isMobile = false
    }
});

var weekday = jsdate.getDay() - 1
if(weekday==-1 || weekday==5){
    weekday = 0
}
var weekdays = ["월", "화", "수", "목", "금"]

var mySwiper = new Swiper('.swiper-container', {
    // 슬라이드를 버튼으로 움직일 수 있습니다.
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 현재 페이지를 나타내는 점이 생깁니다. 클릭하면 이동합니다.
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable:true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '"><span>' + (weekdays[index]) + '</span></div>';
        }
    },
    // 현재 페이지를 나타내는 스크롤이 생깁니다. 클릭하면 이동합니다.
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    slidesPerView: 3,
    centeredSlides: true,
    initialSlide: weekday
});