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
function needlemanwunsch()
{
	for (key in algorithm.prototype) {
		needlemanwunsch.prototype[key] = algorithm.prototype[key];
	}
}
needlemanwunsch.prototype.score = function (matrix,matscore, matpath, matsumdia, matsumvert, matsumhor,l1, l2, lengthseq, place,i,gap,letters) {
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
		console.log(sumvert,sumdia,sumhor);
 		console.log(maxiscore);

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
