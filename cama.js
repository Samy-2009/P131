objectDetector = "";

img = "";
status ="";
objects = [];


function preload(){
    img = loadImage('cama.webp');
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: Detectando objetos";
}
function modelLoaded(){
    console.log("Modelo Cargado!")
    objectDetector.detect(video, gotResult);
    status = true;
}
function draw(){
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        for (var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Estado: Detectando objetos";
            document.getElementById("number_of_projects").innerHTML = "Numéros de objetos detectados" + objects.length;
            
    
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text (objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


