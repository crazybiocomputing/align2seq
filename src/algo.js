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

function algorithm(sequence1,sequence2,matrix,type_seq,algo)
{
	this.seq1 = sequence1;
	this.seq2 = sequence2;
	console.log(this.seq1);
	this.len1 = this.seq1.length;
	this.len2 = this.seq2.length;
	this.l1;
	this.l2;
	this.mat1;
	this.mat2;
	this.s1 = [];
	this.s2 = [];
	this.matseq = [];
	this.matscore = [];
	this.matpath = [];
	this.i;
	this.j;
	this.taille1=len1+1;
	this.taille2=len2+2;
	this.add;
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
				smithwaterman.prototype.score(this.matscore, this.matpath, this.matseq[i], this.matseq[j], this.len2, this.place);
			}
			else{
				needlemanwunsch.prototype.score(this.matscore, this.matpath, this.matseq[i], this.matseq[j], this.len2, this.place,this.i);
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

	console.log (matscore)
	console.log (matpath)
}

function display(){
	var matrix=document.getElementById("matrix2");

	for (var i =0;i<=taille1;i++){
		matrix.insertRow(i);
		for(var j=0;j<=(taille2-1);j++){
			matrix.rows[i].insertCell(j);
		}
	}

	var matrix1=document.getElementById("matrix2").rows;//création des lignes

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; //On a autant de cellule par ligne
		
		for (var j = 0; j < column.length ; j++) {
/*		 if(j % 2 == 0)//si la clé est paire
        {
            matrix1[j].style.backgroundColor = "#bdcbf5";
        }
        else //elle est impaire
        {
            matrix1[j].style.backgroundColor = "#829eeb";
        }
      */

			if (i>=2 && j===0){ 
				for(var column in s1){
					matrix2.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) { //Remplir la première ligne à partir de la seconde case
				for (var ligne in s2) {
					matrix2.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (scoring in matscore){
					matrix2.rows[i].cells[j].innerHTML=matscore[scoring];
					j++;
					if(j%taille2==0){
						i++;
						j=1;
					}
				}
			i=1;
			} 
		}
	}

}


/*window.addEventListener("load", function ()
{
	algorithm(seq1,seq2,matrix,type_seq,algo);
	display();
}, true);*/

