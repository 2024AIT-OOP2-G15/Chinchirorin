// 仮で数字を送るだけの処理を書いています。

function roll() {
  // 3つの乱数を取得（１〜６）
  const rand1 = Math.floor(Math.random() * 6) + 1;
  const rand2 = Math.floor(Math.random() * 6) + 1;
  const rand3 = Math.floor(Math.random() * 6) + 1;

  // HTMLに表示
  const disp = document.getElementById("number")
  disp.textContent = `${rand1} ${rand2} ${rand3}`
}