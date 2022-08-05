let name = document.querySelector(".name")
let login = document.querySelector(".login")
let password = document.querySelector(".password")
const buttonRegistration = document.querySelector(".button-registration")
function registrationUser(){
    fetch("http://127.0.0.1:2000/registration",{  
  method:"post",
    headers:{
     "Content-Type": "application/json"},
    body: JSON.stringify({name: name.value,
    email: login.value,
    password: password.value })
  }).then(function(response){
    response.json().then(function(data){
      if (data.token) {localStorage.setItem('token', data.token)
      window.location.href = './index.html'}
    })
  })
} 
buttonRegistration.onclick = function(){
  if(login.value == "") {
    document.querySelector(".login").classList.add('error1')
    } else if( password.value == ""){
      document.querySelector(".password").classList.add('error2')
    } else if( name.value == ""){
      document.querySelector(".name").classList.add('error3')
    } else {
      registrationUser()
    }
}
function loginAndPassword(){

}
function error1(){

}