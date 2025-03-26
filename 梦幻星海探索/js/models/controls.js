// 背景粒子相关函数
let backgroundParticles;

function addBackgroundParticles(scene, count = 500) {
    // 如果已经有粒子，就增加粒子数量
    if (backgroundParticles) {
        const oldPositions = backgroundParticles.geometry.attributes.position.array;
        const oldColors = backgroundParticles.geometry.attributes.color.array;
        const oldCount = oldPositions.length / 3;
        const newCount = oldCount + count;
        
        const newPositions = new Float32Array(newCount * 3);
        const newColors = new Float32Array(newCount * 3);
        
        // 复制旧数据
        for (let i = 0; i < oldPositions.length; i++) {
            newPositions[i] = oldPositions[i];
            newColors[i] = oldColors[i];
        }
        
        // 添加新粒子
        for (let i = oldCount; i < newCount; i++) {
            newPositions[i * 3] = (Math.random() - 0.5) * 100;
            newPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            newPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            // 随机星星颜色
            const colorChoice = Math.random();
            let color;
            
            if (colorChoice < 0.6) {
                // 白色星星
                color = new THREE.Color(0xffffff);
            } else if (colorChoice < 0.8) {
                // 蓝色星星
                color = new THREE.Color(0x8888ff);
            } else if (colorChoice < 0.95) {
                // 黄色星星
                color = new THREE.Color(0xffffaa);
            } else {
                // 红色星星
                color = new THREE.Color(0xff8888);
            }
            
            newColors[i * 3] = color.r;
            newColors[i * 3 + 1] = color.g;
            newColors[i * 3 + 2] = color.b;
        }
        
        // 更新几何体
        backgroundParticles.geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
        backgroundParticles.geometry.setAttribute('color', new THREE.BufferAttribute(newColors, 3));
        
        // 更新粒子速度数组
        const newVelocities = new Array(newCount);
        for (let i = 0; i < oldCount; i++) {
            newVelocities[i] = backgroundParticles.userData.velocities[i];
        }
        
        for (let i = oldCount; i < newCount; i++) {
            newVelocities[i] = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
                twinkleSpeed: 0.5 + Math.random() * 2,
                twinkleAmount: 0.3 + Math.random() * 0.7
            };
        }
        
        backgroundParticles.userData.velocities = newVelocities;
        
        log(`添加了 ${count} 个粒子，总数: ${newCount}`);
    } else {
        // 创建新的粒子系统
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(count * 3);
        const particleColors = new Float32Array(count * 3);
        const particleVelocities = [];
        
        for (let i = 0; i < count; i++) {
            // 随机位置
            particlePositions[i * 3] = (Math.random() - 0.5) * 100;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            // 随机颜色
            const colorChoice = Math.random();
            let color;
            
            if (colorChoice < 0.6) {
                // 白色星星
                color = new THREE.Color(0xffffff);
            } else if (colorChoice < 0.8) {
                // 蓝色星星
                color = new THREE.Color(0x8888ff);
            } else if (colorChoice < 0.95) {
                // 黄色星星
                color = new THREE.Color(0xffffaa);
            } else {
                // 红色星星
                color = new THREE.Color(0xff8888);
            }
            
            particleColors[i * 3] = color.r;
            particleColors[i * 3 + 1] = color.g;
            particleColors[i * 3 + 2] = color.b;
            
            // 随机速度
            particleVelocities.push({
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
                twinkleSpeed: 0.5 + Math.random() * 2,
                twinkleAmount: 0.3 + Math.random() * 0.7
            });
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        backgroundParticles = new THREE.Points(particleGeometry, particleMaterial);
        backgroundParticles.userData.velocities = particleVelocities;
        
        scene.add(backgroundParticles);
        log(`创建了 ${count} 个背景粒子`);
    }
}

