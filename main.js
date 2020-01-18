

var min = 99;
var max = 999999;
var polygonMode = true;
var pointArray = new Array();
var lineArray = new Array();
var activeLine;
var activeShape = false;
var canvas;
var grid = 30;
var imgToLoad;
$(window).load(function () {
    // instantiates canvas
    prototypefabric.initCanvas();


    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var closeModal = document.getElementsByClassName("btn-consent")[0];


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks on <span> (x), close the modal
    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});
var prototypefabric = new function () {
    this.initCanvas = function () {
        canvas = window._canvas = new fabric.Canvas('c', { backgroundColor: "#000" });
        canvas.setWidth(720);
        canvas.setHeight(520);
        //canvas.selection = false;



        document.getElementById('addArc').onclick = function () {
            var arc = new fabric.Circle({
                radius: 20,
                left: 50,
                top: 180,
                angle: 45,
                startAngle: 0,
                endAngle: Math.PI,
                stroke: '#26a69a',
                strokeWidth: 3,
                fill: ''
            });
            canvas.add(arc).setActiveObject(arc);
        }


        document.getElementById('addText').onclick = function () {
            canvas.discardActiveObject();
            var text = new fabric.IText('Click to edit', { fontFamily: 'Montserrat', fontSize: 16, left: 20, top: 20, fill: '#fff' });
            canvas.add(text).setActiveObject(text);

        }


        var json = canvas.toJSON();
        // clear canvas
        document.getElementById('clearCanvas').onclick = function () {
            // location.reload();
            canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
            prototypefabric.initCanvas;
            prototypefabric.polygon.drawPolygon();
        }



        // adds rectangle
        document.getElementById('addRect').onclick = function () {
            var rect = new fabric.Rect({
                top: 100, left: 0, width: 80, height: 50, fill: '#0d403b'
            });
            canvas.add(rect).setActiveObject(rect);
        }


        // adds circle
        document.getElementById('addCircle').onclick = function () {
            var circle = new fabric.Circle({
                radius: 40, fill: '#0d403b', left: 100, top: 100
            });
            canvas.add(circle).setActiveObject(circle);
        }

        // adds door
        document.getElementById('addDoor').onclick = function () {
            var arc = new fabric.Circle({
                radius: 22,
                left: 50,
                top: 182,
                angle: 27,
                startAngle: 19.3,
                endAngle: Math.PI - 0.1,
                stroke: '#26a69a',
                strokeWidth: 1,
                fill: ''
            });
            var line1 = new fabric.Line([30, 100, 30, 135], {
                left: 67,
                top: 200,
                stroke: '#000',
                strokeWidth: 7
            });
            var line2 = new fabric.Line([15, 100, 52, 100], {
                left: 37,
                top: 200,
                stroke: '#26a69a',
                strokeWidth: 5
            });
            var door = new fabric.Group([arc, line1, line2], {
                // any group attributes here
            });

            canvas.add(door).setActiveObject(door);
        }

        // adds arrow
        document.getElementById('addArrow').onclick = function () {

            var line1 = new fabric.Line([30, 100, 95, 100], {
                left: 60,
                top: 201,
                stroke: '#fff',
                strokeWidth: 1
            });
            var line2 = new fabric.Line([0, 100, 30, 115], {
                left: 97,
                top: 186,
                stroke: '#fff',
                strokeWidth: 1
            });
            var line3 = new fabric.Line([0, 115, 30, 100], {
                left: 97,
                top: 201,
                stroke: '#fff',
                strokeWidth: 1
            });
            var arrow = new fabric.Group([line1, line2, line3], {
                // any group attributes here
            });
            canvas.add(arrow).setActiveObject(arrow);
        }

        // adds wall
        document.getElementById('addLine').onclick = function () {
            // alert("Line");
            var line = new fabric.Line([50, 100, 200, 200], {
                left: 170,
                top: 150,
                stroke: '#26a69a',
                strokeWidth: 7
            });
            canvas.add(line).setActiveObject(line);
        }

        // adds window
        document.getElementById('addWindow').onclick = function () {
            var line1 = new fabric.Line([50, 100, 100, 100], {
                left: 170,
                top: 150,
                stroke: '#26a69a',
                strokeWidth: 4
            });
            var line2 = new fabric.Line([50, 100, 100, 100], {
                left: 170,
                top: 155,
                stroke: '#26a69a',
                strokeWidth: 4
            });

            var window = new fabric.Group([line1, line2], {
                // any group attributes here
            });
            canvas.add(window).setActiveObject(window);
        }

        // deletes selected item
        document.getElementById('remove').onclick = function () {
            canvas.remove(canvas.getActiveObject());
        }

        document.getElementById('sendToBack').onclick = function () {
            canvas.sendToBack(canvas.getActiveObject());
        }


        // save canvas as img
        var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        function handleImage(e) {
            var objects = canvas.getObjects();
            for (var i in objects) {
                objects[i].remove();
            }
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = new Image();
                img.onload = function () {
                    var imgInstance = new fabric.Image(img, {
                        selectable: 1
                    })
                    canvas.add(imgInstance);
                    canvas.deactivateAll().renderAll();
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        var imageSaver = document.getElementById('lnkDownload');
        imageSaver.addEventListener('click', saveImage, false);
        function saveImage(e) {
            this.href = canvas.toDataURL({
                format: 'png',
                quality: 0.8
            });
            this.download = 'floor-plan.png'
        }


        fabric.Object.prototype.transparentCorners = false;

        // create grid

        // for (var i = 0; i < (720 / grid); i++) {
        //     canvas.add(new fabric.Line([i * grid, 0, i * grid, 600], { stroke: '#ccc', selectable: false, opacity: 0.1 }));
        //     canvas.add(new fabric.Line([0, i * grid, 720, i * grid], { stroke: '#ccc', selectable: false, opacity: 0.1 }))
        // }

        // upload img from pc
        document.getElementById('upload').onclick = function () {
            document.getElementById('loadImg').click();
        }
        $("#loadImg").on('change', function (ev) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var imgObj = new Image();
                imgObj.src = event.target.result;
                imgObj.onload = function () {
                    var image = new fabric.Image(imgObj);
                    image.scale(0.5).set({
                        angle: 0,
                        left: 100,
                        top: 100
                    });
                    canvas.centerObject(image);
                    canvas.add(image);
                    canvas.renderAll();
                }
            }
            reader.readAsDataURL(ev.target.files[0]);
        });

        canvas.on('mouse:down', function (options) {
            if (options.target && options.target.id == pointArray[0].id) {
                prototypefabric.polygon.generatePolygon(pointArray);
            }
            if (polygonMode) {
                prototypefabric.polygon.addPoint(options);
            }
        });
        canvas.on('touchstart', function (options) {
            if (options.target && options.target.id == pointArray[0].id) {
                prototypefabric.polygon.generatePolygon(pointArray);
            }
            if (polygonMode) {
                prototypefabric.polygon.addPoint(options);
            }
        });
        canvas.on('mouse:up', function (options) {

        });
        canvas.on('mouse:move', function (options) {
            if (activeLine && activeLine.class == "line") {
                var pointer = canvas.getPointer(options.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

                var points = activeShape.get("points");
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            canvas.renderAll();
        });
        canvas.on('touchmove', function (options) {
            if (activeLine && activeLine.class == "line") {
                var pointer = canvas.getPointer(options.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

                var points = activeShape.get("points");
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            canvas.renderAll();
        });
    };
};



prototypefabric.polygon = {
    drawPolygon: function () {
        polygonMode = true;
        pointArray = new Array();
        lineArray = new Array();
        activeLine;
    },
    addPoint: function (options) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var id = new Date().getTime() + random;
        var circle = new fabric.Circle({
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 2,
            left: (options.e.layerX / canvas.getZoom()),
            top: (options.e.layerY / canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
            id: id,
            objectCaching: false
        });
        if (pointArray.length == 0) {
            circle.set({
                fill: '#26a69a'
            })
        }
        var points = [(options.e.layerX / canvas.getZoom()), (options.e.layerY / canvas.getZoom()), (options.e.layerX / canvas.getZoom()), (options.e.layerY / canvas.getZoom())];
        line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            class: 'line',
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false
        });
        if (activeShape) {
            var pos = canvas.getPointer(options.e);
            var points = activeShape.get("points");
            points.push({
                x: pos.x,
                y: pos.y
            });
            var polygon = new fabric.Polygon(points, {
                stroke: '#333333',
                strokeWidth: 1,
                fill: '#cccccc',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching: false
            });
            canvas.remove(activeShape);
            canvas.add(polygon);
            activeShape = polygon;
            canvas.renderAll();
        }
        else {
            var polyPoint = [{ x: (options.e.layerX / canvas.getZoom()), y: (options.e.layerY / canvas.getZoom()) }];
            var polygon = new fabric.Polygon(polyPoint, {
                stroke: '#333333',
                strokeWidth: 1,
                fill: '#cccccc',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching: false
            });
            activeShape = polygon;
            canvas.add(polygon);
        }
        activeLine = line;

        pointArray.push(circle);
        lineArray.push(line);

        canvas.add(line);
        canvas.add(circle);
        canvas.selection = false;
    },
    generatePolygon: function (pointArray) {
        var points = new Array();
        $.each(pointArray, function (index, point) {
            points.push({
                x: point.left,
                y: point.top
            });
            canvas.remove(point);
        });
        $.each(lineArray, function (index, line) {
            canvas.remove(line);
        });
        canvas.remove(activeShape).remove(activeLine);
        var polygon = new fabric.Polygon(points, {
            stroke: '#26a69a',
            strokeWidth: 6,
            fill: '#135c55',
            opacity: 1,
            hasBorders: false,
            hasControls: false
        });
        canvas.add(polygon);

        canvas.sendToBack(polygon);


        activeLine = null;
        activeShape = null;
        polygonMode = false;
        canvas.selection = true;
    }
};


