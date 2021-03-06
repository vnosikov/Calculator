function parseStatement(s){
	s = s.replace(/\s+/g, '');
	var arr = new Array();
	
	var cursym, curnum='';
	var specsyms = ['*','/','+','-','^','(',')'];
	var numsyms = ['1','2','3','4','5','6','7','8','9','0','.'];
	
	//We need this var to ensure that minus is a binary operator if it stands after a closing bracketCounter
	var lastsym = '';
	
	for (var i=0; i<s.length; i++){
		cursym = s[i];
		if(contains(specsyms, cursym)){
			if(curnum!=''){
				arr.push(parseFloat(curnum));
				curnum = '';
			}
			//special case for minus as an unary operator
			else if(cursym == '-' && lastsym != ')'){
				curnum = cursym;
				continue;
			}
			arr.push(cursym);
		}
		else if(contains(numsyms,cursym)){
			curnum = curnum + cursym;
		}
		else{
			throw new Error("Incorrect symbol in a statement");
		}
		lastsym  = cursym;
	}
	
	if(curnum!=''){
		arr.push(parseFloat(curnum));
	}
	
	return arr;
}

function validateAndReduceArray(arr){
	validateBrackets(arr);
	return reduceArray(arr);
}

function validateBrackets(arr){
	counter=0;
	for(var i =0; i< arr.length; i++){
		if(arr[i] == '(') counter++;
		if(arr[i] == ')') counter--;
		if(counter<0){
			throw new Error("Error in an order or a number of brackets");
		}
	}
	
	if(counter != 0){
		throw new Error("Error in an order o ar number of brackets");
	}
}

function reduceArray(arr){
	
	if(arr.length == 1){
		return arr[0];
	}
	
	if(!contains(arr, '(')){
		arr = simplifyWithoutBrackets(arr, ['^']);
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
		case '^':
			return Math.pow(lv,rv);
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