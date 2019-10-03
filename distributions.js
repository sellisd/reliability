function shapeGompertz(FailureRateAtMinimalAge,MinimalAge,Scale){
  return(FailureRateAtMinimalAge/(Scale * Math.exp(Scale*MinimalAge)));
}
function scaleGompertz(MaximalAge, MinimalAge, FailureRateAtMaximalAge, FailureRateAtMinimalAge){
  return(Math.log(FailureRateAtMaximalAge/FailureRateAtMinimalAge)/(MaximalAge-MinimalAge));
}
function shapeWeibull(FailureRateAtMinimalAge, FailureRateAtMaximalAge, MinimalAge, MaximalAge){
  return(1+Math.log(FailureRateAtMinimalAge/FailureRateAtMaximalAge)/Math.log(MinimalAge/MaximalAge));
}
function scaleWeibull(MinimalAge, Shape, FailureRateAtMinimalAge){
  return(MinimalAge * Math.pow(Shape/(MinimalAge*FailureRateAtMinimalAge), 1/Shape));
}
function densityWeibull(Shape, Scale, x){
  return(Shape/Scale * Math.pow(x/Scale, Shape - 1) * Math.exp(-(Math.pow(x/Scale, Shape))));
}
function densityGompertz(Shape, Scale, x){
  return(Scale*Shape*Math.exp(Scale*x)*Math.exp(Shape)*Math.exp(-Shape*Math.exp(Scale*x)));
}
function reliabilityGompertz(Shape, Scale, x){
  return Math.exp(-Shape*(Math.exp(Scale*x)-1));
}

function reliabilityWeibull(Shape, Scale, x){
  return Math.exp(-(Math.pow(x/Scale,Shape)));
}

function updateGompertzGraph(){
  var MinimalAge = parseFloat(document.getElementById("MinimalAge").value);
  var MaximalAge = parseFloat(document.getElementById("MaximalAge").value);
  var FailureRateAtMinimalAge = parseFloat(document.getElementById("FailureRateAtMinimalAge").value);
  var FailureRateAtMaximalAge = parseFloat(document.getElementById("FailureRateAtMaximalAge").value);
  
  Scale = scaleGompertz(MaximalAge, MinimalAge, FailureRateAtMaximalAge, FailureRateAtMinimalAge);
  Shape = shapeGompertz(FailureRateAtMinimalAge, MinimalAge, Scale);
  document.getElementById("GompertzShape").innerHTML="Gompertz Shape = " + Shape.toString();
  document.getElementById("GompertzScale").innerHTML="Gompertz Scale = " + Scale.toString();
  
  var listX = [];
  var listY1 = [];
  var listY2 = [];
  for (var i = 0; i <= 200; i+=0.01) {
      listX.push(i);
      listY1.push(densityGompertz(Shape, Scale, i));
      listY2.push(reliabilityGompertz(Shape, Scale, i));
  }
  
  
  var trace1 = {
    x: listX,
    y: listY1,
    type: 'scatter'
  };
  var data1 = [trace1];

  var trace2 = {
    x: listX,
    y: listY2,
    type: 'scatter'
  }
  var data2 = [trace2];

  Plotly.newPlot('GompertzDensity', data1, {title: 'Gompertz Density Distribution'}, {showSendToCloud: false});
  Plotly.newPlot('GompertzReliability', data2, {title: 'Gompertz Reliability Distribution'}, {showSendToCloud: false});
}

function updateWeibullGraph(){
  var MinimalAge = parseFloat(document.getElementById("MinimalAge").value);
  var MaximalAge = parseFloat(document.getElementById("MaximalAge").value);
  var FailureRateAtMinimalAge = parseFloat(document.getElementById("FailureRateAtMinimalAge").value);
  var FailureRateAtMaximalAge = parseFloat(document.getElementById("FailureRateAtMaximalAge").value);
  
  Shape = shapeWeibull(FailureRateAtMinimalAge, FailureRateAtMaximalAge, MinimalAge, MaximalAge);
  Scale = scaleWeibull(MinimalAge, Shape, FailureRateAtMinimalAge);
  document.getElementById("WeibullShape").innerHTML="Weibull Shape = " + Shape.toString();
  document.getElementById("WeibullScale").innerHTML="Weibull Scale = " + Scale.toString();
  var listX = [];
  var listY1 = [];
  var listY2 = [];
  for (var i = 0; i <= 200; i+=0.01) {
      listX.push(i);
      listY1.push(densityWeibull(Shape, Scale, i));
      listY2.push(reliabilityWeibull(Shape, Scale, i));
  }
  

  var trace1 = {
    x: listX,
    y: listY1,
    type: 'scatter'
  };
  
  var trace2 = {
    x: listX,
    y: listY2,
    type: 'scatter'
  };

  var data1 = [trace1];
  var data2 = [trace2];
      
  Plotly.newPlot('WeibullDensity', data1, {title: 'Weibull Density Distribution'}, {showSendToCloud: false});
  Plotly.newPlot('WeibullReliability', data2, {title: 'Weibull Reliability Distribution'}, {showSendToCloud: false});
}

updateWeibullGraph();
updateGompertzGraph();
