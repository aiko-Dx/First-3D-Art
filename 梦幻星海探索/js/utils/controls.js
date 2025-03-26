// 相机控制变量
let controls;
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
let cameraRotation = {
    x: 0,
    y: 0
};

// 初始化控制器
function initControls(camera, domElement) {
    // 创建 OrbitControls 如果可用
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.8;
        controls.zoomSpeed = 1.0;
        controls.panSpeed = 0.8;
        controls.minDistance = 3;
        controls.maxDistance = 20;
        log('使用 OrbitControls 控制器');
    } else {
        // 否则使用自定义控制
        log('使用自定义相机控制器');
        setupMouseControls(domElement, camera);
    }
}

// 设置鼠标控制
function setupMouseControls(domElement, camera) {
    domElement.addEventListener('mousedown', function(e) {
        isDragging = true;
    });
    
    domElement.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            cameraRotation.x += deltaMove.y * 0.01;
            cameraRotation.y += deltaMove.x * 0.01;
            
            // 限制垂直旋转角度
            cameraRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraRotation.x));
            
            // 更新相机位置
            const radius = camera.position.length();
            camera.position.x = radius * Math.sin(cameraRotation.y) * Math.cos(cameraRotation.x);
            camera.position.y = radius * Math.sin(cameraRotation.x);
            camera.position.z = radius * Math.cos(cameraRotation.y) * Math.cos(cameraRotation.x);
            
            camera.lookAt(0, 0, 0);
        }
        
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    domElement.addEventListener('mouseup', function(e) {
        isDragging = false;
    });
    
    domElement.addEventListener('mouseleave', function(e) {
        isDragging = false;
    });
    
    // 添加缩放功能
    domElement.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const distance = camera.position.length();
        const newDistance = distance + e.deltaY * 0.01;
        
        // 限制缩放范围
        if (newDistance > 3 && newDistance < 20) {
            camera.position.normalize().multiplyScalar(newDistance);
        }
    });
    
    // 添加触摸支持
    domElement.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    });
    
    domElement.addEventListener('touchmove', function(e) {
        if (isDragging && e.touches.length === 1) {
            const deltaMove = {
                x: e.touches[0].clientX - previousMousePosition.x,
                y: e.touches[0].clientY - previousMousePosition.y
            };
            
            cameraRotation.x += deltaMove.y * 0.01;
            cameraRotation.y += deltaMove.x * 0.01;
            
            // 限制垂直旋转角度
            cameraRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraRotation.x));
            
            // 更新相机位置
            const radius = camera.position.length();
            camera.position.x = radius * Math.sin(cameraRotation.y) * Math.cos(cameraRotation.x);
            camera.position.y = radius * Math.sin(cameraRotation.x);
            camera.position.z = radius * Math.cos(cameraRotation.y) * Math.cos(cameraRotation.x);
            
            camera.lookAt(0, 0, 0);
            
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    });
    
    domElement.addEventListener('touchend', function() {
        isDragging = false;
    });
}

// 更新控制器
function updateControls() {
    if (controls && typeof controls.update === 'function') {
        controls.update();
    }
}

// 重置相机
function resetCamera(camera) {
    if (controls && typeof controls.reset === 'function') {
        controls.reset();
    } else {
        cameraRotation.x = 0;
        cameraRotation.y = 0;
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
    }
    
    log('相机视角已重置');
}