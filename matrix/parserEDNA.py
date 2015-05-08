"This program will parse matrix files to convert them into objects usable by JS files"
# libraries' imports for create the parser
## librairy to create the json object
import json
import os
## library for using regular expressions
import re


# opening of all files, each containing an EDNA matrix
EDNAFULL=open("EDNA/EDNAFULL.txt")
EDNAMAT=open("EDNA/EDNAMAT.txt")
EDNASIMPLE=open("EDNA/EDNASIMPLE.txt")

#opening of the file which will be writed
mat=open ("matrixEDNA.json","w")
#creation of the beginning of the file
mat.write("matrixEDNA=")
mat.write("{")

test=os.listdir("./EDNA")
print test
def parserEDNA(matrix1,name):
	#reading of the matrix file, line by line
	matrix=[]
	content= matrix1.read()
	lines= content.split("\n")
	#for each line, delete spaces, write the matrix name and, after, scores into the matrix
	for i in lines:
		j=i.split(" ")
		for k in range(len(j)):
			if j[0]=="#":
				pass

			if j[0]!="#":
				if re.match(r"[-][0-9]",j[k]) or re.match(r"[0-9]",j[k]):
						matrix.append(float(j[k]))	
	#convert the Python list in JSON object
	matrix2=json.dumps(matrix)
	#writing in the JSON document of the matrix
	mat.write(name)
	mat.write(":")
	mat.write(matrix2)
	mat.write("\n")

#execution of the parser for all matrices 
liste=[EDNAFULL,EDNAMAT,EDNASIMPLE]
for i in range(len(test)):
	test1=test[i].split(".")

	parserEDNA(liste[i],test1[0])

# closing of all matrix files, writing the end of the JSON file et closing of this one
EDNAFULL.close()
EDNAMAT.close()
EDNASIMPLE.close()
mat.write("}")
mat.close()