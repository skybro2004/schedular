//날짜 포매팅
//2004-03-09 ==> 20040309
function getFormattedDate(date){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}



function format(){
    var args = Array.prototype.slice.call (arguments, 1)
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index){
        return args[index];
    });
}



//쿠키 만들기
function setCookie(cookie_name, value, date) {
    var exdate = date
// 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value)
    document.cookie = cookie_name + '=' + cookie_value + ';path=/' + ';expires=' + exdate.toUTCString();
}

//쿠키 꺼내오기
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