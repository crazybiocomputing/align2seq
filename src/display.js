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

 	//Affichage de la matrice de somme

 	var matrixsum=document.getElementById("matrixsomme");

	for (var i =0;i<=size1;i++){
		matrixsum.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixsum.rows[i].insertCell(j);
		}
	}

	var matrix1=document.getElementById("matrixsomme").rows;

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixsomme.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) {
				for (var ligne in s2) {
					matrixsomme.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (scoring in matsumdia){
					matrixsomme.rows[i].cells[j].innerHTML=matsumdia[scoring]+"<br>";
					matrixsomme.rows[i].cells[j].innerHTML+=matsumvert[scoring]+"<br>";
					matrixsomme.rows[i].cells[j].innerHTML+=matsumhor[scoring];
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

	//Affichage de la matrice de score

	var matrixs=document.getElementById("matrixscore");

	for (var i =0;i<=size1;i++){
		matrixs.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}

	var matrix2=document.getElementById("matrixscore").rows;

	for (var i = 0 ; i < matrix2.length; i++) {

		var column = matrix2[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixscore.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) {
				for (var ligne in s2) {
					matrixscore.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (scoring in matscore){
					matrixscore.rows[i].cells[j].innerHTML=matscore[scoring];
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
						matrixpath.rows[i].cells[j].innerHTML="<i class=\"fa fa-arrow-left\"></i>";
					}
					else if (matpath[path]===2){
						matrixpath.rows[i].cells[j].innerHTML="<i class=\"fa fa-gavel\"></i>";
					}
					else if (matpath[path]===3){
						matrixpath.rows[i].cells[j].innerHTML="<i class=\"fa fa-arrow-up\"></i>";
					}
					// matrixpath.rows[i].cells[j].innerHTML=matpath[path];
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