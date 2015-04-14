function algorithm(){
	var len1,len2;
	var l1,l2,mat1,mat2;
	var s1,s2;
	var matseq,matscore,matpath;
	var i,j;
	var seq1="ACVHFFTCA"; var seq2="AGFTCDFGA";
	var add;
	s1=[];
	s2=[];
	matseq=[];
	matpath=[];
	matscore=[];
	len1=seq1.length;
	len2=seq2.length;
	seqlength=Math.min(len1,len2);
	maxi=Math.max(len1,len2);
	matseq[0]="-";
	s1=seq1.split("");
	for (var elems1=0;elems1<=len1;elems1++){
		matseq.push(s1[elems1]);
	}
	matseq[len1+1]="-";
	s2=seq2.split("");
	// if (ajout!==0 && longueur==len2){
	// 	for (var indent2=0;indent2<ajout;indent2++){
	// 		s2.push("-");}}
	for (var elems2=0;elems2<len2;elems2++){
		matseq.push(s2[elems2]);
	}

	var place=0;
	for(i=0;i<=len1;i++){
		for(j=len1+1;j<=((len1+len2)+1);j++){
			score(matscore,matpath,matseq[i],matseq[j],len2,place);
			place++;
		}
	}
	var result=alignment(matpath,matscore,s1,s2,len1,len2,len2);
	document.getElementById('matrices').innerHTML +='Alignement 1:'+result[0]+'<br>';
	document.getElementById('matrices').innerHTML +='Alignement 2:'+result[1]+'<br><br>';
	document.getElementById('matrices').innerHTML +='Matrice séquences :'+ matseq+'<br>';
	document.getElementById('matrices').innerHTML +='Matrice scores :'+ matscore+'<br>';
	document.getElementById('matrices').innerHTML +='Matrice chemins :'+ matpath+'<br>';
};

function score(matscore,matpath,l1,l2,lengthseq,place){
	var match=10;
	var mismatch=-5;
	var gap=2;
	var currentscore;
	var scorevert,scorehor,scoredia;
	var sumvert,sumhor,sumdia;
	var placevert=place-(lengthseq+1);
	var placehor=place-1;
	var placedia=place-(lengthseq+2);

	
	if((place<=lengthseq) || (place%(lengthseq+1)===0)){
		matscore[place]=0;
		matpath[place]=0;
		scorevert=0;
		scorehor=0;
		scoredia=0;
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

// function alignment(matpath,matscore,s1,s2,len1,len2,lengthseq){
// 	var val,elem,start,valmaxpos;
// 	var valmax=0;
// 	var l=[];
// 	var align1=[];
// 	var align2=[];
// 	for (val in matscore){
// 		valmaxpos=matscore[val];
// 		valmax=Math.max(valmax,valmaxpos);
// 	}

// 	for (elem in matscore){
// 		if (matscore[elem]===valmax){
// 			l.push(elem);
// 		}
// 	}
// 	for (start in l){
// 		startpos=l[start];
// 		while (true){
// 			if (matscore[startpos]===0){
// 				align1.unshift(s1[len1]);
// 				align2.unshift(s2[len2]);
// 				break;
// 			}
// 			if (matpath[startpos]===1){
// 				startpos=startpos-1;
// 				align1.unshift("-");
// 				align2.unshift(s2[len2]);
// 				len2--;
// 			} 
// 			else if (matpath[startpos]===2){
// 				startpos=startpos-(lengthseq+2);
// 				align1.unshift(s1[len1]);
// 				align2.unshift(s2[len2]);
// 				len1--;
// 				len2--;
// 			}		
// 			else{
// 				startpos=startpos-(lengthseq+1);
// 				align1.unshift(s1[len1]);
// 				align2.unshift("-");
// 				len1--;
// 			} 
// 		}
// 	}
// 	var result=[align1,align2];
// 	return result;
// }


algorithm();
