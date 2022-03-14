function update(grade, schlClass, date){
    //url 만들기
    //https://api.skybro2004.com/schedular?date=20220314&grade=3&class=8&range=week
    url = "https://api.skybro2004.com/schedular"
    url += "?date=" + date
    url += "&grade=" + grade
    url += "&class=" + schlClass
    url += "&range=week"

    //fetch config
    //아마 cors 문제 해결하기 위해 넣은걸로 추정
    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    }

    //fetch
    fetch(url, config)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(resData => {
            //디버그
            console.log("res code :" + resData.code)
            console.log(resData)

            //200 정상
            if(resData.code==200){
                //이미 작성된 데이터 지우기
                clear()

                //header 날짜 표기
                dateFrom = resData.header.dateFrom
                dateTo = resData.header.dateTo
                document.getElementsByClassName("week")[0].innerHTML = `${dateFrom.substr(4, 2)}월 ${dateFrom.substr(6, 2)}일 ~ ${dateTo.substr(4, 2)}월 ${dateTo.substr(6, 2)}일 시간표`
                document.getElementsByClassName("week")[1].innerHTML = `${dateFrom.substr(4, 2)}/${dateFrom.substr(6, 2)} ~ ${dateTo.substr(4, 2)}/${dateTo.substr(6, 2)}`

                //header 학년 반 표시
                document.getElementById("info").innerHTML = grade + "학년 " + schlClass + "반 시간표"
                document.getElementById("mobile-info").innerHTML = grade + "학년 " + schlClass + "반"

                //시간표 작성
                for(const item of resData.data){
                    var subject = String(item.item)
                    //선택과목
                    if(subject.startsWith("선택")){
                        //선택과목 쿠키가 있는지
                        if(getCookie("select" + subject.charAt(subject.length-1))!=undefined && getCookie("select" + subject.charAt(subject.length-1))!="none"){
                            subject = getCookie("select" + subject.charAt(subject.length-1))
                        }
                    }

                    //시간표 작성하는 코드
                    document.getElementsByClassName(item.weekday_str + item.period)[0].innerHTML = subject
                    document.getElementsByClassName(item.weekday_str + item.period)[1].innerHTML = subject
                }
            }
            //else(resData)
        })
}

//싹다 지우기
function clear(){
    for(var weekday of ["MON", "TUE", "WED", "THU", "FRI"]){
        for(var period=1; period<8; period++){
            document.getElementsByClassName(String(weekday + period))[0].innerHTML = " "
            document.getElementsByClassName(String(weekday + period))[1].innerHTML = "-"
        }
    }
}




setCookie("grade", 3, new Date("2023-03-02"))
setCookie("class", 8, new Date("2023-03-02"))
if(getCookie("grade")==undefined) setCookie("grade", 1, new Date("2023-03-02"))
if(getCookie("class")==undefined) setCookie("class", 1, new Date("2023-03-02"))
update(getCookie("grade"), getCookie("class"), "20220314")






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



var weekday = new Date().getDay() - 1
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