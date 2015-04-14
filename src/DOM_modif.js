/*
 *  align2seq: Exact pairwise alignement tools:  in JavaScript, html5, css3, and WebGL
 *  Copyright (C) 2015  Jean-Christophe Taveau.
 *
 *  This file is part of align2seq
 *
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by 
 * the Free Software Foundation, either version 3 of the License, or 
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with mowgli.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

"use strict"

//useless function

// function validate(){
// 	 	if (document.getElementById('proteine').checked===true){
// 	 		document.getElementById('nucleotide').checked=false;
// 	 	}
// 	 	else if (document.getElementById('nucleotide').checked===true){
// 	 		document.getElementById('proteine').checked=false;

// 	 	}
// 	 	else if ((document.getElementById('nucleotide').checked===false)&&(document.getElementById('proteine').checked===false)){
// 	 		var form=document.querySelector("#form p");
// 	 		form.innerHtml ="vous devez cocher au moins une des deux case";

// 	 	}


// 	}
/**
 * 
 * 
 **/
function chooseMatrice(){
	console.log("AHAHAH");
			
		if (document.getElementById('proteine').checked===true){
			
			var i=0;
			var j=30;
			while  ( i<13){
				console.log("ahahah");
				document.forms['form'].choix_matrice.options[i] = new Option('Blosum'+j,'Blosum'+j);
				i+=1;
				j+=5;
				}
			}
		
		else if (document.getElementById('nucleotide').checked===true){
			console.log("AHahAhah");
			if (document.forms['form'].choix_matrice.options.length!==0){
				while (document.forms['form'].choix_matrice.options[1]){
			 		document.forms['form'].choix_matrice.removeChild(document.forms['form'].choix_matrice.options[0]);
				}
				document.forms['form'].choix_matrice.options[0]=new Option('DNAfull','DNAfull');
			}
			else{
				document.forms['form'].choix_matrice.options[0]=new Option('DNAfull','DNAfull');
			 }
		}
		console.log((document.forms['form'].elements.value));
		}


function show_matrice(){
	var seq1="ACVHFFTCA"; var seq2="AGFTCDFGA";
	var s1=seq1.split("");
	var s2=seq2.split("");
	var len1= seq1.length;
	var len2=seq2.length;
	var taille1=len1+2;
	var taille2=len2+2;
	// creer un tableau contenant i ligne et j colonne et contenant les seq 
	console.log(len1);
	console.log(len2);
	var matrice=document.getElementById("matrice");

	for (var i =0;i<=taille1;i++){
		matrice.insertRow(i);
		for(var j=0;j<=taille2;j++){
			matrice.rows[i].insertCell(j);
		}
	}
	
	var matrice1=document.getElementById("matrice").rows;//création des lignes

	for (var i = 0 ; i < matrice1.length; i++) {

		var colonne = matrice1[i].cells; //On a autant de cellule par ligne
		
		for (var j = 0; j < colonne.length ; j++) {
			if(j % 2 == 0)//si la clé est paire
			{
				colonne[j].style.backgroundColor = "#bdcbf5";
			}
			else //elle est impaire
			{
				colonne[j].style.backgroundColor = "#829eeb";
			}
			if (j===0 && i>=2){ 
				console.log("on est dans le 1er if");
				console.log("tour",i)
				for(var colonne in s1){
					console.log("Colonne : " + colonne + " = " + s1[colonne]);
					matrice.rows[i].cells[j].innerHTML=s1[colonne];	
					i++;	


				}
			}

			if (i===0 && j>=2) { //Remplir la première ligne à partir de la seconde case
				console.log("on est dans le 2nd if");
				console.log("tour",j)
				for (var ligne in s2) {
					console.log("Ligne : "+ ligne + " = " + s2[ligne]);
					//On ressort que la dernière lettre à chaque fois
					matrice.rows[i].cells[j].innerHTML=s2[ligne];
					j++;
				}
			}

		}
		
	}

}

// function step_to_step(){}

//var arrayligne = document.getElementById("matrice").rows;
//for (var k=0; k<=arrayligne.length;i++){


// }
