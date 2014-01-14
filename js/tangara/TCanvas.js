define(['jquery','objects/TGraphicalObject','TEnvironment','quintus'], function($, TObject, TEnvironment, Quintus) {

    function TCanvas() {
        var domCanvas = document.createElement("canvas");
        domCanvas.id = "tcanvas";
        
        var QStage;

        var graphicalObjects = new Array();

        this.addGraphicalObject = function(object) {
            if (typeof QStage !== 'undefined') {
                QStage.insert(object.getQObject());
                graphicalObjects.push(object);
            }
        };

        this.removeGraphicalObject = function(object) {
            var index = graphicalObjects.indexOf(object);
            if (index > -1) {
                QStage.remove(object.getQObject());
                graphicalObjects.splice(index, 1);
            }
        };
        
        this.getElement = function() {
            return domCanvas;
        };
        
        this.displayed = function() {
            var QInstance = TEnvironment.getQuintusInstance();
            QInstance.setup("tcanvas",{ height:domCanvas.style.height, width:domCanvas.style.width});
            QInstance.stageScene(null);
            QStage = QInstance.stage();
        };
        
        this.clear = function() {
            while (graphicalObjects.length>0) {
                graphicalObjects[0].deleteObject();
            }
        };

    }

    return TCanvas;
    
});