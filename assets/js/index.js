const form0= document.querySelector('form');
const textbtn1= document.querySelector('#txtChanger1');
const colbtn1= document.querySelector('#colorChanger1');
const textbtn0= document.querySelector('#txtChanger0');
const colbtn0= document.querySelector('#colorChanger0');

function showp(e){
  e.preventDefault();
  let demoin = document.getElementById('demoin').value;
  let demop = document.getElementById('demop');
  demop.style.display='block';
  if (demoin==''){
    demop.style.color='black';
    demop.style.borderColor='red';
    demop.textContent='Please, Insert a text';
  }
  else{
    demop.style.color='black';
    demop.style.borderColor='blue';
    demop.textContent=demoin;
  }
}

function tohello() {
  let demoin = document.getElementById('demoin').value;
  let demop = document.getElementById('demop')
  demop.style.display='block';
  if (demoin == '') {
    demop.style.borderColor = 'red';
    demop.textContent = 'Please, Insert a text';
  }
  else {
    demop.textContent = 'Hello';
  }
}
function tored() {
  let demoin = document.getElementById('demoin').value;
  let demop = document.getElementById('demop')
  demop.style.display='block';
  if (demoin == '') {
    demop.style.borderColor = 'red';
    demop.textContent = 'Please, Insert a text';
  }
  else {
    demop.style.color = 'red';
  }
}
function toin() {
  let demoin= document.getElementById('demoin').value;
  let demop = document.getElementById('demop');
  demop.style.display='block';
  if (demoin == '') {
    demop.style.borderColor = 'red';
    demop.textContent = 'Please, Insert a text';
  }
  else {
    demop.textContent = demoin;
  }
}
function toblack() {
  let demop = document.getElementById('demop')
  demop.style.display='block';
  if (demoin == '') {
    demop.style.borderColor = 'red';
    demop.textContent = 'Please, Insert a text';
  }
  else {
    demop.style.color = 'black';
  }
}
let lists= document.querySelectorAll('#logerList li');
let listCount= lists.length;
for (let i = 0; i < listCount; i++){
  lists[i].addEventListener('click',
    function(event){
      let clicked= event.currentTarget;
      let next= clicked.nextElementSibling;
      if(next!=null){
        console.log(next.textContent);
      }else{
        console.log('No more list item!')
      }
    }
  );
}

form0.addEventListener('submit', showp);
txtChanger1.addEventListener('click', tohello);
colorChanger1.addEventListener('click', tored);
txtChanger0.addEventListener('click', toin);
colorChanger0.addEventListener('click', toblack);
