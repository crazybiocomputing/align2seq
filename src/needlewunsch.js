function needlemanwunsch()
{
	for (key in algorithm.prototype) {
		needlemanwunsch.prototype[key] = algorithm.prototype[key];
	}
}

needlemanwunsch.prototype.score = function (matscore, matpath, l1, l2, lengthseq, place,i) {
	var match=1;
	var mismatch=-1;
	var gap=-1;
	var currentscore;
	var scorevert,scorehor,scoredia;
	var sumvert,sumdia,sumhor;
	var placevert=place-(lengthseq+1);
	var placehor=place-1;
	var placedia=place-(lengthseq+2);
	if(place<=lengthseq){
		matscore[place]=gap*place;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
	}
	else if (place%(lengthseq+1)===0 ){
		matscore[place]=gap*i;
		matpath[place] = 0;
		scorevert = 0;
		scorehor = 0;
		scoredia = 0;
	}
	else{
		scorevert=matscore[placevert];
		scorehor=matscore[placehor];
		scoredia=matscore[placedia];
		if (l1===l2){
			currentscore=match;
		}
		else if (l1==="-" || l2==="-" ||(l1==="-" && l2==="-" )){
			currentscore=gap;
		}
		else if (l1!=l2){
			currentscore=mismatch;
		}
		sumdia=scoredia+currentscore;
		sumvert=scorevert+gap;
		sumhor=scorehor+gap;
		var maxiscore=Math.max(sumvert,sumdia,sumhor);
		matscore[place]=maxiscore;
		if (maxiscore==(sumhor)){
			matpath[place]=1;	} 
		else if (maxiscore==(sumdia)){
			matpath[place]=2;}		
		else{
			matpath[place]=3;	} 
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