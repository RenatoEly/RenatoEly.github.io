/* eslint-env node */
var leftChar = "ASDFGQWERTZXCVBasdfgqwertzxcvb\\";
var rightChar = "YUIOPHJKLÇNMyuiophjklçnm,.;";

function main(){
    d3.csv("DadosAleatorios.csv", function(error, csv){
       if (error){
           return console.warn(error);
       } 
       var dados = [];
       dados[0] = [{hora:"0:00", tempo:0, qtd:0},
                    {hora:"1:00", tempo:0, qtd:0},
                    {hora:"2:00", tempo:0, qtd:0},
                    {hora:"3:00", tempo:0, qtd:0},
                    {hora:"4:00", tempo:0, qtd:0},
                    {hora:"5:00", tempo:0, qtd:0},
                    {hora:"6:00", tempo:0, qtd:0},
                    {hora:"7:00", tempo:0, qtd:0},
                    {hora:"8:00", tempo:0, qtd:0},
                    {hora:"9:00", tempo:0, qtd:0},
                    {hora:"10:00", tempo:0, qtd:0},
                    {hora:"11:00", tempo:0, qtd:0},
                    {hora:"12:00", tempo:0, qtd:0},
                    {hora:"13:00", tempo:0, qtd:0},
                    {hora:"14:00", tempo:0, qtd:0},
                    {hora:"15:00", tempo:0, qtd:0},
                    {hora:"16:00", tempo:0, qtd:0},
                    {hora:"17:00", tempo:0, qtd:0},
                    {hora:"18:00", tempo:0, qtd:0},
                    {hora:"19:00", tempo:0, qtd:0},
                    {hora:"20:00", tempo:0, qtd:0},
                    {hora:"21:00", tempo:0, qtd:0},
                    {hora:"22:00", tempo:0, qtd:0},
                    {hora:"23:00", tempo:0, qtd:0},];
        
        dados[1] = [{hora:"0:00", tempo:0, qtd:0},
                    {hora:"1:00", tempo:0, qtd:0},
                    {hora:"2:00", tempo:0, qtd:0},
                    {hora:"3:00", tempo:0, qtd:0},
                    {hora:"4:00", tempo:0, qtd:0},
                    {hora:"5:00", tempo:0, qtd:0},
                    {hora:"6:00", tempo:0, qtd:0},
                    {hora:"7:00", tempo:0, qtd:0},
                    {hora:"8:00", tempo:0, qtd:0},
                    {hora:"9:00", tempo:0, qtd:0},
                    {hora:"10:00", tempo:0, qtd:0},
                    {hora:"11:00", tempo:0, qtd:0},
                    {hora:"12:00", tempo:0, qtd:0},
                    {hora:"13:00", tempo:0, qtd:0},
                    {hora:"14:00", tempo:0, qtd:0},
                    {hora:"15:00", tempo:0, qtd:0},
                    {hora:"16:00", tempo:0, qtd:0},
                    {hora:"17:00", tempo:0, qtd:0},
                    {hora:"18:00", tempo:0, qtd:0},
                    {hora:"19:00", tempo:0, qtd:0},
                    {hora:"20:00", tempo:0, qtd:0},
                    {hora:"21:00", tempo:0, qtd:0},
                    {hora:"22:00", tempo:0, qtd:0},
                    {hora:"23:00", tempo:0, qtd:0},];
                    
       
       csv.forEach(function(d){
           var startDate = new Date(d["Start Date (UTC)"]);
           var endDate = new Date(d["Submit Date (UTC)"]);
            
            console.log(d["agora uma digitação aleatória usando todo o teclado"].charAt(0));
            console.log(leftChar);
            
            
            if(d["agora uma digitação aleatória usando todo o teclado"].charAt(0) === '\\'){
                dados[0][startDate.getHours()].qtd++;
                dados[0][startDate.getHours()].tempo += (endDate.getTime() - startDate.getTime())/1000;
                console.log("Esquerda: " + dados[0][startDate.getHours()].qtd);
            }
            else if(leftChar.search(d["agora uma digitação aleatória usando todo o teclado"].charAt(0)) !== -1){
                dados[0][startDate.getHours()].qtd++;
                dados[0][startDate.getHours()].tempo += (endDate.getTime() - startDate.getTime())/1000;
                console.log("Esquerda: " + dados[0][startDate.getHours()].qtd);
            }
            else if(rightChar.search(d["agora uma digitação aleatória usando todo o teclado"].charAt(0)) !== -1){
                dados[0][startDate.getHours()].qtd++;
                dados[0][startDate.getHours()].tempo += (endDate.getTime() - startDate.getTime())/1000;
                console.log("Direita: " + dados[0][startDate.getHours()].qtd);
            }
       });
       
       var maxTime = d3.max(dados,function(d,i){
                return d3.max(d[i],function(d){
                    return d.tempo/d.qtd;
                });
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