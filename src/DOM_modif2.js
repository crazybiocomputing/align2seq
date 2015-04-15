// var score=require('/score');
// var chemin=require('./code_nouveau/chemin');
// var infos = require('./code_nouveau/dom_modif.js');

function show_matrix(){
	var seq1="ACVHFFTCA"; var seq2="AGFTCDFGA";
	var s1=seq1.split("");
	var s2=seq2.split("");
	var len1=seq1.length;
	var len2=seq2.length;
	var taille1=len1+1;
	var taille2=len2+2;

	var l1,l2,mat1,mat2;
	var s1,s2;
	var matseq,matchemin;
	var ajout;
	
	//On va remplir des listes
	matseq=[];
	matchemin=[];
	matscore1=[];
	//Longueur minimale entre les deux
	longueur=Math.min(len1,len2);
	//Longueur maximale entre les deux
	maxi=Math.max(len1,len2);
	matseq[0]="-";

	//Pour elems1 plus petit que la longueur de séquence1, remplir la liste matscore
	for (var elems1=0;elems1<=len1;elems1++){
		matseq.push(s1[elems1]);
	}
	matseq[len1+1]="-";
	//Si ajout est différent de 0 
	//Et longueur minimale est len2
	if (ajout!==0 && longueur==len2){
	//Pour indent2 plus petit que ajout, on met un - dans s2
		for (var indent2=0;indent2<ajout;indent2++){
			s2.push("-");}}
	for (var elems2=0;elems2<len2;elems2++){
		matseq.push(s2[elems2]);
	}

	var place=0;
	for(var i=0;i<=len1;i++){
		for(var j=len1+1;j<=((len1+len2)+1);j++){
			score(matscore1,matchemin,matseq[i],matseq[j],len2,place);
			place++;
		}
	}
	var result=alignment(matchemin,matscore1,s1,s2,len1,len2,len2);
	
	// document.getElementById('matrix').innerHTML +='Alignement 1:'+result[0]+'<br>';
	// document.getElementById('matrix').innerHTML +='Alignement 2:'+result[1]+'<br><br>';
	// document.getElementById('matrix').innerHTML +='matrix séquences :'+ matseq+'<br>';
	// document.getElementById('matrix').innerHTML +='matrix scores :'+ matscore1+'<br>';
	// document.getElementById('matrix').innerHTML +='matrix chemins :'+ matchemin+'<br>';

	
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
				for (scoring in matscore1){
					matrix2.rows[i].cells[j].innerHTML=matscore1[scoring];
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

};	

//Calcul des scores des matrixs
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

	//Si la place est inférieure ou égale à la longueur de la séquence
	//Ou que le reste de place/lengthseq+1 est égale à 0 on met tout à 0
	if((place<=lengthseq) || (place%(lengthseq+1)===0)){
		matscore1[place]=0;
		matchemin[place]=0;
		scorevert=0;
		scorehor=0;
		scoredia=0;
	}
	//Autrement on calcul les scores
	else{
		scorevert=matscore1[placevert];
		scorehor=matscore1[placehor];
		scoredia=matscore1[placedia];
		//Si on a une même lettre alors on a un match soit 10
		if (l1===l2){
			currentscore=match;
		}
		//Si d'un côté ou de l'autre ou encore des deux côtés on a un vide
		//C'est une gap soit 2
		else if (l1==="-" || l2==="-" ||(l1==="-" && l2==="-" )){
			currentscore=gap;
		}
		//Si les lettres sont différentes alors on a un mismatch soit -5
		else if (l1!=l2){
			currentscore=mismatch;
		}
		//Calcul des trois scores possibles
		sumdia=scoredia+currentscore;
		sumvert=scorevert+gap;
		sumhor=scorehor+gap;
		//Récupération du score maximal entre les trois
		var maxiscore=Math.max(sumvert,sumdia,sumhor);
		//Mettre le score obtenu dans la matrix de score
		matscore1[place]=maxiscore;
		//Remplissage de la matrix chemin suivant la matrix score
		if (maxiscore==(sumhor)){
			matchemin[place]=1;	} 
		else if (maxiscore==(sumdia)){
			matchemin[place]=2;}		
		else{
			matchemin[place]=3;	} 
	}
}

//Création des alignements
function alignment(matchemin,matscore1,s1,s2,len1,len2,lengthseq){
	var val,elem,dep,valmaxpos;
	var valmax=0;
	var compt=0;
	var l=[];
	var align1=[];
	var align2=[];
	//Pour toute valeur dans la matrix de score
	//valmaxpos est sa place dans la matrix
	for (val in matscore1){
		valmaxpos=matscore1[val];
		valmax=Math.max(valmax,valmaxpos);
	}
	//Pour tout élément dans la matrix de score
	//Si le score correspond à valmax on le met dans l
	for (elem in matscore1){
		if (matscore1[elem]===valmax){
			l.push(elem);
		}
	}

	for (dep in l){
		deppos=l[dep];
		//99 valeurs 11*9
		while (true){
			if (matscore1[deppos]===0){
				//Unshift ajoutede nouveaux éléments au début de la liste
				//Si le score est de 0 on ajoute l'élément s1[len1] à align1
				//Idem pour align2
				align1.unshift(s1[len1]);
				align2.unshift(s2[len2]);
				break;
			}
			//Si le score est de 1 on ajoute un - dans align1
			//On ajoute s2[len2] au début de align2 
			//len2=longueur de la séquence2 donc on diminue de 1
			if (matchemin[deppos]===1){
				deppos=deppos-1;
				align1.unshift("-");
				align2.unshift(s2[len2]);
				len2--;
			} 
			//si le score est de 2 on fait de la diagonale
			//lengthseq = longueur de la séquence soit 9
			else if (matchemin[deppos]===2){
				deppos=deppos-(lengthseq+2);
				align1.unshift(s1[len1]);
				align2.unshift(s2[len2]);
				len1--;
				len2--;
			}
			//Autrement (quand score = 3)	
			//On ajoute s1[len1]au début de align1
			//On ajoute un - en face dans align2	
			else{
				deppos=deppos-(lengthseq+1);
				align1.unshift(s1[len1]);
				align2.unshift("-");
				len1--;
			} 
		}
	}
	//On met les résultats des alignements dans une variable que l'on retourne
	var result=[align1,align2];
	return result;

}

