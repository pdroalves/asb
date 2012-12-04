/* Initialization */
//Draw(a,b,c);

/* Canvas and context objects */

var Canvas = document.getElementById('xy-graph');  
var Ctx = null ;

var Width = Canvas.width ;
var Height = Canvas.height ;

var horizonteMaxX = 10;
var horizonteMinX = -10;
var horizonteMaxY = 10;
var horizonteMinY = -10;

var radius = 3;

/*F
  The origin (0,0) of the canvas is the upper left:

  (0,0)
    --------- +X
   |
   |
   |
   |
   +Y

  Positive x coordinates go to the right, and positive y coordinates go down.

  The origin in mathematics is the "center," and positive y goes *up*.

  We'll refer to the mathematics coordinate system as the "logical"
  coordinate system, and the coordinate system for the canvas as the
  "physical" coordinate system.

  The functions just below set up a mapping between the two coordinate
  systems.

  They're defined as functions, so that one wanted to, they could read
  ther values from a from instead of having them hard-coded.
 
 */

// Seta o limite direito no eixo X
function setMaxX(n){
	horizonteMaxX = n;
	return;
}

// Seta o limite esquerdo no eixo X
function setMinX(n){
	horizonteMinX = n;
	return;
	
// Seta o limite superior no eixo Y
}function setMaxY(n){
	horizonteMaxY = n;
	return;
}

// Seta o limite inferior no eixo Y
function setMinY(n){
	horizonteMinY = n;
	return;
}


// Returns the right boundary of the logical viewport:
function MaxX() {
  return horizonteMaxX ;
}

// Returns the left boundary of the logical viewport:
function MinX() {
  return horizonteMinX ;
}

// Returns the top boundary of the logical viewport:
function MaxY() {
  return  horizonteMaxY;
}

// Returns the bottom boundary of the logical viewport:
function MinY() {
   return  horizonteMinY;
}

// Returns the physical x-coordinate of a logical x-coordinate:
function XC(x) {
  return (x - MinX()) / (MaxX() - MinX()) * Width ;
}

// Returns the physical y-coordinate of a logical y-coordinate:
function YC(y) {
  return Height - (y - MinY()) / (MaxY() - MinY()) * Height ;
}

function DrawPonto(x,y,txt){
	 if (Canvas.getContext) {
		Ctx = Canvas.getContext('2d');
		Ctx.beginPath();
		//Ctx.moveTo(XC(x),YC(y));
		Ctx.fillText(txt,XC(x+0.2), YC(y+0.2));
		Ctx.arc(XC(x), YC(y), radius, 0 , 2 * Math.PI, false);
		Ctx.fillStyle = 'black';
		Ctx.fill();
		Ctx.strokeStyle = '#000000';
		Ctx.stroke();
	}else{
		document.writeln("Not working.");
	}
}

/* Rendering functions */

// Clears the canvas, draws the axes and graphs the function F.
function DrawLine(b,c,x0) {
	//Recebe os coeficientes b e c além da raiz da reta

 // Evaluate the user-supplied code, which must bind a value to F.
 var F = function(x){return window.b*x+window.c};
 
 if (Canvas.getContext) {
  
   // Set up the canvas:
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height) ;

   // Draw:
   DrawAxes() ;
   RenderFunction(F) ;
   DrawPonto(x0,0,"Raiz");
  } else {
    document.writeln("Not working");
  }
}


function DrawParabola(a,b,c,x1,x2,xv,yv) {
	// Recebe os coeficientes a,b e c, as duas raizes x1 e x2 além das coordenadas xv e yv do vertice

 // Evaluate the user-supplied code, which must bind a value to F.
 var F = function(x){return window.a*x*x+window.b*x+window.c};
 
 if (Canvas.getContext) {
  
   // Set up the canvas:
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height) ;

   // Draw:
   DrawAxes() ;
   RenderFunction(F) ;
   if(x1 != null && x2 != null){
	   DrawPonto(x1,0,"x1: "+x1.toPrecision(2));
	   DrawPonto(x2,0,"x2: "+x2.toPrecision(2));
   }
   DrawPonto(xv,yv,"("+xv.toPrecision(2)+","+yv.toPrecision(2)+")");
  } else {
    document.writeln("Deu pau");
  }
}

// Returns the distance between ticks on the X axis:
function XTickDelta() {
  return Math.pow(10,Math.round(Math.log(Math.max(Math.abs(MaxX()),Math.abs(MinX())))/Math.LN10)-1) ;
}

// Returns the distance between ticks on the Y axis:
function YTickDelta() {
  return Math.pow(10,Math.round(Math.log(Math.max(Math.abs(MaxY()),Math.abs(MinY())))/Math.LN10)-1) ;
}

  
// DrawAxes draws the X ad Y axes, with tick marks.
function DrawAxes() {
 Ctx.save() ;
 Ctx.lineWidth = 2 ;
 // +Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MaxY())) ;
 Ctx.stroke() ;

 // -Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MinY())) ;
 Ctx.stroke() ;

 // Y axis tick marks
 var delta = YTickDelta() ;
 for (var i = 1; (i * delta) < MaxY() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
  Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
  Ctx.stroke() ;  
 }

 var delta = YTickDelta() ;
 for (var i = 1; (i * delta) > MinY() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
  Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
  Ctx.stroke() ;  
 }  

 // +X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MaxX()),YC(0)) ;
 Ctx.stroke() ;

 // -X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MinX()),YC(0)) ;
 Ctx.stroke() ;

 // X tick marks
 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) < MaxX() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  Ctx.stroke() ;  
 }

 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) > MinX() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  Ctx.stroke() ;  
  
  //teste escrever no eixo x
  //ctx.font="10px Arial";
  //Ctx.fillText(i*delta,XC(i*delta),YC(0)-10);
 }
 Ctx.restore() ;
}


// When rendering, XSTEP determines the horizontal distance between points:
var XSTEP = 0.1*(MaxX()-MinX())/(Width) ;


// RenderFunction(f) renders the input funtion f on the canvas.
function RenderFunction(f) {
  var first = true;

  Ctx.beginPath() ;
  for (var x = MinX(); x <= MaxX(); x += XSTEP) {
   var y = f(x) ;
   if (first) {
    Ctx.moveTo(XC(x),YC(y)) ;
    first = false ;
   } else {
    Ctx.lineTo(XC(x),YC(y)) ;
   }
  }
  Ctx.stroke() ;
}



 
 
