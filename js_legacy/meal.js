function update(date){
    url = "https://api.skybro2004.com/meal?date=" + date
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
            console.log(data)
            document.getElementsByClassName("meal-main-list")[0].innerHTML = ""
            document.getElementById("date").innerText = date
            if(data.code==200){
                var mealList = document.getElementsByClassName("meal-main-list")[0]
                for(const item of data.meal){
                    console.log(item)
                    var temp = document.createElement('li')
                    temp.className = "meal-main-list-item"
                    temp.innerHTML = item.name
                    mealList.appendChild(temp)
                }
                document.getElementsByClassName("meal-footer-kcal")[0].innerHTML = data.cal
            }
            else if(data.code==404){
                document.getElementsByClassName("meal-main-list")[0].innerHTML = "급식이 없어요!"
                document.getElementsByClassName("meal-footer-kcal")[0].innerHTML = "- Kcal"
            }
            else{
                console.log(data.code)
                document.write("error : ", data.code)
            }
        })
}

function prevDay(){
    jsdate.setDate(jsdate.getDate() - 1)
    date = String(jsdate.getFullYear()) + (jsdate.getMonth() + 1).toString().padStart(2,'0') + jsdate.getDate().toString().padStart(2,'0')
    update(date)
}

function nextDay(){
    jsdate.setDate(jsdate.getDate() + 1)
    date = String(jsdate.getFullYear()) + (jsdate.getMonth() + 1).toString().padStart(2,'0') + jsdate.getDate().toString().padStart(2,'0')
    update(date)
}