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

 function display(){

	 	document.getElementById("matrixsum").removeChild(matrixsum.childNodes[0]);
	 	document.getElementById("matrixpath").removeChild(matrixpath.childNodes[0]);

	//Affichage de la matrice de score

	var matrixs=document.getElementById("matrixsum");

	for (var i =0;i<=size1;i++){
		matrixs.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}
	
 	
	var matrix2=document.getElementById("matrixsum").rows;

	for (var i = 0 ; i < matrix2.length; i++) {

		var column = matrix2[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixsum.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) {
				for (var ligne in s2) {
					matrixsum.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (scoring in matscore){
					matrixsum.rows[i].cells[j].innerHTML=matscore[scoring];
					j++;
					if(j%size2==0){
						i++;
						j=1;
					}
				}
			i=1;
			} 
		}
	}

	//Affichage de la matrice de chemin

	var matrixp=document.getElementById("matrixpath");

	for (var i =0;i<=size1;i++){
		matrixp.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixp.rows[i].insertCell(j);
		}
	}

	var matrix3=document.getElementById("matrixpath").rows;//création des lignes

	for (var i = 0 ; i < matrix3.length; i++) {

		var column = matrix3[i].cells; //On a autant de cellule par ligne
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixpath.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) { //Remplir la première ligne à partir de la seconde case
				for (var ligne in s2) {
					matrixpath.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (path in matpath){
					if (matpath[path]===0){
						matrixpath.rows[i].cells[j].innerHTML="<i class=\"fa fa-circle-thin\"></i>";
					}
					else if (matpath[path]===1){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\hor.png\"></img>";
					}
					else if (matpath[path]===2){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\dia.png\"></img>";
					}
					else if (matpath[path]===3){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\vert.png\"></img>";
					}
					else if (matpath[path]===4){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\horvert.png\"></img>";
					}
					else if (matpath[path]===5){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\hordia.png\"></img>";
					}
					else if (matpath[path]===6){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\diavert.png\"></img>";
					}
					else if (matpath[path]===7){
						matrixpath.rows[i].cells[j].innerHTML="<img src=\"..\\src\\arrows\\hordiavert.png\"></img>";
					}
					j++;
					if(j%size2==0){
						i++;
						j=1;
					}
				}
			i=1;
			} 
		}
	}

	

}