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


it('returns the class name', function() {
  var Klass = new Class('Klass');

  assert(Klass.name == 'Klass', 'Class doesnt have expected Name');
});

it('should fail if name not provided', function() {
  try {
    new Class();
  } catch(e) {
    assert(e == 'First name should be provided in class definition', 'Name is mandatory')
  }
});

it('should allow creating instantiating a class', function() {
  var Klass = new Class('Klass');

  var object = Klass.new();

  assert(object != undefined || object != null, 'object not created by new')
});

it('should allow return the instance of class', function() {
  var Klass = new Class('Klass');

  var object = Klass.new();

  assert(object.class == Klass, 'object.class doesnt return class instance')
});


it('should allow add methods to class', function() {
  var method = function() {},
    Klass = new Class('Klass', {
      myMethod: method
    });

  var object = Klass.new();

  assert(typeof object.myMethod == 'function', 'method should be added to class')
});

it('should allow instantiating with values', function() {

  var Klass = new Class('Klass');

  var object = Klass.new({name: 'Anuj Jamwal'});

  assert(object.get('name') == 'Anuj Jamwal', 'object should have property name with value Anuj Jamwal')
});

it('should allow setting default values for attributes', function() {

  var Klass = new Class('Klass', {
	defaults: {name: 'Anuj Jamwal'}
  });

  var object = Klass.new();

  assert(object.get('name') == 'Anuj Jamwal', 'object should have property name with value Anuj Jamwal')
});

it('should call init for classes that supply one', function() {

  var Klass = new Class('Klass', {
	init: function(data) {}
  });

  var object = Klass.new({name: 'Anuj Jamwal'});

  assert(object.get('name') !== 'Anuj Jamwal', 'object should have not property name with value Anuj Jamwal as not declared in init')
});

it('should call init for classes that supply one', function() {

  var Klass = new Class('Klass', {
	init: function(data) {
		this.set('fullName', data.name);
	}
  });

  var object = Klass.new({name: 'Anuj Jamwal'});

  assert(object.get('name') !== 'Anuj Jamwal', 'object should have not property name with value Anuj Jamwal as not declared in init')
  assert(object.get('fullName') == 'Anuj Jamwal', 'object should have property fullName with value Anuj Jamwal')
});

it('should allow inheriting from another class', function() {
	var BaseClass = new Class('BaseClass', {
		method: function() {
			return 'BaseClass';
		},
		method2: function() {
			return 'Base';
		}
	}),
	Klass = new Class('Klass', {
		EXTENDS: BaseClass,
		method2: function() {
			return 'Child';
		}
	});
	
	var object = Klass.new({name: 'Anuj Jamwal'});
	
	assert(Klass.ancestor == BaseClass, 'ancestor must be set to BaseClass');
	assert(object.method() == 'BaseClass', 'methods from base class must be present');
	assert(object.super.method() == 'BaseClass', 'super must have the method from base class')
	assert(object.method2() == 'Child', 'override method from base class');
	assert(object.super.method2() == 'Base', 'access super class method using super');
});

it('should run init for base class', function() {
	var BaseClass = new Class('BaseClass', {
		init: function() {
			this.set('age', 23);
		},
		method: function() {
			return this.get('age')
		}
	}),
	Klass = new Class('Klass', {
		EXTENDS: BaseClass
	});
	
	var object = Klass.new({name: 'Anuj Jamwal'});

	assertEqual(object.method(), 23);
});

it('should run init for base class before child class', function() {
	var BaseClass = new Class('BaseClass', {
		init: function() {
			this.set('age', 23);
		},
		method: function() {
			return this.get('age')
		}
	}),
	Klass = new Class('Klass', {
		EXTENDS: BaseClass,
		init: function() {
			this.set('age', 33);
		}
	});
	
	var object = Klass.new({name: 'Anuj Jamwal'});

	assertEqual(object.method(), 33);
});

it('should allow building Class object from js prototypical class', function() {
	function Klass() {
		
	}
	Klass.prototype.age = function() {
		return 23;
	}

	var KlassJSClass = Class.fromClass(Klass, 'Klass'),
	ob = KlassJSClass.new();
	
	assert(ob.age() == 23, 'age method should be present in object')
	
});

it('should invoke constructor for a class via init', function() {
	function Klass() {
		this.set('age', 33);
	}

	var KlassJSClass = Class.fromClass(Klass, 'Klass'),
	ob = KlassJSClass.new();
	
	assert(ob.get('age') == 33, 'age method should be present in object')
	
});

it('should allow adding static methods to a class', function() {
	var Klass = new Class('Klass', {}, {
		staticMethod: function() {
			return 'static';
		}
	});
	assert(Klass.staticMethod() == 'static', 'Klass should have staticMethod')
});
