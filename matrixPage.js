//global variables will be updated in getInfoFromForm function
var Arows, Acols, Brows, Bcols,table,operation;

//get input from user
displayDDMenus(["Arows", "Acols","Brows", "Bcols"]);

//reads user input from blank matrix forms
function getInfoFromForm() {

	//indicates no problems have occurred (yet!)
	printError("No errors have occurred (yet!)");

	//clears result div
	var result = document.getElementById("result");
	result.innerHTML = "";

	operation = document.getElementById("operation").selectedIndex;
	Arows = document.getElementById("Arows").selectedIndex+1;
	Acols = document.getElementById("Acols").selectedIndex+1;
	Brows = document.getElementById("Brows").selectedIndex+1;
	Bcols = document.getElementById("Bcols").selectedIndex+1;
	table = document.getElementById("operationSymbol");

	if (operation == 0)
	{
			table.innerHTML="+";
	}
	else if (operation == 1)
	{
			table.innerHTML="-";
	}
	else if (operation == 2)
	{
			table.innerHTML="*";
	}

	//print blank matrices of correct size
	displayBlankMatrices(Arows, Acols, "matrixDisp1", "A");
	displayBlankMatrices(Brows, Bcols, "matrixDisp2", "B");
	makeDoMathButton("button2"); 

}

//creates and displays a div containing rows and cols in the element with elementId
function displayBlankMatrices(rows, cols, elementId, character)
{
	var table;

	table = document.getElementById(elementId);
	tableString = "<table>" ;

	//forms table with i rows and j columns
	for(var i = 0; i < rows; i++){
	   tableString += "<tr>";
	   for (var j = 0; j < cols; j++){
      	tableString += "<td><form> <input type='text' size='4' id='userEntry" + character + i + j +"'></form><td>";
	   }
	   tableString += '</tr>'
	}
	tableString += '</table>';
	table.innerHTML = tableString;

	//button2
}

//displays "Do Math!" button
function makeDoMathButton(buttonId) {
	var newButton;
	newButton = document.getElementById(buttonId);
	newButton.innerHTML = "Do Math!";

}

function doMath(character) {

	var array = [];
	var matrixResult = new Matrix();

	A = getMatrixFromForm(Arows, Acols, "A");
	B = getMatrixFromForm(Brows, Bcols, "B");
	
	//perform addition
	if (operation == 0) {
		matrixResult = addMatrices(A,B);

		if(!matrixResult)
		{
			printError("Error! Sum is not defined.");
		}
	}

	//perform subtraction
	else if (operation == 1 ) {
		matrixResult = subtractMatrices(A,B);
		if(!matrixResult)
		{
			printError("Error! Difference is not defined.");
		}
	}

	//perform multiplication
	else {
		matrixResult = multiplyMatrices(A,B);
		//console.log(matrixResult);
		if(!matrixResult)
		{
			printError("Error! Product is not defined.");
		}
		else {

		}
	}

	var equals = document.getElementById("operationSymbol2");
	equals.innerHTML = "=";

	console.log(matrixResult);
	if (matrixResult) {
		var result = document.getElementById("result");
		result.innerHTML = printMatrix(matrixResult);
	}
}

function printError(message)
{
	var toPrint = document.getElementById("warning");
	toPrint.innerHTML = message;
}


//reads in matrix from the HTML form with userEntry<matrix name><row><col>
function getMatrixFromForm(rows, cols, character) {

	var array = [];
	var newMatrix = new Matrix();
	for(var i = 0; i < rows; i++){
	   for (var j = 0; j < cols; j++){
      	array[i*cols+j] = document.getElementById("userEntry"+ character+i+j).value;
	   }
	}

	newMatrix.defineMatrix(rows, cols, array);

	return newMatrix;

}

//forms inner HTML for dropdown menus
function displayDDMenus(menuIds) {

	var menu;
	var menuHTMLString = "";

	for (var i = 0; i < menuIds.length; i++) {
		menu = document.getElementById(menuIds[i]);
		menuHTMLString += "<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option>";
		menu.innerHTML = menuHTMLString;
		menuHTMLString="";
	}
}

$(document).ready(function() {
    var $b1 = $("#button1");
    var $b2 = $("#button2");
    var infoFilledOut = false;
    $b1.mouseenter(function() {
        $b1.fadeTo("fast", .8);
    });
    $b1.mouseleave(function() {
        $b1.fadeTo("fast", 1);
    });
    $b1.click(function() {
        getInfoFromForm();
        infoFilledOut = true;
    });
    $b2.mouseenter(function() {
        $b2.fadeTo("fast", .8);
    });
    $b2.mouseleave(function() {
        $b2.fadeTo("fast", 1);
    });
    $b2.click(function() {
        if (infoFilledOut) {
       		doMath("A"); 
      	}
      	else {
      		printError("Error! enter info!");
      	}
    });
});

