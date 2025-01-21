let scene, camera, renderer;
let cubes = []; // サイコロを格納する配列
let plate; // 皿
const cubeSpacing = 1.5; // サイコロ間の間隔

let targetRotationX = [];
let targetRotationY = [];
let isRotating = true; // 回転中かどうかを管理

// 背景を設定する関数
function setBackground(scene, texturePath) {
  const textureLoader = new THREE.TextureLoader();
  const backgroundTexture = textureLoader.load(texturePath);
  scene.background = backgroundTexture;
}

// 初期化関数
function init() {
  const textureLoader = new THREE.TextureLoader();
  // シーンとカメラ、レンダラーを初期化
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;

  // レンダラーサイズの設定
  const container = document.getElementById("three-container");
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // 和室の背景をオブジェクトとして追加
  const backgroundTexture = textureLoader.load("../static/textures/tatami.jpg"); // 和室の背景画像
  const backgroundGeometry = new THREE.PlaneGeometry(120, 40); // 幅20、高さ10の平面
  const backgroundMaterial = new THREE.MeshStandardMaterial({
    map: backgroundTexture,
    side: THREE.DoubleSide, // 両面に描画
  });
  const backgroundPlane = new THREE.Mesh(
    backgroundGeometry,
    backgroundMaterial
  );
  backgroundPlane.position.set(0, 0, -5); // カメラの後ろに配置
  backgroundPlane.receiveShadow = true; // 背景が影を受けるように設定
  scene.add(backgroundPlane);

  // 照明を追加
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // 柔らかい全体光
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 10, 25); // カメラ側に配置
  spotLight.castShadow = true;
  scene.add(spotLight);

  // サイコロ用のテクスチャをロード
  const textures = [
    textureLoader.load("../static/textures/Frame 1.png"),
    textureLoader.load("../static/textures/Frame 2.png"),
    textureLoader.load("../static/textures/Frame 3.png"),
    textureLoader.load("../static/textures/Frame 4.png"),
    textureLoader.load("../static/textures/Frame 5.png"),
    textureLoader.load("../static/textures/Frame 6.png"),
  ];

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = [
    new THREE.MeshStandardMaterial({ map: textures[1] }),
    new THREE.MeshStandardMaterial({ map: textures[3] }),
    new THREE.MeshStandardMaterial({ map: textures[5] }),
    new THREE.MeshStandardMaterial({ map: textures[4] }),
    new THREE.MeshStandardMaterial({ map: textures[0] }),
    new THREE.MeshStandardMaterial({ map: textures[2] }),
  ];

  // サイコロを作成
  const totalCubes = 3;
  const startPosX = -((totalCubes - 1) * cubeSpacing) / 2; // サイコロの開始位置
  for (let i = 0; i < totalCubes; i++) {
    const cube = new THREE.Mesh(geometry, materials);

    cube.castShadow = true;
    cube.position.x = (startPosX + i * cubeSpacing);
    cube.position.y = 0;
    cube.position.z = 30;
    scene.add(cube);
    cubes.push(cube);
    targetRotationX.push(cube.rotation.x);
    targetRotationY.push(cube.rotation.y);
  }

  // 皿を作成
  const outerMaterial = new THREE.MeshStandardMaterial({
    color: 0x500000,
    roughness: 0.8,
    metalness: 0.2,
    side: THREE.FrontSide,
  });
  const innerMaterial = new THREE.MeshStandardMaterial({
    color: 0xd2b48c,
    roughness: 1.0,
    metalness: 0.01,
    side: THREE.BackSide,
  });

  const plateGeometry = new THREE.ConeGeometry(4, 3, 32, 5, true);
  plate = new THREE.Group();

  const outerPlate = new THREE.Mesh(plateGeometry, outerMaterial);
  const innerPlate = new THREE.Mesh(plateGeometry, innerMaterial);

  outerPlate.castShadow = true;
  innerPlate.receiveShadow = true;

  plate.add(outerPlate);
  plate.add(innerPlate);

  plate.position.set(0, 0, -1);
  plate.rotation.x = Math.PI / -2;
  scene.add(plate);

  camera.position.set(0, -3, 20);
  camera.lookAt(0, 0, 0);
}

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);
  cubes.forEach((cube, index) => {
    if (isRotating) {
      cube.rotation.x += 1;
      cube.rotation.y += 1;
    } else {
      cube.rotation.x += (targetRotationX[index] - cube.rotation.x) * 0.1;
      cube.rotation.y += (targetRotationY[index] - cube.rotation.y) * 0.1;
      cube.position.z += (0 - cube.position.z) * 0.1;
      if(cube.position.z > 0.5){
          cube.position.x += getRandomPosition(0.05, -0.05, 0.05, -0.05);
          cube.position.y += getRandomPosition(0.05, -0.05, 0.05, -0.05);
          
      }

      if (
        Math.abs(targetRotationX[index] - cube.rotation.x) < 0.1 &&
        Math.abs(targetRotationY[index] - cube.rotation.y) < 0.1
      
      ) {
        isRotating = false;
      }
    }
  });

  renderer.render(scene, camera);
}

// ウィンドウリサイズ時の処理
function onWindowResize() {
  const container = document.getElementById("three-container");
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}
// ランダムな範囲で値を取得する関数
function getRandomPosition(min1, max1, min2, max2) {
  // min1-max1, min2-max2の範囲でランダムな値を取得
  const position = (Math.random() < 0.5 ? Math.random() * (max1 - min1) + min1 : Math.random() * (max2 - min2) + min2);
  
  return position;
}
// サイコロをクリックしたときの動作
export function onCubeClick(diceValues) {
  if (isRotating) {
    isRotating = false;
    cubes.forEach((cube, index) => {
      const faceIndex = diceValues[index];
      switch (faceIndex) {
        case 0:
          cube.position.x = getRandomPosition(-5, -15, 5, 15);
          cube.position.y = getRandomPosition(-5, -13, 5, 13);
          cube.position.z = 0;
          break;
        case 1:
          targetRotationX[index] = 0;
          targetRotationY[index] = 0;
          break;
        case 2:
          targetRotationX[index] = 0;
          targetRotationY[index] = -Math.PI / 2;
          break;
        case 3:
          targetRotationX[index] = 0;
          targetRotationY[index] = Math.PI;
          break;
        case 4:
          targetRotationX[index] = 0;
          targetRotationY[index] = Math.PI / 2;
          break;
        case 5:
          targetRotationX[index] = -Math.PI / 2;
          targetRotationY[index] = 0;
          break;
        case 6:
          targetRotationX[index] = Math.PI / 2;
          targetRotationY[index] = 0;
          break;
      }
    });
  } else {
    isRotating = true;
  }
}

// 背景変更関数
export function changeBackground(newTexturePath) {
  setBackground(scene, newTexturePath);
}

// サイコロをリセットする関数
export function Reseter() {
  const totalCubes = 3;
  const startPosX = -((totalCubes - 1) * cubeSpacing) / 2; // サイコロの開始位置
  cubes.forEach((cube, index) => {
    const posX = startPosX + index * cubeSpacing; // 各サイコロのx座標を計算
    cube.position.set(posX, 0, 30); // x, y, z座標をリセット
  });

  isRotating = true; // 回転を再開
}

window.addEventListener("resize", onWindowResize);

init();
animate();
