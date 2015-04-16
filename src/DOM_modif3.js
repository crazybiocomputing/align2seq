function algorithm(){
	this.seq1="ACVHFFTCA";this.seq2="AGFTCDFGA";
	this.len1=this.seq1.length;this.len2=this.seq2.length;
	this.l1;this.l2;this.mat1;this.mat2;
	this.s1=[];this.s2=[];
	this.matseq= [];this.matscore=[];this.matpath=[];
	this.i;this.j;
	this.taille1=len1+1;
	this.taille2=len2+2;
	this.add;
	this.seqlength=Math.min(this.len1,this.len2);
	this.maxi=Math.max(this.len1,this.len2);
	this.algo="sw";
	this.matseq[0]="-";
	s1=this.seq1.split("");
	for (var elems1=0;elems1<=this.len1;elems1++){
		this.matseq.push(s1[elems1]);
	}
	this.matseq[this.len1+1]="-";
	s2=this.seq2.split("");
	// if (ajout!==0 && longueur==len2){
	// 	for (var indent2=0;indent2<ajout;indent2++){
	// 		s2.push("-");}}
	for (var elems2=0;elems2<this.len2;elems2++){
		this.matseq.push(s2[elems2]);
		this.place=0;
	}
	for(i=0;i<=this.len1;i++){
		for(j=this.len1+1;j<=((this.len1+this.len2)+1);j++){
			algorithm.prototype.score(this.matscore,this.matpath,this.matseq[i],this.matseq[j],this.len2,this.place);
			this.place++;
		}
	}
	// if (this.algo=="sw"){
	// 	var result=smithwaterman.prototype.alignment(matpath,matscore,s1,s2,len1,len2,len2);
	// }

	// document.getElementById('matrices').innerHTML +='Alignement 1:'+result[0]+'<br>';
	// document.getElementById('matrices').innerHTML +='Alignement 2:'+result[1]+'<br><br>';
	// document.getElementById('matrix2').innerHTML +='Matrice séquences :'+ this.matseq+'<br>';
	// document.getElementById('matrix').innerHTML +='Matrice scores :'+ this.matscore+'<br>';
	// document.getElementById('matrix').innerHTML +='Matrice chemins :'+ this.matpath+'<br>';

	var matrix=document.getElementById("matrix2");

	for (var i =0;i<=taille1;i++){
		matrix.insertRow(i);
		for(var j=0;j<=(taille2-1);j++){
			matrix.rows[i].insertCell(j);
		}
	}

	var matrix1=document.getElementById("matrix2").rows;//création des lignes

	for (var i = 0 ; i < matrix1.length; i++) {

		var column = matrix1[i].cells; //On a autant de cellule par ligne
		
		for (var j = 0; j < column.length ; j++) {

			if (i>=2 && j===0){ 
				// console.log("on est dans le 1er if");
				// console.log("tour",i)
				for(var column in s1){
					// console.log("column : " + column + " = " + s1[column]);
					matrix2.rows[i].cells[j].innerHTML=s1[column];	
					i++;	
				}
			};

			if (i===0 && j>=2) { //Remplir la première ligne à partir de la seconde case
				// console.log("on est dans le 2nd if");
				// console.log("tour",j)
				for (var ligne in s2) {
					// console.log("Ligne : "+ ligne + " = " + s2[ligne]);
					matrix2.rows[i].cells[j].innerHTML=s2[ligne];
					j++;

				}
			};

			if(i>=1 && j===1){
				for (scoring in matscore){
					matrix2.rows[i].cells[j].innerHTML=matscore[scoring];
					j++;
					if(j%taille2==0){
						i++;
						j=1;
					}
				}
			i=1;
			} 
		}
	}

}
	algorithm.prototype.score=function(matscore,matpath,l1,l2,lengthseq,place){
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


// algorithm();
