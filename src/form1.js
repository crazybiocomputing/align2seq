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
	}
	else if (document.getElementById('nucleotide').checked===true){
		var listEDNA=Object.keys(matrixEDNA);
		for (var l in listEDNA){
			document.getElementById('choice_matrix').options[l] = new Option(listEDNA[l],listEDNA[l]);
		}
	}
}

function choose_gap_penalty(){
	var seq1=document.getElementById("sequence1").value;
	var seq2=document.getElementById("sequence2").value;
	var enter_gap_penalty =document.getElementById("gap");
	var nodeliste=enter_gap_penalty.childNodes;
	while(enter_gap_penalty.firstChild){
		enter_gap_penalty.removeChild(enter_gap_penalty.firstChild);
	}
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
		for (var m =0; m <= lengthmax-1; m++) {
			if (enter_gap_penalty.hasChildNodes===true){
				var enter_gap=document.createElement('input');
				enter_gap.insertBefore(enter_gap,enter_gap_penalty.lastChild);
				enter_gap.setAttribute("type","number");
				enter_gap.setAttribute("min", "0");
				enter_gap.setAttribute("id", "enter_gap_penalty"+m);
				enter_gap.setAttribute("value", "0");
				enter_gap.setAttribute("style", "width:2em");
			}
			else {
				var enter_gap=document.createElement('input');
				enter_gap_penalty.appendChild(enter_gap);
				enter_gap.setAttribute("type","number");
				enter_gap.setAttribute("min", "0");
				enter_gap.setAttribute("id", "enter_gap_penalty"+m);
				enter_gap.setAttribute("value", "0");
				enter_gap.setAttribute("style", "width:2em");
			}
		}
	}
}

