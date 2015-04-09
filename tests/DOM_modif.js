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
			 	console.log("bhbhbh");
				while (document.forms['form'].choix_matrice.options[1]){
			 		document.forms['form'].choix_matrice.removeChild(document.forms['form'].choix_matrice.options[0]);
				}
				document.forms['form'].choix_matrice.options[0]=new Option('DNAfull','DNAfull');
			}
			 else{
				console.log("chchchchchc");
				document.forms['form'].choix_matrice.options[0]=new Option('DNAfull','DNAfull');
			 }
		}
		console.log((document.forms['form'].elements.value));
		}

function show_matrice(){
	var s1=seq1.split("");
	var s2=seq2.split("");
	var len1= seq1.length;
	var len2=seq2.length;
matrice=document.getElementById("matrice");
for (var i=0;i<len1+2;i++){
	matrice.innnerHtml="<tr id="i"></tr>";
	if (i==0){
		for (j in s2){
			document.getElementById(i). innerHtml="<th>"j"<th>"
		}

	}
}
	1
}