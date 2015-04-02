
"use strict"

// function interface(){
var	validate=function(){
	 	if (document.getElementById('proteine').checked==true){
	 		document.getElementById('nucleotide').checked=false;
	 	}
	 	else if (document.getElementById('nucleotide').checked==true){
	 		document.getElementById('proteine').checked=false;

	 	}
	 	else if ((document.getElementById('nucleotide').checked==true)&&(document.getElementById('proteine').checked==true){
	 		var form=document.querySelector("form");
	 		form p.innerHtml ="vous devez cocher au moins une des deux case"

	 	}


	};

	this.action=function(){


	};

	
	this.form=function(){
		

	};

	