$(document).ready(function(){
	$('.equals').click(execute);
	$('.calc input[type="button"]:not(.equals):not(.backspace)').click(input);
	$('.backspace').click(backspace);
	$('.erase').click(erase);
	
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
	$statement.value = $statement.value.slice(0,-1);
}

function erase(){
	var $statement = $('#statement')[0];
	$statement.value='';
}

function execute(){
	var $statement = $('#statement')[0];
	var s = $statement.value;
	var array = parseStatement(s);
	$statement.value = reduceArray(array);
}


