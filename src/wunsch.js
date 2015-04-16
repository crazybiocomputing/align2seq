// var score=require('/score');
// var chemin=require('./code_nouveau/chemin');
// var infos = require('./code_nouveau/dom_modif.js');

window.onload=function matrices(){
	var len1,len2;
	var l1,l2,mat1,mat2;
	var s1,s2;
	var matscore,matchemin;
	var i,j;
	var seq1="ACVHFFTCA"; var seq2="AGFTCDFGA";
	var ajout;
	remplissage=0;
	s1=[];
	s2=[];
	matscore=[];
	matchemin=[];
	matscore1=[];
	len1=seq1.length;
	len2=seq2.length;
	longueur=Math.min(len1,len2);
	maxi=Math.max(len1,len2);
	matscore[0]="-";
	s1=seq1.split("");
	for (var elems1=0;elems1<=len1;elems1++){
		matscore.push(s1[elems1]);
	}
	matscore[len1+1]="-";
	s2=seq2.split("");
	if (ajout!==0 && longueur==len2){
		for (var indent2=0;indent2<ajout;indent2++){
			s2.push("-");}}
	for (var elems2=0;elems2<len2;elems2++){
		matscore.push(s2[elems2]);
	}

	var place=0;
	for(i=0;i<=len1;i++){
		for(j=len1+1;j<=((len1+len2)+1);j++){
			score(matscore1,matchemin,matscore[i],matscore[j],len2,place);
			place++;
		}
	}
	var result=alignment(matchemin,matscore1,s1,s2,len1,len2,len2);
	document.getElementById('matrices').innerHTML +='Alignement 1:'+result[0]+'<br>';
	document.getElementById('matrices').innerHTML +='Alignement 2:'+result[1]+'<br><br>';
	document.getElementById('matrices').innerHTML +='Matrice séquences :'+ matscore+'<br>';
	document.getElementById('matrices').innerHTML +='Matrice scores :'+ matscore1+'<br>';
	document.getElementById('matrices').innerHTML +='Matrice chemins :'+ matchemin+'<br>';
};

function score(matscore1,matchemin,l1,l2,lengthseq,place){
	var match=10;
	var mismatch=0;
	var gap=-2;
	var currentscore;
	var scorevert,scorehor,scoredia;
	var sumvert,sumdia,sumhor;
	var placevert=place-(lengthseq+1);
	var placehor=place-1;
	var placedia=place-(lengthseq+2);

	
	if(place<=lengthseq){
		matscore1[place]=gap*place;
		matchemin[place]=1;
	}
	
	else if (place%(lengthseq+1)===0){
		matscore1[place]=gap*place;
		matchemin[place]=3;
	}



	
		
	
	else{

		scorevert=matscore1[placevert];
		scorehor=matscore1[placehor];
		scoredia=matscore1[placedia];
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
		matscore1[place]=maxiscore;
		if (maxiscore==(sumhor)){
			matchemin[place]=1;	} 
		else if (maxiscore==(sumdia)){
			matchemin[place]=2;}		
		else{
			matchemin[place]=3;	} 
	}
}

function alignment(matchemin,matscore1,s1,s2,len1,len2,lengthseq){
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
		while(len1>0 && len2>0){

		
			
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
		while (len1>0){
			align1.unshift(s1[len1]);
			align2.unshift("-");
			len1--;
		}
		while (len2>0){
			align1.unshift("-");
			align2.unshift(s2[len2]);
			len2--;

		}
	


		
	}
	var result=[align1,align2];
	return result;
};