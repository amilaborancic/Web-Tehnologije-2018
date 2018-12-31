var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var app = express();
//middleware za body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET requests za stranice - prvi zadatak
//looooooooool treba ovako
//much logic
app.use(express.static("stranice"));
//Zadatak 2

var mult = require("multer");
var storage = mult.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = mult({ storage: storage });

app.post("/addZadatak", upload.single('postavka'), (req, res)=> {
    //req.file je fajl sa postavkom
    //req.body sadrzi tekstualne podatke s forme

    var postavka = req.file;
    var ostalo = req.body;
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, ostalo.naziv + '.pdf');
    if (postavka.mimetype != "application/pdf") {
        //treba vratiti greska.html
        res.sendFile(__dirname + '/greska.html');
    }
    else {
        fs.stat(__dirname + ostalo.naziv + ".pdf", function (err) {
            if (err) {
                //file ne postoji pa kreiramo json
                var obj = {
                    "naziv": ostalo.naziv,
                    "postavka": "http://localhost:8080/" + ostalo.naziv + ".pdf"
                };
                fs.appendFile(__dirname + "/t_zadaci/" + ostalo.naziv + ".json", JSON.stringify(obj), function (err) {
                    if (err) throw err;
                });
                //pravimo postavku
                fs.readFile(tempPath, function (err, data) {
                    if (err) throw err;
                    fs.appendFile(targetPath, data, function (err) {
                        if (err) throw err;
                        res.contentType('application/json');
                        res.sendFile(__dirname + "/t_zadaci/" + ostalo.naziv + ".json");

                    });
                });
            }
            else {
                res.sendFile(__dirname + '/greska.html');
            }
        });
    }


});

// Zadatak 3
app.get("/zadatak", function (req, res) {
    fs.readFile(__dirname + "/" + req.query.naziv + ".pdf", function (err, data) {
        if (err) throw err;
        res.contentType("application/pdf");
        res.send(data);
    });
});
//Zadatak 4 
app.post("/addGodina", function (req, res) {
    var tijeloPosta = req.body;
    //gledamo postoji li godine.csv
    fs.stat(__dirname + "/godine.csv", function (err) {
        if (err) {
            //ne postoji pa ga trebamo napraviti
            var red = tijeloPosta.nazivGod.toString() + "," + tijeloPosta.nazivRepVje.toString() + "," + tijeloPosta.nazivRepSpi.toString() + "\r\n";
            fs.appendFile("godine.csv", red, function (err) {
                if (err) {
                    throw err;
                }
            });
        }
        else {
            //gledamo postoji li vec nazivGod
            //prvo izvucemo data iz godine.csv
            fs.readFile("godine.csv", function (err, data) {
                //godine.csv izgleda ovako:
                //godina,nazivRepVjezbe,nazivRepSpirale
                if (err) throw err;
                var strData = data.toString("utf-8");
                var lines = strData.split('\n');
                var greska = false;
                for (var i = 0; i < lines.length; i++) {
                    var tmp = lines[i].split(",")[0];
                    if (tmp == tijeloPosta.nazivGod.toString()) {
                        //nista se ne treba dodavati, treba vratiti greska.html
                        greska = true;
                        break;
                    }
                }
                if (greska) {
                    res.sendFile(__dirname + "/greska.html");
                }
                else {
                    //dodajemo novu godinu u godine.csv
                    noviRed = tijeloPosta.nazivGod.toString() + "," + tijeloPosta.nazivRepVje.toString() + "," + tijeloPosta.nazivRepSpi.toString() + "\r\n";
                    fs.appendFile("godine.csv", noviRed, function (err) {
                        if (err) throw err;
                        res.sendFile(__dirname + "/stranice/addGodina.html");
                    });
                }
            });
        }

    });

});
//Zadatak 5 
app.get("/godine", function (req, res) {
    //trebamo procitati godine.csv, konvertovati u json i vratiti kao rezultat
    fs.readFile("godine.csv", function (err, data) {
        if (err) {
            throw err;
        }
        var dataStr = data.toString("utf-8");
        if (dataStr == "" || dataStr=="\n") {
            res.set('Content-Type', 'application/json');
            res.send({"":null,"":null,"":null});
        }
        else {
            var lines = dataStr.split('\n');
            var rez = []; //prazan niz JSON objekata

            //bice ukupno 3 polja; nazivgod,repVje,repSpi
            for (var i = 0; i < lines.length; i++) {
                var jsonObj = {}; //prazan JSON
                var trenutniLine = lines[i].split(",");
                var polja = ["nazivGod", "nazivRepVje", "nazivRepSpi"];
                for (var j = 0; j < polja.length; j++) {
                    jsonObj[polja[j]] = trenutniLine[j];
                }
                rez.push(jsonObj);
            }
            //sad konverzija u json
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(rez));
        }

    });
});
//Zadatak 6 


//Zadatak 7 
//prioritet: JSON -> XML -> CSV; ako se posalje vise od 1 format, odgovara se sa najprioritetnijim
app.use(express.static("t_zadaci"));
var json2xml = require('jsontoxml');
var json2csv = require('json2csv');
app.get("/zadaci", function (req, res, next) {
    //var headerAcc = req.header("Accept");
    //gledamo sta ima u direktoriju
    var acceptJson = req.accepts("application/json");
    var acceptXml = req.accepts("application/xml");
    var acceptCsv = req.accepts("text/csv");
    fs.readdir(__dirname + "/t_zadaci", function (err, files) {
        if (err) return next(err);
        var niz = [];
        //citamo svaki i upisujemo u niz
        for (var i = 0; i < files.length; i++) {
            niz.push(JSON.parse(fs.readFileSync(__dirname + "/t_zadaci/" + files[i], 'utf-8')));
        }
        //provjerimo content type
        if (acceptJson) {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(niz));
        }
        else if (acceptXml) {
            res.set('Content-Type', 'application/xml');
            res.send(json2xml(niz));
        }
        else if (acceptCsv) {
            res.set('Content-Type', 'text/csv');
            res.send(json2csv.parse(niz));
        }
        else {
            //greska
            res.sendFile(__dirname + "/greska.html");
        }

    });

});

//Zadatak 8
//nisam ni modul napravila lol

app.listen(8080);