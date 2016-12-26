/* eslint-env node */
var leftChar = "ASDFGQWERTZXCVBasdfgqwertzxcvb\\";
var rightChar = "YUIOPHJKLÇNMyuiophjklçnm,.;";

function main(){
       d3.csv("DadosAleatorios.csv", function(error, csv){
            if (error){
                return console.warn(error);
            } 
            
        var n = 2;
        var dados = d3.range(n);
        dados[0] = calcularTemposMediosE(csv);
        
        dados[1] = calcularTemposMediosD(csv);
                    
       
        var maxTime = d3.max(dados,function(d,i){
                return d3.max(d,function(d){
                    return d;
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
                    
        console.log("maxTime: "+maxTime);
                    
        var eixoY = d3.scaleLinear()
                    .domain([0,maxTime])
                    .range([height,0]);
                    
        var color = d3.scaleOrdinal()
                    .domain(d3.range(n))
                    .range(d3.schemeCategory20c);
        
        var dadosNormalizados = d3.stack().keys(d3.range(n))(d3.transpose(dados));
        var series = g.selectAll(".series")
                    .data(dadosNormalizados)
                    .enter().append("g")
                    .attr("fill", function(d, i) {
                        return color(i); });
                    
        var rect = series.selectAll("rect")
                    .data(function(d,i) {
                        return d; })
                    .enter().append("rect")
                    .attr("x", function(d, i) { return eixoX(""+i+"h"); })
                    .attr("y", height)
                    .attr("width", eixoX.bandwidth())
                    .attr("height",0);

        rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i) { return eixoX(""+i+"h") + eixoX.bandwidth() / n * this.parentNode.__data__.key; })
        .attr("width", eixoX.bandwidth() / n)
        .transition()
        .attr("y", function(d) { return eixoY(d[1] - d[0]); })
        .attr("height", function(d) { return eixoY(0) - eixoY(d[1] - d[0]); });
            
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(eixoX)
            .tickSize(0)
            .tickPadding(6));
            
        g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisLeft(eixoY)
            .tickSize(0)
            .tickPadding(6));
    });
}

function calcularTemposMediosE(csv){
    qtd = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tempo = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    csv.forEach(function(d){
           var startDate = new Date(d["Start Date (UTC)"]);
           var endDate = new Date(d["Submit Date (UTC)"]);
            
            if(d["agora uma digitação aleatória usando todo o teclado"].charAt(0) === '\\'){
                qtd[startDate.getHours()]++;
                tempo[startDate.getHours()] += (endDate.getTime() - startDate.getTime())/1000;
            }
            else if(leftChar.search(d["agora uma digitação aleatória usando todo o teclado"].charAt(0)) !== -1){
                qtd[startDate.getHours()]++;
                tempo[startDate.getHours()] += (endDate.getTime() - startDate.getTime())/1000;
            }
        });
    for(i=0; i < tempo.lenght; i++){
        tempo[i] = tempo[i]/qtd[i];
    }
    return tempo;
}

function calcularTemposMediosD(csv){
    qtd = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tempo = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    csv.forEach(function(d){
           var startDate = new Date(d["Start Date (UTC)"]);
           var endDate = new Date(d["Submit Date (UTC)"]);
            if(d["agora uma digitação aleatória usando todo o teclado"].charAt(0) !== '\\'){
                if(rightChar.search(d["agora uma digitação aleatória usando todo o teclado"].charAt(0)) !== -1){
                    qtd[startDate.getHours()]++;
                    tempo[startDate.getHours()] += (endDate.getTime() - startDate.getTime())/1000;
                }
            }
        });
    for(i=0; i < tempo.lenght; i++){
        tempo[i] = tempo[i]/qtd[i];
    }
    return tempo;
}