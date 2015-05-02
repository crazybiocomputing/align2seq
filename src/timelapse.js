/*
 *  align2seq: Pairwise alignements algorithms in JavaScript, html5, and css3 
 *  Copyright (C) 2015  
 *
 *  This file is part of align2seq.
 *
 *  align2seq is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  align2seq is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with align2seq.  If not, see <http://www.gnu.org/licenses/>
 *
 * Authors:
 * Rudy Anne
 * Aurelien Beliard
 * Emeline Duquenne
 * Aurore Perdriau
 */

"use strict"

var nbValuesToDisplay = 0;
var nbValuesPathToDisplay = 0;

function next(){
	nbValuesToDisplay++;
	//Limit check value
	if(nbValuesToDisplay>matscore.length){
		nbValuesToDisplay=matscore.length;
		nbValuesPathToDisplay++;

		if(nbValuesPathToDisplay>matpath.length){
			nbValuesPathToDisplay=matpath.length;
		}
	}
	launch_nstep(nbValuesToDisplay);
	launch_nstep_path(nbValuesPathToDisplay);

}

function prev(){
	nbValuesPathToDisplay--;
	if (nbValuesPathToDisplay<0){
		nbValuesPathToDisplay=0;
		nbValuesToDisplay--;
		if(nbValuesToDisplay<0){
			nbValuesToDisplay=0;
		}
	}
	
	launch_nstep(nbValuesToDisplay);
	launch_nstep_path(nbValuesPathToDisplay);
}
/** Step by step function with next and preview possibilities
@constructor
@param {number} nbValuesToDisplay - counter for the scoring matrix 
*/
function launch_nstep(nbValuesToDisplay){

	var matrixs=document.getElementById("matrixtime");

	//The table is empty
	while (matrixs.firstChild) {
    	matrixs.removeChild(matrixs.firstChild);
	}

	// Filling the array with the desired number of cells
	for (var i =0;i<=size1;i++){
		matrixs.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}

	for(var i=0;i<matrixs.rows.length;i++){
		var currentRow = matrixs.rows[i];
		for(var j=0;j<currentRow.cells.length;j++){
			var currentCell=currentRow.cells[j];

			//Filling the array with the first sequence (first column)
			if (i>=2 && j===0){
				currentCell.innerHTML=s1[i-2];
			}

			//Filling the array with the second sequence (first ligne)
			if (i===0 && j>=2){
				currentCell.innerHTML=s2[j-2];
			}
		}
	}

	var nbDisplayedValues= 0; 
	for(var i=1;i<matrixs.rows.length;i++){
		var currentRow = matrixs.rows[i];
		for(var j=1;j<currentRow.cells.length;j++){
			var currentCell=currentRow.cells[j];

			//The table is filled with the assumption that it is filled from left to right
			currentCell.innerHTML=matscore[nbDisplayedValues];
			nbDisplayedValues++;

			if (nbDisplayedValues>nbValuesToDisplay) {
				currentCell.style.visibility="hidden";
			};
		}
	}
}
/** Step by step function with next and preview possibilities
@constructor
@param {number} nbValuesPathToDisplay - counter for path matrix
*/
function launch_nstep_path(nbValuesToDisplayPath){

	var matrixs=document.getElementById("matrixtime");

	var nbDisplayedValuesPath= 0; 
	for(var i=matrixs.rows.length-1;i>=1;i--){
		var currentRow = matrixs.rows[i];
		var currentRowNumber = i-1;
		for(var j=currentRow.cells.length-1;j>=1;j--){
			var currentCell=currentRow.cells[j];
			var currentCellNumber = j-1;

			var matPos = currentRowNumber * (currentRow.cells.length-1) + currentCellNumber;

			if (nbDisplayedValuesPath<nbValuesToDisplayPath) {
				if (matpath[matPos]===0){
						currentCell.innerHTML+="<i class=\"fa fa-circle-thin\"></i>";
					}
					else if (matpath[matPos]===1){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\hor.png\"></img>";
					}
					else if (matpath[matPos]===2){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\dia.png\"></img>";
					}
					else if (matpath[matPos]===3){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\vert.png\"></img>";
					}
					else if (matpath[matPos]===4){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\horvert.png\"></img>";
					}
					else if (matpath[matPos]===5){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\hordia.png\"></img>";
					}
					else if (matpath[matPos]===6){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\diavert.png\"></img>";
					}
					else if (matpath[matPos]===7){
						currentCell.innerHTML+="<img src=\"..\\src\\arrows\\hordiavert.png\"></img>";
					}
			};
			nbDisplayedValuesPath++;
		}
	}
}
