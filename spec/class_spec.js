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
  try {
    test.apply(this);
    console.log("√ Test "+name+ " -- Passed");
  } catch(e) {
    console.log("x Test "+name+ " -- Failed");
    console.log("    message -> "+e);
  }
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
