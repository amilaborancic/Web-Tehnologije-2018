validiraj = function () {

    var div = document.getElementById('porukice');
    var val = new Validacija(div);
    val.naziv(document.getElementsByName('nazivvjezbe')[0]);

}