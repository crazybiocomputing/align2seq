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
		var listEDNA=Object.keys(matrixEDNA);
		for (var l in listEDNA){
			document.getElementById('choice_matrix').options[l] = new Option(listEDNA[l],listEDNA[l]);
		}
		// if (document.getElementById('choice_matrix').options.length!==0){
		// 	while (document.getElementById('choice_matrix').options[1]){
		// 		document.getElementById('choice_matrix').removeChild(document.getElementById('choice_matrix').options[0]);
		// 	}
		// 	document.getElementById('choice_matrix').options[0]=new Option('DNAfull','DNAfull');
		// }
		// else{
		// 	document.getElementById('choice_matrix').options[0]=new Option('DNAfull','DNAfull');
		// }
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

var matrix1=document.getElementById("choice_matrix").options[document.getElementById('choice_matrix').selectedIndex].value;
var matrix1=matrixEDNA[matrix1];

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

/** First file executed after data treatment, creation of matrices for application of the chosen algorithm
@constructor
@param {string} sequence1 - The first sequence entered by the user, in the first line of the score matrix
@param {string} sequence2 - The second sequence entered by the user, in the first column of the score matrix
@param matrix - Substitution matrix chose by the user
@param {string} type_seq - If the sequences are proteins or nucleotides
@algo {string} - If the algorithm used is S&W or N&W (for the moment)
@gap {number} - Gap penality */
function algorithm(sequence1,sequence2,matrix,type_seq,algo,gap)
{
	this.seq1 = sequence1;
	this.seq2 = sequence2;
	this.len1 = this.seq1.length;
	this.len2 = this.seq2.length;
	this.matrix = matrix;
	
	this.gap=gap;
	console.log("gap algo ="+this.gap)
	this.place = 0;
	this.l1;
	this.l2;
	this.mat1;
	this.mat2;
	this.s1 = [];
	this.s2 = [];
	this.matseq = [];
	this.matscore = [];
	this.matpath = [];
	this.matsumdia=[];
	this.matsumhor=[];
	this.matsumvert=[];
	this.i;
	this.j;
	this.size1=len1+1;
	this.size2=len2+2;
	this.add;
	this.maxi = Math.max(this.len1, this.len2);
	this.algo = algo;
	this.matseq[0] = "-";
	s1 = this.seq1.split("");
	for (var elems1 = 0; elems1 <= this.len1; elems1++) {
		this.matseq.push(s1[elems1]);
	}
	this.matseq[this.len1 + 1] = "-";
	s2 = this.seq2.split("");
	for (var elems2 = 0; elems2 < this.len2; elems2++) {
		this.matseq.push(s2[elems2]);

	}
	for (i = 0; i <= this.len1; i++) {
		for (j = this.len1 + 1; j <= ((this.len1 + this.len2) + 1); j++) {
			if (this.gap instanceof(Array)){
				if (this.place<this.maxi){
					this.gapplace=this.gap[place];
				}
				else if(this.place%this.maxi === 0){
					this.gapplace=this.gap[0];
				}
				else{
					this.gapplace=this.gap[this.place%this.maxi];
				}
		}
			else{
				this.gapplace=this.gap;
			}
			if (this.algo=="smith_waterman"){
				smithwaterman.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor, this.matseq[i], this.matseq[j], this.len2, this.place,this.gapplace);
			}
			else{
				needlemanwunsch.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor, this.matseq[i], this.matseq[j], this.len2, this.place,this.i,this.gapplace);
			}
			this.place++;
		}
	}
	if (this.algo == "smith_waterman") {
		var result = smithwaterman.prototype.alignment(matpath, matscore, s1, s2, len1, len2, len2);
	}
	else{
		var result = needlemanwunsch.prototype.alignment(matpath, matscore, s1, s2, len1, len2, len2);
	}
	document.getElementById('alignment').innerHTML +="<h3>Alignement</h3>"+result[0]+"<br>"+result[1];

