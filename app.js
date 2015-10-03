$(document).ready(function(){
	$('.equals').click(execute);
	$('.calc input[type="button"]:not(.equals):not(.backspace)').click(input);
	$('.backspace').click(backspace);
	
	$('input').on('keypress', function(e){
		if(e.keyCode == 13){
			e.preventDefault();
			execute();
		}
	});
});

function input(){
	var $statement = $('#statement')[0];
	$statement.value += this.value;
}

function backspace(){
	var $statement = $('#statement')[0];
	$statement.value = statementField.value.slice(0,-1);
}

function execute(){
	var $statement = $('#statement')[0];
	var s = $statement.value;
	var array = parseStatement(s);
	statementField.value = reduceArray(array);
}


