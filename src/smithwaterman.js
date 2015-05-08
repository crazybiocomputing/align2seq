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

/** Function to initiate the alignment according to Smith and Waterman algorithm
@constructor
 */
 function smithwaterman()
 {
 	for (key in algorithm.prototype) { 
 		smithwaterman.prototype[key] = algorithm.prototype[key];
 	}
 }
/** Function to calculate the score according to Smith and Waterman algorithm
@constructor
@param matrix - Substitution matrix chosen by the user
@param matscore - Score matrix filled by this function
@param matpath - Path matrix filled by the function
@param matsumdia - Sum matrix obtained by the diagonal case filled by the function
@param matsumvert - Sum matrix obtained by the vertical case filled by the function
@param matsumhor - Sum matrix obtained by the horizontal case filled by the function
@param matsumtot - Sum matrix obtained by the maximal value between the third previoux matrices
@param {string} l1 - The letter obtained by the first sequence used for comparison
@param {string} l2 - The letter obtained by the second sequence used for comparison
@param {string} lengthseq - Length of the sequence
@param {string} place - Place of the letter 
@param {number} gap- Gap penality 
@param letters - Letters used in subsitution matrices
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

/** Function to calculate the alignment according to Needleman and Wunsch algorithm
@constructor
@param matscore - Score matrix filled by this function
@param matpath - Path matrix filled by the function
@param s1 - The first sequence
@param s2 - The second sequence
@parem {number} len1 - Length of the first sequence
@param {number} len2 - Length of the second sequence
@param {string} lengthseq - Length of the sequence
 */
 smithwaterman.prototype.alignment = function (matpath, matscore, matsumtot, s1, s2, len1, len2, lengthseq) {
 	
 	var val, elem, dep, valmaxpos;
 	var valmax = 0;
 	var compt = 0;
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
 			var posseq2=Math.floor(deppos/(len2+1)-1);
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

