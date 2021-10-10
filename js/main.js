var date = getToday()
var jsdate = new Date//(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2))
if(getCookie("grade")==undefined) setCookie("grade", 1, 30)
if(getCookie("class")==undefined) setCookie("class", 1, 30)
update(getCookie("grade"), getCookie("class"), date)

var isMobile = false
var innerWidth = window.innerWidth;
if(innerWidth<716){
    console.log("mobile")
    isMobile = true
}
else{
    console.log("ese")
    isMobile = false
}
window.addEventListener('resize', function () {
	var innerWidth = window.innerWidth;
    if(innerWidth<716){
        console.log("mobile")
        isMobile = true
    }
    else{
        console.log("ese")
        isMobile = false
    }
});