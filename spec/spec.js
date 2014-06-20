function assert(condition, message) {
    if(!condition) {
      throw message;
    }
}

function assertEqual(actual, expected) {
    if(actual == expected) return true;
    if(!isEqual(actual, expected)) {
      throw "Expected "+ actual+" to equal "+expected;
    }
}

function assertNotNull(actual) {
    if(!isEqual(actual, null)) {
      throw "Expected "+ actual+" to be null ";
    }
}

isEqual = function(val1, val2) {
  if([val1, val2].indexOf(null) > -1 && val1 == val2)
    return true
  
  if(typeof val1 != typeof val2) return false;
  if(typeof val1 == 'object') {
    if(!compareObjects(val1, val2)) return false;
  } else if (val1 != val2)
     return false;
  return true;
}

compareObjects = function(o1, o2){
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
};

function it(name, test) {
  var elem = document.createElement("li");
  elem.appendChild(document.createTextNode(name));

  try {
    test.apply(this);
	elem.setAttribute("class", "success")
    console.log("√ Test "+name+ " -- Passed");
  } catch(e) {
	elem.setAttribute("class", "error");
	elem.appendChild(document.createElement("br"));
	elem.appendChild(document.createTextNode(e));
    console.log("x Test "+name+ " -- Failed");
    console.log("    message -> "+e);
  }
  document.getElementById("tests").appendChild(elem);
}

