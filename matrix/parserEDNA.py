import json
import re
import os

EDNAFULL=open("EDNA/EDNAFULL.txt")
EDNAMAT=open("EDNA/EDNAMAT.txt")
EDNASIMPLE=open("EDNA/EDNASIMPLE.txt")

mat=open ("matrixEDNA.json","w")
mat.write("matrixEDNA=")
mat.write("{")

test=os.listdir("./EDNA")
test.reverse()
print test
def parserEDNA(matrix1,name):
	matrix=[]

	content= matrix1.read()
	lines= content.split("\n")

	for i in lines:
		j=i.split(" ")
		for k in range(len(j)):
			if j[0]=="#":
				pass

			if j[0]!="#":
				if re.match(r"[-][0-9]",j[k]) or re.match(r"[0-9]",j[k]):
						matrix.append(float(j[k]))	

	matrix2=json.dumps(matrix)
	print matrix2

	mat.write(name)
	mat.write(":")
	mat.write(matrix2)
	mat.write("\n")

liste=[EDNAFULL,EDNAMAT,EDNASIMPLE]
for i in range(len(test)):
	test1=test[i].split(".")

	parserEDNA(liste[i],test1[0])


EDNAFULL.close()
EDNAMAT.close()
EDNASIMPLE.close()
mat.write("}")
mat.close()