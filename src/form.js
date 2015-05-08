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
/** Function to put in the form the right matrices according to sequence type
@constructor
 */
"use strict";

 function event_onload(){
  	if(document.getElementById('nucleotide').checked!==true){
	var listmatrix=Object.keys(matrixlist);
		for (var l in listmatrix){
			document.getElementById('choice_matrix').options[l] = new Option(listmatrix[l],listmatrix[l]);
		}
 	}
 	else{
 		while (document.getElementById('choice_matrix').firstChild){
			document.getElementById('choice_matrix').removeChild(document.getElementById('choice_matrix').firstChild);
		}
		var listEDNA=Object.keys(matrixEDNA);
		for (var l in listEDNA){
			document.getElementById('choice_matrix').options[l] = new Option(listEDNA[l],listEDNA[l]);
 		}
	}
var seq1=document.getElementById("sequence1");
var seq2=document.getElementById("sequence2");
var enter_gap_penalty =document.getElementById("gap");
	while(enter_gap_penalty.firstChild){
		enter_gap_penalty.removeChild(enter_gap_penalty.firstChild);
	}
		console.log(seq1.value)
		console.log(seq2.value)
		console.log("iiiiiii")
		if (document.getElementById('multiple').checked!==true){
			console.log("ahah")
			var enter_gap=document.createElement('input');
			enter_gap.setAttribute("type","number");
			enter_gap.setAttribute("min", "0");
			enter_gap.setAttribute("id", "enter_gap_penalty");
			enter_gap.setAttribute("value", "0");
			enter_gap.setAttribute("size", 2);
			enter_gap_penalty.appendChild(enter_gap);
		}
		else{
			var lengthmax=Math.max(seq1.value.length,seq2.value.length);		
			for (var m =0; m <= lengthmax; m++) {
				console.max(lengthmax);
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


/** Function to put in the form the right matrices according to sequence type
@constructor
 */

function choose_matrix(){
	
	
	if (document.getElementById('protein').checked===true){

		while (document.getElementById('choice_matrix').firstChild){
			document.getElementById('choice_matrix').removeChild(document.getElementById('choice_matrix').firstChild);
		}

		var listmatrix=Object.keys(matrixlist);
		for (var l in listmatrix){
			document.getElementById('choice_matrix').options[l] = new Option(listmatrix[l],listmatrix[l]);
		}
	}
	else if (document.getElementById('nucleotide').checked===true){
		while (document.getElementById('choice_matrix').firstChild){
			document.getElementById('choice_matrix').removeChild(document.getElementById('choice_matrix').firstChild);
		}
		var listEDNA=Object.keys(matrixEDNA);
		for (var l in listEDNA){
			document.getElementById('choice_matrix').options[l] = new Option(listEDNA[l],listEDNA[l]);
		}
	}
		
		
}

/** Function to put in the form the right input for gap penalities according to user choice
@constructor
 */

function choose_gap_penalty(){
	var seq1=document.getElementById("sequence1").value;
	var seq2=document.getElementById("sequence2").value;
	var enter_gap_penalty =document.getElementById("gap");
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
			for (var m =0; m <= lengthmax; m++) {
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

/** Function to obtain the user values for the treatment of the sequences alignment 
@constructor
 */
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
var seq1=document.getElementById("sequence1").value.toUpperCase();
var seq2=document.getElementById("sequence2").value.toUpperCase();
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
	algorithm(seq1,seq2,matrix,type_seq,algo,gap);
}
else if (document.getElementById("multiple").checked===true){
	var max_len=seq1.length
	if (seq2.length>max_len){
		max_len=seq2.length;
	}
	for (var i =0;i<(max_len+1);i++) {
		var tmp=document.getElementById("enter_gap_penalty"+i).value;
		tmp=Math.abs(parseInt(tmp));
		li_gap.push(-tmp);
	// la liste des gap sous forme numérique est dans li_gap
}
	algorithm(seq1,seq2,matrix,type_seq,algo,li_gap);
}

}

/** Function to verify if all values are correctly filled
@constructor
 */
function verif () {
	if ((verif_check_algo()===true)&&(verif_check_type_seq()===true)&&(check_content_seq()===true)&&(verif_choice_gap()===true)){
		return true;
	}
	else{
		return false;
		alert("complete the form before submit it");
	}
	}


/** Function to verify if the choice of algorithm is correctly filled
@constructor
 */
function verif_check_algo(){
	var algo_checked=false;
	var algo_choice=document.getElementsByName("algorithm");
	for (var i=0;i<algo_choice.length;i++){
		if (algo_choice[i].checked===true){
			var algo=algo_choice[i].value;
			if (algo != ""){
				algo_checked=true;
				}
		}
	}
	if (algo_checked===false){
		alert("Choose an algorithm to obtain a result.");
/*		document.getElementById("algo").innerHtml="<b>"+"Choose an algorithm to obtain a result."+"</b>";
*/	}
return(algo_checked)
}

/** Function to verify if the choice of type sequence is correctly filled
@constructor
 */
function verif_check_type_seq(){
	var type_seq_check=false
	var seq_choice=document.getElementsByName("type_seq");
	var type_seq;
	for (var j=0;j<seq_choice.length;j++) {
		if (seq_choice [j].checked===true) {
			type_seq=seq_choice[j].value;
		 	type_seq_check=true;
		}
	}
	if (type_seq_check===false){
	alert("Choose a sequence type.") ;
}
return(type_seq_check);
}

/** Function to verify if the chosen sequences are correctly filled
@constructor
 */
function check_content_seq () {

	var content_seq_check=false;
	var seq2=document.getElementById("sequence1").value.toUpperCase();
	var seq1=document.getElementById("sequence2").value.toUpperCase();
	var type_seq;
	var seq_choice=document.getElementsByName("type_seq");
	for (var j=0;j<seq_choice.length;j++) {
		if (seq_choice [j].checked===true) {
			type_seq=seq_choice[j].value;
		}
}
if (((2<=seq1.length)&&(seq1.length<=15))&&((2<=seq2.length<=15)&&(seq2.length<=15))){ 
	if(((type_seq=="protein")&&(/^[ARNDCQEGHILKMFPSTWYVBZX]+$/.test(seq1,seq2)))||((type_seq=="nucleotide")&&(/^[ATGCSWRYKMBVHDNU]+$/.test(seq1,seq2)))) {

	content_seq_check=true;
}
else{
	alert("the content of the sequence did not match the sequence type you have checked");
}
}
else{
	
alert("the sequence is too small or too long for the application");
}
return(content_seq_check);
}

/** Function to verify if the choice of gap penality is correctly filled
@constructor
 */
function verif_choice_gap(){
	var check_gap=false;
	var choice_gap_check=false;
	var number=false;
	var numbers=false;
	var choice_nbgap=document.getElementsByName("choose_gap_penalty");
	var nb;
	var not_equal=false;
	for (var j=0;j<choice_nbgap.length;j++) {
		if (choice_nbgap[j].checked===true) {
			nb=choice_nbgap[j].value;
		 	choice_gap_check=true;
	}

	}
	if (nb=="single"){
		var gap=document.getElementById("enter_gap_penalty").value;
		var gap=-Math.abs(parseInt(gap));
		if(isNaN(gap)===false){
			number=true;
		}

	}

	if(nb=="multiple"){
		var seq1=document.getElementById("sequence1").value;
		var seq2=document.getElementById("sequence2").value;
		var li_gap=[];
		var max_len=seq1.length;
		if (seq2.length>max_len){
		max_len=seq2.length;
		}
		for (var i =0;i<max_len;i++) {
			var tmp2=document.getElementById("enter_gap_penalty"+0).value
			var tmp=document.getElementById("enter_gap_penalty"+i).value;
			tmp=parseInt(tmp);
			tmp2=parseInt(tmp2);
			if (tmp==tmp2) {
				not_equal=true;
				
			};

			tmp=Math.abs(parseInt(tmp,10));

			if (isNaN(Math.abs(parseInt(tmp,10)))===false){

				numbers=true;
			}
			li_gap.push(-tmp);

		}
		if (not_equal==false){
			alert("if you choose similar gap penalty, choose single gap penalty")
		}
	}
	if (choice_gap_check===false){
		alert("choose single gap penalty or multiple gap penalty");
	
	}
	if (((nb=="single")&&(number===false))||((nb=="multiple")&&(numbers===false))) {
		alert("you have to enter a number");
	}
	if (((number===true)||(numbers===true))&&(choice_gap_check===true)) {
		check_gap=true;
	}
	return check_gap;
}

/** Function to initiate the alignment
@constructor
@param {string} sequence1 - The first sequence entered by the user, in the first line of the score matrix
@param {string} sequence2 - The second sequence entered by the user, in the first column of the score matrix
@param matrix - Substitution matrix chose by the user
@param {string} type_seq - If the sequences are proteins or nucleotides
@algo {string} - If the algorithm used is S&W or N&W (for the moment)
@gap {number} - Gap penality *
 */
function init_final(){
	if (verif()===true){
	get_value();
	display();
}
}

function init_next(){
	if (verif()===true){
	get_value();
	next();
}
}

function init_prev(){
	if (verif()===true){
	get_value();
	prev();
}
}


function init_fast(){
	if (verif()===true){
	get_value();
	fastnext();
}
}