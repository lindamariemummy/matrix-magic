// matrix object
function Matrix()
{
	this.matrix = [];
	var numRows = 0;
	var numCols = 0;
	var entries = [];

	this.defineMatrix = function(rows,cols,dat) {
		numRows = rows;
		numCols = cols;
		entries = dat;

		//matrix isn't defined!
		if (numRows*numCols !=dat.length)
		{	
			return false;
		}
		else
		{	//splits the data up by row;
			for (var i=0; i<numRows; i++) {
				this.matrix[i]=dat.slice(i*numCols, numCols*i+numCols);
			}

			return true;
		}
	}
	
	this.getEntry = function(i, j) {
		return this.matrix[i][j];
	}
	this.getRows = function() {
		return numRows;
	}

	this.getCols = function() {
		return numCols;
	}
	this.getNumEntries = function() {
		return numRows*numCols;
	}
	this.getAllEntries = function() {
		return entries;
	}
}

//returns an HTML formatted table containing the matrix A
function printMatrix(A) {
	var textString = "<table>";

	for (var i = 0; i <A.getRows(); i++ ) {
		textString += "<tr>";
		for (var j = 0; j < A.getCols(); j++){
			textString += "<td>" + A.getEntry(i,j) + "</td>" ;
		} 
		textString +="</tr>";
	}

	textString += "</table>";

	return textString;

}


//returns AB, false if product is undefined
function multiplyMatrices(A,B)
{
	console.log(A);
	var Arows = A.getRows();
	var Acols = A.getCols();
	var Brows = B.getRows();
	var Bcols = B.getCols();
	var product = [];						
	var finalMatrix = new Matrix(); 			
	var sum;

	if (Acols != Brows) {
		return false;
	}

	for (var row = 0; row < Arows; row++) { //ith row
		for (var col = 0; col < Bcols; col++) { //jth col
			
			sum = 0;
			for (var p = 0 ; p < Acols ; p++) {
				sum += A.matrix[row][p] * B.matrix[p][col];	
			} 
			product[row +col*row] = sum;
		}
	}

	finalMatrix.defineMatrix(Arows,Bcols,product);

	return finalMatrix;

}

//returns A + B, false if sum is undefined
function addMatrices(A,B) {

	var Arows = A.getRows();
	var Acols = A.getCols();
	var Brows = B.getRows();
	var Bcols = B.getCols();
	var sumData = [];
	var sum = new Matrix();

	//addition is undefined
	if (Arows != Brows || Acols != Bcols) {
		return false;
	}
	else {
		for (var i = 0; i< Arows*Acols; i++) {
			sumData[i]=parseFloat(A.getAllEntries()[i])+parseFloat(B.getAllEntries()[i]);
		}
	}

	sum.defineMatrix(Arows, Acols, sumData);
	return sum;
}

//returns the produce cA, where c is a constant and A is a matrix
function constMultiply(A, c) {
	var product = [];

	for (var i =0; i< A.getAllEntries().length; i++) {
		product[i]=A.getAllEntries()[i];
		console.log(product[i]);
	}

	return Matrix(A.getRows(), A.getCols(), product);

}

//returns A - B, false if difference is undefined
function subtractMatrices(A,B) {
	var result = new Matrix();

	if (Arows != Brows || Acols != Bcols) {
		return false;
	}

	result = addMatrices(A,constMultiply(B, -1));

	return result;

}
