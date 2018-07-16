const tablaElementos =$( 'elementos' );
const tablaespacios = $( 'tablero' );

                     
                      
var piezas = [
    {id: 1, x: 5, y: 5, color: "red"},
    {id: 2, x: 5, y: 150, color: "green"},
    {id: 3, x: 90, y: 75, color: "yellow"},
    {id: 4, x: 5, y: 295, color: "black"},
    {id: 5, x: 90, y: 220, color: "brown"},
    {id: 6, x: 5, y: 440, color: "white"},
    {id: 7, x: 90, y: 365, color: "gray"},
    {id: 8, x: 5, y: 585, color: "purple"},
    {id: 9, x: 90, y: 510, color: "turquoise"},
];
var espacios = [
    {id: 9, x: 7, y: 5, color: "turquoise" },       
    {id: 8, x: 7, y: 139, color: "purple"},        
    {id: 7, x: 7, y: 272, color: "gray"},        
    {id: 6, x: 221, y: 5, color: "white"},
    {id: 5, x: 221, y: 139, color: "brown"},
    {id: 4, x: 221, y: 272, color: "black"},
    {id: 3, x: 435, y: 5, color: "yellow"},
    {id: 2, x: 435, y: 139, color: "green"},
    {id: 1, x: 435, y: 272, color: "red"},
];




let currentlyDragging = null;
var contadorAciertos = 0;
var contadorErrores = 0;

piezas.forEach( function(pieza){
    
    


    newdiv =  $( document.createElement('div'));


    newdiv.css("background-image", "url('./img/doraemon/" + pieza.id+ ".jpg')");

    newdiv.css('left', pieza.x+ "px");
    newdiv.css('top', pieza.y+"px");
    newdiv.css('width', pieza.width+ "px");
    newdiv.css('height', pieza.height+"px");
    newdiv.attr("id", ""+pieza.id);
    
   
    //console.log(pieza);
    


    
    $('#elementos').append(newdiv);

  $(newdiv).on("touchstart", inicio);
    $(newdiv).on("touchend", soltar);
    $(newdiv).on("touchmove", mover);
    
 //   console.log("Start " + mover);

});

espacios.forEach( function(espacio){
  newdiv =  $( document.createElement('div'));
     
    
    newdiv.css('backgroundColor',"transparent");
 
    newdiv.css("border-style", "dotted");
    newdiv.css("width", espacio.width);
    newdiv.css("height", espacio.height);
    newdiv.css('left', espacio.x + "px");
    newdiv.css('top', espacio.y+ "px");

    
    newdiv.attr("id", "tab"+espacio.id);
   
     
    $('#tablero').append(newdiv);
    
});

function inicio(eve){
    
    currentlyDragging = eve.target;
    divEsp  = $(""+eve.target.id);
    
    currentlyDragging = eve.target;
    console.log("mira este es objeto que tiene el evento actual: "+currentlyDragging);
    divEsp =$(""+eve.target.id);
    console.log("Start:" + eve.target.id + " " + eve);
    
    var oX=(divEsp.css('left'));
    var oY=(divEsp.css('top'));
    console.log("Oy tiene: "+oY);
    console.log("Ox tiene: "+ oX);
    
}

function mover(eve){
    
   
        
      
    var touchLocation = eve.targetTouches[0];
     // $("#"+ e.target.id).css("left", touchLocation.clientX + 'px');
    var id = $("#"+ eve.target.id).attr("id");
    console.log("id del taget es: " + id);
     $("#"+ eve.target.id).css('left', touchLocation.clientX + 'px');
     $("#"+ eve.target.id).css('top', touchLocation.clientY + 'px');
}

function soltar(eve){
    
    
    
    currentlyDragging = eve.target;
    var  divEsp = $("#"+eve.target.id);
    var tablEspacio  = $("#tab"+eve.target.id);
    
    console.log("div actual en evento: "+divEsp.attr("id"));
    console.log("Movimientos: " + divEsp.css("backgroundColor"));
    console.log("Movimientos: " + tablEspacio.css("borderColor"));
    
    
    
    var arrastrar = (parseInt($("#elementos").width()) - parseInt(divEsp.css("left") + 20))*-1;
    console.log("mov: "  + divEsp.css("left"))
    console.log("mov: "  + divEsp.css("top"))
    console.log("arrastrar tiene: "+arrastrar)
    posxPieza = arrastrar;
    console.log("posxPieza tiene: "+posxPieza)
    posyPieza = parseInt(divEsp.css("top"));
    console.log("posyPieza tiene: "+posyPieza)
    posxEspacio = parseInt(tablEspacio.css("left")) + 30;
    console.log("posxEspacio tiene: "+posxEspacio)
    posyEspacio = parseInt(tablEspacio.css("top"));
    console.log("posyEspacio tiene: "+posyEspacio)
    
    



    posicionfinal = posxEspacio + parseInt($("#elementos").width());
    console.log("pos final"+ posicionfinal)
if (((posxEspacio -200) <= posxPieza) && ((posxEspacio + 10) >= posxPieza) && ((posyEspacio -10) <= posyPieza) && ((posyEspacio +10) >= posyPieza)){
    console.log("Bien hecho!");
                                                                                                                                              
      divEsp.css("left",posicionfinal + 'px');
      divEsp.css("top" ,posyEspacio + 'px');
      divEsp.off("touchstart", inicio, false);
      divEsp.off("touchend", soltar, false);
      
      divEsp.off("touchmove", mover, false);
      contadorAciertos++;
      if (contadorAciertos == 9){
        alert("GANASTE");
      }
    }else{
      console.log("pieza desubicada vuelve intentarlo");
      divEsp.css("left", piezas[eve.target.id-1].x + 'px');
      divEsp.css("top" ,piezas[eve.target.id-1].y + 'px');
      contadorErrores++;
      if (contadorErrores == 15){
        alert("PERDISTE");
      }
    }
    console.log("Juego Terminado " +eve);
}


