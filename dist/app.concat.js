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
/** 
 * Function to put in the form the right matrices according to sequence type and the right gap penalities
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
	
	if (document.getElementById('multiple').checked!==true){
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


/** 
 * Function to put in the form the right matrices according to sequence type
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

/** Function to put in the form the right inputs for gap penalities according to user choice
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

/**
 * Function to obtain the user values for the treatment of the sequences alignment
 */
function get_value(){
	var algo;
	var type_seq;
	var li_gap=[];
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
		var gap=-Math.abs(parseInt(gap,10));
		algorithm(seq1,seq2,matrix,type_seq,algo,gap);
	}
	else if (document.getElementById("multiple").checked===true){
		var max_len=seq1.length;
		if (seq2.length>max_len){
			max_len=seq2.length;
		}
		for (var i =0;i<(max_len+1);i++) {
			var tmp=document.getElementById("enter_gap_penalty"+i).value;
			tmp=Math.abs(parseInt(tmp,10));
			li_gap.push(-tmp);
		// li_gap contains list of gaps in digital format
		}
	algorithm(seq1,seq2,matrix,type_seq,algo,li_gap);
	}
}

/** 
 * Function to verify if all values are correctly filled
*/
function verif () {
	if ((verif_check_algo()===true)&&(verif_check_type_seq()===true)&&(check_content_seq()===true)&&(verif_choice_gap()===true)){
		return true;
	}
	else{
		alert("complete the form before submit it");
		return false;
		
	}
}


/**
 * Function to verify if the choice of algorithm is correctly filled
 */
function verif_check_algo(){
	var algo_checked=false;
	var algo_choice=document.getElementsByName("algorithm");
	for (var i=0;i<algo_choice.length;i++){
		if (algo_choice[i].checked===true){
			var algo=algo_choice[i].value;
			if (algo !== ""){
				algo_checked=true;
				}
		}
	}
	if (algo_checked===false){
		alert("Choose an algorithm to obtain a result.");
	}
	return(algo_checked);
}

/** 
 * Function to verify if the choice of type sequence is correctly filled
 */
