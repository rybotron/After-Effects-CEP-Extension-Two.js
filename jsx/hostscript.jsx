var comp = app.project.activeItem;

function setActiveComp(){
    comp = app.project.activeItem;
    return (comp !== null) || comp instanceof CompItem;
}


function getCompWidth(){
	return comp.width;
}
function getCompHeight(){
	return comp.height;
}

function shapeLayerCreator( vertices, inTangents, outTangents, closed, fillColor, strokeColor ){
    
    if( (comp === null) || !(comp instanceof CompItem)){
        alert("Please select a comp and rerun extension");
        return;
    }
    // Create an empty shape layer
    var shapeLayer = comp.layers.addShape();
    shapeLayer.name =  "rybotron";
    
    // Create shape layer contents
    var shapeContents = shapeLayer.property("ADBE Root Vectors Group");

    // Create shape layer vector group to contain path components
    var shapeVectorGroup = shapeContents.addProperty("ADBE Vector Group");
    shapeVectorGroup.name = "Two.js"

    // Create shape layer vectors group to contain vertices
    var shapeVectorsGroup = shapeVectorGroup.addProperty("ADBE Vectors Group");

    // Create new shape path
    var shapePathGroup = shapeVectorsGroup.addProperty("ADBE Vector Shape - Group");
    shapePathGroup.name = "Vertices";

    var shapePath = shapePathGroup.property("ADBE Vector Shape");

    var shapePathData = new Shape();   
    shapePathData.vertices = vertices;
    
    shapePathData.inTangents = inTangents;
    shapePathData.outTangents = outTangents;
    shapePathData.closed = closed;

    shapePath.setValue(shapePathData);

    var stroke = shapeVectorsGroup.addProperty("ADBE Vector Graphic - Stroke");
    stroke.property("Color").setValue(strokeColor);
    // stroke.property("Stroke Width").setValue(10);

    var fill = shapeVectorsGroup.addProperty("ADBE Vector Graphic - Fill");
    fill.property("Color").setValue(fillColor);

}

// For reference:
// .property("ADBE Root Vectors Group")
// .property("ADBE Vector Group")
// .property("ADBE Vectors Group")
// .property("ADBE Vector Shape - Group")
// .property("ADBE Vector Shape")
