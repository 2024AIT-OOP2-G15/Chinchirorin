// 仮で数字を送るだけの処理を書いています。

// グローバル変数
let turn = "あなた";

// 初期化
document.addEventListener('DOMContentLoaded', (event) => {
  const turnDisp = document.getElementById("turn");
  turnDisp.textContent = turn;
});

// ターン切り替え
function toggleTurn() {
  if (turn === "あなた") {
    turn = "CPU";
  } else if (turn === "CPU") {
    turn = "あなた";
  }

  const turnDisp = document.getElementById("turn");
  turnDisp.textContent = turn;
}

// サイコロの処理
function roll() {
  // 3つの乱数を取得（１〜６）
  let rand1 = Math.floor(Math.random() * 6) + 1;
  let rand2 = Math.floor(Math.random() * 6) + 1;
  let rand3 = Math.floor(Math.random() * 6) + 1;

  // ションベン判定
  if (Math.floor(Math.random() * 50) === 0) {
    rand1 = 0; // 0が飛び出した判定
  }
  if (Math.floor(Math.random() * 50) === 0) {
    rand2 = 0; // 0が飛び出した判定
  }
  if (Math.floor(Math.random() * 50) === 0) {
    rand3 = 0; // 0が飛び出した判定
  }

  // 役判定
  const yaku = hantei(rand1, rand2, rand3);

  // ターン切り替え
  toggleTurn();

  // HTMLに表示
  const diceDisp = document.getElementById("number");
  diceDisp.textContent = `${rand1} ${rand2} ${rand3}`;

  const hanteiDisp = document.getElementById("hantei");
  hanteiDisp.textContent = yaku;
}

// 役判定
function hantei(num1, num2, num3) {
  if (num1 === 0 || num2 === 0 || num3 === 0) {
    return "ションベン";
  } else if (num1 === 1 && num2 === 1 && num3 === 1) {
    return "ピンゾロ";
  } else if (num1 === num2 && num1 === num3 && num2 === num3) {
    return "ゾロ目";
  } else if (
    [num1, num2, num3].sort((a, b) => a - b).toString() === [4, 5, 6].toString()
  ) {
    return "シゴロ";
  } else if (num1 === num2 || num1 === num3 || num2 === num3) {
    return "通常の目";
  } else if (
    [num1, num2, num3].sort((a, b) => a - b).toString() === [1, 2, 3].toString()
  ) {
    return "ヒフミ";
  }

  return "役なし";
}
