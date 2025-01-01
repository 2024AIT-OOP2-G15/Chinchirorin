// 仮で数字を送るだけの処理を書いています。

function roll() {
  // 3つの乱数を取得（１〜６）
  const rand1 = Math.floor(Math.random() * 6) + 1;
  const rand2 = Math.floor(Math.random() * 6) + 1;
  let rand3 = Math.floor(Math.random() * 6) + 1; // ションベン判定のためこれだけ可変

  // ションベン判定
  const diceOut = Math.floor(Math.random() * 50); // ダイスが飛び出したかの判定
  if(diceOut == 0) {
    rand3 = 0 // 0が飛び出した判定
  }

  // HTMLに表示
  const disp = document.getElementById("number")
  disp.textContent = `${rand1} ${rand2} ${rand3}`
}