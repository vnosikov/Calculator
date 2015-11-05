$(document).ready(function(){
	$('.equals').click(execute);
	$('.calc input[type="button"]:not(.equals):not(.backspace)').click(input);
	$('.backspace').click(backspace);
	$('.erase').click(erase);
	
	$(document).on('keypress', onKey);
	
	$statement.focus();
});

var $statement = $('#statement')[0];

function input(){
	$statement.value += this.value;
	
	$statement.focus();	
}

function backspace(){
	$statement.value = $statement.value.slice(0,-1);
	
	$statement.focus();	
}

function erase(){
	$statement.value='';
	
	$statement.focus();	
}

function execute(){
	var s = $statement.value;
	try{
		var array = parseStatement(s);
		$statement.value = validateAndReduceArray(array);
	}
	catch(err){
		alert(err);
	}
	
	$statement.focus();	
}

function onKey(e){	
	$statement.focus();
	
	//ENTER
	if(e.keyCode == 13){
		e.preventDefault();
		execute();
	}
}
