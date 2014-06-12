function Class(name, definition) {
  var definition = this.extend({}, definition);

  if(name == undefined || name == null || typeof name != 'string' || name.length < 1) {
    throw 'First name should be provided in class definition';
  }

  function Instance(self, data) {
    this.class = self;
	  this.attributes = self.extend({}, definition.defaults);
	  if(self.ancestor) {
	  	this.super = self.ancestor.Meta.prototype
	  }
	  var data = self.extend({}, data);
	  this.init(data);
  }
	
  this.extend(Instance.prototype, this.__methods);

  if(definition.EXTENDS) {
	this.ancestor = definition.EXTENDS;
	this.extend(Instance.prototype, this.ancestor.Meta.prototype)
  }

  this.extend(Instance.prototype, definition);

  this.name = name;
  this.Meta = Instance;
}

Class.prototype.new = function(data) {

  var data = this.extend({}, data),
	  instance = new this.Meta(this, data);

  return instance;
};

Class.prototype.extend = function(destination, source) {
  if(source == undefined || source == null ) return destination;
  for (var property in source)
    destination[property] = source[property];
  return destination;
};


Class.prototype.__methods = {
	get: function(key) {
		return this.attributes[key];
	},
	set: function(key, value) {
		this.attributes[key] = value;
	},

	init: function(data) {
		this.class.extend(this.attributes, data);
	},

  toString: function() {
    return this.class.name + 'object'
  }
};
