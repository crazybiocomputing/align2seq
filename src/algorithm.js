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

function algorithm(sequence1,sequence2,matrix,type_seq,algo,gap)
{
	this.seq1 = sequence1;
	this.seq2 = sequence2;
	this.len1 = this.seq1.length;
	this.len2 = this.seq2.length;
	this.matrix = matrix;
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
	this.gap=gap;
	this.seqlength = Math.min(this.len1, this.len2);
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
		this.place = 0;
	}
	for (i = 0; i <= this.len1; i++) {
		for (j = this.len1 + 1; j <= ((this.len1 + this.len2) + 1); j++) {
			if (this.algo=="smith_waterman"){
				smithwaterman.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor, this.matseq[i], this.matseq[j], this.len2, this.place,this.gap);
			}
			else{
				needlemanwunsch.prototype.score(this.matrix,this.matscore, this.matpath, this.matsumdia, this.matsumvert, this.matsumhor, this.matseq[i], this.matseq[j], this.len2, this.place,this.i,this.gap);
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
