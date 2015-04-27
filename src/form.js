/*
* align2seq: Pairwise alignements algorithms in JavaScript, html5, and css3
* Copyright (C) 2015
*
* This file is part of align2seq.
*
* align2seq is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* align2seq is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with align2seq. If not, see <http://www.gnu.org/licenses/>
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
		var listmatrix=Object.keys(matrixlist);
		for (var l in listmatrix){
			document.getElementById('choice_matrix').options[l] = new Option(listmatrix[l],listmatrix[l]);
		}
		// var i=0;
		// var j=30;
		// while ( i<13){
		// 	document.getElementById('choice_matrix').options[i] = new Option('Blosum'+j,'Blosum'+j);
		// 	i+=1;
		// 	j+=5;
		// }
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

function choose_gap_penalty(){
	var seq1=document.getElementById("sequence1").value;
	var seq2=document.getElementById("sequence2").value;
	var enter_gap_penalty =document.getElementById("gap");
	var nodeliste=enter_gap_penalty.childNodes
	while(enter_gap_penalty.firstChild){
		enter_gap_penalty.removeChild(enter_gap_penalty.firstChild)
	}
		//console.log(enter_gap_penalty.childNodes[0])
		//
	if (document.getElementById('single').checked===true){
		var enter_gap=document.createElement('input');
		enter_gap.setAttribute("type","number");
		enter_gap.setAttribute("min", "0");
		enter_gap.setAttribute("id", "enter_gap_penalty");
		enter_gap.setAttribute("value", "0");
		enter_gap.setAttribute("size", 2);
		enter_gap_penalty.appendChild(enter_gap);
	}
	if (document.getElementById('multiple').checked===true){
		var lengthmax=Math.max(seq1.length,seq2.length);		
/*		if (seq1.length>=seq2.length){*/
			for (var i =0; i <= lengthmax-1; i++) {
				if (enter_gap_penalty.hasChildNodes==true){
					var enter_gap=document.createElement('input');
					enter_gap.insertBefore(enter_gap,enter_gap_penalty.lastChild);
					enter_gap.setAttribute("type","number");
					enter_gap.setAttribute("min", "0");
					enter_gap.setAttribute("id", "enter_gap_penalty"+i);
					enter_gap.setAttribute("value", "0");
				enter_gap.setAttribute("style", "width:2em");
				}
				else {
					var enter_gap=document.createElement('input');
					enter_gap_penalty.appendChild(enter_gap);
					enter_gap.setAttribute("type","number");
					enter_gap.setAttribute("min", "0");
					enter_gap.setAttribute("id", "enter_gap_penalty"+i);
					enter_gap.setAttribute("value", "0");
					enter_gap.setAttribute("style", "width:2em");
				}
			}
		}

	}




function get_value(){
// event.preventDefault();
var algo;
var type_seq;
var li_gap=[]
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
var matrix=matrixlist[matrix];


if (document.getElementById("single").checked===true){
var gap=document.getElementById("enter_gap_penalty").value;
var gap=-Math.abs(parseInt(gap));
init(seq1,seq2,matrix,type_seq,algo,gap);
}

else if (document.getElementById("multiple").checked===true){
	var max_len=seq1.length
	if (seq2.length>max_len){
		max_len=seq2.length;
	}
	for (var i =0;i<max_len;i++) {
		var tmp=document.getElementById("enter_gap_penalty"+i).value;
		tmp=Math.abs(parseInt(tmp));
		li_gap.push(-tmp);
	// la liste des gap sous forme numérique est dans li_gap
	}
	init(seq1,seq2,matrix,type_seq,algo,li_gap);
}

}



function init(seq1,seq2,matrix,type_seq,algo,gap){
	algorithm(seq1,seq2,matrix,type_seq,algo,gap);
	display();
}

// function verif(){

// var checked=false
// var algo_checked=false
// var type_seq_check=false
// var seq_check=false
// var content_seq_check=false
// if (algo != undefined){
// 	algo_checked==true;

// }
// if (type_seq!=undefined){
//  type_seq_check=true
// }
// if ((seq1!="sequence1")||(seq2!="sequence2")){
// 	seq_check=true
// }

// var seq_v
// if ((type_seq=="protein")|| seq1=="/ /"



// }