function updateBackgroundParticles(time) {
    if (!backgroundParticles) return;
    
    const positions = backgroundParticles.geometry.attributes.position.array;
    const colors = backgroundParticles.geometry.attributes.color.array;
    const velocities = backgroundParticles.userData.velocities;
    
    for (let i = 0; i < velocities.length; i++) {
        const idx = i * 3;
        
        // 更新位置
        positions[idx] += velocities[i].x;
        positions[idx + 1] += velocities[i].y;
        positions[idx + 2] += velocities[i].z;
        
        // 如果粒子太远，将其重置
        const distance = Math.sqrt(
            positions[idx] * positions[idx] + 
            positions[idx + 1] * positions[idx + 1] + 
            positions[idx + 2] * positions[idx + 2]
        );
        
        if (distance > 50) {
            const direction = Math.random() * Math.PI * 2;
            const elevation = Math.acos(2 * Math.random() - 1);
            const r = 50;
            
            positions[idx] = r * Math.sin(elevation) * Math.cos(direction);
            positions[idx + 1] = r * Math.sin(elevation) * Math.sin(direction);
            positions[idx + 2] = r * Math.cos(elevation);
        }
        
        // 闪烁效果
        const colorBase = new THREE.Color(
            colors[idx],
            colors[idx + 1],
            colors[idx + 2]
        );
        
        const twinkle = 0.7 + velocities[i].twinkleAmount * Math.sin(time * velocities[i].twinkleSpeed);
        colorBase.multiplyScalar(twinkle);
        
        colors[idx] = colorBase.r;
        colors[idx + 1] = colorBase.g;
        colors[idx + 2] = colorBase.b;
    }
    
    backgroundParticles.geometry.attributes.position.needsUpdate = true;
    backgroundParticles.geometry.attributes.color.needsUpdate = true;
}

// 相机控制相关函数
let controls;

