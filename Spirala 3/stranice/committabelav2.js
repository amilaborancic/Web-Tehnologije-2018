var CommitTabela = (function () {
    //lokalne variable idu ovdje
    var brCom;
    var konstruktor = function (divElement, brojZadataka) {
        var html = "<table id='crkni'>";
            html += "<tr>";
            html += "<th> Naziv zadatka </th>";
            html += "<th colspan='1'> Commiti </th > ";
            html += "</tr>";
        for (var i = 1; i <= brojZadataka; i++) {
            html += "<tr>";
            html += "<td><a href='https://c2.etf.unsa.ba/mod/url/view.php?id=39779'>Zadatak " + i.toString() + ".</a></td>";

            html += "</tr>";
        }
        html += "</table>";
        divElement.innerHTML += html;
        
        return {
            dodajCommit: function (rbZadatka, url) {

                var tabela = document.getElementById('crkni');
                var redovi = tabela.rows;
                if (rbZadatka >= redovi.length) return -1;
                var theRed = redovi[rbZadatka];
                var span; var td;
                //prvo dodavanje u tabelu
                if (theRed.cells.length == 1) {
                    theRed.insertCell(-1);
                    theRed.cells[1].innerHTML = "<a href = '" + url + "'>" + 1 + "</a>";
                    for (var i = 1; i < redovi.length; i++) {
                        if (i == rbZadatka) continue;
                        var x = redovi[i].insertCell(-1);
                        x.setAttribute('colspan', "1");
                    }
                }
                else {
                    for (var i = 1; i < theRed.cells.length; i++) {
                        if (theRed.cells[i].innerHTML == "" && theRed.cells[i].colSpan == 1) {
                            if (i == theRed.cells.length - 1) {
                                theRed.cells[i].innerHTML = "<a href = '" + url + "'>" + i.toString() + "</a>";
                            }
                            else {
                                if (i == 1) brCom = 1;
                                else brCom = parseInt(theRed.cells[i - 1].getElementsByTagName('a')[0].text, 10) + 1;
                                theRed.cells[i].innerHTML = "<a href = '" + url + "'>" + brCom.toString() + "</a>";
                            }
                            break;
                        }
                        else if (theRed.cells[i].colSpan != 1) {
                            span = theRed.cells[i].getAttribute('colspan');
                            theRed.cells[i].setAttribute('colspan', 1);
                            if (i == 1) brCom = 1;
                            else {
                                brCom = parseInt(theRed.cells[i - 1].getElementsByTagName('a')[0].text, 10) + 1;
                            }
                            theRed.cells[i].innerHTML = "<a href = '" + url + "'>" + brCom.toString() + "</a>";
                            td = document.createElement("td");
                            td.colSpan = span - 1;
                            theRed.appendChild(td);
                            break;
                        }
                        else if (i == theRed.cells.length - 1) {
                            brCom = parseInt(theRed.cells[i].getElementsByTagName('a')[0].text, 10) + 1;
                            theRed.insertCell(i + 1);
                            theRed.cells[i + 1].innerHTML = "<a href = '" + url + "'>" + brCom.toString() + "</a>";
                            for (var j = 0; j < redovi.length; j++) {
                                var kraj = redovi[j].cells.length - 1;
                                if (j == rbZadatka) continue;
                                var provjera = document.getElementsByTagName('tr')[j].cells[kraj].getAttribute('colspan');
                                var span = parseInt(document.getElementsByTagName('tr')[j].cells[kraj].getAttribute('colspan'), 10) + 1;
                                if (provjera == null) {
                                    td = document.createElement('td');
                                    td.colSpan = 1;
                                    redovi[j].appendChild(td);
                                }
                                else document.getElementsByTagName('tr')[j].cells[kraj].setAttribute('colspan', span.toString());
                            }
                            break;
                        }
                    }
                }
                   
            },
            editujCommit: function (rbZadatka, rbCommita, url) {
                var tabela = document.getElementById('crkni');
                if (rbZadatka <= 0 || rbZadatka >= tabela.rows.length || rbCommita <= 0 || rbCommita >= tabela.rows[rbZadatka].cells.length)
                    return -1;
               tabela.rows[rbZadatka].cells[rbCommita].getElementsByTagName('a')[0].setAttribute('href', url);
            },
            obrisiCommit: function (rbZadatka, rbCommita) {

                var tabela = document.getElementById('crkni');
                var redovi = tabela.rows;
                if (rbZadatka <= 0 || rbZadatka > redovi.length || rbCommita > redovi[rbZadatka].cells.length || rbCommita <= 0) return -1;
                
                redovi[rbZadatka].deleteCell(rbCommita);

            }
        }
    }
    return konstruktor;
}());