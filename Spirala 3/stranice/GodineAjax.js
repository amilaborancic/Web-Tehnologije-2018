var GodineAjax = (function () {
    var konstruktor = function (divSadrzaj) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                //upisi sadrzaj u div
                //zao mi je osobe koja ce pregledati ovo
                //sry whoever u are
                //ima garant pametniji nacin da se ovo rijesi but idk
                var odg = ajax.responseText; //ovo bi valjda trebalo da je popis iz zad 5
                if(odg.length==1){
                    if(odg[0].nazivGod==null) return;
                    //lol
                }
                var parsirano = JSON.parse(odg);
                var pom = "";
                for (var i = 0; i < parsirano.length-1; i++) {
                    pom += '<div class="godina">';
                    pom += '<p>' + parsirano[i].nazivGod + '</p>';
                    pom += '<p>';
                    pom += 'Naziv vjezbe:' + parsirano[i].nazivRepVje + '</br>';
                    pom += 'Naziv spirale:' + parsirano[i].nazivRepSpi + '</br>';
                    pom += '</p></div>';
                }
                divSadrzaj.innerHTML += pom;
            }
        }

        ajax.open("GET", "http://localhost:8080/godine", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
        return {
            osvjezi: function () {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        //upisi sadrzaj u div
                        //zao mi je osobe koja ce pregledati ovo
                        //sry whoever u are
                        var odg = ajax.responseText; //ovo bi valjda trebalo da je popis iz zad 5
                        if(odg.length==1){
                            if(odg[0].nazivGod==null) return;
                            //lol
                        }
                        var parsirano = JSON.parse(odg);
                        var pom = "";
                        for (var i = 0; i < parsirano.length-1; i++) {
                            pom += '<div class="godina">';
                            pom += '<p>' + parsirano[i].nazivGod + '</p>';
                            pom += '<p>';
                            pom += 'Naziv vjezbe:' + parsirano[i].nazivRepVje + '</br>';
                            pom += 'Naziv spirale:' + parsirano[i].nazivRepSpi + '</br>';
                            pom += '</p></div>';
                        }
                        divSadrzaj.innerHTML += pom;
                    }
                }
                ajax.open("GET", "http://localhost:8080/godine", true);
                ajax.setRequestHeader("Content-Type", "application/json");
                ajax.send();

            }
        }
    }
    return konstruktor;
}());