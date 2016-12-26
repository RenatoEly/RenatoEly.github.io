/* eslint-env node */
var leftChar = "ASDFGQWERTZXCVBasdfgqwertzxcvb\\";
var rightChar = "YUIOPHJKLÇNMyuiophjklçnm,.;";

function main(){
       d3.csv("DadosAleatorios.csv", function(error, csv){
            if (error){
                return console.warn(error);
            } 
       
       var dados = [];
       dados[0] = [{hora:"0h", tempo:0, qtd:0},
                    {hora:"1h", tempo:0, qtd:0},
                    {hora:"2h", tempo:0, qtd:0},
                    {hora:"3h", tempo:0, qtd:0},
                    {hora:"4h", tempo:0, qtd:0},
                    {hora:"5h", tempo:0, qtd:0},
                    {hora:"6h", tempo:0, qtd:0},
                    {hora:"7h", tempo:0, qtd:0},
                    {hora:"8h", tempo:0, qtd:0},
                    {hora:"9h", tempo:0, qtd:0},
                    {hora:"10h", tempo:0, qtd:0},
                    {hora:"11h", tempo:0, qtd:0},
                    {hora:"12h", tempo:0, qtd:0},
                    {hora:"13h", tempo:0, qtd:0},
                    {hora:"14h", tempo:0, qtd:0},
                    {hora:"15h", tempo:0, qtd:0},
                    {hora:"16h", tempo:0, qtd:0},
                    {hora:"17h", tempo:0, qtd:0},
                    {hora:"18h", tempo:0, qtd:0},
                    {hora:"19h", tempo:0, qtd:0},
                    {hora:"20h", tempo:0, qtd:0},
                    {hora:"21h", tempo:0, qtd:0},
                    {hora:"22h", tempo:0, qtd:0},
                    {hora:"23h", tempo:0, qtd:0},];
        
        dados[1] = [{hora:"0h", tempo:0, qtd:0},
                    {hora:"1h", tempo:0, qtd:0},
                    {hora:"2h", tempo:0, qtd:0},
                    {hora:"3h", tempo:0, qtd:0},
                    {hora:"4h", tempo:0, qtd:0},
                    {hora:"5h", tempo:0, qtd:0},
                    {hora:"6h", tempo:0, qtd:0},
                    {hora:"7h", tempo:0, qtd:0},
                    {hora:"8h", tempo:0, qtd:0},
                    {hora:"9h", tempo:0, qtd:0},
                    {hora:"10h", tempo:0, qtd:0},
                    {hora:"11h", tempo:0, qtd:0},
                    {hora:"12h", tempo:0, qtd:0},
                    {hora:"13h", tempo:0, qtd:0},
                    {hora:"14h", tempo:0, qtd:0},
                    {hora:"15h", tempo:0, qtd:0},
                    {hora:"16h", tempo:0, qtd:0},
                    {hora:"17h", tempo:0, qtd:0},
                    {hora:"18h", tempo:0, qtd:0},
                    {hora:"19h", tempo:0, qtd:0},
                    {hora:"20h", tempo:0, qtd:0},
                    {hora:"21h", tempo:0, qtd:0},
                    {hora:"22h", tempo:0, qtd:0},
                    {hora:"23h", tempo:0, qtd:0},];
                    
       
        csv.forEach(function(d){
           var startDate = new Date(d["Start Date (UTC)"]);
           var endDate = new Date(d["Submit Date (UTC)"]);
            
            if(d["agora uma digitação aleatória usando todo o teclado"].charAt(0) === '\\'){
                dados[0][startDate.getHours()].qtd++;
                dados[0][startDate.getHours()].tempo += (endDate.getTime() - startDate.getTime())/1000;
            }
            else if(leftChar.search(d["agora uma digitação aleatória usando todo o teclado"].charAt(0)) !== -1){
                dados[0][startDate.getHours()].qtd++;
                dados[0][startDate.getHours()].tempo += (endDate.getTime() - startDate.getTime())/1000;
            }
            else if(rightChar.search(d["agora uma digitação aleatória usando todo o teclado"].charAt(0)) !== -1){
                dados[1][startDate.getHours()].qtd++;
                dados[1][startDate.getHours()].tempo += (endDate.getTime() - startDate.getTime())/1000;
            }
        });
       
        var maxTime = d3.max(dados,function(d,i){
                return d3.max(d[i],function(d){
                    return d.tempo/d.qtd;
                });
           });
    
        var svg = d3.select("svg"),
        margin = {top: 40, right: 10, bottom: 20, left: 300},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var valoresX = ["0h","1h","2h","3h","4h","5h","6h","7h","8h","9h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"];
        
        var eixoX = d3.scaleBand()
                    .domain(valoresX)
                    .rangeRound([0,width])
                    .padding(0.1);
                    
        var eixoY = d3.scaleLinear()
                    .domain([0,maxTime])
                    .range([height,0]);
        
        var dadosNormalizados = d3.stack().keys(d3.range(2))(d3.transpose(dados));
        console.log(dadosNormalizados);
        console.log(dados);
        var series = g.selectAll(".series")
                    .data(dados)
                    .enter().append("g")
                    .attr("fill", function(d, i) {
                        cor = ["blue","red"];
                        return cor[i % 2]; });
                    
        var rect = series.selectAll("rect")
                    .data(function(d,i) {
                        if(i === 0){}
                            console.log("rect "+d[0]);
                        }
                        return d; })
                    .enter().append("rect")
                    .attr("x", function(d, i) { return eixoX(i); })
                    .attr("y", height)
                    .attr("width", eixoX.bandwidth());

        rect.transition()
            .delay(function(d, i) {
                if(i === 0){
                    console.log("transition "+d);
                }

                return i * 10; })
            .attr("y", function(d, i) { return eixoY(d.tempo/d.qtd); })
            .attr("height", function(d) { return eixoY(d.tempo/d.qtd); });
            
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(eixoX)
            .tickSize(0)
            .tickPadding(6));
                    
    });
}