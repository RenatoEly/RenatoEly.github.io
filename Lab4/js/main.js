function main(){
var svg = d3.select("svg"),
    margin = {top: 20, right: 100, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.nota); })
    .y(function(d) { return y(d.qnt); });

d3.csv("DadosAleatorios.csv", function(error, data) {
  if (error) throw error;

  
  var foiAleatorio = count(data, "quão aleatório você acha que foi?");
  var ehAleatorio = count(data, "quão aleatório você acha que você é?");
  
  var dados = {"acha que foi aleatorio": foiAleatorio,
				"acha que é aleatorio": ehAleatorio};
  
  var grafValues = [{
      id: "acha que foi aleatorio",
      values: convert(dados["acha que foi aleatorio"])
    },
    {id: "acha que é aleatorio",
      values: convert(dados["acha que é aleatorio"])
		}];

  x.domain([0,10]);

  y.domain([minComp(foiAleatorio,ehAleatorio),maxComp(foiAleatorio,ehAleatorio)]);

  z.domain(grafValues.map(function(c) { return c.id; }));

  console.log(grafValues);
  
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
	  .attr("y", 18)
	  .attr("x", width/2)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Notas");

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Quantidade de respostas");

  var city = g.selectAll(".city")
    .data(grafValues)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

  city.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.nota) + "," + y(d.value.qnt) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
});
}

function count(data, key){
	var contagem = [0,0,0,0,0,0,0,0,0,0,0];
	data.forEach(function (d){
		contagem[parseInt(d[key])]++;
	});
	return contagem;
}

function convert(valores){
	var conversao = [];
	for(var i = 0; i < valores.length; i++){
		conversao[i] = {nota: i, qnt: valores[i]};
	}
	return conversao;
}

function minComp(array1, array2){
	var array = [];
	array[0] = minimum(array1);
	array[1] = minimum(array2);
	return minimum(array);
}

function minimum(array){
	var minVar = array[0];
	for (var i = 1; i < array.length; i++){
		if(array[i] < minVar){
			minVar = array[i];
		}
	}
	return minVar;
}

function maxComp(array1, array2){
	var array = [];
	array[0] = maximum(array1);
	array[1] = maximum(array2);
	return maximum(array);
}

function maximum(array){
	var maxVar = array[0];
	for (var i = 1; i < array.length; i++){
		if(array[i] > maxVar){
			maxVar = array[i];
		}
	}
	return maxVar;
}
