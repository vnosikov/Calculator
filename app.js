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

var $statement = $('#statement')[0];

function input(){
	$statement.value += this.value;
}

function backspace(){
	$statement.value = $statement.value.slice(0,-1);
}

function erase(){
	$statement.value='';
}

function execute(){
	var s = $statement.value;
	var array = parseStatement(s);
	$statement.value = reduceArray(array);
}


