
let login = document.querySelector('.login')
let password = document.querySelector('.password')
const buttonLogin = document.querySelector('.button-login')
function loginUser(){
    fetch('http://127.0.0.1:2000/login',{  
  method:'post',
    headers:{
     'Content-Type': 'application/json'},
    body: JSON.stringify({email:login.value,
    password: password.value })
  }).then(function(response){
    response.json().then(function(data){
      if (data.token) {localStorage.setItem('token', data.token)
      window.location.href = './index.html'}
    })
  })
} 
buttonLogin.onclick = function(){
  console.log(login.value)
  console.log(password.value)
  if(login.value == '') {
    document.querySelector('.login').classList.add('error1')
    } 
    if( password.value == ''){
      document.querySelector('.password').classList.add('error2')
    }
    else
  loginUser()
}
function loginAndPassword(){

}
function error1(){

}