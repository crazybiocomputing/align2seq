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

 function smithwaterman()
 {
 	for (key in algorithm.prototype) { 
 		smithwaterman.prototype[key] = algorithm.prototype[key];
 	}
 }

 smithwaterman.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor, matsumtot,l1, l2, lengthseq, place,gap,letters) {
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
 		if (currentscore<0){
 			currentscore=0;
 		}
 		matscore[place]=currentscore;
 		sumdia=scoredia+currentscore;
 		sumvert=scorevert+gap;
 		sumhor=scorehor+gap;
 		matsumdia[place]=sumdia;
 		matsumvert[place]=sumvert;
 		matsumhor[place]=sumhor;
 		var maxiscore=Math.max(sumvert,sumdia,sumhor);
 		matsumtot[place]=maxiscore;
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

 smithwaterman.prototype.alignment = function (matpath, matscore, matsumtot, s1, s2, len1, len2, lengthseq) {
 	
 	var val, elem, dep, valmaxpos;
 	var valmax = 0;
 	var compt = 0;
 	var l = [];

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
 		deppos = l[dep];
 		var align1 = [];
 		var align2 = [];
 		while (true) {
 			var posseq1=deppos/(len1+1);
 			var posseq2;
 			if (matsumtot[deppos] === 0) {
 				align1.unshift(s1[posseq1]);
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
 		result.push(align1);
 		result.push(align2);
 	}

 	console.log(result.length)
 	return result;
 }

