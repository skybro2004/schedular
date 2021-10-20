var date = getToday()
var jsdate = new Date//(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2))
var expdate = new Date('2021-03-09');
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