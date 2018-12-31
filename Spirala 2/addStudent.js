validiraj = function () {
    var validacija = new Validacija(document.getElementById('porukice'));

    validacija.ime(document.getElementsByName('ime')[0]);
    validacija.index(document.getElementsByName('index')[0]);
}