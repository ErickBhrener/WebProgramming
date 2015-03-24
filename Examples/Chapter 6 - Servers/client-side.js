function operacion(){
    var n1 = document.getElementById("num1").value;
    var n2 = document.getElementById("num2").value;

    location.href = "http://localhost:10001" + "?number1=" + n1 + "&number2=" + n2;
}