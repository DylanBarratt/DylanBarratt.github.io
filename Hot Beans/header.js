var burger = document.getElementById("burger");
burger.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        burgerX(burger);
    }
});


var open = false;
function burgerX(x) {
    x.classList.toggle("change");
    if (!open) {
        open = true;
        document.getElementById("nw").style.width = "100%";
        document.getElementById("burger").style.backgroundColor = "white";
        document.getElementById("logo").src = "../images/logos/beansB.png";
        document.getElementById("header").style.backgroundColor = "white";
    } else {
        open = false;
        document.getElementById("nw").style.width = "0%";
        document.getElementById("burger").style.backgroundColor = "transparent";
        document.getElementById("logo").src = "../images/logos/beansW.png";
        document.getElementById("header").style.backgroundColor = "transparent";
    }
}