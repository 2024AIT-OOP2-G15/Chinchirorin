import { Reseter, onCubeClick } from './dice.js';

let currentTurn = "Player"
let playerResult = "";
let cpuResult = "";
let diceValues = [];
let isWin = 1;

document.getElementById("rollButton").style.display = "none";

function roll() {
  // 3つの乱数を取得（１〜６）
  let rand1 = Math.floor(Math.random() * 6) + 1
  let rand2 = Math.floor(Math.random() * 6) + 1
  let rand3 = Math.floor(Math.random() * 6) + 1
  if(Math.floor(Math.random() * 9)==0){
    rand1 = 0
  }
  if(Math.floor(Math.random() * 9)==0){
    rand2 = 0
  }
  if(Math.floor(Math.random() * 9)==0){
    rand3 = 0
  }
  return [
    rand1,rand2,rand3
  ];
}


// ターンを進行させる
function takeTurn() {

  diceValues = roll();
  const role = judgeChinchiro(...diceValues);

  if (currentTurn === "Player") {
      playerResult = role;
      document.getElementById("playerDice").textContent = ` ${diceValues.join(", ")} (${role})`;
      currentTurn = "CPU";
  } else if (currentTurn === "CPU") {
      onCubeClick(diceValues);
      cpuResult = role;
      document.getElementById("cpuDice").textContent = `${diceValues.join(", ")} (${role})`;
      determineWinner();
  }
}

// 勝敗を決定する
function determineWinner() {
  let resultMessage = "";
  // 正規表現でゾロ目か否かを判定 
  const zoro = /のゾロ目/;
  const pl_zoro = zoro.test(playerResult);
  const cpu_zoro = zoro.test(cpuResult);
  
  if (playerResult === cpuResult) {
    resultMessage = "引き分け！";
    isWin = 1;
  } else if (playerResult === "シゴロ" || playerResult === "ピンゾロ" || cpuResult === "ヒフミ" || cpuResult === "ションベン" || (playerResult !== "役なし" && cpuResult === "役なし")) {
    resultMessage = "プレイヤーの勝ち！";
    isWin = 2;
  } else if (cpuResult === "シゴロ" || cpuResult === "ピンゾロ" || playerResult === "ヒフミ" || playerResult === "ションベン" || (cpuResult !== "役なし" && playerResult === "役なし")) {
    resultMessage = "CPUの勝ち！";
    isWin = 0;
    // plyerゾロ目,cpu それ以外
  } else if ((playerResult > cpuResult) || pl_zoro){
    resultMessage = "プレイヤーの勝ち！";
    isWin = 2;
  } else if ((playerResult < cpuResult) || cpu_zoro){
    resultMessage = "CPUの勝ち！"; 
    isWin = 0;
  } else {
    resultMessage = "???";
  }
  document.getElementById("rollButton").disabled = true;
  document.getElementById("status").textContent = `${resultMessage} `;
  setTimeout(() => {
    // ボタンを非表示にする
    document.getElementById("rollButton").style.display = "none";
    document.getElementById("startGameButton").style.display = "block";
    Reseter();
  }, 3000);

  const result = {
    "name": playerName,
    "isWin": isWin,
    "playerDice": playerResult,
    "cpuDice": cpuResult
  }
  console.log(result);
  setTimeout(() => {
    send(result)
  }, 2000);
  
}

function send(result) {
  fetch('/game/manager', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "data": result }) // 送信するデータ
  })
  .then(response => {
    if (response.redirected) {
      window.location.href = response.url; // リダイレクト先へ遷移
    }
  })
  .catch(error => {
    console.error('[ERROR] in send function.', error);
  });
}
// 役を判定する関数
function judgeChinchiro(dice1, dice2, dice3) {
  const dice = [dice1, dice2, dice3].sort((a, b) => a - b);

  // ションベンになる場合
  if(dice[0] === 0 || dice[1] === 0 || dice[2] === 0) {
    return "ションベン";
  }

  // シゴロ (4, 5, 6)
  if (dice[0] === 4 && dice[1] === 5 && dice[2] === 6) {
      return "シゴロ";
  }

  // ヒフミ (1, 2, 3)
  if (dice[0] === 1 && dice[1] === 2 && dice[2] === 3) {
      return "ヒフミ";
  }

  // ゾロ目
  if (dice[0] === dice[1] && dice[1] === dice[2]) {
      if (dice[0] === 1) {
          return "ピンゾロ";
      } else {
          return `${dice[0]}のゾロ目`;
      }
  }

  // 役なし (全て異なる目)
  if (dice[0] !== dice[1] && dice[1] !== dice[2]) {
      return "役なし";
  }

  // 同じ目が2つの場合 （残りの目が役になる）
  const uniqueNumbers = [...new Set(dice)];
  if (uniqueNumbers.length === 2) {
      const single = dice[0] === dice[1] ? dice[2] : dice[0];
      return `${single}の目`;
  }
}

// サイコロを振るボタンのクリックイベント
document.getElementById("rollButton").addEventListener("click", () => {
  if (currentTurn === "Player") {
      takeTurn();
      onCubeClick(diceValues);
      setTimeout(() => {
        Reseter();
        document.getElementById("status").textContent = "CPUのターン";
      }, 3000);
      setTimeout(() => {
        takeTurn();
      }, 6000);
  }
  
});

// ゲームスタート時のボタン
document.getElementById("startGameButton").addEventListener("click", () => {
  currentTurn = "Player";
  playerResult = "";
  cpuResult = "";
  document.getElementById("status").textContent = `${playerName}のターン`;
  document.getElementById("rollButton").disabled = false;
  document.getElementById("playerDice").textContent = "-";
  document.getElementById("cpuDice").textContent = "-";

  // ボタンを非表示にする
  document.getElementById("startGameButton").style.display = "none";
  document.getElementById("rollButton").style.display = "block";

});
