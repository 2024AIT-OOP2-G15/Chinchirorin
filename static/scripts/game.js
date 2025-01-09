
let currentTurn = "Player"
let playerResult = "";
let cpuResult = "";

function roll() {
  // 3つの乱数を取得（１〜６）
  return [
    Math.ceil(Math.random() * 6),
    Math.ceil(Math.random() * 6),
    Math.ceil(Math.random() * 6),
  ];
}


// ターンを進行させる
function takeTurn() {
  const diceValues = roll();
  const role = judgeChinchiro(...diceValues);

  if (currentTurn === "Player") {
      playerResult = role;
      document.getElementById("playerDice").textContent = `プレイヤーのサイコロ: ${diceValues.join(", ")} (${role})`;
      currentTurn = "CPU";
      document.getElementById("status").textContent = "CPUのターン";
      setTimeout(takeTurn, 2000); // CPUのターンを少し遅らせる
  } else if (currentTurn === "CPU") {
      cpuResult = role;
      document.getElementById("cpuDice").textContent = `CPUのサイコロ: ${diceValues.join(", ")} (${role})`;
      determineWinner();
  }
}

// 勝敗を決定する
function determineWinner() {
  let resultMessage = "";
  if (playerResult === "シゴロ" || playerResult === "ピンゾロ" || cpuResult === "ヒフミ" || cpuResult === "ションベン") {
      resultMessage = "プレイヤーの勝ち！";
  } else if (cpuResult === "シゴロ" || cpuResult === "ピンゾロ" || playerResult === "ヒフミ" || playerResult === "ションベン") {
      resultMessage = "CPUの勝ち！";
  } else {
      resultMessage = "引き分け！";
  }
  document.getElementById("result").textContent = `結果: ${resultMessage}`;
  document.getElementById("rollButton").disabled = true;
  document.getElementById("status").textContent = "ゲーム終了";
}


// 役を判定する関数
function judgeChinchiro(dice1, dice2, dice3) {
  const dice = [dice1, dice2, dice3].sort((a, b) => a - b);

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

  // ションベンになる場合
  return "ションベン";
}


// サイコロを振るボタンのクリックイベント
document.getElementById("rollButton").addEventListener("click", () => {
  if (currentTurn === "Player") {
      takeTurn();
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