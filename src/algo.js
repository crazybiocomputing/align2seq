function algorithm()
{
	this.seq1 = "GATTACA";
	this.seq2 = "GCATGCU";
	this.len1 = this.seq1.length;
	this.len2 = this.seq2.length;
	this.l1;
	this.l2;
	this.mat1;
	this.mat2;
	this.s1 = [];
	this.s2 = [];
	this.matseq = [];
	this.matscore = [];
	this.matpath = [];
	this.i;
	this.j;
	this.add;
	this.seqlength = Math.min(this.len1, this.len2);
	this.maxi = Math.max(this.len1, this.len2);
	this.algo = "nw";
	this.matseq[0] = "-";
	s1 = this.seq1.split("");
	for (var elems1 = 0; elems1 <= this.len1; elems1++) {
		this.matseq.push(s1[elems1]);
	}
	this.matseq[this.len1 + 1] = "-";
	s2 = this.seq2.split("");
	for (var elems2 = 0; elems2 < this.len2; elems2++) {
		this.matseq.push(s2[elems2]);
		this.place = 0;
	}
	console.log(len1,len2,seqlength)
	for (i = 0; i <= this.len1; i++) {
		for (j = this.len1 + 1; j <= ((this.len1 + this.len2) + 1); j++) {
			if (this.algo=="sw"){
				smithwaterman.prototype.score(this.matscore, this.matpath, this.matseq[i], this.matseq[j], this.len2, this.place);
			}
			else{
				needlemanwunsch.prototype.score(this.matscore, this.matpath, this.matseq[i], this.matseq[j], this.len2, this.place,this.i);
			}
			this.place++;
		}
	}
	if (this.algo == "sw") {
		var result = smithwaterman.prototype.alignment(matpath, matscore, s1, s2, len1, len2, len2);
	}
	else{
		var result = needlemanwunsch.prototype.alignment(matpath, matscore, s1, s2, len1, len2, len2);
	}

	document.getElementById('matrices').innerHTML += 'Alignement 1:' + result[1] + '<br>';
	document.getElementById('matrices').innerHTML += 'Alignement 2:' + result[0] + '<br><br>';
	document.getElementById('matrices').innerHTML += 'Matrice sÃ©quences :' + this.matseq + '<br>';
	document.getElementById('matrices').innerHTML += 'Matrice scores :' + this.matscore + '<br>';
	document.getElementById('matrices').innerHTML += 'Matrice chemins :' + this.matpath + '<br>';
}

window.addEventListener("load", function ()
{
	algorithm();
}, true);

