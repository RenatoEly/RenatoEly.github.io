/* eslint-env node */
var leftChar = "ASDFGQWERTZXCVB\\";
var rightChar = "YUIOPHJKLÇNM,.;";

function main(){
    d3.csv("DadosAleatorios.csv", function(error, csv){
       if (error){
           return console.warn(error);
       } 
       var canvas = d3.select("svg");
       var dados = [{hora:"0:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"1:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"2:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"3:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"4:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"5:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"6:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"7:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"8:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"9:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"10:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"11:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"12:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"13:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"14:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"15:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"16:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"17:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"18:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"19:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"20:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"21:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"22:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0},
                    {hora:"23:00", tempoEsquerda:0, tempoDireita:0, qtdEsquerda:0, qtdDireita:0}];
       
       csv.foreach(function(d){
           var startDate = new Date(d["Start Date (UTC)"]);
           var endDate = new Date(d["Submit Date (UTC)"]);
                       
            if(leftChar.search(d["agora uma digitação aleatória usando todo o teclado"]) !== -1){
                dados[startDate.getHours()].qtdEsquerda++;
                dados[startDate.getHours()].tempoEsquerda += (endDate.getTime() - startDate.getTime())/1000;
            }
            else if(rightChar.search(d["agora uma digitação aleatória usando todo o teclado"]) !== -1){
                dados[startDate.getHours()].qtdDireita++;
                dados[startDate.getHours()].tempoDireita += (endDate.getTime() - startDate.getTime())/1000;
            }
       });
       
       var maxTime = d3.max(dados,function(d){
                if(d.tempoEsquerda > tempoDireita) {
                    return d.tempoEsquerda;
                }
                return d.tempoDireita;
           });
           
       var yScale = d3.scale.linear()
                    .domain([0,maxTime])
                    .range([0, 250]);
       
       d3.select("svg")
            .selectAll("rect")
            .data(dados)
            .enter()
            .append("rect")
            .attr("width", 20)
            .attr("height", function(d){
                return yScale(d.tempoEsquerda);
            })
            .append("rect")
            .attr("width", 20)
            .attr("height", function(d){
                return yScale(d.tempoDireita);
            });
    });
}