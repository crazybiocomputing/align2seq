"use strict"
//useless function

// function validate(){
// 	 	if (document.getElementById('proteine').checked===true){
// 	 		document.getElementById('nucleotide').checked=false;
// 	 	}
// 	 	else if (document.getElementById('nucleotide').checked===true){
// 	 		document.getElementById('proteine').checked=false;

// 	 	}
// 	 	else if ((document.getElementById('nucleotide').checked===false)&&(document.getElementById('proteine').checked===false)){
// 	 		var form=document.querySelector("#form p");
// 	 		form.innerHtml ="vous devez cocher au moins une des deux case";

// 	 	}


// 	}

function chooseMatrice(){
	console.log("AHAHAH");
			
		if (document.getElementById('proteine').checked===true){
			
			var i=0;
			var j=30;
			while  ( i<13){
				console.log("ahahah");
				document.forms['form'].choix_matrice.options[i] = new Option('Blosum'+j,'Blosum'+j);
				i+=1;
				j+=5;
				}
			}
		
		else if (document.getElementById('nucleotide').checked===true){
			console.log("AHahAhah");
			if (document.forms['form'].choix_matrice.options.length!==0){
				while (document.forms['form'].choix_matrice.options[1]){
			 		document.forms['form'].choix_matrice.removeChild(document.forms['form'].choix_matrice.options[0]);
				}
				document.forms['form'].choix_matrice.options[0]=new Option('DNAfull','DNAfull');
			}
			else{
				document.forms['form'].choix_matrice.options[0]=new Option('DNAfull','DNAfull');
			 }
		}
		console.log((document.forms['form'].elements.value));
		}













function show_matrice(){
	var seq1="ACVHFFTCA"; var seq2="AGFTCDFGA";
	var s1=seq1.split("");
	var s2=seq2.split("");
	var len1= seq1.length;
	var len2=seq2.length;
	var taille1=len1+2;
	var taille2=len2+2
	var matrice=document.getElementById("matrice");
	// creer un tableau contenant i ligne et j colonne et contenant les seq 
	console.log(len1);
	console.log(len2);
	for (var i =0;i<=taille1;i++){
		matrice.insertRow(i);
		for(var j=0;j<=taille2;j++){
			matrice.rows[i].insertCell(j);
		}
		}
for (var i =0 ; i <= matrice.rows.length ; i++) {
	for (var j = 0; j <= matrice.rows[i].cells.length ; j++) {
		console.log("i=",i)
		console.log("j=",j)
			if (j===0 && i>=2){
				console.log("on est dans le 1er if");
				for(var m in s1){
					console.log(m)
					console.log("s1",s1);
					matrice.rows[i].cells[j].innerHTML=m;
				}
			}
			if (i===0 && j>=2) {
				for (var l in s2) {
					
					console.log("remplir");
					matrice.rows[i].cells[j].innerHTML= l;

			}
			}
		}
		}
	}

// function step_to_step(){}

//var arrayligne = document.getElementById("matrice").rows;
//for (var k=0; k<=arrayligne.length;i++){


// }