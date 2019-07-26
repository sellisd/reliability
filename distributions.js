function shapeGompertz(MinimalAge, Scale){
  return(MinimalAge/(Scale * Math.exp(Scale*MinimalAge)));
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
function myFunction(p1, p2) {
  return p1 * p2;   // The function returns the product of p1 and p2
}

function updateGompertzGraph(){
  var MinimalAge = parseFloat(document.getElementById("MinimalAge").value);
  var MaximalAge = parseFloat(document.getElementById("MaximalAge").value);
  var FailureRateAtMinimalAge = parseFloat(document.getElementById("FailureRateAtMinimalAge").value);
  var FailureRateAtMaximalAge = parseFloat(document.getElementById("FailureRateAtMaximalAge").value);
  
  Scale = scaleGompertz(MaximalAge, MinimalAge, FailureRateAtMaximalAge, FailureRateAtMinimalAge);
  Shape = shapeGompertz(MinimalAge, Scale);
  document.getElementById("GompertzShape").innerHTML="Gompertz Shape = " + Shape.toString();
  document.getElementById("GompertzScale").innerHTML="Gompertz Scale = " + Scale.toString();
  
  var listX = [];
  var listY = [];
  for (var i = 0; i <= 5; i+=0.01) {
      listX.push(i);
      listY.push(densityGompertz(Shape, Scale, i));
  }
  
  
  var trace1 = {
    x: listX,
    y: listY,
    type: 'scatter'
  };
  var data = [trace1];
      
  Plotly.newPlot('GompertzGraph', data, {title: 'Gompertz Distribution'}, {showSendToCloud: false});
}

function updateWeibullGraph(){
  var MinimalAge = parseFloat(document.getElementById("MinimalAge").value);
  var MaximalAge = parseFloat(document.getElementById("MaximalAge").value);
  var FailureRateAtMinimalAge = parseFloat(document.getElementById("FailureRateAtMinimalAge").value);
  var FailureRateAtMaximalAge = parseFloat(document.getElementById("FailureRateAtMaximalAge")).value;
  
  Shape = shapeWeibull(FailureRateAtMinimalAge, FailureRateAtMaximalAge, MinimalAge, MaximalAge);
  Scale = scaleWeibull(MinimalAge, Shape, FailureRateAtMinimalAge);
  document.getElementById("WeibullShape").innerHTML="Weibull Shape = " + Shape.toString();
  document.getElementById("WeibullScale").innerHTML="Weibull Scale = " + Scale.toString();
  var listX = [];
  var listY = [];
  for (var i = 0; i <= 5; i+=0.01) {
      listX.push(i);
      listY.push(densityWeibull(Shape, Scale, i));
  }
  

  var trace1 = {
    x: listX,
    y: listY,
    type: 'scatter'
  };
  
  var data = [trace1];
      
  Plotly.newPlot('WeibullGraph', data, {title: 'Weibull Distribution'}, {showSendToCloud: false});
}

updateWeibullGraph();
updateGompertzGraph();