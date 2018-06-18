function comprobar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
                    this.responseText;
        }
    };
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var request = "user=" + user + "&password=123";
    xhttp.open('GET', "control.php?" + request, true);
    xhttp.send();
}
function cargar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
                    this.responseText;
        }
    };
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var request = "user=" + user + "&password=123";
    xhttp.open("POST", "control.php", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(request);
}
function borrar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
                    this.responseText;
        }
    };
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var request = "user=" + user + "&password=123";
    xhttp.open("DELETE", "control.php", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(request);
}