function initControls(camera, domElement) {
    controls = {
        enabled: true,
        camera: camera,
        domElement: domElement,
        rotateSpeed: 1.0,
        zoomSpeed: 1.2,
        panSpeed: 0.8,
        noZoom: false,
        noPan: false,
        staticMoving: false,
        dynamicDampingFactor: 0.2,
        minDistance: 3,
        maxDistance: 20,
        target: new THREE.Vector3(0, 0, 0),
        lastPosition: new THREE.Vector3(),
        STATE: { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 },
        state: -1,
        
        // 鼠标位置
        pointerOld: {
            x: 0,
            y: 0
        },
        pointerCurrent: {
            x: 0,
            y: 0
        },
        
        // 旋转和平移变量
        spherical: new THREE.Spherical(),
        sphericalDelta: new THREE.Spherical(),
        scale: 1,
        panOffset: new THREE.Vector3(),
        
        // 事件监听
        init: function() {
            this.domElement.addEventListener('contextmenu', this.onContextMenu.bind(this), false);
            this.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
            this.domElement.addEventListener('pointercancel', this.onPointerCancel.bind(this), false);
            this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this), false);
            this.update();
            return this;
        },
        
        onContextMenu: function(event) {
            event.preventDefault();
        },
        
        onPointerDown: function(event) {
            if (this.enabled === false) return;
            
            switch (event.button) {
                case 0:
                    this.state = this.STATE.ROTATE;
                    break;
                case 1:
                    this.state = this.STATE.ZOOM;
                    break;
                case 2:
                    this.state = this.STATE.PAN;
                    break;
                default:
                    this.state = this.STATE.NONE;
            }
            
            this.pointerOld.x = event.clientX;
            this.pointerOld.y = event.clientY;
            
            this.domElement.ownerDocument.addEventListener('pointermove', this.onPointerMove.bind(this), false);
            this.domElement.ownerDocument.addEventListener('pointerup', this.onPointerUp.bind(this), false);
        },
        
        onPointerMove: function(event) {
            if (this.enabled === false) return;
            
            this.pointerCurrent.x = event.clientX;
            this.pointerCurrent.y = event.clientY;
            
            switch (this.state) {
                case this.STATE.ROTATE:
                    this.handleMouseMoveRotate(this.pointerCurrent, this.pointerOld);
                    break;
                case this.STATE.ZOOM:
                    this.handleMouseMoveZoom(this.pointerCurrent, this.pointerOld);
                    break;
                case this.STATE.PAN:
                    this.handleMouseMovePan(this.pointerCurrent, this.pointerOld);
                    break;
            }
            
            this.pointerOld.x = this.pointerCurrent.x;
            this.pointerOld.y = this.pointerCurrent.y;
        },
        
        onPointerUp: function(event) {
            this.domElement.ownerDocument.removeEventListener('pointermove', this.onPointerMove.bind(this), false);
            this.domElement.ownerDocument.removeEventListener('pointerup', this.onPointerUp.bind(this), false);
            
            this.state = this.STATE.NONE;
        },
        
        onPointerCancel: function(event) {
            this.onPointerUp(event);
        },
        
        onMouseWheel: function(event) {
            if (this.enabled === false || this.noZoom === true) return;
            
            event.preventDefault();
            
            this.scale *= Math.pow(0.95, -event.deltaY / 120);
            this.scale = Math.max(0.1, Math.min(10, this.scale));
        },
        
        handleMouseMoveRotate: function(current, previous) {
            const element = this.domElement;
            const PI2 = Math.PI * 2;
            const rotateSpeed = this.rotateSpeed;
            
            const dx = 2 * Math.PI * (current.x - previous.x) / element.clientHeight;
            const dy = 2 * Math.PI * (current.y - previous.y) / element.clientHeight;
            
            this.sphericalDelta.theta -= dx * rotateSpeed;
            this.sphericalDelta.phi -= dy * rotateSpeed;
        },
        
        handleMouseMoveZoom: function(current, previous) {
            const element = this.domElement;
            const zoomSpeed = this.zoomSpeed;
            
            const dx = current.x - previous.x;
            const dy = current.y - previous.y;
            
            const distance = Math.sqrt(dx * dx + dy * dy);
            const direction = dy > 0 ? 1 : -1;
            
            this.scale *= Math.pow(0.95, direction * distance / 100);
            this.scale = Math.max(0.1, Math.min(10, this.scale));
        },
        
        handleMouseMovePan: function(current, previous) {
            const element = this.domElement;
            const panSpeed = this.panSpeed;
            
            const dx = (current.x - previous.x) * panSpeed / element.clientWidth;
            const dy = (current.y - previous.y) * panSpeed / element.clientHeight;
            
            this.panOffset.x -= dx * this.camera.position.z;
            this.panOffset.y += dy * this.camera.position.z;
        },
        
        update: function() {
            const position = this.camera.position;
            const offset = new THREE.Vector3();
            
            // 旋转
            offset.copy(position).sub(this.target);
            
            // 将偏移转换为球坐标
            this.spherical.setFromVector3(offset);
            
            // 应用旋转增量
            this.spherical.theta += this.sphericalDelta.theta;
            this.spherical.phi += this.sphericalDelta.phi;
            
            // 限制phi取值范围
            this.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.spherical.phi));
            
            // 应用缩放
            this.spherical.radius *= this.scale;
            
            // 限制半径范围
            this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
            
            // 应用平移
            this.target.add(this.panOffset);
            
            // 从球坐标转回直角坐标
            offset.setFromSpherical(this.spherical);
            
            // 设置相机位置
            position.copy(this.target).add(offset);
            
            this.camera.lookAt(this.target);
            
            // 应用阻尼
            if (this.staticMoving) {
                this.sphericalDelta.theta = 0;
                this.sphericalDelta.phi = 0;
            } else {
                this.sphericalDelta.theta *= (1 - this.dynamicDampingFactor);
                this.sphericalDelta.phi *= (1 - this.dynamicDampingFactor);
            }
            
            this.scale = 1;
            this.panOffset.set(0, 0, 0);
        }
    };
    
    return controls.init();
}

function updateControls() {
    if (controls) {
        controls.update();
    }
}

function resetCamera(camera) {
    if (controls) {
        controls.target.set(0, 0, 0);
        controls.sphericalDelta.set(0, 0, 0);
        controls.scale = 1;
        controls.panOffset.set(0, 0, 0);
    }
    
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    
    log('相机视角已重置');
}