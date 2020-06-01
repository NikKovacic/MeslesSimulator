class GraphMulti {
    constructor(canvasId, minGraphX, maxGraphX, minGraphY, maxGraphY, color, legend, axisDescription) { // pri konstruktorju moramo podati ID platna, ki ga sicer ustvarimo v html-ju
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width; // glej veliki W pri Width
        this.canvasHeight = this.canvas.height; // glej veliki H pri Height
        this.x = new Array(); // ustvarimo novo polje x
        this.y = new Array();
        this.rangeX = maxGraphX - minGraphX;
        this.rangeY = maxGraphY - minGraphY;
        
        // ustvarimo y polje (velikost) glede na barvni vektor (lahko imamo več vrstice, i.e. 2d)
        for( var i=0; i<color.length; i++ ) {
            this.y.push([]); // primer s tremi vrsticami pri inicializaciji polje bi bil this.y = [[],[],[]];
        }

        this.minGraphX = minGraphX;
        this.maxGraphX = maxGraphX;
        this.minGraphY = minGraphY;
        this.maxGraphY = maxGraphY;
        this.color = color; // barva grafa
        
        this.legend = legend;
        this.axisDescription = axisDescription;
        
        // napolnimo x vektor, vektor y je določen v realnem času, t.j. sproti
        for (var i=0; i<this.maxGraphX+1; i++) {
            this.x[i] = i; // vrednosti za x koordinate: 0, 1, 2, ...
        }
    }
    
    addValueOrCutAndAdd(yValue) {
        if (this.y[0].length == this.maxGraphX+1) { // če je platno velikosti 10x10 imamo 11x11 točk (začnemo z 0 in končamo z 10)
            for (var i = 0; i < yValue.length; i++) { // v zanki gremo po polju yInput in na mestu 0 eno vrednost odrežemo, na koncu pa eno mesto dodamo - zapišemo novo vrednost yInput
                this.y[i].splice(0, 1); // na poziciji 0 v vektorju y odrežemo eno vrednost
                this.y[i][this.maxGraphX] = yValue[i]; // na koncu polja eno vrednost dodamo
            }
        }
        else {
            for (var i = 0; i < yValue.length; i++) { // z zanko gremo po vseh vrsticah za matrike y
                this.y[i].push(yValue[i]); // če polje še ni polno potisnemo novo vrednost v polje / vrednost v oklepaju [] t.j. index je za ena večji; npr., če imamo eno vrednost je indeks [0], length pa 1
            }
        }
    }
    
    plot(yValue) {
        this.addValueOrCutAndAdd(yValue);
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // brišemo platno
        
        for (var i=0; i < yValue.length; i++) { // zanka, ki gre po vrsticah y matrike
        this.ctx.strokeStyle = this.color[i]; // določimo barvo
        this.ctx.beginPath(); // za začetek črte
            for (var j=0; j<this.y[0].length; j++) {
                this.ctx.lineTo(this.x[j]/this.rangeX*this.canvasWidth, (this.canvasHeight - ((this.y[i][j]-this.minGraphY)/this.rangeY) * this.canvasHeight)); // za y vrednosti zadevo pomnožimo z višino platna, e.g. 0.25 * 100 = 25
            }
        this.ctx.stroke();
        }
        
        // dodamo legendo
        for(var i=0; i<this.legend.length; i++ ) { // legend-a in barva, t.j. color morata biti iste dimenzije
            this.ctx.font = "11px 'Roboto', sans-serif";
            this.ctx.fillText(this.legend[i], 49+i*54, 10);
            this.ctx.strokeStyle = this.color[i];
            this.ctx.beginPath(); // začetek kratke črte za legendo
            this.ctx.lineTo(37+i*54, 6);
            this.ctx.lineTo(46+i*54, 6);
            this.ctx.stroke();
        }
        
        // dodamo opis osi
        this.ctx.fillText("<-" + this.axisDescription[0] + "|" + this.axisDescription[1] + "->", this.canvasWidth -60, this.canvasHeight -5)
        this.ctx.fillText(this.axisDescription[2], 5, this.canvasHeight -5);
        this.ctx.fillText(this.axisDescription[3], 5, 11);
        
    }
}

class Graph {
    constructor(idPlatna, maxGrafX, maxGrafY) { // pri konstruktorju moramo podati ID platna, ki ga sicer ustvarimo v html-ju
        // "boilerplate" koda za platno
        this.canvas = document.getElementById(idPlatna); // v html delu poiščemo platno z id "idPlatna"
        this.plat1 = this.canvas.getContext("2d"); // od tu dalje delamo s spremenljivko plat1 (za izris)
        this.plat1.strokeStyle = "#ff0000"; // določimo rdečo barvo za izris objektov na platnu
        this.x = new Array(); // ustvarimo novo tabelo x, lahko bi zapisali tudi var x = []; (spremenljivka tipa Array)
        this.y = new Array(); // ustvarimo novo tabelo y, lahko bi zapisali tudi var y = []; (spremenljivka tipa Array)
        this.widthOfCanvas = this.canvas.width;
        this.heightOfCanvas = this.canvas.height;
        this.maxGrafX = maxGrafX;
        this.maxGrafY = maxGrafY;

        // napolnimo polje x
        for(var i=0; i<this.maxGrafX+1; i++) { // graf bo vseboval maxGrafX+1 točk
            this.x[i] =  i; // za x zapišemo [0, 1, 2, ...], t.j. vrednost i-ja
        }
    }

