var data = {
		names:{ //ids für Validation
	        login: "loginR",
			email: "emailR",
			password: "passwordR",
			confirmPassword: "confirmPassword",
			loginError: "loginErrorTextRegistration",
			passwordError: "passwordRErrorTextRegistration",
			confirmPasswordError: "confirmPasswordErrorTextRegistration",
			emailError: "emailRErrorTextRegistration",
			signUp: "signUp"
		},
		elements: {} //hier werden Objekte aus HTML hinzufügt
};
//hier füge ich Objekte hinzu
for(var key in data.names){
	data.elements[key] = document.getElementById(data.names[key]);
}

/**
 * also Validation
 */
function Validation(){ 
	
	this.events = ["onchange", "onkeyup", "onkeydown"];
	/**
	 * Validation nach Laenge 
	 */
	this.minValue = function(element, element1,minLength, errorElement, errorMessage){
		for(var i = 0; i < this.events.length; i++){
			element[this.events[i]] = function(){
				if(element.value.length < minLength){
					errorMessage.classList.remove("hidden");
					errorMessage.innerHTML = "This " + errorElement + " is too short";
					element.className += " error";
					element1.className = "readOnly";
				}
				else{
					errorMessage.className += " hidden";
					errorMessage.innerHTML = "";
					element.classList.remove("error");
					element1.classList.remove("readOnly");
				}
				
			}
		}
	}
	
	/**
	 * Validation nach Email 
	*/
	this.emailValid = function(element, element1, errorMessage){
		for(var i = 0; i < this.events.length; i++){
			element[this.events[i]] = function(){
				if(!validateEmail(element.value)){
					errorMessage.classList.remove("hidden");
					errorMessage.innerHTML = "This email is invalid";
					element.className += " error";
					element1.className = "readOnly";
				}
				else{
					errorMessage.className += " hidden";
					errorMessage.innerHTML = "";
					element.classList.remove("error");
					element1.classList.remove("readOnly");
				}
			}
		}
	}
	function validateEmail(email){	//Erhlich gesagt habe ich diese Funktion einfach auf der StackOverflow kopiert.
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	
	this.signUp = function(element){
		element.signUp.onclick = function(){
			if(data.elements.login.value.length < 3){
				data.elements.loginError.classList.remove("hidden");
				data.elements.loginError.innerHTML = "This field is required";
				data.elements.login.className += " error";
				
			}
			else{
				data.elements.loginError.className += " hidden";
				data.elements.loginError.innerHTML = "";
				data.elements.login.classList.remove("error");
			}
			
			if(data.elements.password.value.length < 6){
				data.elements.passwordError.classList.remove("hidden");
				data.elements.passwordError.innerHTML = "This field is required";
				data.elements.password.className += " error";
			}
			else{
				data.elements.passwordError.className += " hidden";
				data.elements.passwordError.innerHTML = "";
				data.elements.password.classList.remove("error");
			}
			
			if(data.elements.confirmPassword.value.length < 6){
				data.elements.confirmPasswordError.classList.remove("hidden");
				data.elements.confirmPasswordError.innerHTML = "This field is required";
				data.elements.confirmPassword.className += " error";
			}
			else{
				data.elements.confirmPasswordError.className += " hidden";
				data.elements.confirmPasswordError.innerHTML = "";
				data.elements.confirmPassword.classList.remove("error");
			}
			
			if(!validateEmail(data.elements.email.value)){
				data.elements.emailError.classList.remove("hidden");
				data.elements.emailError.innerHTML = "This field is required";
				data.elements.email.className += " error";
			}
			else{
				data.elements.emailError.className += " hidden";
				data.elements.emailError.innerHTML = "";
				data.elements.email.classList.remove("error");
			}
			if(data.elements.password.value != data.elements.confirmPassword.value){
				data.elements.confirmPasswordError.classList.remove("agreement");
				data.elements.confirmPasswordError.innerHTML = "This password is uncoincident";
				data.elements.confirmPassword.className += " error";
			}
			else{
				data.elements.confirmPasswordError.className += " agreement";
				data.elements.confirmPasswordError.innerHTML = "";
				data.elements.confirmPassword.classList.remove("error");
			}
		}
	}
	
	this.psw = function(element1, element2, element3, errorElement, errorMessage){
		for(var i = 0; i < this.events.length; i++){
			element1[this.events[i]] = function(){
				if(element1.value != element2.value){
					errorMessage.classList.remove("agreement");
					errorMessage.innerHTML = "This " + errorElement + " is uncoincident";
					element2.className += " error";
					element3.className = "readOnly";
				}
				else{
					errorMessage.className += " agreement";
					errorMessage.innerHTML = "";
					element2.classList.remove("error");
					element3.classList.remove("readOnly");
				}
			}
		}
	}
}


var validObj = new Validation();
validObj.minValue(data.elements.login, data.elements.signUp, 3, "login", data.elements.loginError);
validObj.minValue(data.elements.password, data.elements.signUp, 6, "password", data.elements.passwordError);
validObj.minValue(data.elements.confirmPassword, data.elements.signUp, 6, "password", data.elements.confirmPasswordError);
validObj.emailValid(data.elements.email, data.elements.signUp, data.elements.emailError);
validObj.signUp(data.elements);
validObj.psw(data.elements.password, data.elements.confirmPassword, data.elements.signUp, "password",  data.elements.confirmPasswordError);