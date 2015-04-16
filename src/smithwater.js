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

