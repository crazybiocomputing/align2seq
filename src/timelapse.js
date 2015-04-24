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
	// step_score();
	step_sum();
	step_path();
}

function step_sum(){

	//Enlever le premier élément casse tout
	document.getElementById("matrixtime").removeChild(matrixtime.childNodes[0]);
	

	var matrixs=document.getElementById("matrixtime");
	
	for (var i =0;i<=size1;i++){
		matrixs.insertRow(i).setAttribute("id",i);
		for(var j=0;j<=(size2-1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}

	var matrix1=document.getElementById("matrixtime").rows;

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixtime.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			}

			if (i===0 && j>=2) {
				for (var ligne in s2) {
					matrixtime.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			}
			
			document.getElementById("next").addEventListener("click",pass);	
			if(i>=1 && j===1){
				
				for (scoring in matscore){
					matrixtime.rows[i].cells[j].setAttribute("id",i+":"+j);
					matrixtime.rows[i].cells[j].innerHTML=matscore[scoring];
					matrixtime.rows[i].cells[j].style.visibility="hidden";
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
// document.getElementById("next").addEventListener("click",pass);	
	
}	

function pass(id){

	var matrix1=document.getElementById("matrixtime").rows;

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i===1 && j===1){
				for(var x in matrixtime){
					x=document.getElementById(i+":"+j).style.visibility="visible";
					j++;
					if(j%size2==0){
						i++;
						j=1;
					}
				}
			}
		}
	}
	

	// if (document.getElementById("10:10"===true){
	// 	step_path();
	// }
}

function step_path(){

	document.getElementById("matrixtime2").removeChild(matrixtime2.childNodes[0]);

	var matrixp=document.getElementById("matrixtime2");

	for (var i =0;i<=size1;i++){
		matrixp.insertRow(i);
		for(var j=0;j<=(size2-1);j++){
			matrixp.rows[i].insertCell(j);
		}
	}
	var matrix1=document.getElementById("matrixtime2").rows;

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrixtime2.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			}

			if (i===0 && j>=2) {
				for (var ligne in s2) {
					matrixtime2.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			}
			if(i>=1 && j===1){
				for (path in matpath){
					// matrixtime2.rows[i].cells[j].innerHTML=matpath[path];
					
					if (matpath[path]===0){
						matrixtime2.rows[i].cells[j].setAttribute("id",i+","+j);
						matrixtime2.rows[i].cells[j].innerHTML="<i class=\"fa fa-circle-thin\"></i>";
						matrixtime2.rows[i].cells[j].style.visibility="hidden";
					}
					else if (matpath[path]===1){
						matrixtime2.rows[i].cells[j].setAttribute("id",i+","+j);
						matrixtime2.rows[i].cells[j].innerHTML="<i class=\"fa fa-arrow-left\"></i>";
						matrixtime2.rows[i].cells[j].style.visibility="hidden";
					}
					else if (matpath[path]===2){
						matrixtime2.rows[i].cells[j].setAttribute("id",i+","+j);
						matrixtime2.rows[i].cells[j].innerHTML="<i class=\"fa fa-gavel\"></i>";
						matrixtime2.rows[i].cells[j].style.visibility="hidden";
					}
					else if (matpath[path]===3){
						matrixtime2.rows[i].cells[j].setAttribute("id",i+","+j);
						matrixtime2.rows[i].cells[j].innerHTML="<i class=\"fa fa-arrow-up\"></i>";
						matrixtime2.rows[i].cells[j].style.visibility="hidden";
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
document.getElementById("next").addEventListener("click",pass2);	
}	

function pass2(){
		
		document.getElementById("10,10").style.visibility="visible";
}
