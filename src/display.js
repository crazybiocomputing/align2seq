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
/** Last file executed after data treatment : creation of the displayed matrices, without step by step
@constructor
 */
 function display(){
 	//elimination of the elements already in results
 	matrixsum.childNodes=[];
 	while(matrixsum.hasChildNodes()) { 
  		matrixsum.removeChild( matrixsum.childNodes[0] );
	}
	while(matrixpath.hasChildNodes()){
		matrixpath.removeChild( matrixpath.childNodes[0] );
	}

	//creation of score matrix
	var matrixs=document.getElementById("matrixsum");

	for (var i =0;i<=(size2-1);i++){
		matrixs.insertRow(i);
		for(var j=0;j<=(size1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}
 	
 	//filling of score matrix
	var matrix2=document.getElementById("matrixsum").rows;
	for (var i = 0 ; i < matrix2.length; i++) {
		var column = matrix2[i].cells; 
		for (var j = 0; j < column.length ; j++) {
			if (i>=2 && j===0){ 
				for(var column in s2){
					matrixsum.rows[i].cells[j].innerHTML=s2[column];	
					i++;	
				}
			}
			if (i===0 && j>=2) {
				for (var ligne in s1) {
					matrixsum.rows[i].cells[j].innerHTML=s1[ligne];
					j++;
				}
			}
			if(i>=1 && j===1){
				for (scoring in matscore){
					matrixsum.rows[i].cells[j].innerHTML=matscore[scoring];
					j++;
					if(j%(size1+1)===0){
						i++;
						j=1;
					}
				}
			i=1;
			} 
		}
	var title=document.getElementById("matrixsum").createCaption();
	title.innerHTML="<b>Sum matrix</b>";	
	}

	//creation of path matrix
	var matrixp=document.getElementById("matrixpath");
	for (var i =0;i<=(size2-1);i++){
		matrixp.insertRow(i);
		for(var j=0;j<=(size1);j++){
			matrixp.rows[i].insertCell(j);
		}
	}
 	
 	//filling of path matrix
	var matrix3=document.getElementById("matrixpath").rows;

	//création of lines
	for (var i = 0 ; i < matrix3.length; i++) {
		var cpt=0;
		var column = matrix3[i].cells; 

		//Creation of the cells
		for (var j = 0; j < column.length ; j++) {
			if (i>=2 && j===0){ 
				for(var column in s2){
					matrixpath.rows[i].cells[j].innerHTML=s2[column];	
					i++;	
				}
			}
			if (i===0 && j>=2) { 
			//filling of the first line from the second cell
				for (var ligne in s1) {
					matrixpath.rows[i].cells[j].innerHTML=s1[ligne];
					j++;

				}
			}
			if(i>=1 && j===1){
				for (path in matpath){
					matrixpath.rows[i].cells[j].innerHTML=matpatharrows[cpt];
					j++;
					if(j%(size1+1)===0){
						i++;
						j=1;
					}
					cpt++;
				}
			i=1;
			} 
		}
	var title=document.getElementById("matrixpath").createCaption();
	title.innerHTML="<b>Path matrix</b>";	
	}
}
