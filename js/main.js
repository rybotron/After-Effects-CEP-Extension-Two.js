
var csInterface = new CSInterface();
// csInterface.evalScript("setActiveComp()", function(active){
//   if (!active){
//     alert("Please select a comp and rerun extension");
//     csInterface.closeExtension();
//   }
// });

var win = {};

// csInterface.evalScript("getCompWidth()", function(result){
//   win.width = parseInt(result);
//   win.halfWidth = win.width / 2;
// });

// csInterface.evalScript("getCompHeight()", function(result){
//   win.height = parseInt(result);
//   win.halfHeight = win.height / 2;
// });

win.width = 960;
win.halfWidth = win.width / 2;

win.height = 540;
win.halfHeight = win.height / 2;


// Setup two environment
var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

//Create group to contain all elements
var group = two.makeGroup();
group.translation.set( win.halfWidth, win.halfHeight);
two.update();  

var bg = two.makeRectangle( 0, 0, win.width, win.height);
bg.fill = "rgb(0,0,0)";
bg.noStroke();
group.add(bg);

var circle = two.makeCircle( 0, 0, win.height / 2);
circle.fill = 'rgb(0, 200, 255)';
circle.stroke = "rgb(0,200, 0)";
group.add(circle);

var rectangle = two.makeRectangle( 0, 0, 100, 100);
rectangle.fill = 'rgb(200, 0, 255)';
rectangle.stroke = "rgb(255, 255, 255)";
group.add(rectangle);

two.update();

extractShape( circle );
extractShape( rectangle );
CSLibrary.closeExtension();


function extractShape( shape ){
  var anchors = shape.vertices.slice(0); // make a copy of circle vertices
  var vertices = "";
  var inTangents = "";
  var outTangents = "";

  while ( anchors.length > 0 ){

    var anchor = anchors.shift();
    vertices += "[" + anchor.toString() + "]";

    if( anchor.command === "C" ){
      inTangents += "[" + anchor.controls.left.toString() + "]";
      outTangents += "[" + anchor.controls.right.toString() + "]";
    }else{
      inTangents += "[0,0]";
      outTangents += "[0,0]";  
    }

    if ( anchors.length >= 1 ){
      vertices += ",";
      inTangents += ",";
      outTangents += ",";
    }
  }

  vertices = "[" + vertices + "]";
  inTangents = "[" + inTangents + "]";
  outTangents = "[" + outTangents + "]";

  var fillColor = extractRGBColor(shape.fill);
  var strokeColor = extractRGBColor(shape.stroke);

  function extractRGBColor( color ){
      var start = color.indexOf("(") + 1;
      var end = color.indexOf(")");
      return "[" + color.slice(start, end) + "]";

  }
  csInterface.evalScript("shapeLayerCreator(" + vertices + "," + inTangents + "," + outTangents + "," + shape.closed.toString() + "," + fillColor + "," + strokeColor + ")");
}
