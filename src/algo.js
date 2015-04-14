require(["./smithwater"], function() {
var smithwaterman=require("./smithwater");;
});

function algorithm(){
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
	var result=smithwaterman.alignment(matchemin,matscore1,s1,s2,len1,len2,len2);
	document.getElementById('matrices').innerHTML +='Alignement 1:'+result[0]+'<br>';
	document.getElementById('matrices').innerHTML +='Alignement 2:'+result[1]+'<br><br>';
	document.getElementById('matrices').innerHTML +='Matrice séquences :'+ matscore+'<br>';
	document.getElementById('matrices').innerHTML +='Matrice scores :'+ matscore1+'<br>';
	document.getElementById('matrices').innerHTML +='Matrice chemins :'+ matchemin+'<br>';
};

function score(matscore1,matchemin,l1,l2,lengthseq,place){
	var match=10;
	var mismatch=-5;
	var gap=2;
	var currentscore;
	var scorevert,scorehor,scoredia;
	var sumvert,sumdia,sumhor;
	var placevert=place-(lengthseq+1);
	var placehor=place-1;
	var placedia=place-(lengthseq+2);

	
	if((place<=lengthseq) || (place%(lengthseq+1)===0)){
		matscore1[place]=0;
		matchemin[place]=0;
		scorevert=0;
		scorehor=0;
		scoredia=0;
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
algorithm();
exports.algorithm=algo;