function verif_check_type_seq(){
	var type_seq_check=false;
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

/** 
 * Function to verify if the chosen sequences are correctly filled
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

/**
 *  Function to verify if the choice of gap penality is correctly filled
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
		var gap=-Math.abs(parseInt(gap,10));
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
			var tmp2=document.getElementById("enter_gap_penalty"+0).value;
			var tmp=document.getElementById("enter_gap_penalty"+i).value;
			tmp=parseInt(tmp,10);
			tmp2=parseInt(tmp2,10);
			if (tmp==tmp2) {
				not_equal=true;	
			}
			tmp=Math.abs(parseInt(tmp,10));
			if (isNaN(Math.abs(parseInt(tmp,10)))===false){
				numbers=true;
			}
			li_gap.push(-tmp);
		}
		if (not_equal===false){
			alert("if you choose similar gap penalty, choose single gap penalty");
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

/** 
 * [Function to initiate the process and get the final result]
 */
function init_final(){
	if (verif()===true){
	get_value();
	display();
	}
}
/**
 * [Function to initiate the step by step and go to the next step]
 */
function init_next(){
	if (verif()===true){
	get_value();
	next();
	}
}
/**
 * [Function to initiate the step by step and go to the previous step]
 */
function init_prev(){
	if (verif()===true){
	get_value();
	prev();
	}
}

/**
 * [Function to initiate the step by step and go to the next state]
 */
function init_fast(){
	if (verif()===true){
	get_value();
	fastnext();
	}
};/*
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

/** First file executed after data treatment, creation of matrices for application of the chosen algorithm
@constructor
@param {string} sequence1 - The first sequence entered by the user, in the first line of the score matrix
@param {string} sequence2 - The second sequence entered by the user, in the first column of the score matrix
@param {array} matrix - Substitution matrix chosen by the user
@param {string} type_seq - If the sequences are proteins or nucleotides
@algo {string} - If the algorithm used is S&W or N&W (for the moment)
@gap {number} - Gap penality */
function algorithm(sequence1,sequence2,matrix,type_seq,algo,gap)
{
	//initialization of the values
	this.seq1 = sequence1;
	this.seq2 = sequence2;
	this.len1 = this.seq1.length;
	this.len2 = this.seq2.length;
	this.lenmax= Math.max(this.len1,this.len2);
	this.lenmin=Math.min(this.len1,this.len2);
	this.matrix = matrix;
	this.type_seq=type_seq;
	this.gap=gap;
	this.place = 0;
	this.s1 = [];
	this.s2 = [];
	this.letters=[];
	this.matseq = [];
	this.matscore = [];
	this.matpath = [];
	this.matpatharrows = [];
	this.matpatharrowsalign = [];
	this.matsumdia=[];
	this.matsumhor=[];
	this.matsumvert=[];
	this.matsumtot=[];
	this.i;
	this.j;
	this.size1=len1+1;
	this.size2=len2+2;
	this.algo = algo;
	this.listalign=[];
	this.matseq[0] = "-";

	//division of the sequences into separate letters
	s1 = this.seq1.split("");
	for (var elems1 = 0; elems1 <= this.len1; elems1++) {
		this.matseq.push(s1[elems1]);
	}
	this.matseq[this.len1 + 1] = "-";
	s2 = this.seq2.split("");
	for (var elems2 = 0; elems2 < this.len2; elems2++) {
		this.matseq.push(s2[elems2]);
	}

	//creation of the gap tables
	if (isNaN(this.gap) === false ){
		var gapsimple=this.gap;
		var gap =[];
		for(var i=0;i<size1;i++){
			gap.push(gapsimple);
		}
		this.gap=gap;
	}
	this.gap2=gap;
	if (len1!=len2){
		if (len2<len1){
			gap2=[];
			for(var j=0;j<(this.lenmin+1);j++){
				gap2.push(gap[j]);
			}
		this.gap2=gap2;
		}
	}

	//selection of the good gap for the each comparison and the letters depending the selected matrix, and calculation of the score
	for (j = this.len1 + 1; j <= ((this.len1 + this.len2) + 1); j++) {	
		for (i = 0; i <= this.len1; i++) {	
			if ((this.place<(this.len1+1))){
				this.gapplace=this.gap[place];
			}
			else{
				this.gapplace=this.gap[this.place%(this.len1+1)];
				this.gapplace2=this.gap2[Math.floor(this.place/(this.len1+1))];
			}
			if (this.type_seq=="protein"){
				this.letters=["A","R","N","D","C","Q","E","G","H","I","L","K","M","F","P","S","T","W","Y","V","B","Z","X", "*"];
			}
			else{
				if (this.matrix=="EDNAFULL"){
					this.letters=["A","T","G","C","S","W","R","Y","K","M","B","V","H","D","N","U"];	
				}
				else{
					this.letters=["A","B","C","D","G","H","K","M","N","R","S","T","U","V","W","X","Y"];
				}
			}
			if (this.algo=="smith_waterman"){
				smithwaterman.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor,this.matsumtot, this.matseq[j], this.matseq[i], this.lenmax, this.place,this.gapplace,this.gapplace2,this.letters);
			}
			else{
				needlemanwunsch.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor,this.matsumtot, this.matseq[j], this.matseq[i], this.lenmax, this.place,this.gapplace,this.gapplace2,this.letters);
			}
			this.place++;
		}
	}

	//substituton of the value of the path by the corresponding arrow for each case (in alignment or not)
	for (path in matpath){
		if (matpath[path]===0){
			matpatharrows[path]="";
			matpatharrowsalign[path]="";
		}
		else if (matpath[path]===1){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/hori.svg\" width=\"25 px\" height=\"25\"> error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/horir.svg\" width=\"25 px\" height=\"25\"> error </object>";
		}
		else if (matpath[path]===2){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/diag.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/diagr.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
		}
		else if (matpath[path]===3){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/vert.svg\" width=\"25 px\" height=×\"25 px\">  error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/vertr.svg\" width=\"25 px\" height=×\"25 px\">  error </object>";
		}
		else if (matpath[path]===4){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/bihv.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/bihvr.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
		}
		else if (matpath[path]===5){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/bihd.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/bihdr.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
		}
		else if (matpath[path]===6){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/bidv.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/bidvr.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
		}
		else if (matpath[path]===7){
			matpatharrows[path]="<object type=\"image/svg+xml\" data=\"..\/img\/tri.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
			matpatharrowsalign[path]="<object type=\"image/svg+xml\" data=\"..\/img\/trir.svg\" width=\"25 px\" height=\"25 px\">  error </object>";
		}
	}

	//calculation of the alignment(s)
	if (this.algo == "smith_waterman") {
		var result = smithwaterman.prototype.alignment(this.matpath, this.matscore,this.matsumtot, this.s1, this.s2, this.len1, this.lenmax);
	}
	else{
		var result = needlemanwunsch.prototype.alignment(this.matpath, this.matscore,this.matsumtot, this.s1, this.s2, this.len1, this.lenmax);
	}
	
	//display of the alignement(s)
	if (result.length>2){
		var cpt=1;	
		document.getElementById('alignment').innerHTML="";
		for(var alignseq=0;alignseq<=(result.length-1);alignseq+=2){
			document.getElementById('alignment').innerHTML +="<div id=\"allalign\"><h3>Alignment "+cpt+"</h3><br/>"+result[alignseq]+"<br/>"+result[alignseq+1]+"<br/></div>";
			cpt++;
		}
	}
	else{
		document.getElementById('alignment').innerHTML ="<h3>Alignment</h3><br>"+result[0]+"<br>"+result[1];
	}
}
;/*
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

/**
 * Function to initiate the alignment according to Needleman and Wunsch algorithm
 */
