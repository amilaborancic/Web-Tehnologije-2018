var Validacija = (function () {
    //pomocne fje
    function Poruka(divElementPoruke, inputElement, naziv) {
        var poruka = divElementPoruke.innerHTML;
        var duzina = poruka.length;
        poruka = poruka.substring(0, duzina - 1) + naziv + "!";
        divElementPoruke.innerHTML = poruka;
        inputElement.style.backgroundColor = "orangered";
        divElementPoruke.style.visibility = "visible";
    }
    function UkloniPoruku(divElementPoruke, inputElement, naziv) {
        var poruka = divElementPoruke.innerHTML;
        if (poruka.includes(naziv)) {
            poruka.replace(naziv, "");
        }
        inputElement.style.backgroundColor = "";
        //sad gledamo treba li obrisati poruku
        if (poruka == "Sljedeca polja nisu validna:!") {
            divElementPoruke.style.visibility = "hidden";
        }
    }
    var konstruktor = function (divElementPoruke) {
        divElementPoruke.innerHTML = "Sljedeca polja nisu validna:!";
        divElementPoruke.style.visibility = "hidden";
return {
    ime: function (inputElement)
    {
        var reg = new RegExp('(^[A-Z](\'?[a-z]+\'?[a-z]*(\s|\-))([A-Z](\'?[a-z]+\'?[a-z]*)(\s|-)?){0,4}$)|(^([A-Z](\'?[a-z]+)+)$)');
       
        if (!reg.test(inputElement.value)) {
            Poruka(divElementPoruke, inputElement, " ime");
        }
        else {
            UkloniPoruku(divElementPoruke, inputElement, " ime");
        }
    },
    godina: function (inputElement) {
        var tekst = inputElement.value;
        if (tekst.length != 9 || tekst.substring(0, 2) != "20" || tekst.substring(5, 7) != "20" || tekst[4] != '/' || parseInt(tekst.substring(2, 4)) + 1 != parseInt(tekst.substring(7))) {
           Poruka(divElementPoruke, inputElement, " godina");
        }
        else {
            UkloniPoruku(divElementPoruke, inputElement, " godina");
        }
    },
    repozitorij: function (inputElement, regex)
    {
        if (!regex.test(inputElement.value)) {
           Poruka(divElementPoruke, inputElement, " repozitorij");
        }
        else {
            UkloniPoruku(divElementPoruke, inputElement, " repozitorij");
        }
    },
    index: function (inputElement)
    {
        var tekst = inputElement.value;
        var poz = 0;
        try {
            poz = parseInt(tekst);
            var prveDvije = parseInt(tekst.substring(0, 2));
            if (tekst.length != 5 || poz <= 0 || prveDvije < 14 || prveDvije > 20) {
                Poruka(divElementPoruke, inputElement, " indeks");
            }
            else {
                UkloniPoruku(divElementPoruke, inputElement, " indeks");
            }
        }
        catch (any) {
            UkloniPoruku(divElementPoruke, inputElement, " indeks");
        }

    },
    naziv: function (inputElement)
    {
        var reg = /([A-Z]|[a-z]){2,}[a-zA-z0-9\-\ \/ '!?:;,]{0,}[0-9 a-z]{1}/;
        var tekst = inputElement.value;
        if (!reg.test(tekst)) {
            Poruka(divElementPoruke, inputElement, " naziv");
        }
        else {
            UkloniPoruku(divElementPoruke, inputElement, " naziv");
        }
    },
    password: function (inputElement)
    {
        var tekst = inputElement.value;
        var reg = new RegExp('([0-9 a-z]|[a-z A-Z]|[A-Z 0-9]|[a-z A-z 0-9]){8,}');
        if (tekst.length < 8 || !reg.test(tekst)) {
            Poruka(divElementPoruke, inputElement, " password");
        }
        else {
            UkloniPoruku(divElementPoruke, inputElement, " password");
        }
        
    },
    url: function (inputElement) {
       var tekst = inputElement.value;
       var reg = /^((http(s)?|ftp|ssh):\/\/){1}[A-Za-z0-9]+([.]{1}[A-Za-z0-9]+)*((\/[A-Za-z0-9]+)*|(\/[A-Za-z0-9]+)+[?]{1}([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[&]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9]))$/;
      
        if (!reg.test(tekst)) {
            Poruka(divElementPoruke, inputElement, " url");
            return -1;
        }
        else {
            UkloniPoruku(divElementPoruke, inputElement, " url");
        }
    }
    }
    }
    
return konstruktor;
}());

