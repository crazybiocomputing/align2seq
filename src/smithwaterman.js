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

smithwaterman.prototype.score = function (matscore, matpath, l1, l2, lengthseq, place) {
	var match = 10;
	var mismatch = -5;
	var gap = 2;
	var currentscore;
	var scorevert, scorehor, scoredia;
	var sumvert, sumhor, sumdia;
	var placevert = place - (lengthseq + 1);
	var placehor = place - 1;
	var placedia = place - (lengthseq + 2);
	if ((place <= lengthseq) || (place % (lengthseq + 1) === 0)) {
		matscore[place] = 0;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
	}
	else {
		scorevert = matscore[placevert];
		scorehor = matscore[placehor];
		scoredia = matscore[placedia];
		if (l1 === l2) {
			currentscore = match;
		}
		else if (l1 === "-" || l2 === "-" || (l1 === "-" && l2 === "-")) {
			currentscore = gap;
		}
		else if (l1 != l2) {
			currentscore = mismatch;
		}
		sumdia = scoredia + currentscore;
		sumvert = scorevert + gap;
		sumhor = scorehor + gap;
		var maxiscore = Math.max(sumvert, sumdia, sumhor);
		matscore[place] = maxiscore;
		if (maxiscore == (sumhor)) {
			matpath[place] = 1;
		}
		else if (maxiscore == (sumdia)) {
			matpath[place] = 2;
		}
		else {
			matpath[place] = 3;
		}
	}
};

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

