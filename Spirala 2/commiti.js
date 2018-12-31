var tabela;
function kreirajTabelu()
{
    var divEl = document.getElementById("lol");
    var brZad = parseInt(document.getElementById("numtabela").value);
    tabela = new CommitTabela(divEl, brZad);
}
function dodaj(rbZadatka, url)
{
    var div = document.getElementById("porukice");
    var validacija = new Validacija(div);
    var rbZ = parseInt(rbZadatka.value);
    if (validacija.url(url) != -1) {
        tabela.dodajCommit(rbZ, url.value);
    }
}
function edituj(rbZad, rbCom, url) {
    var validacija = new Validacija(document.getElementById("porukice"));
    var rbZ = parseInt(rbZad.value);
    var rbC = parseInt(rbCom.value);
    if(validacija.url(url)!=-1) tabela.editujCommit(rbZ, rbC, url.value);
}
function brisi(rbZad, rbCom)
{
    rbZ = parseInt(rbZad.value);
    rbC = parseInt(rbCom.value);
    tabela.obrisiCommit(rbZ, rbC);
}
