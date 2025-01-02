let scene, camera, renderer;
let cubes = []; // サイコロを格納する配列
const cubeSpacing = 1.5; // サイコロ間の間隔
const faceNames = [
  "1", // 面1の名前
  "2", // 面2の名前
  "3", // 面3の名前
  "4", // 面4の名前
  "5", // 面5の名前
  "6"  // 面6の名前
];

let targetRotationX = [];
let targetRotationY = [];
let isRotating = true; // 回転中かどうかを管理

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  
  // レンダラーのサイズを変更
  const container = document.getElementById("three-container");
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // テクスチャーローダーを使用して画像を読み込む
  const textureLoader = new THREE.TextureLoader();
  const texture1 = textureLoader.load("../static/textures/Frame 1.png");
  const texture2 = textureLoader.load("../static/textures/Frame 2.png");
  const texture3 = textureLoader.load("../static/textures/Frame 3.png");
  const texture4 = textureLoader.load("../static/textures/Frame 4.png");
  const texture5 = textureLoader.load("../static/textures/Frame 5.png");
  const texture6 = textureLoader.load("../static/textures/Frame 6.png");
  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const materials = [
    new THREE.MeshBasicMaterial({ map: texture2 }), // 面1
    new THREE.MeshBasicMaterial({ map: texture4 }), // 面2
    new THREE.MeshBasicMaterial({ map: texture6 }), // 面3
    new THREE.MeshBasicMaterial({ map: texture5 }), // 面4
    new THREE.MeshBasicMaterial({ map: texture1 }), // 面5
    new THREE.MeshBasicMaterial({ map: texture3 })  // 面6
  ];

  // サイコロを4つ作成し、位置を調整して配置
  const totalCubes = 4;
  const startPosX = -((totalCubes - 1) * cubeSpacing) / 2; // 中央に揃えるための開始位置

  for (let i = 0; i < totalCubes; i++) {
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.x = startPosX + i * cubeSpacing; // x方向に均等に配置
    cube.position.y = 0; // y方向は0に設定
    cube.position.z = 0; // z方向は0に設定
    scene.add(cube);
    cubes.push(cube);
    targetRotationX.push(cube.rotation.x);
    targetRotationY.push(cube.rotation.y);
  }

  camera.position.z = 4;

  // クリックイベントを設定
  document.addEventListener("click", onCubeClick);
}

function animate() {
  requestAnimationFrame(animate); // アニメーションループ

  // 各サイコロを回転させる
  cubes.forEach((cube, index) => {
    if (isRotating) {
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
    } else {
      // 各サイコロの回転をターゲット角度に近づける
      cube.rotation.x += (targetRotationX[index] - cube.rotation.x) * 0.1;
      cube.rotation.y += (targetRotationY[index] - cube.rotation.y) * 0.1;

      // 停止条件
      if (
        Math.abs(targetRotationX[index] - cube.rotation.x) < 0.1 &&
        Math.abs(targetRotationY[index] - cube.rotation.y) < 0.1
      ) {
        // ターゲットに到達したら回転を停止
        isRotating = false;
      }
    }
  });

  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById("three-container");
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

// クリック時の動作
function onCubeClick() {
  if (isRotating) {
    // 回転中ならランダムな面を選んで停止
    isRotating = false; // 回転を停止
    cubes.forEach((cube, index) => {
      // ランダムに面を選択して停止する角度を設定
      const faceIndex = Math.floor(Math.random() * 6); // 0〜5の面番号
      console.log(`Cube ${index + 1} selected face: ${faceNames[faceIndex]}`);
      document.getElementById(`cube${index + 1}`).innerText = faceNames[faceIndex];
      switch (faceIndex) {
        case 0: // 面1 (前面)
          targetRotationX[index] = 0;
          targetRotationY[index] = 0;
          break;
        case 1: // 面2 (右面)
          targetRotationX[index] = 0;
          targetRotationY[index] = -Math.PI / 2;
          break;
        case 2: // 面3 (背面)
          targetRotationX[index] = 0;
          targetRotationY[index] = Math.PI;
          break;
        case 3: // 面4 (左面)
          targetRotationX[index] = 0;
          targetRotationY[index] = Math.PI / 2;
          break;
        case 4: // 面5 (上面)
          targetRotationX[index] = -Math.PI / 2;
          targetRotationY[index] = 0;
          break;
        case 5: // 面6 (底面)
          targetRotationX[index] = Math.PI / 2;
          targetRotationY[index] = 0;
          break;
      }
    });
  } else {
    // 回転を再開
    isRotating = true;
  }
}

window.addEventListener("resize", onWindowResize);

init();
animate();
