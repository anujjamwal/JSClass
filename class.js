function Class(name, definition) {
  var definition = Class.extend({}, definition);

  if(name == undefined || name == null || typeof name != 'string' || name.length < 1) {
    throw 'First name should be provided in class definition';
  }

  function Instance(self, data) {
    this.class = self;
	  this.attributes = Class.extend({}, definition.defaults);
	  var data = Class.extend({}, data);
	
	  if(self.ancestor) {
	  	this.super = self.ancestor.Meta.prototype
    	this.super.init.apply(this, data);
	  }
	
	  this.init(data);
  }
	
  Class.extend(Instance.prototype, this.__methods);

  if(definition.EXTENDS) {
	this.ancestor = definition.EXTENDS;
	Class.extend(Instance.prototype, this.ancestor.Meta.prototype)
  }

  Class.extend(Instance.prototype, definition);

  this.name = name;
  this.Meta = Instance;
}

Class.prototype.new = function(data) {

  var data = Class.extend({}, data), 
	  instance = new this.Meta(this, data);

  return instance;
};

Class.extend = function(destination, source) {
  if(source == undefined || source == null ) return destination;
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

Class.fromClass = function(klass, name) {
	var definition = Class.extend({}, klass.prototype);
	definition.init = klass;
	return new Class(name, definition);
}


Class.prototype.__methods = {
	get: function(key) {
		return this.attributes[key];
	},
	set: function(key, value) {
		this.attributes[key] = value;
	},

	init: function(data) {
		Class.extend(this.attributes, data);
	},

    toString: function() {
      return this.class.name + 'object'
    }
};
