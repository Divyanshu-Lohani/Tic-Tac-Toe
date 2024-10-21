let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newGame = document.querySelector(".new-game")
let resetBtn = document.querySelector(".reset-btn");

let turnO = true;
let count = 0;


let winnigPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBox();
  clearBoxes();
  msgContainer.classList.add("hide");
};

const clearBoxes = () => {
    boxes.forEach((box) => {
    box.innerHTML = ""
    box.classList.remove("black");
    ;} )
}

const disabledBox = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(box of boxes){
        box.disabled = false;
    }
}

const gameDraw = () => {
    msg.innerText = "Draw!";
    msgContainer.classList.remove("hide");
    disabledBox();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
      box.classList.add("black");
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;
    count++
    let isWinner = checkWinner();
    
    if (count === 9 && !isWinner){
        gameDraw();
    }

  });
});

const showWinner = (winner) => {
    msg.innerText =  `Congratulations, Winner is ${winner}!!`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
  for (let pattern of winnigPattern) {
    let postion1 = boxes[pattern[0]].innerText;
    let postion2 = boxes[pattern[1]].innerText;
    let postion3 = boxes[pattern[2]].innerText;

    if (postion1 != "" && postion2 != "" && postion3 != ""){
        if (postion1 == postion2 && postion2 == postion3){
            disabledBox();
            showWinner(postion1);
        }
    }
  }
};


resetBtn.addEventListener("click", resetGame);


newGame.addEventListener("click", resetGame);

