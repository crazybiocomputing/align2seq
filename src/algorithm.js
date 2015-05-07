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
	this.type_seq=type_seq;
	this.gap=gap;
	this.place = 0;
	this.l1;
	this.l2;
	this.mat1;
	this.mat2;
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
	this.add;
	this.maxi = Math.max(this.len1, this.len2);
	this.algo = algo;
	this.listalign=[];
	this.matseq[0] = "-";
	s1 = this.seq2.split("");
	for (var elems1 = 0; elems1 <= this.len1; elems1++) {
		this.matseq.push(s1[elems1]);
	}
	this.matseq[this.len1 + 1] = "-";
	s2 = this.seq1.split("");
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
				smithwaterman.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor,this.matsumtot, this.matseq[i], this.matseq[j], this.len2, this.place,this.gapplace,this.letters);
			}
			else{
				needlemanwunsch.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor,this.matsumtot, this.matseq[i], this.matseq[j], this.len2, this.place,this.i,this.gapplace,this.letters);
			}
			this.place++;
		}
	}
	for (path in matpath){
		if (matpath[path]===0){
			matpatharrows[path]="<i class=\"fa fa-circle-thin\"></i>";
			matpatharrowsalign[path]="<i class=\"fa fa-circle-thin\" style=\"color:red\"></i>";
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
	if (this.algo == "smith_waterman") {
		var result = smithwaterman.prototype.alignment(this.matpath, this.matscore,this.matsumtot, this.s2, this.s1, this.len1, this.len2, this.len2);
	}
	else{
		var result = needlemanwunsch.prototype.alignment(this.matpath, this.matscore,this.matsumtot, this.s2, this.s1, this.len1, this.len2, this.len2,this.listalign);
	}
	if (result.length>2){
		var cpt=1		
		document.getElementById('alignment').innerHTML="";
		// document.getElementById('alignment').innerHTML +="<div id=\"allalign\">";
		for(var alignseq=0;alignseq<=(result.length-1);alignseq+=2){
			document.getElementById('alignment').innerHTML +="<div id=\"allalign\"><h3>Alignment "+cpt+"</h3><br/>"+result[alignseq]+"<br/>"+result[alignseq+1]+"<br/></div>";
			cpt++
		}
	}
	else{
		document.getElementById('alignment').innerHTML ="<h3>Alignment</h3><br>"+result[0]+"<br>"+result[1];
	}
}
