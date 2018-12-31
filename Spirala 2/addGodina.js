validiraj = function() {
    var lol = document.getElementById('lol');
    var val = new Validacija(lol);
    var nazivGodine = document.getElementsByName('naziv')[0];
    val.godina(nazivGodine);
    val.repozitorij(document.getElementsByName('rvjezbe')[0], /^\d\.blabla$/);
    val.repozitorij(document.getElementsByName('rspiral')[0], /^Spirala\s\d$/);
}