function get_value(){
	var algo;
	var type_seq;
	var li_gap=[];
	var choose_gap;
	var algo_checked=verif_check_algo();
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
		if (document.getElementById('protein').checked===true){
			var matrix=matrixlist[matrix];
		}
		else{
			var matrix=matrixEDNA[matrix];
		}

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
/*
var checked=false;
var algo_checked=false;
var type_seq_check=false;
var seq_check=false;
var content_seq_check=false;
var matrix_check=false;
var gap_choice_check=false;


var seq2=document.getElementById("sequence1").value;
var seq1=document.getElementById("sequence2").value;
if ((1<seq1.length<20)&&(1<seq2.length<20)){
if(((type_seq=="protein")&&(/[ARNDCQEGHILKMFPSTWYVBZX]/.test(seq1,seq2)))||((type_seq=="nucleotide")&&(/[ATGCU]/.test(seq1,seq2)))) {
seq_check=true;
}
else{
	document.getElementById("formulaire").innerHtml="<b>"+"Les séquences entré ne correspondent pas au type de séquence choisi"+"</b>";
}
}else{	document.getElementById("formulaire").innerHtml="<b>"+"Les séquences entré ne sont pas de taille adapté"+"</b>";
}

var matrix=document.getElementById("choice_matrix").options[document.getElementById('choice_matrix').selectedIndex].value;
if (matrix!=undefined){
	matrix_check=true;
} 
else{
 	document.getElementById("formulaire").innerHtml="<b>"+"selectionnez une matrice "+"</b>";
 }

matrix=matrixlist[matrix];


var nb_gap=document.getElementsByName("choose_gap_penalty");
for (var k=0;k<nb_gap.length;k++){
	if (nb_gap[k].checked===true){
		choose_gap=nb_gap[k].value;
	}
	}

	if (document.getElementById("single").checked===true){
		var gap=document.getElementById("enter_gap_penalty").value;
		gap=-Math.abs(parseInt(gap,10));
		init(seq1,seq2,matrix,type_seq,algo,gap);
}

else if (document.getElementById("multiple").checked===true){
	var max_len=seq1.length;
	if (seq2.length>max_len){
		max_len=seq2.length;
	}
	for (var i =0;i<max_len;i++) {
		var tmp=document.getElementById("enter_gap_penalty"+i).value;
		tmp=Math.abs(parseInt(tmp,10));
		li_gap.push(-tmp);
	// la liste des gap sous forme numérique est dans li_gap
	}
	init(seq1,seq2,matrix,type_seq,algo,li_gap);
}
	
	else {
		document.getElementById("formulaire").innerHtml="<b>"+"le formulaire est mal rempli"+"</b>";
	}
}*/


function init(seq1,seq2,matrix,type_seq,algo,gap){
	algorithm(seq1,seq2,matrix,type_seq,algo,gap);
	display();
}

function verif(){
	verif_check_algo();

}

function verif_check_algo(){
	var algo_checked=false
	var algo_choice=document.getElementsByName("algorithm");
	for (var i=0;i<algo_choice.length;i++){
		if (algo_choice[i].checked===true){
			algo=algo_choice[i].value;
			if (algo != ""){
				console.log(algo);
				algo_checked=true;
				choose_matrix();
			}
		}
	}
	if (algo_checked===false){
		alert("Choose an algorithm to obtain a result.");
/*		document.getElementById("algo").innerHtml="<b>"+"Choose an algorithm to obtain a result."+"</b>";
*/	}
}
/*
function verif_check () {
	var algo_checked=false
	var type_seq_check=false
	var algo_choice=document.getElementsByName("algorithm");
for (var i=0;i<algo_choice.length;i++){
	if (algo_choice[i].checked===true){
		algo=algo_choice[i].value;
	}
	}
	if (algo != ""){
		console.log(algo);
		algo_checked=true;
	}
	else{
	document.getElementById("formulaire").innerHtml="<b>"+"Choose an algorithm to obtain a result."+"</b>";
	}

	var seq_choice=document.getElementsByName("type_seq");
	for (var j=0;j<seq_choice.length;j++) {
		if (seq_choice [j].checked===true) {
			type_seq=seq_choice[j].value;
		 	type_seq_check=true;
	}
}
if (type_seq_check===true){
	console.log(type_seq);
}
else{
	document.getElementById("formulaire").innerHtml="<b>"+"Choose a type of sequence to obtain a result"+"</b>";
}
if ((type_seq_check===true)&&(algo_checked===true)){
	return (algo,algo_checked,type_seq,type_seq_check)

}
else{
return (algo_checked, type_seq_check)
}
}*/
/*
function verif(algo,type_seq,seq1,seq2,matrix,choose_gap,li_gap){

var checked=false;
var algo_checked=false;
var type_seq_check=false;
var seq_check=false;
var content_seq_check=false;
var matrix_check=false;
var gap_choice_check=false;
if (algo != undefined){
	algo_checked=true;

}
else{
	document.getElementById("formulaire").innerHtml="<b>"+"vous n'avez pas choisit votre algorithme ca risque de moins bien marcher"+"</b>";
}
if (type_seq!=undefined){
 type_seq_check=true;
}
else{
	document.getElementById("formulaire").innerHtml="<b>"+"vous n'avez pas coché de type de séquence"+"</b>";
}
if(((type_seq=="protein")&&(/[ARNDCQEGHILKMFPSTWYVBZX]/.test(seq1,seq2)))||((type_seq=="nucleotide")&&(/[ATGCU]/.test(seq1,seq2)))) {
seq_check=true;
}
else{
	document.getElementById("formulaire").innerHtml="<b>"+"Les séquences entré ne correspondent pas au type de séquence choisi"+"</b>";
}
if (matrix!=undefined){
	matrix_check=true;
} 
else{
	document.getElementById("formulaire").innerHtml="<b>"+"selectionnez une matrice "+"</b>";
}
if (choose_gap!=undefined) {
	gap_choice_check=true;
}
else{
		document.getElementById("formulaire").innerHtml="<b>"+"vous devez choisir votre type de pénalité de gap"+"</b>";
}
if (li_gap.length>1){
	var equal=false;
	for (var l= 0; l< li_gap.length-1; l++) {
		if (li_gap[l]==li_gap[l+1]){
			equal=true;
		}
	}
	if (equal===true) {
		document.getElementById("formulaire").innerHtml="<b>"+"vous auriez pu choisir une pénalité de gap unique ca n'aurait rien changer"+"</b>";
		}
	}


if (algo_checked===true||matrix_check===true||seq_check===true||type_seq_check===true||gap_choice_check===true){
checked=true;
}

return checked;
}*/
