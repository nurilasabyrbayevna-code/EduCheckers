// Бөлімдер ауысу
const sections = {
  home: document.getElementById('home'),
  rules: document.getElementById('rules'),
  game: document.getElementById('game'),
  teacher: document.getElementById('teacher')
};

function showHome() { for (let sec in sections) sections[sec].classList.add('hidden'); sections.home.classList.remove('hidden'); }
function showRules() { for (let sec in sections) sections[sec].classList.add('hidden'); sections.rules.classList.remove('hidden'); }
function startGame() { for (let sec in sections) sections[sec].classList.add('hidden'); sections.game.classList.remove('hidden'); initBoard(); }
function showTeacher() { for (let sec in sections) sections[sec].classList.add('hidden'); sections.teacher.classList.remove('hidden'); }

// Дыбыстар
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');
const moveSound = new Audio('sounds/move.mp3');
const captureSound = new Audio('sounds/capture.mp3');
const crownSound = new Audio('sounds/crown.mp3');

// Сұрақтар (қазақ тілінің грамматикасы)
const questions = [
  { piece:'W1',question:'«Мен барамын, … сен үйде қаласың» – дұрыс шылау?',options:['бірақ','және','немесе'],answer:'бірақ'},
  { piece:'W2',question:'«Ол кітап оқиды, … сабаққа дайындалады» – дұрыс шылау?',options:['және','немесе','бірақ'],answer:'және'},
  { piece:'B1',question:'«Сен оқыдың ба, … мен де оқыдым» – дұрыс шылау?',options:['де','па','ме'],answer:'де'}
];

// Тақта және шашка жүйесі
let boardState = [], selectedPiece = null;

// Тақтаны инициализациялау
function initBoard(){
  const board = document.getElementById('board'); 
  board.innerHTML=''; 
  boardState=[];
  for(let i=0;i<64;i++){
    const cell=document.createElement('div'); 
    cell.classList.add('cell'); 
    if(Math.floor(i/8)%2===i%2) cell.classList.add('black'); else cell.classList.add('white');
    cell.dataset.index=i; 
    cell.addEventListener('click',()=>cellClick(i));
    board.appendChild(cell); 
    boardState.push(null);
  }
  // Ақ шашкаларды орналастыру
  [1,3,5,7,8,10,12,14,17,19,21,23].forEach((i,j)=>placePiece(i,'white','W'+(j+1)));
  // Қара шашкаларды орналастыру
  [40,42,44,46,49,51,53,55,56,58,60,62].forEach((i,j)=>placePiece(i,'black','B'+(j+1)));
}

// Шашка орналастыру
function placePiece(index,color,id){
  const cell=document.querySelector(`.cell[data-index='${index}']`);
  const piece=document.createElement('div');
  piece.classList.add('piece',color);
  piece.id=id;
  piece.addEventListener('click',(e)=>{e.stopPropagation(); selectPiece(id);});
  cell.appendChild(piece);
  boardState[index]=id;
}

// Шашка таңдау
function selectPiece(id){
  selectedPiece=id; 
  const q=questions.find(q=>q.piece===id); 
  if(q) showQuestion(q);
}

// Сұрақ көрсету
function showQuestion(q){
  const qt=document.getElementById('question-text');
  const ansDiv=document.getElementById('answers');
  qt.textContent=q.question; ansDiv.innerHTML='';
  q.options.forEach(opt=>{
    const btn=document.createElement('button'); btn.textContent=opt;
    btn.onclick=()=>checkAnswer(opt,q.answer);
    ansDiv.appendChild(btn);
  });
}

// Жауап тексеру
function checkAnswer(selected,correct){
  if(selected===correct){
    correctSound.play(); 
    moveSelectedPiece();
  } else {
    wrongSound.play(); 
    alert('Қате жауап! Қарсылас бір қадам алда жүре алады.');
  }
}

// Жүріс жасау
function moveSelectedPiece(){
  if(!selectedPiece) return;
  moveSound.play();
  alert(selectedPiece+' шашка жүріс жасайды!');
  selectedPiece=null;
}

// Қолдауды кейін толық шашка қозғалысы мен жеген шашка логикасын қосуға болады
