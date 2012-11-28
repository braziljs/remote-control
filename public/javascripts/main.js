function touchHandler(event, action) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    var x = touches[0].pageX,
        y = touches[0].pageY;

    switch(event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove": type="mousemove"; break;
        case "touchend": type="mouseup"; break;
        default: return;
    }

    
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                      first.screenX, first.screenY,
                      first.clientX, first.clientY, false,
                      false, false, false, 0, null);

    first.target.dispatchEvent(simulatedEvent);
    //event.preventDefault();

    socket.emit(action, [x, y, false]);
}

var key= false,
    w=0, h= 0, l=0, t=0, timer;

while(!key){
    key= window.prompt("Please enter the access code to sync:", 10);
}

var setTL= function(evt){
    if(evt.pageY){
        l= evt.pageX*100/w;
        t= evt.pageY*100/h;
    }else{
        l= evt.touches[0].pageX*100/w;
        t= evt.touches[0].pageY*100/h;
    }
}

var keepDrawing= function(event){
    setTL(event);
    socket.emit("point", [l, t, false]);
}

var startDrawing= function(event){

    //if(timer){
    w= document.body.offsetWidth;
    h= document.body.offsetHeight;
    
    setTL(event);
    window.clearTimeout(timer);
    socket.emit("point", [l, t, true]);
    timer= false;
    //}

    this.addEventListener('mousemove', keepDrawing);
    this.addEventListener('touchmove', keepDrawing);
};

var endDrawing= function(event){
    this.removeEventListener('touchmove', keepDrawing);
    this.removeEventListener('mousemove', keepDrawing);
    timer= setTimeout(function(){
        socket.emit("point", [-1, -1]);
        timer= false;
    }, 500);
};

window.onload = function () {
    var socket = io.connect(window.location.href);
    socket.emit('requestSync', key);
    document.getElementById("next").addEventListener("click", function() {
        socket.emit("next");
    });

    document.getElementById("previous").addEventListener("click", function() {
        socket.emit("prev");
    });

    document.getElementById("camera").addEventListener("click", function() {
        socket.emit("camera");
    });
}