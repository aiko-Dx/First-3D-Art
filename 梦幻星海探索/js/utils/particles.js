// 背景粒子数组
let backgroundParticles = [];

// 添加背景粒子
function addBackgroundParticles(scene, count = 200) {
    // 清除现有粒子
    removeBackgroundParticles(scene);
    
    // 创建新粒子
    const particleCount = count;
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    
    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 40;
        
        // 随机颜色，偏向蓝紫色调
        const hue = 0.6 + Math.random() * 0.3; // 0.6-0.9 范围内的色相(蓝紫色调)
        const saturation = 0.7 + Math.random() * 0.3; // 高饱和度
        const lightness = 0.5 + Math.random() * 0.3; // 中高亮度
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.7
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(x, y, z);
        
        // 存储粒子数据用于动画
        particle.userData = {
            originalPosition: new THREE.Vector3(x, y, z),
            speed: 0.01 + Math.random() * 0.01,
            pulseSpeed: 0.5 + Math.random(),
            direction: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            ).normalize()
        };
        
        scene.add(particle);
        backgroundParticles.push(particle);
    }
    
    log(`已添加 ${particleCount} 个背景粒子`);
    return backgroundParticles.length;
}

// 移除背景粒子
function removeBackgroundParticles(scene) {
    backgroundParticles.forEach(particle => {
        scene.remove(particle);
        if (particle.material) {
            particle.material.dispose();
        }
        if (particle.geometry) {
            particle.geometry.dispose();
        }
    });
    
    backgroundParticles = [];
    log('已清除所有背景粒子');
}

// 更新背景粒子
function updateBackgroundParticles(time) {
    backgroundParticles.forEach(particle => {
        const data = particle.userData;
        
        // 缓慢移动
        particle.position.add(data.direction.clone().multiplyScalar(data.speed));
        
        // 脉动效果
        const scale = 0.8 + 0.4 * Math.sin(time * data.pulseSpeed);
        particle.scale.set(scale, scale, scale);
        
        // 如果移动太远，重置位置
        if (particle.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 20) {
            particle.position.copy(data.originalPosition);
            
            // 随机新方向
            data.direction.set(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            ).normalize();
        }
    });
}

// 创建粒子喷射效果
function createParticleJet(scene, position, direction, color, count = 50) {
    const particles = [];
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(count * 3);
    const particleColors = new Float32Array(count * 3);
    const particleSizes = new Float32Array(count);
    
    // 初始化粒子
    for (let i = 0; i < count; i++) {
        const spread = 0.3;
        const length = 5;
        
        // 从起点位置开始，沿方向延伸
        const pos = new THREE.Vector3()
            .copy(position)
            .add(direction.clone().multiplyScalar(Math.random() * length));
        
        // 添加一些随机扩散
        pos.x += (Math.random() - 0.5) * spread;
        pos.y += (Math.random() - 0.5) * spread;
        pos.z += (Math.random() - 0.5) * spread;
        
        particlePositions[i * 3] = pos.x;
        particlePositions[i * 3 + 1] = pos.y;
        particlePositions[i * 3 + 2] = pos.z;
        
        // 颜色渐变
        const particleColor = new THREE.Color(color);
        particleColors[i * 3] = particleColor.r;
        particleColors[i * 3 + 1] = particleColor.g;
        particleColors[i * 3 + 2] = particleColor.b;
        
        // 粒子大小
        particleSizes[i] = 0.05 + Math.random() * 0.05;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // 返回粒子系统和更新函数
    return {
        system: particleSystem,
        update: function(speed = 0.05) {
            const positions = particleSystem.geometry.attributes.position.array;
            
            for (let i = 0; i < count; i++) {
                const idx = i * 3;
                
                // 沿方向移动
                positions[idx] += direction.x * speed;
                positions[idx + 1] += direction.y * speed;
                positions[idx + 2] += direction.z * speed;
                
                // 检查是否需要重置
                const dist = new THREE.Vector3(
                    positions[idx] - position.x,
                    positions[idx + 1] - position.y,
                    positions[idx + 2] - position.z
                ).length();
                
                if (dist > 5) {
                    // 重置到起点附近
                    const spread = 0.3;
                    positions[idx] = position.x + (Math.random() - 0.5) * spread;
                    positions[idx + 1] = position.y + (Math.random() - 0.5) * spread;
                    positions[idx + 2] = position.z + (Math.random() - 0.5) * spread;
                }
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
        },
        remove: function() {
            scene.remove(particleSystem);
            particleGeometry.dispose();
            particleMaterial.dispose();
        }
    };
}