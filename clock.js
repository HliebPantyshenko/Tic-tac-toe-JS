window.onload = function(){
    window.setInterval(function(){
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds()

        let clock = hours + ":" + minutes + ":" + seconds;
        document.getElementById("clock").innerHTML = clock;
    });
}