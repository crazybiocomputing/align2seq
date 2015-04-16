"use strict";


function choose_matrix(){
			
		if (document.getElementById('protein').checked===true){
			
			var i=0;
			var j=30;
			while  ( i<13){
				document.getElementById('choice_matrix').options[i] = new Option('Blosum'+j,'Blosum'+j);
				i+=1;
				j+=5;
				}
			}
		
		else if (document.getElementById('nucleotide').checked===true){
			if (document.getElementById('choice_matrix').options.length!==0){
				while (document.getElementById('choice_matrix').options[1]){
			 		document.getElementById('choice_matrix').removeChild(document.getElementById('choice_matrix').options[0]);
				}
				document.getElementById('choice_matrix').options[0]=new Option('DNAfull','DNAfull');
			}
			else{
				document.getElementById('choice_matrix').options[0]=new Option('DNAfull','DNAfull');
			 }
		}
		}


function get_value(){
	// event.preventDefault();
	var algo;
	var type_seq;
	var algo_choice=document.getElementsByName("algorithm");

	for (var i=0;i<algo_choice.length;i++){
		if (algo_choice[i].checked===true){
			algo=algo_choice[i].value;
		}
	}
	var seq_choice=document.getElementsByName("type_seq");
	for (var j=0;j<seq_choice.length;j++) {
		if (seq_choice [j].checked===true) {
			type_seq= seq_choice[j].value;
		}
	}
	var seq1=document.getElementById("sequence1").value;
	var seq2=document.getElementById("sequence2").value;
	var matrix=document.getElementById("choice_matrix").options[document.getElementById('choice_matrix').selectedIndex].value;

console.log(algo,type_seq,seq1,seq2,matrix);
	return(seq1,seq2,matrix,type_seq,algo);


}
