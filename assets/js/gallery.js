let img=document.getElementsByTagName('img')[0];
let caption = document.getElementsByTagName('figcaption')[0];
const form0= document.querySelector('form');

function showimg(e){
  e.preventDefault();
  let choice = document.getElementById("choice").value;
  let source = '../assets/images/'+choice+'.png';
  img.src = source;
  let src0=choice[0].toUpperCase();
  let srcr= choice.slice(1);
  let cap = src0 + srcr;
  caption.textContent = cap;
  img.alt= cap + 'logo';
}
let imgs= document.querySelectorAll('#imgsBox > img');
let iCount=imgs.length;
for(let i = 0; i < iCount; i++){
  imgs[i].addEventListener('click',
    function (){
      let cSrc= imgs[i].src;
      let cAlt= imgs[i].alt;
      img.src= cSrc;
      img.alt= cAlt;
      let ctxt= cAlt.slice(0,-5);
      let cl= ctxt.slice(1);
      let cF= ctxt[0].toUpperCase();
      let capt= cF + cl;
      caption.textContent = capt;
    }
  );
}

form0.addEventListener('submit', showimg);