validiraj = function() {
    var lol = document.getElementById('lol');
    var val = new Validacija(lol);
    var nazivGodine = document.getElementsByName('nazivGod')[0];
    val.godina(nazivGodine);
    val.repozitorij(document.getElementsByName('nazivRepVje')[0], new RegExp('lv\s\d*'));
    val.repozitorij(document.getElementsByName('nazivRepSpi')[0], new RegExp('Spirala\s\d'));
}