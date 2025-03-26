// 全局变量
let scene, camera, renderer;
let colorScheme = 0;
let shapeType = 0;
let rotationSpeed = 0.005;
let currentShape = null;
let clock;

// 形状名称
const shapeNames = ['黑洞', '宇宙飞船', '宇宙房子'];

// 初始化函数
function init() {
    log('初始化场景');
    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080820);
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x00ffff, 0.8);
    pointLight2.position.set(-5, 2, 3);
    scene.add(pointLight2);
    
    // 初始化相机控制
    initControls(camera, renderer.domElement);
    
    // 创建时钟
    clock = new THREE.Clock();
    
    // 创建初始形状
    createShape();
    
    // 添加背景粒子
    addBackgroundParticles(scene);
    
    // 添加事件监听
    setupEventListeners();
    
    // 开始动画循环
    animate();
    
    log('初始化完成');
}

// 创建或切换形状
function createShape() {
    console.log(`尝试创建形状：${shapeType}`);

    // 移除当前形状
    if (currentShape) {
        scene.remove(currentShape);
    }
    
    try {
        // 根据当前类型创建新形状
        switch(shapeType) {
            case 0:
                console.log("创建黑洞");
                currentShape = createBlackHole(colorScheme);
                break;
            case 1:
                console.log("创建飞船");
                currentShape = createSpaceship(colorScheme);
                break;
            case 2:
                console.log("创建房子");
                currentShape = createSpaceHouse(colorScheme);
                break;
        }
        
        scene.add(currentShape);
        
        // 更新显示的形状名称
        const shapeNameElement = document.getElementById('shape-name');
        if (shapeNameElement) {
            shapeNameElement.textContent = shapeNames[shapeType];
        }
        
        console.log(`成功创建形状: ${shapeNames[shapeType]}`);
    } catch (error) {
        console.error("创建形状时出错:", error);
        // 出错时回退到黑洞
        shapeType = 0;
        currentShape = createBlackHole(colorScheme);
        scene.add(currentShape);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 按钮点击事件
    document.getElementById('changeColor').addEventListener('click', () => {
        colorScheme = (colorScheme + 1) % 3;
        createShape();
    });
    
    document.getElementById('addParticles').addEventListener('click', () => {
        addBackgroundParticles(scene, 200);
    });
    
    document.getElementById('changeShape').addEventListener('click', () => {
        shapeType = (shapeType + 1) % 3;
        createShape();
    });
    
    document.getElementById('rotateSpeed').addEventListener('click', () => {
        rotationSpeed = (rotationSpeed === 0.005) ? 0.01 : 
                      (rotationSpeed === 0.01) ? 0.02 : 
                      (rotationSpeed === 0.02) ? 0 : 0.005;
        log(`旋转速度设置为: ${rotationSpeed}`);
    });
    
    document.getElementById('resetView').addEventListener('click', () => {
        resetCamera(camera);
    });
    
    // 窗口大小变化事件
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // 键盘事件
    document.addEventListener('keydown', (e) => {
        // 数字键1-3切换形状
        if (e.key >= '1' && e.key <= '3') {
            shapeType = parseInt(e.key) - 1;
            createShape();
        }
        
        // R键重置视角
        if (e.key === 'r' || e.key === 'R') {
            resetCamera(camera);
        }
    });
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    
    // 旋转当前形状
    if (currentShape && rotationSpeed > 0) {
        currentShape.rotation.y += rotationSpeed;
    }
    
    // 调用形状的自定义更新函数
    if (currentShape && currentShape.userData && currentShape.userData.update) {
        currentShape.userData.update(time);
    }
    
    // 更新背景粒子
    updateBackgroundParticles(time);
    
    // 更新相机控制
    updateControls();
    
    // 渲染场景
    renderer.render(scene, camera);
}

// 页面加载完成后初始化
window.addEventListener('load', init);