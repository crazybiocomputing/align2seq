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

/** Function to initiate the alignment according to Needleman and Wunsch algorithm
@constructor
 */
function needlemanwunsch()
{
	for (key in algorithm.prototype) {
		needlemanwunsch.prototype[key] = algorithm.prototype[key];
	}
}

/** Function to calculate the score according to Needleman and Wunsch algorithm
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
@param {number} gapplace- Gap penality 
@param letters - Letters used in subsitution matrices
 */
needlemanwunsch.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor,matsumtot,l1, l2, lengthseq, place,i,gap,letters) {
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
		matsumtot[place]=0;
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
		matsumtot[place]=0;
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

/** Function to calculate the alignment according to Needleman and Wunsch algorithm
@constructor
@param matscore - Score matrix filled by this function
@param matpath - Path matrix filled by the function
@param matsumtot - Sum matrix obtained by the maximal value between the third previoux matrices
@param s1 - The first sequence
@param s2 - The second sequence
@parem {number} len1 - Length of the first sequence
@param {number} len2 - Length of the second sequence
@param {string} lengthseq - Length of the sequence
 */
needlemanwunsch.prototype.alignment = function (matpath, matscore, matsumtot, s1, s2, len1, len2, lengthseq) {
	var val,elem,valmaxpos;
	var dep=(matsumtot.length)-1;
	var compt=0;
	var l=[];
	var align1=[];
	var align2=[];
	// var posseq1=0;
	// var posseq2=0;
	while (true) {
		var posseq1=(dep%(len1+1)-1);
 		var posseq2=Math.floor(dep/(len2+1)-1);
 		console.log(dep)
 		console.log("Pos1 "+posseq1+" Pos 2 "+posseq2);
 		if (matpath[dep] === 0) {
			align1.unshift(s1[len1]);
			align2.unshift(s2[len2]);
			console.log("Fin")
			break;
 		}
 		if (matpath[dep] === 1) {
 			dep = dep - 1;
 			// align1.unshift("-");
 			// console.log("hor")
 			// align2.unshift(s2[posseq2]);
 			align1.unshift(s1[posseq1]);
 			align2.unshift("-");
 			console.log("hor")

 		}
 		else if (matpath[dep] === 3 || matpath[dep] === 4) {
  			dep = dep - (lengthseq + 1);
 			// align1.unshift(s1[posseq1]);
 			// align2.unshift("-");
 			align1.unshift("-")
 			align2.unshift(s2[posseq2]);
			console.log("ver")
 		}
 		else {
 			dep = dep - (lengthseq + 2);
 			align1.unshift(s1[posseq1]);
 			align2.unshift(s2[posseq2]);
 			console.log("dia")
 		}
/*		if (matpath[dep] === 0) {
			align1.unshift(s1[len1]);
			align2.unshift(s2[len2]);
			break;
		}
		else if (matpath[dep] === 1) {
 				dep = dep - 1;
 				align1.unshift("-");
 				align2.unshift(s2[posseq2]);
 			}
 		else if (matpath[dep] === 3 || matpath[dep] === 4) {
  				dep = dep - (lengthseq + 1);
 				align1.unshift(s1[posseq1]);
 				align2.unshift("-");
 			}
 		else {
 				dep = dep - (lengthseq + 2);
 				align1.unshift(s1[posseq1]);
 				align2.unshift(s2[posseq2]);
 			}*/
	}
var result=[align1,align2];
return result;
}

