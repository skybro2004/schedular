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
            console.log("code : ", data.code)
            console.log(data)
            if(data.code==200){
                //현재 작성된 데이터 지우기
                clear()

                for(const item of data.data){
                    //console.log(item.weekday_str + item.period + "|" + item.item);
                    console.log(item)
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

//싹다 지우기
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