/*	console.log (matscore);
	console.log (matpath);*/
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
function needlemanwunsch()
{
	for (key in algorithm.prototype) {
		needlemanwunsch.prototype[key] = algorithm.prototype[key];
	}
}
needlemanwunsch.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor,l1, l2, lengthseq, place,i,gap) {
	console.log("gap nw ="+gap);
	var letters=["A","R","N","D","C","Q","E","G","H","I","L","K","M","F","P","S","T","W","Y","V","B","Z","X", "*"];
	var currentscore;
	var scorevert,scorehor,scoredia;
	var sumvert,sumdia,sumhor;
	var pos1,pos2;
	var placevert=place-(lengthseq+1);
	var placehor=place-1;
	var placedia=place-(lengthseq+2);
	if(place<=lengthseq){
		matscore[place]=gap*place;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0;
	}
	else if (place%(lengthseq+1)===0 ){
		matscore[place]=gap*i;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
		matsumdia[place]=0;
		matsumvert[place]=0;
		matsumhor[place]=0;
	}
	else{
		scorevert=matscore[placevert];
		scorehor=matscore[placehor];
		scoredia=matscore[placedia];
		for (var l in letters){
			if (l1 === letters[l]){
				pos1=parseInt(l);
			}
			if (l2 === letters[l]){
				pos2=parseInt(l);
			}
		}
		var lengthmat=letters.length;
		var posmatrix=(lengthmat*pos1)+pos2;
		currentscore=parseInt(matrix[posmatrix]);
		matscore[place]=currentscore;
		sumdia=scoredia+currentscore;
		sumvert=scorevert+gap;
		sumhor=scorehor+gap;
		matsumdia[place]=sumdia;
		matsumvert[place]=sumvert;
		matsumhor[place]=sumhor;
		var maxiscore=Math.max(sumvert,sumdia,sumhor);
		if (maxiscore==(sumhor)){
			matpath[place]=1; 
		}
		else if (maxiscore==(sumdia)){
			matpath[place]=2;
		}
		else{
			matpath[place]=3; 
		}
	}
}
needlemanwunsch.prototype.alignment = function (matpath, matscore, s1, s2, len1, len2, lengthseq) {
	var val,elem,valmaxpos;
	var dep=(matscore.length)-1;
	var compt=0;
	var l=[];
	var align1=[];
	var align2=[];
	while (len1>=0 && len2>=0) {
		if (matpath[dep] === 0) {
			align1.unshift(s1[len1]);
			align2.unshift(s2[len2]);
			break;
		}
		if (matpath[dep] === 1) {
			dep = dep - 1;
			align1.unshift("-");
			align2.unshift(s2[len2]);
			len2--;
		}
		else if (matpath[dep] === 2) {
			dep = dep - (lengthseq + 2);
			align1.unshift(s1[len1]);
			align2.unshift(s2[len2]);
			len1--;
			len2--;
		}
		else {
			dep = dep - (lengthseq + 1);
			align1.unshift(s1[len1]);
			align2.unshift("-");
			len1--;
		}
	}
	var result=[align1,align2];
	return result;
};
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

 function smithwaterman()
 {
 	for (key in algorithm.prototype) { 
 		smithwaterman.prototype[key] = algorithm.prototype[key];
 	}
 }

 smithwaterman.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor,l1, l2, lengthseq, place,gap) {
 	var letters=["A","R","N","D","C","Q","E","G","H","I","L","K","M","F","P","S","T","W","Y","V","B","Z","X", "*"];
 	var currentscore;
 	var scorevert, scorehor, scoredia;
 	var sumvert, sumhor, sumdia;
 	var pos1,pos2;
 	var placevert = place - (lengthseq + 1);
 	var placehor = place - 1;
 	var placedia = place - (lengthseq + 2);
 	if ((place <= lengthseq) || (place % (lengthseq + 1) === 0)) {
 		matscore[place] = 0;
 		matpath[place] = 0;
 		scorevert = 0;
 		scorehor = 0;
 		scoredia = 0;
 		matsumdia[place]=0;
 		matsumvert[place]=0;
 		matsumhor[place]=0;		
 	}
 	else{
 		scorevert=matscore[placevert];
 		scorehor=matscore[placehor];
 		scoredia=matscore[placedia];
 		for (var l in letters){
 			if (l1 === letters[l]){
 				pos1=parseInt(l);
 			}
 			if (l2 === letters[l]){
 				pos2=parseInt(l);
 			}
 		}
 		var lengthmat=letters.length;
 		var posmatrix=(lengthmat*pos1)+pos2;
 		currentscore=parseInt(matrix[posmatrix]);
 		matscore[place]=currentscore;
 		sumdia=scoredia+currentscore;
 		sumvert=scorevert+gap;
 		sumhor=scorehor+gap;
 		matsumdia[place]=sumdia;
 		matsumvert[place]=sumvert;
 		matsumhor[place]=sumhor;
 		var maxiscore=Math.max(sumvert,sumdia,sumhor);
 		if (maxiscore==(sumhor)){
 			matpath[place]=1; 
 		}
 		else if (maxiscore==(sumdia)){
 			matpath[place]=2;
 		}
 		else{
 			matpath[place]=3; 
 		}
 	}
 }

 smithwaterman.prototype.alignment = function (matpath, matscore, s1, s2, len1, len2, lengthseq) {
 	var val, elem, dep, valmaxpos;
 	var valmax = 0;
 	var compt = 0;
 	var l = [];
 	var align1 = [];
 	var align2 = [];
 	for (val in matscore) {
 		valmaxpos = matscore[val];
 		valmax = Math.max(valmax, valmaxpos);
 	}

 	for (elem in matscore) {
 		if (matscore[elem] === valmax) {
 			l.push(elem);
 		}
 	}
 	for (dep in l) {
 		deppos = l[dep];
 		while (true) {
 			if (matscore[deppos] === 0) {
 				align1.unshift(s1[len1]);
 				align2.unshift(s2[len2]);
 				break;
 			}
 			if (matpath[deppos] === 1) {
 				deppos = deppos - 1;
 				align1.unshift("-");
 				align2.unshift(s2[len2]);
 				len2--;
 			}
 			else if (matpath[deppos] === 2) {
 				deppos = deppos - (lengthseq + 2);
 				align1.unshift(s1[len1]);
 				align2.unshift(s2[len2]);
 				len1--;
 				len2--;
 			}
 			else {
 				deppos = deppos - (lengthseq + 1);
 				align1.unshift(s1[len1]);
 				align2.unshift("-");
 				len1--;
 			}
 		}
 	}
 	var result = [align1, align2];
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
function timelapse(){
	// step_score();
	step_sum();
	step_path();
}

function step_sum(){

	//Enlever le premier élément casse tout
	document.getElementById("matrixtime").removeChild(matrixtime.childNodes[0]);
	
	var id=[];
	var cpt=0;

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
			
			
			if(i>=1 && j===1){
				
				for (scoring in matscore){
					if (matrixtime.rows[i].cells[j].style.visibility == "visible"){
						cpt++
						console.log(cpt);
					}
					matrixtime.rows[i].cells[j].setAttribute("id",i+":"+j);
					matrixtime.rows[i].cells[j].style.visibility="hidden";
					matrixtime.rows[i].cells[j].innerHTML=matscore[scoring];
					var z=matrixtime.rows[i].cells[j].getAttribute("id",i+":"+j)
					id.push(z)	
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
	document.getElementById("next").addEventListener("click",pass(id,id[cpt]));	
}	

function pass(id,pos){
	var cpt;
	console.log(pos)
	for (var x=0;x<=id.length;x++){
		document.getElementById(pos).style.visibility="visible";
	}
	cpt++;
	

	// if (document.getElementById("10:10")===true){
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

	var matrix1=document.getElementById("matrixtime2").rows;

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; 
		
		for (var j = 0; j < column.length ; j++) {

			if (i===10 & j===10){
				for(y in matrixtime){
					document.getElementById(i+","+j).style.visibility="visible";
					j--;
					if(j%size2==0){
						i--;
						j=10;
					}
				}
			}
		}
	}
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