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
function timelapse(){
	step_score();
	step_sum();
	step_path();
}

function step_score(){

}

function step_sum(){

}	

function step_path(){

}	
	//Création et remplissage du tableau
	var matrixs=document.getElementById("matrixstep");

	for (var i =0;i<=size1;i++){
		matrixs.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}

	var matrix1=document.getElementById("matrixstep").rows;

	for (var i = 0 ; i < matrix1.length; i++) {
		document.getElementsByTagName('td');
		var column = matrix1[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {
			document.style.visibility = (j == v - 1 ? "visible" : "hidden");
			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixstep.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) {
				for (var ligne in s2) {
					matrixstep.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (scoring in matscore){
					matrixstep.rows[i].cells[j].innerHTML=matscore[scoring];
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



