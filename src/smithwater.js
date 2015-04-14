exports.alignment = function alignment(matchemin,matscore1,s1,s2,len1,len2,lengthseq){
	var val,elem,dep,valmaxpos;
	var valmax=0;
	var compt=0;
	var l=[];
	var align1=[];
	var align2=[];
	for (val in matscore1){
		valmaxpos=matscore1[val];
		valmax=Math.max(valmax,valmaxpos);
	}

	for (elem in matscore1){
		if (matscore1[elem]===valmax){
			l.push(elem);
		}
	}
	for (dep in l){
		deppos=l[dep];
		while (true){
			if (matscore1[deppos]===0){
				align1.unshift(s1[len1]);
				align2.unshift(s2[len2]);
				break;
			}
			if (matchemin[deppos]===1){
				deppos=deppos-1;
				align1.unshift("-");
				align2.unshift(s2[len2]);
				len2--;
			} 
			else if (matchemin[deppos]===2){
				deppos=deppos-(lengthseq+2);
				align1.unshift(s1[len1]);
				align2.unshift(s2[len2]);
				len1--;
				len2--;
			}		
			else{
				deppos=deppos-(lengthseq+1);
				align1.unshift(s1[len1]);
				align2.unshift("-");
				len1--;
			} 
		}
	}
	var result=[align1,align2];
	return result;
}

