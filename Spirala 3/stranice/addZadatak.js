validiraj = function () {
    var div = document.getElementById('poruke');
    var val = new Validacija(div);
    val.naziv(document.getElementsByName('naziv')[0]);
}