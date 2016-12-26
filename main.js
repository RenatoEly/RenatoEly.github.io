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
        var valoresX = ["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
        
        var eixoX = d3.scaleBand()
                    .domain(valoresX)
                    .rangeRound([0,width])
                    .padding(0.1);
                    
        var eixoY = d3.scaleLinear()
                    .domain([0,maxTime])
                    .range([height,0]);
        
        var dadosNormalizados = d3.stack().keys(d3.range(2))(d3.transpose(dados));
        var series = g.selectAll(".series")
                    .data(dadosNormalizados)
                    .enter().append("g")
                    .attr("fill", function(d, i) {
                        cor = ["blue","red"];
                        return cor[i % 2]; });
                    
        var rect = series.selectAll("rect")
                    .data(function(d) { return d; })
                    .enter().append("rect")
                    .attr("x", function(d, i) { return eixoX(i); })
                    .attr("y", height)
                    .attr("width", eixoX.bandwidth());

        //rect.transition()
            //.delay(function(d, i) { return i * 10; })
            //.attr("y", function(d) { return eixoY(d[1]); })
            //.attr("height", function(d) { return eixoY(d[0]) - eixoY(d[1]); });
            
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(eixoX)
            .tickSize(0)
            .tickPadding(6));
                    
    });
}