    addValueOrDeleteAndAdd(yVrednost){
        if (this.y.length == this.maxGrafX + 1) { // če je platno veliko 10x10 imamo 11x11 točk, začnemo z 0
            this.y.splice(0, 1); // na mestu 0 v tabeli y brišemo eno vrednost
            this.y[this.maxGrafY] = yVrednost; // novo vrednost dodamo na koncu polja
        }
        else {
            this.y.push(yVrednost); // če tabela y še ni polna potisnemo novo vrednost v polje
        }  
    }

    drawLineInGraph(yVrednost){
        this.addValueOrDeleteAndAdd(yVrednost);
        this.plat1.clearRect(0, 0, this.widthOfCanvas, this.heightOfCanvas); // brišemo platno

        this.plat1.beginPath(); // začetek izrisa

        for(var i = 0; i < this.y.length; i++) {
            this.plat1.lineTo(this.x[i]/this.maxGrafX*this.widthOfCanvas, (this.heightOfCanvas - (this.y[i]/this.maxGrafY)*this.heightOfCanvas)); // upoštevamo maxX, maxY grafa
        }                                     

        this.plat1.stroke(); // za prikaz črte

        // oštevilči
        this.plat1.font = "11px Ro";
        this.plat1.fillText(this.maxGrafY, 5, 13);
        this.plat1.fillText("0", 5, 98);
    }
}


class GraphAvg {
    constructor(idPlatna, maxGrafX, maxGrafY, windowLength) { // pri konstruktorju moramo podati ID platna, ki ga sicer ustvarimo v html-ju
        // "boilerplate" koda za platno (naslednji dve vrstici)
        this.canvas = document.getElementById(idPlatna); // v html delu poiščemo platno z id "idPlatna"
        this.plat1 = this.canvas.getContext("2d"); // od tu dalje delamo s spremenljivko plat1 (za izris)
        this.plat1.strokeStyle = "#ff0000"; // določimo rdečo barvo za izris objektov na platnu
        this.x = new Array(); // ustvarimo novo tabelo x, lahko bi zapisali tudi var x = []; (spremenljivka tipa Array)
        this.y = new Array(); // ustvarimo novo tabelo y, lahko bi zapisali tudi var y = []; (spremenljivka tipa Array)
        this.widthOfCanvas = this.canvas.width; // spremenljivka za širino platna
        this.heightOfCanvas = this.canvas.height; // višina platna
        this.maxGrafX = maxGrafX;
        this.maxGrafY = maxGrafY;
        this.yOkno = new Array(); // polje ("Array") za okno y vrednosti za izračun drsečega povprečja
        this.avgValue = 0; // povprečna vrednost v oknu
        this.windowLength = windowLength; // povprečje preračunavamo za določeno število vrednosti

        // napolnimo polje x
        for(var i=0; i<this.maxGrafX+1; i++) { // platno vel. 10x10px ima 11x11 točk
        this.x[i] =  i; // za x zapišemo [0, 1, 2, ...], t.j. vrednost i-ja
        }
    }

    addValueOrDeleteAndAdd(yVrednost){

        this.yOkno.push(yVrednost); // vrednost, ki jo dobimo prek argumenta potisnemo v polje

        if (this.yOkno.length == this.windowLength + 1) { // če je platno veliko 10x10 imamo 11x11 točk, začnemo z 0
            this.yOkno.splice(0, 1); // na mestu 0 v tabeli y brišemo eno vrednost
            this.avgValue = this.yOkno.reduce(function(a, b){return a + b})/this.windowLength; // izračunamo povrečje
        }
        else {
            this.avgValue = 0; // do zapolnitve dolžine okna, t.j. npr. dokler ne dobimo prvih npr. 50 vrednosti je povp. = 0
        }

        if (this.y.length == this.maxGrafX + 1) { // če je platno veliko 10x10 imamo 11x11 točk, začnemo z 0
        this.y.splice(0, 1); // na mestu 0 v tabeli y brišemo eno vrednost
        this.y[this.maxGrafX] = this.avgValue; // novo vrednost dodamo na koncu polja
        }
        else {
            this.y.push(this.avgValue); // če tabela y še ni polna potisnemo novo vrednost v polje
        }  
    }

    drawLineInGraph(yVrednost){
        this.addValueOrDeleteAndAdd(yVrednost);
        this.plat1.clearRect(0, 0, this.widthOfCanvas, this.heightOfCanvas); // brišemo platno

        this.plat1.beginPath(); // začetek izrisa

        for(var i = 0; i < this.y.length; i++) {
            this.plat1.lineTo(this.x[i]/this.maxGrafX*this.widthOfCanvas, this.heightOfCanvas - (this.y[i]/this.maxGrafY)*this.heightOfCanvas); // za vrednosti y pomnožimo naklj. vrednost
        }                                      // z višino platna, npr. 0.25*100=25

        this.plat1.stroke(); // za prikaz črte

        // oštevilči
        this.plat1.font = "11px 'Roboto', sans-serif";
        this.plat1.fillText(this.maxGrafY, 5, 13);
        this.plat1.fillText("0", 5, 98);
    }
}