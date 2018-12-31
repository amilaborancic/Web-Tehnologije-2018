validiraj = function ()
{
    var div = document.getElementById('dummy');
    var pass = document.getElementsByName('password')[0];
    var validacija = new Validacija(div);
    validacija.password(pass);
}