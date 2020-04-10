#!/bin/bash

#Before launch:
#  - install miniconda
#  - create environment: $ conda env create --file environment.yml 

#Activate conda env
if [ -d "${HOME}/miniconda3" ]; then   
    source ${HOME}/miniconda3/etc/profile.d/conda.sh 
else
    CONDA_BASE=$(conda info --base) 
    source ${CONDA_BASE}/etc/profile.d/conda.sh 
fi
conda activate pythonCheatsheet

#Convert MD to html
mdFile=../README.md
grip --title=" " --export ${mdFile}

#Convert html to PDF
#  For full help, $ wkhtmltopdf --readme
ouputFile=../Comprehensive-Python-Cheatsheet.pdf
wkhtmltopdf --footer-left '[section] / [subsection]' --footer-line --footer-right '[page]' toc "${mdFile//.md/}.html" "${ouputFile}"
