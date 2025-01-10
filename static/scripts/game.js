import { Reseter, onCubeClick } from './dice.js';

let currentTurn = "Player"
let playerResult = "";
let cpuResult = "";
let diceValues = [];
let isWin = false;

function roll() {
  // 3つの乱数を取得（１〜６）
  return [
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 7),
  ];
}


// ターンを進行させる
function takeTurn() {
  diceValues = roll();
  const role = judgeChinchiro(...diceValues);

  if (currentTurn === "Player") {
      playerResult = role;
      document.getElementById("playerDice").textContent = `プレイヤーのサイコロ: ${diceValues.join(", ")} (${role})`;
      currentTurn = "CPU";
      document.getElementById("status").textContent = "CPUのターン";
  } else if (currentTurn === "CPU") {
      onCubeClick(diceValues);
      cpuResult = role;
      document.getElementById("cpuDice").textContent = `CPUのサイコロ: ${diceValues.join(", ")} (${role})`;
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
  } else if (playerResult === "シゴロ" || playerResult === "ピンゾロ" || cpuResult === "ヒフミ" || cpuResult === "ションベン" || (playerResult !== "役なし" && cpuResult === "役なし")) {
    resultMessage = "プレイヤーの勝ち！";
    isWin = true;
  } else if (cpuResult === "シゴロ" || cpuResult === "ピンゾロ" || playerResult === "ヒフミ" || playerResult === "ションベン" || (cpuResult !== "役なし" && playerResult === "役なし")) {
    resultMessage = "CPUの勝ち！";
    // plyerゾロ目,cpu それ以外
  } else if ((playerResult > cpuResult) || pl_zoro){
    resultMessage = "プレイヤーの勝ち！";
    isWin = true;
  } else if ((playerResult < cpuResult) || cpu_zoro){
    resultMessage = "CPUの勝ち！"; 
  } else {
    resultMessage = "???";
  }
  document.getElementById("result").textContent = `結果: ${resultMessage}`;
  document.getElementById("rollButton").disabled = true;
  document.getElementById("startGameButton").disabled = true;
  document.getElementById("resultButton").disabled = false;
  document.getElementById("status").textContent = "ゲーム終了";

  document.getElementById("playerDice").value = playerDice;
  document.getElementById("cpuDice").value = cpuDice;
  document.getElementById("isWin").value = isWin;
  setTimeout(() => {
    Reseter();
  }, 3000);
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

// 遷移ボタンのクリックイベント
document.getElementById('resultButton').addEventListener('click',  () => {
  document.getElementById("gameForm").submit();
});

// サイコロを振るボタンのクリックイベント
document.getElementById("rollButton").addEventListener("click", () => {
  if (currentTurn === "Player") {
      takeTurn();
      onCubeClick(diceValues);
      setTimeout(() => {
        Reseter();
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
  document.getElementById("status").textContent = "プレイヤーのターン";
  document.getElementById("rollButton").disabled = false;
  document.getElementById("playerDice").textContent = "プレイヤーのサイコロ: -";
  document.getElementById("cpuDice").textContent = "CPUのサイコロ: -";
  document.getElementById("result").textContent = "結果: -";
});

