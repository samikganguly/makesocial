/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 function Person() {
  this.firstName = "";
  this.lastName="";
  
  
    function  getFirstName(){
        return firstName;
    }
    
    
    function  getlastName(){
        return lastName;
    }
    
    
    return  this;
}


function foo() {
  this.x = 2;
  return this;
}



function MyClass () {
  var privateVariable="abc"; // private member only available within the constructor fn

  this.getvalue = function () { // it can access private members
    return privateVariable;
  };
  
  this.setValue=function(value){
      this.privateVariable=value;
  };
  
}

// A 'static method', it's just like a normal function 
// it has no relation with any 'MyClass' object instance
MyClass.staticMethod = function () {};

MyClass.prototype.publicMethod = function () {
  // the 'this' keyword refers to the object instance
  // you can access only 'privileged' and 'public' members
  return this.privateVariable;
};


MyClass.prototype.setValue1=function(value){
    this.privateVariable=value;
}





