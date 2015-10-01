$(document).ready(function(){
	$('.equals').click(execute);
	$('.calc input[type="button"]:not(.equals):not(.backspace)').click(input);
	$('.backspace').click(backspace);
});

function input(){
	var statementField = document.getElementById('statement');
	statementField.value += this.value;
}

function backspace(){
	var statementField = document.getElementById('statement');
	statementField.value = statementField.value.slice(0,-1);
}

function execute(){
	var statementField = document.getElementById('statement');
	var s = statementField.value;
	var array = parseStatement(s);
	statementField.value = reduceArray(array);
}


