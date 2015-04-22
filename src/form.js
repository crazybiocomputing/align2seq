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

"use strict";


function choose_matrix(){
			
		if (document.getElementById('protein').checked===true){
			
			var i=0;
			var j=30;
			while  ( i<13){
				document.getElementById('choice_matrix').options[i] = new Option('Blosum'+j,'Blosum'+j);
				i+=1;
				j+=5;
				}
			}
		
		else if (document.getElementById('nucleotide').checked===true){
			if (document.getElementById('choice_matrix').options.length!==0){
				while (document.getElementById('choice_matrix').options[1]){
			 		document.getElementById('choice_matrix').removeChild(document.getElementById('choice_matrix').options[0]);
				}
				document.getElementById('choice_matrix').options[0]=new Option('DNAfull','DNAfull');
			}
			else{
				document.getElementById('choice_matrix').options[0]=new Option('DNAfull','DNAfull');
			 }
		}
		}


function get_value(){
	// event.preventDefault();
	var algo;
	var type_seq;
	var algo_choice=document.getElementsByName("algorithm");

	for (var i=0;i<algo_choice.length;i++){
		if (algo_choice[i].checked===true){
			algo=algo_choice[i].value;
		}
	}
	var seq_choice=document.getElementsByName("type_seq");
	for (var j=0;j<seq_choice.length;j++) {
		if (seq_choice [j].checked===true) {
			type_seq= seq_choice[j].value;
		}
	}
	var seq2=document.getElementById("sequence1").value;
	var seq1=document.getElementById("sequence2").value;
	var matrix=document.getElementById("choice_matrix").options[document.getElementById('choice_matrix').selectedIndex].value;
	var matrix=matrices.matrix;
	console.log(matrix);
	var gap=document.getElementById("gap_penality").value;
	var gap=parseInt(gap); 

init(seq1,seq2,matrix,type_seq,algo,gap);
}

function init(seq1,seq2,matrix,type_seq,algo,gap){
	algorithm(seq1,seq2,matrix,type_seq,algo,gap);
	display();
	
}
