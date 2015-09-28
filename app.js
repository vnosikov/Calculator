/*var s = prompt("Input your statement: ");
	
var array = parseStatement(s);
alert(reduceArray(array));*/

function execute(){
	var statementField = document.getElementById('statement');
	var s = statementField.value;
	var array = parseStatement(s);
	statementField.value = reduceArray(array);
}


function parseStatement(s){
	s = s.replace(/\s+/g, '');
	var arr = new Array();
	
	var curnum='';
	var specsyms = ['*','/','+','-','(',')'];
	var numsyms = ['1','2','3','4','5','6','7','8','9','0','.'];
	
	for (var i=0; i<s.length; i++){
		cursym = s[i];
		if(contains(specsyms, cursym)){
			if(curnum!=''){
				arr.push(parseInt(curnum));
				curnum = '';
			}
			arr.push(cursym);
		}
		else if(contains(numsyms,cursym)){
			curnum = curnum + cursym;
		}
		else{
			throw new Error("Incorrect symbol in a statement");
		}
	}
	
	if(curnum!=''){
		arr.push(parseInt(curnum));
	}
	
	return arr;
}

function reduceArray(arr){
	if(arr.length == 1){
		return arr[0];
	}
	
	if(!contains(arr, '(')){
		arr = simplifyWithoutBrackets(arr, ['*', '/']);
		arr = simplifyWithoutBrackets(arr, ['+', '-']);
	}
	
	else{
		var firstIndex = arr.indexOf('(');
		var lastIndex;
		var bracketCounter=1;
		for(var i=firstIndex+1; i<arr.length; i++){
			if(arr[i]=='('){ bracketCounter++;}
			if(arr[i]==')'){bracketCounter--;}
			if(bracketCounter<=0){ lastIndex =i; break;}
		}
		var statementInBrackets = arr.slice(firstIndex+1, lastIndex);
		arr.splice(firstIndex, lastIndex-firstIndex+1, reduceArray(statementInBrackets));
	}
					
	return reduceArray(arr);
	
	
	function simplifyWithoutBrackets(arr, ops){
		var newArr = new Array();
		for(i=0; i<arr.length; i++){
			var elem = arr[i];
			if(contains(ops, elem)){
				newArr.push(eval(elem, newArr.pop(), arr[++i]));
			}
			else{
				newArr.push(elem);
			}
		}
		
		return newArr;
	}
}

function eval(op, lv, rv){
	switch(op){
		case '+':
			return lv+rv;
		case '-':
			return lv-rv;
		case '*':
			return lv*rv;
		case '/':
			return lv/rv;
		default:
			throw new Error("False ops identifier");
	}
}

function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}