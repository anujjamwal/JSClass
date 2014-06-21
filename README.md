JSClass
=======

A simple way to create classes and objects in javascript code by hiding the prototype inheritence

Class
=====

A class can created using function Class. It Expects a name and the body of the class

```js
var Person = new Class('Person', {
    name: function() {
        return "James Bond";
    }
});
```
Every class has a name attribute set to the name passed while creating class
```js
Person.name     // 'Person'
```

#### Instantiating

Objects can be created using the method new with class Object

```js
var james = Person.new({fname: 'James'});
```
Every Class is supplied with an 'init' method to initialize the object. By default this method sets the values passes new method to attributes hash. The method can be overridden in case different behaviour is required
```js
var Person = new Class('Person', {
    init: function(data) {
    	this.fname = data.fname;
    	this.lname = data.lname;
    },
    
    name: function() {
	return this.fname + " " + this.lname;
    }
});

var ob = Person.new({fname: 'James', lname: 'Bond'});
ob.get('fname');                 // undefined
ob.fname;                        // 'James'
ob.name();	                 // 'James Bond'
```

Create class form js constructor
```js
function Person() {
	this.fname = 'James';
	this.lname = 'Bond';
}

Person.prototype.name = function() {
	return this.fname + " " + this.lname;
}

var PersonClass = Class.fromClass(Person, 'Person');
var object = PersonClass.new();
object.name()               // 'James Bond'
```

#### Getter and Setter
The attributes are accessed using get and set method.

```js
var fname = james.get("fname");  // James
var lname = james.get("lname");  // undefined

james.set("lname", "Bond");      
var lname = james.get("lname");  // Bond
```

All the properties are saved within attributes hash inside the object

```js
var fname = james.attributes.fname  // james.get("fname");

james.attributes.lname = "Bond";    // james.set("lname", "Bond");  
```

Class Reference is saved inside the class attribute in object

```js
james.class        // Person class 
james.class.name   // 'Person'
```

## Inheritence
A class can inherit another class methods using EXTENDS clause in class definition

```js
var Person = new Class('Person', {
    name: function() {
        return "James Bond";
    }
}),

Employee = new Class('Employee', {
    EXTENDS: Person,
    fullName: function() {
        return this.name();
    }
});

var employee = Employee.new({})

employee.fullName();  // "James Bond"
```
The object has 'super' attribute used to access method versions from parent class


```js
var Person = new Class('Person', {
    name: function() {
        return "James Bond";
    }
}),

Employee = new Class('Employee', {
    EXTENDS: Person,
    name: function() {
        return this.super.name() + '<Dev>';
    }
});

var employee = Employee.new({})

employee.name();  // "James Bond<Dev>"
```
