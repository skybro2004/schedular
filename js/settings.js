function onChange(e){
    const value = e.value
    const name = e.getAttribute('name')
    console.log(name, value, expdate)

    setCookie(name, value, expdate)
}

function buttonDone(){
    for(var select of ["A", "C", "D", "E", "F"]){

    }
}

function done(){
    window.history.back()
}