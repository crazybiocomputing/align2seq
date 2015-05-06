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
var nbValuesAlignToDisplay = 0;
var nbAlign;
var title;


function next(){
	nbValuesToDisplay++;
	//Limit check value
	if(nbValuesToDisplay>=matscore.length){
		nbValuesToDisplay=matscore.length;
		nbValuesAlignToDisplay++;
	}
	launch_nstep(nbValuesToDisplay);
	launch_nstep_align(nbValuesAlignToDisplay);
}

function prev(){
	nbValuesToDisplay--;
	if(nbValuesToDisplay<0){
		nbValuesToDisplay=0;
	}
	launch_nstep(nbValuesToDisplay);
}

function fastnext(){
	if(nbValuesToDisplay<=matscore.length){
		nbValuesPathToDisplay++;
	}
	launch_nstep_path(nbValuesPathToDisplay);
	
}
function fastpreview(){
	if(nbValuesPathToDisplay>0){
		nbValuesToDisplay--;
	}
	launch_nstep(nbValuesToDisplay);
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
			if ((nbDisplayedValues>=1) && (nbDisplayedValues<nbValuesToDisplay)){
				var i2,j2;
				if (j==1){
					i2=i-1;
					j2=(currentRow.cells.length)-1
				}
				else{
					i2=i;
					j2=j-1;
				}
				var previousCell=matrixs.rows[i2].cells[j2]
				var cellprevious=nbDisplayedValues-1;
				previousCell.innerHTML=matpatharrows[cellprevious];
				previousCell.innerHTML+=matsumtot[cellprevious];
			} 
			//The table is filled with the assumption that it is filled from left to right
			currentCell.innerHTML=matscore[nbDisplayedValues];
			nbDisplayedValues++;

			if (nbDisplayedValues>nbValuesToDisplay) {
				currentCell.style.visibility="hidden";
			}

			if (nbDisplayedValues==matscore.length){
				currentCell.innerHTML=matpatharrows[(matscore.length)-1]+""+matsumtot[(matscore.length)-1];
			}
		}
	}
	
    title=document.getElementById("matrixtime").createCaption();
	title.innerHTML="<b>Sum matrix</b>";	
	if(nbValuesToDisplay>size1) {
		if ((nbValuesToDisplay-1)%size1!==0){
		var cellvert=size1;
		var celldia=size1+1;
		var cellcurrent=nbValuesToDisplay-1;
		
		explain.innerHTML="score diagonal + score cell = sum diagonal<br>";
		explain.innerHTML+=matsumtot[cellcurrent-celldia]+"+"+matscore[cellcurrent]+"="+"<b>"+matsumdia[cellcurrent]+"</b>"+"<br>";
		explain.innerHTML+="score horizontal + score gap = sum horizontal<br>";
		explain.innerHTML+=matsumtot[cellcurrent-1]+"+"+gapplace+"="+"<b>"+matsumhor[cellcurrent]+"</b>"+"<br>";
		explain.innerHTML+="score vertical + score gap = sum vertical<br>";
		explain.innerHTML+=matsumtot[cellcurrent-cellvert]+"+"+gapplace+"="+"<b>"+matsumvert[cellcurrent]+"</b>"+"<br>";
		explain.innerHTML+="Maximum value of the three<br>";
		explain.innerHTML+="<b>"+matsumtot[cellcurrent]+"</b><br>";
		explain.innerHTML+="<b>Corresponding path</b> : "+matpatharrows[cellcurrent]+"<br>"
		}
		else{
			explain.innerHTML="";	
		}
	}
}

function launch_nstep_align(nbValuesToDisplayAlign){
	title.innerHTML="<b>Alignment matrix</b>";
	var matrixs=document.getElementById("matrixtime")
	var nbDisplayedValuesAlign= 0;
	for(var i=1;i<matrixs.rows.length;i++){
		var currentRow = matrixs.rows[i];
		for(var j=1;j<currentRow.cells.length;j++){
			var currentCell=currentRow.cells[j];
		}
	}
	for(var posalign=1;posalign<=nbValuesToDisplayAlign;posalign++){
		var alignpos=listalign[posalign-1];
		var posj=(alignpos%(len1+1)-1)+2;
		var posi=Math.floor((alignpos/(len2+1)-1)+2);
		var alignCell=matrixs.rows[posi].cells[posj];
		alignCell.innerHTML=matpatharrowsalign[alignpos];
	}

}