function needlemanwunsch()
{
	for (key in algorithm.prototype) {
		needlemanwunsch.prototype[key] = algorithm.prototype[key];
	}
}

/**
 * Function to calculate the score according to Needleman and Wunsch algorithm
 * @param  {array} matrix     Substitution matrix chosen by the user
 * @param  {array} matscore   Score matrix filled by this function
 * @param  {array} matpath    Path matrix filled by the function
 * @param  {array} matsumdia  Sum matrix obtained by the diagonal case filled by the function]
 * @param  {array} matsumvert Sum matrix obtained by the vertical case filled by the function]
 * @param  {array} matsumhor  Sum matrix obtained by the horizontal case filled by the function]
 * @param  {array} matsumtot  Sum matrix obtained by the maximal value between the third previoux matrices]
 * @param  {string} l1        The letter obtained by the first sequence used for comparison]
 * @param  {string} l2        The letter obtained by the second sequence used for comparison]
 * @param  {integer} lengthseq  Length of the sequence
 * @param  {integer} place      Place of the letter
 * @param  {integer} gap        Gap penality
 * @param  {integer} gap2       Gap penality
 * @param  {array} letters    Letters used in subsitution matrices
 */
needlemanwunsch.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor,matsumtot,l1, l2, lengthseq, place,gap,gap2,letters) {
	var currentscore;
	var scorevert,scorehor,scoredia;
	var sumvert,sumdia,sumhor;
	var pos1,pos2;
	var placevert=place-(lengthseq+1);
	var placehor=place-1;
	var placedia=place-(lengthseq+2);
	if (place===0){
		matscore[place]=gap;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0; 
		matsumtot[place]=gap;		
	}
	else if(place<=lengthseq && place !== 0){
		matscore[place]=gap+matsumtot[place-1];
		matpath[place] = 1;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0; 
		matsumtot[place]=gap+matsumtot[place-1];
	}
	else if (place%(lengthseq+1)===0 ){
		matscore[place]=gap2+matsumtot[place-(lengthseq + 1)];
		matpath[place] = 3;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0;
		matsumtot[place]=gap2+matsumtot[place-(lengthseq + 1)];
	}
	else{
		scorevert=matsumtot[placevert];
		scorehor=matsumtot[placehor];
		scoredia=matsumtot[placedia];
		for (var l in letters){
			if (l1 === letters[l]){
				pos1=parseInt(l,10);
			}
			if (l2 === letters[l]){
				pos2=parseInt(l,10);
			}
		}
		var lengthmat=letters.length;
		var posmatrix=(lengthmat*pos1)+pos2;
		currentscore=parseInt(matrix[posmatrix],10);
		matscore[place]=currentscore;
		sumdia=scoredia+currentscore;
		sumvert=scorevert+gap;
		sumhor=scorehor+gap2;
		matsumdia[place]=sumdia;
		matsumvert[place]=sumvert;
		matsumhor[place]=sumhor;
		var maxiscore=Math.max(sumvert,sumdia,sumhor);
		matsumtot[place]=maxiscore;
		if (maxiscore==(sumhor) && maxiscore!=(sumvert) && maxiscore!=(sumdia)){
 			matpath[place]=1; 
 		}
 		else if (maxiscore!=(sumhor) && maxiscore!=(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=2;
 		}

 		else if (maxiscore!=(sumhor) && maxiscore==(sumvert) && maxiscore!=(sumdia)){
 			matpath[place]=3;
 		}
 		else if (maxiscore==(sumhor) && maxiscore==(sumvert) && maxiscore!=(sumdia)){
 			matpath[place]=4;
 		}
 		else if (maxiscore==(sumhor) && maxiscore!=(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=5;
 		}
 		else if (maxiscore!=(sumhor) && maxiscore==(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=6;
 		}
 		else if (maxiscore==(sumhor) && maxiscore==(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=7;
 		}
	}
}

/**
 *  Function to calculate the alignment according to Needleman and Wunsch algorithm
 * @param  {array} matpath   Path matrix filled by the function
 * @param  {type} matscore   Score matrix filled by this function
 * @param  {array} matsumtot Sum matrix obtained by the maximal value between the third previous matrix
 * @param  {array} s1        The first sequence
 * @param  {array} s2        The second sequence
 * @param  {integer} len1      Length of the first sequence
 * @param  {integer} lengthseq Length of the sequence
 */
needlemanwunsch.prototype.alignment = function (matpath, matscore, matsumtot, s1, s2, len1, lengthseq) {
	var dep=(matsumtot.length)-1;
	var align1=[];
	var align2=[];
	var align1string="";
	var align2string="";
 	var choice1,choice2,choice3;
	while (true) {
		var posseq1=(dep%(len1+1)-1);
 		var posseq2=Math.floor(dep/(len1+1)-1);
 		listalign.push(dep);
 			if (matsumtot[dep] === 0) {
 				listalign.pop();
 				break;
 			}
 			if (matpath[dep] === 1) {
 				dep = dep - 1;
 				align1.unshift(String(s1[posseq1]));
 				align2.unshift("-");
 			}
 			else if(matpath[dep] ===2){
 				dep = dep - (lengthseq + 2);
 				align1.unshift(String(s1[posseq1]));
 				align2.unshift(String(s2[posseq2]));
 			}
 			else if (matpath[dep] === 3) {
  				dep = dep - (lengthseq + 1);
 				align1.unshift("-");
 				align2.unshift(String(s2[posseq2]));
 			}
 			else if (matpath[dep] === 4){
 				choice1=matsumtot[dep-1];
 				choice2=matsumtot[dep - (lengthseq + 1)]
 				if (choice1>choice2){
 					dep = dep - 1;
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift("-");
 				}
 				else {
   					dep = dep - (lengthseq + 1);
 					align1.unshift("-");
 					align2.unshift(String(s2[posseq2]));
				}
 			}
 			else if (matpath[dep] === 5){
 				choice1=matsumtot[dep- 1];
 				choice2=matsumtot[dep - (lengthseq + 2)];
 				if (choice1>choice2){
 					dep = dep - 1;
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift("-"); 					
 				}
 				else{
 					dep = dep - (lengthseq + 2);
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift(String(s2[posseq2])); 					
 				}
 			}
 			else if (matpath[dep] === 6){
 				choice1=matsumtot[dep - (lengthseq + 1)];
 				choice2=matsumtot[dep - (lengthseq + 2)];
 				if (choice1>choice2){
 					dep = dep - (lengthseq + 1);
 					align1.unshift("-")
 					align2.unshift(String(s2[posseq2]));
				}
				else{
 					dep = dep - (lengthseq + 2);
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift(String(s2[posseq2]));
				}
 			}
 			else if (matpath[dep] === 7){
 				choice1=matsumtot[dep- 1];
 				choice2=matsumtot[dep - (lengthseq + 2)];
 				choice3=matsumtot[dep - (lengthseq + 1)];
 				var maxchoice=Math.max(choice1,choice2,choice3);
 				if (maxchoice === choice2){
  					dep = dep - (lengthseq + 2);
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift(String(s2[posseq2]));
 				}
 				else if (maxchoice === choice3){
  					dep = dep - (lengthseq + 1);
 					align1.unshift("-")
 					align2.unshift(String(s2[posseq2]));
 				}
 				else{
 					dep = dep - 1;
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift("-");
 				}
 			}
 		}
 		for(var el1 in align1){
			align1string=align1string.concat(align1[el1]);
		}
		for(var el2 in align2){
			align2string=align2string.concat(align2[el2]);
		}
	var result=[align1string,align2string];
	return result;
}

;/*
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

/** Function to initiate the alignment according to Smith and Waterman algorithm
@constructor
 */
 function smithwaterman()
 {
 	for (key in algorithm.prototype) { 
 		smithwaterman.prototype[key] = algorithm.prototype[key];
 	}
 }
/**
  * Function to calculate the score according to Smith and Waterman algorithm
 * @param  {array} matrix     Substitution matrix chosen by the user
 * @param  {array} matscore   Score matrix filled by this function
 * @param  {array} matpath    Path matrix filled by the function
 * @param  {array} matsumdia  Sum matrix obtained by the diagonal case filled by the function
 * @param  {array} matsumvert Sum matrix obtained by the vertical case filled by the function
 * @param  {array} matsumhor  Sum matrix obtained by the horizontal case filled by the function
 * @param  {array} matsumtot  Sum matrix obtained by the maximal value between the third previoux matrices
 * @param  {integer} l1         The letter obtained by the first sequence used for comparison
 * @param  {integer} l2         The letter obtained by the second sequence used for comparison
 * @param  {integer} lengthseq   max Length of the 2 sequence
 * @param  {integer} place      Place of the letter 
 * @param  {integer} gap        Gap penality 
 * @param  {integer} gap2       Gap penality 
 * @param  {char} letters      Letters used in subsitution matrices
 */
 smithwaterman.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor, matsumtot,l1, l2, lengthseq, place,gap,gap2,letters) {
 	var currentscore;
 	var scorevert, scorehor, scoredia;
 	var sumvert, sumhor, sumdia;
 	var pos1,pos2;
 	var placevert = place - (lengthseq + 1);
 	var placehor = place - 1;
 	var placedia = place - (lengthseq + 2);
 	if (place===0){
		matscore[place]=0;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0; 
		matsumtot[place]=0;		
	}
	else if(place<=lengthseq && place !== 0){
		matscore[place]=0;
		matpath[place] = 1;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0; 
		matsumtot[place]=0;
	}
	else if (place%(lengthseq+1)===0 ){
		matscore[place]=0;
		matpath[place] = 3;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0;
		matsumtot[place]=0;
	}
 	else{
 		scorevert=matsumtot[placevert];
 		scorehor=matsumtot[placehor];
 		scoredia=matsumtot[placedia];
 		for (var l in letters){
 			if (l1 === letters[l]){
 				pos1=parseInt(l,10);
 			}
 			if (l2 === letters[l]){
 				pos2=parseInt(l,10);
 			}
 		}
 		var lengthmat=letters.length;
 		var posmatrix=(lengthmat*pos1)+pos2;
 		currentscore=parseInt(matrix[posmatrix],10);
 		matscore[place]=currentscore;
 		sumdia=scoredia+currentscore;
 		sumvert=scorevert+gap;
 		sumhor=scorehor+gap2;
 		matsumdia[place]=sumdia;
 		matsumvert[place]=sumvert;
 		matsumhor[place]=sumhor;
 		var maxiscore=Math.max(sumvert,sumdia,sumhor);
 		matsumtot[place]=maxiscore;
 		if (maxiscore==(sumhor) && maxiscore!=(sumvert) && maxiscore!=(sumdia)){
 			matpath[place]=1; 
 		}
 		else if (maxiscore!=(sumhor) && maxiscore!=(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=2;
 		}

 		else if (maxiscore!=(sumhor) && maxiscore==(sumvert) && maxiscore!=(sumdia)){
 			matpath[place]=3;
 		}
 		else if (maxiscore==(sumhor) && maxiscore==(sumvert) && maxiscore!=(sumdia)){
 			matpath[place]=4;
 		}
 		else if (maxiscore==(sumhor) && maxiscore!=(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=5;
 		}
 		else if (maxiscore!=(sumhor) && maxiscore==(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=6;
 		}
 		else if (maxiscore==(sumhor) && maxiscore==(sumvert) && maxiscore==(sumdia)){
 			matpath[place]=7;
 		}
 		if (maxiscore<0){
 			matsumtot[place]=0;
 		}
 	}
 }

/**
 * Function to calculate the alignment according to Needleman and Wunsch algorithm
 * @param  {array} matpath   path matrix filled  by the function
 * @param  {array} matscore   Score matrix filled by this function
 * @param  {array} matsumtot sum matrix filled by the function
 * @param  {string} s1        The first sequence
 * @param  {string} s2        The second sequence
 * @param  {integer} len1      Length of the first sequence
 * @param  {integer} lengthseq max Length of the 2 sequence
 */
 smithwaterman.prototype.alignment = function (matpath, matscore, matsumtot, s1, s2, len1, lengthseq) {
 	var val, elem, dep, valmaxpos;
 	var valmax = 0;
 	var l = [];
 	var choice1,choice2,choice3;
 	var result = [];
 	for (val in matsumtot) {
 		valmaxpos = matsumtot[val];
 		valmax = Math.max(valmax, valmaxpos);
 	}

 	for (elem in matsumtot) {
 		if (matsumtot[elem] === valmax) {
 			l.push(elem);
 		}
 	}

 	for (dep in l) {
 		var align1string="";
 		var align2string="";
 		deppos = l[dep];
 		var align1 = [];
 		var align2 = [];
 		while (true) {
 			var posseq1=(deppos%(len1+1)-1);
 			var posseq2=Math.floor(deppos/(len1+1)-1);
 			listalign.push(deppos);
 			if (matsumtot[deppos] === 0) {
 				listalign.pop();
 				break;
 			}
 			if (matpath[deppos] === 1) {
 				deppos = deppos - 1;
 				align1.unshift(String(s1[posseq1]));
 				align2.unshift("-");
 			}
 			else if(matpath[deppos] ===2){
 				deppos = deppos - (lengthseq + 2);
 				align1.unshift(String(s1[posseq1]));
 				align2.unshift(String(s2[posseq2]));
 			}
 			else if (matpath[deppos] === 3) {
  				deppos = deppos - (lengthseq + 1);
 				align1.unshift("-");
 				align2.unshift(String(s2[posseq2]));
 			}
 			else if (matpath[deppos] === 4){
 				choice1=matsumtot[deppos-1];
 				choice2=matsumtot[deppos - (lengthseq + 1)]
 				if (choice1>choice2){
 					deppos = deppos - 1;
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift("-");
 				}
 				else {
   					deppos = deppos - (lengthseq + 1);
 					align1.unshift("-");
 					align2.unshift(String(s2[posseq2]));
				}
 			}
 			else if (matpath[deppos] === 5){
 				choice1=matsumtot[deppos- 1];
 				choice2=matsumtot[deppos - (lengthseq + 2)];
 				if (choice1>choice2){
 					deppos = deppos - 1;
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift("-"); 					
 				}
 				else{
 					deppos = deppos - (lengthseq + 2);
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift(String(s2[posseq2])); 					
 				}
 			}
 			else if (matpath[deppos] === 6){
 				choice1=matsumtot[deppos - (lengthseq + 1)];
 				choice2=matsumtot[deppos - (lengthseq + 2)];
 				if (choice1>choice2){
 					deppos = deppos - (lengthseq + 1);
 					align1.unshift("-")
 					align2.unshift(String(s2[posseq2]));
				}
				else{
 					deppos = deppos - (lengthseq + 2);
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift(String(s2[posseq2]));
				}
 			}
 			else if (matpath[deppos] === 7){
 				choice1=matsumtot[deppos- 1];
 				choice2=matsumtot[deppos - (lengthseq + 2)];
 				choice3=matsumtot[deppos - (lengthseq + 1)];
 				var maxchoice=Math.max(choice1,choice2,choice3);
 				if (maxchoice === choice2){
  					deppos = deppos - (lengthseq + 2);
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift(String(s2[posseq2]));
 				}
 				else if (maxchoice === choice3){
  					deppos = deppos - (lengthseq + 1);
 					align1.unshift("-")
 					align2.unshift(String(s2[posseq2]));
 				}
 				else{
 					deppos = deppos - 1;
 					align1.unshift(String(s1[posseq1]));
 					align2.unshift("-");
 				}
 			}
 		}
 		for(var el1 in align1){
			align1string=align1string.concat(align1[el1]);
		}
		for(var el2 in align2){
			align2string=align2string.concat(align2[el2]);
		}
 		result.push(align1string);
 		result.push(align2string);
 	}
 	return result;
}

;/*
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

"use strict"

var nbValuesToDisplay = 0;
var nbValuesAlignToDisplay = 0;
var nbAlign;
var title;

/**
 *[First function executed after data treatment in case of step by step]
 *
 */

function next(){
	nbValuesToDisplay++;
	//Limit check value
	if(nbValuesToDisplay>=matscore.length){
		nbValuesToDisplay=matscore.length;
		nbValuesAlignToDisplay++;
		if (nbValuesAlignToDisplay>=listalign.length){
			nbValuesAlignToDisplay=listalign.length;
		}
	}
	launch_nstep(nbValuesToDisplay);
	launch_nstep_align(nbValuesAlignToDisplay);
}
/**
 * [this function allow to return to the previous step of the step by step]
 *  */
function prev(){
	nbValuesAlignToDisplay--;
	if(nbValuesAlignToDisplay<0){
		nbValuesAlignToDisplay=0
		nbValuesToDisplay--;
	}
	launch_nstep(nbValuesToDisplay);
	launch_nstep_align(nbValuesAlignToDisplay);
}
/**
 * [this function allow to return to the next state]
 * 
 */
function fastnext(){
	if(nbValuesToDisplay<=matscore.length){
		nbValuesToDisplay=matscore.length
	}
	if (nbValuesAlignToDisplay<=listalign.length && nbValuesAlignToDisplay!==0){
		nbValuesAlignToDisplay=listalign.length;
	}
	launch_nstep(nbValuesToDisplay);
	launch_nstep_align(nbValuesAlignToDisplay);
	nbValuesAlignToDisplay++	
}
/**
 * [this function allow to return to the previous state]
  */
function fastpreview(){
	if (nbValuesAlignToDisplay!==0){
		nbValuesAlignToDisplay=0
		nbValuesToDisplay=matscore.length;
	}
	else if (nbValuesToDisplay<=matscore.length){
		nbValuesAlignToDisplay=0
		nbValuesToDisplay=0
	}
	launch_nstep(nbValuesToDisplay);
	launch_nstep_align(nbValuesAlignToDisplay);

}
/** Step by step function with next and preview possibilities
@param {[number]} nbValuesToDisplay - counter for the scoring matrix 
*/


function launch_nstep(nbValuesToDisplay){
	var matrixs=document.getElementById("matrixtime");

	//The table is empty
	while (matrixs.firstChild) {
    	matrixs.removeChild(matrixs.firstChild);
	}
	
	// Filling the array with the desired number of cells
	for (var i =0;i<=(size2-1);i++){
		matrixs.insertRow(i);
		for(var j=0;j<=(size1);j++){
			matrixs.rows[i].insertCell(j);
		}
	}

	for(var i=0;i<matrixs.rows.length;i++){
		var currentRow = matrixs.rows[i];
		for(var j=0;j<currentRow.cells.length;j++){
			var currentCell=currentRow.cells[j];

			//Filling the array with the first sequence (first column)
			if (i>=2 && j===0){
				currentCell.innerHTML=s2[i-2];
			}

			//Filling the array with the second sequence (first ligne)
			if (i===0 && j>=2){
				currentCell.innerHTML=s1[j-2];
			}
		}
	}

	var nbDisplayedValues= 0; 
	for(var i=1;i<matrixs.rows.length;i++){
		var currentRow = matrixs.rows[i];
		for(var j=1;j<currentRow.cells.length;j++){
			var currentCell=currentRow.cells[j];
			if ((nbDisplayedValues>=1) && (nbDisplayedValues<nbValuesToDisplay)){
				var i2,j2;
				if (j==1){
					i2=i-1;
					j2=(currentRow.cells.length)-1
				}
				else{
					i2=i;
					j2=j-1;
				}
				var previousCell=matrixs.rows[i2].cells[j2]
				var cellprevious=nbDisplayedValues-1;
				previousCell.innerHTML=matpatharrows[cellprevious];
				previousCell.innerHTML+=matsumtot[cellprevious];
			} 
			//The table is filled with the assumption that it is filled from left to right
			currentCell.innerHTML=matscore[nbDisplayedValues];
			nbDisplayedValues++;

			if (nbDisplayedValues>nbValuesToDisplay) {
				currentCell.style.visibility="hidden";
			}

			if (nbDisplayedValues==matscore.length){
				currentCell.innerHTML=matpatharrows[(matscore.length)-1]+" "+matsumtot[(matscore.length)-1];
			}
		}
	}
    title=document.getElementById("matrixtime").createCaption();
	title.innerHTML="<b>Sum matrix</b>";	
	if(nbValuesToDisplay>size1) {
		if ((nbValuesToDisplay-1)%size1!==0){
			var cellvert=size1;
			var celldia=size1+1;
			var cellcurrent=nbValuesToDisplay-1;
			var posj=(nbValuesToDisplay-1)%(len1+1);
			var posi=Math.floor((nbValuesToDisplay-1)/(len1+1));
			explain.innerHTML="Value of M("+posi+","+posj+") = maximal value between : <br>";
			explain.innerHTML+="M("+(posi-1)+","+(posj-1)+") + S("+posi+","+posj+") = "+matsumtot[cellcurrent-celldia]+" + "+matscore[cellcurrent]+" = " +"<b>"+matsumdia[cellcurrent]+"</b>"+"<br>";
			explain.innerHTML+="M("+(posi)+","+(posj-1)+") + gap = "+matsumtot[cellcurrent-1]+"+"+gap2[posi]+" = "+"<b>"+matsumhor[cellcurrent]+"</b>"+"<br>";
			explain.innerHTML+="M("+(posi-1)+","+(posj)+") + gap = "+matsumtot[cellcurrent-cellvert]+"+"+gap[posj]+"= "+"<b>"+matsumvert[cellcurrent]+"</b>"+"<br>";
			explain.innerHTML+="Maximum value of the three : <b>"+matsumtot[cellcurrent]+"</b><br>";
			explain.innerHTML+="Corresponding path : "+matpatharrows[cellcurrent]+"<br>";
		}
		else{
			explain.innerHTML="";	
		}
	}
}
/**
 * display the alignment step by step
 * @param  {integer} nbValuesToDisplayAlign number of value in the alignment
 * 
 */
function launch_nstep_align(nbValuesToDisplayAlign){
	if (nbValuesAlignToDisplay>=1){
		title.innerHTML="<b>Alignment matrix</b>";
		explain.innerHTML=" ";
	}

	var matrixs=document.getElementById("matrixtime")
	var nbDisplayedValuesAlign= 0;
	for(var i=1;i<matrixs.rows.length;i++){
		var currentRow = matrixs.rows[i];
		for(var j=1;j<currentRow.cells.length;j++){
			var currentCell=currentRow.cells[j];
		}
	}
	for(var posalign=1;posalign<=nbValuesToDisplayAlign;posalign++){
		var alignpos=listalign[posalign-1];
		console.log(alignpos);
		if (alignpos >= listalign[posalign-2]){
			launch_nstep(matscore.length)
		}
		var posj=(alignpos%(len1+1)-1)+2;
		var posi=Math.floor((alignpos/(len1+1)-1)+2);
		var alignCell=matrixs.rows[posi].cells[posj];
		alignCell.innerHTML=matpatharrowsalign[alignpos];
	}
};/*
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
/**
 * Last file executed after data treatment : creation of the displayed matrices, without step by step
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
