
let toDos = [

]
let changingToDos = {

}
const token = localStorage.getItem('token')

if(!token) {
  window.location.href = './login.html'
}

function renderToDos() {
  const ulElement = document.querySelector('ul')
  ulElement.innerHTML = ''
  toDos.forEach(function(toDo){
     let zacherkivanie
    if   (toDo.is_done == true) {
      zacherkivanie = `zacherkivanie`
    }
    let content = `<span class= "perenos-texta ${zacherkivanie}">${toDo.text}</span><button class="is-done" id="button-${toDo.id}"> Выполнено </button> <button class="change" id="${toDo.id}-change">Редактировать </button> <button class="delete" id="${toDo.id}"> Удалить </button>`
    if   (changingToDos[toDo.id] == true) {
      content = `<input class="redaktirovanie" id="input-${toDo.id}" value ="${toDo.text}"><button class="otmena" id="otmena-${toDo.id}">Отмена</button> <button class="save" id="save-${toDo.id}">Сохранить</button>`
    }
    ulElement.innerHTML = `${ulElement.innerHTML} <li class="knopka-sprava-ot-texta">${content}</li>`
  });
  
  const buttonsIsDone = Array.from(document.querySelectorAll('.is-done'))
  buttonsIsDone.forEach(function (button,id) {
    button.onclick = function (event) {
      let buttonId = event.target.id
      let idIsDone = buttonId.replace("button-","")
      doneToDo(idIsDone,id)
    }
  })
  const buttonsDel = Array.from(document.querySelectorAll('.delete'))
  buttonsDel.forEach(function (button) {
    button.onclick = function (event) {
      deleteToDo(event.target.id)
    }
  })
  const buttonChange = Array.from(document.querySelectorAll('.change'))
  buttonChange.forEach(function (button) {
    button.onclick = function (event) {
      let buttonId = event.target.id
      let numberId = parseInt(buttonId.match(/\d+/))
      changeToDo(numberId)
    }
  })
  
  const buttonOtmena = Array.from(document.querySelectorAll('.otmena'))
  buttonOtmena.forEach(function (button) {
    button.onclick = function (event) {
      let buttonId = event.target.id
      let numberId = parseInt(buttonId.match(/\d+/))
      otmenaChange(numberId)
    }
  })
  
  const buttonSave = Array.from(document.querySelectorAll('.save'))
  buttonSave.forEach(function (button) {
    button.onclick = function (event) {
      let buttonId = event.target.id
      let idSave = buttonId.replace("save-","")
      let text = document.querySelector(`#input-${idSave}`).value
      saveChange(idSave,text)
    }
  })
  const buttonLogOut = document.querySelector('.log-out')
  buttonLogOut.onclick = logOut
}
function doneToDo(idIsDone,id) {
  fetch('http://127.0.0.1:2000/change', {method: 'put',
  headers:{
    Authorization: token,
    'Content-Type': 'application/json'
  } ,
  body: JSON.stringify({id: idIsDone, isDone: !toDos[id].is_done})
})
.then(function(response){
  error(response)
  getToDos()
})
}

function addToDo() {
  let textToDo = document.querySelector('input').value
  if (textToDo != ''){
  fetch('http://127.0.0.1:2000/addtodos', {
    method: 'post',
    headers:{
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({isDone: false, text: textToDo})
  }).then(function(response){ 
    error(response)
    getToDos()
    document.querySelector('input').value = ''
  })
}
}
const buttonAdd = document.querySelector('.add')
buttonAdd.onclick = function () {
    addToDo()
}
function deleteToDo(id) {
  fetch('http://127.0.0.1:2000/delete', {
    method: 'delete',
    headers:{
      Authorization: token
    },
    body: JSON.stringify({ id })
  }).then(function(response){ 
    error(response)
    getToDos()
  })
}
function changeToDo(id){
  changingToDos[id]=true
  renderToDos()
}
function otmenaChange(id){
  changingToDos[id] = false 
  renderToDos()
}
function saveChange(id, text){
  fetch('http://127.0.0.1:2000/change', {method: 'put',
  headers:{
    Authorization: token,
    'Content-Type': 'application/json'
  } ,
  body: JSON.stringify({id, text })
})
  .then(function(response){
    error(response)
    changingToDos[id] = false
    getToDos()
  })
}
function getToDos() {
fetch('http://127.0.0.1:2000/todos', {headers:{Authorization: token}})
  .then(function(response){
    error(response)
    response.json().then(function(data){
      toDos = data 
      renderToDos()
    })
  })
}
getToDos()

function logOut() {
     localStorage.removeItem('token')
      window.location.href = './login.html'
    }



 
document.querySelector('input').addEventListener('keypress', function(event) {
if (event.keyCode === 13) {
     addToDo()
 }
})
function error (response){
  let error = response.status
    if (error == 401) {
     alert('Ошибка авторизации');
     window.location.href = './login.html'
    }
}