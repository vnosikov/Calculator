$(document).ready(function(){
	$('.equals').click(execute);
});

function execute(){
	var statementField = document.getElementById('statement');
	var s = statementField.value;
	var array = parseStatement(s);
	statementField.value = reduceArray(array);
}


