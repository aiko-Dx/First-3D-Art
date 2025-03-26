// 创建渐变色黑洞函数
function createBlackHole(colorScheme = 0) {
    const blackHoleGroup = new THREE.Group();
    
    // 黑洞事件视界 - 使用更深邃的黑色球体
    const eventHorizonGeometry = new THREE.SphereGeometry(1.5, 128, 128);
    const eventHorizonMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        emissive: 0x000000,
        shininess: 200,
        transparent: true,
        opacity: 0.95,
    });
    const eventHorizon = new THREE.Mesh(eventHorizonGeometry, eventHorizonMaterial);
    blackHoleGroup.add(eventHorizon);
    
    // 黑洞扭曲效果 - 使用半透明的球体层
    const distortionGeometry = new THREE.SphereGeometry(1.7, 64, 64);
    const distortionMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    const distortion = new THREE.Mesh(distortionGeometry, distortionMaterial);
    blackHoleGroup.add(distortion);
    
    // 添加内层光环 - 靠近黑洞的吸积盘
    const innerRingGeometry = new THREE.RingGeometry(1.8, 4.5, 128, 1); 
    const innerRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xff3300, // 内环为红橙色
        transparent: true,
        opacity: 0.25, 
        side: THREE.DoubleSide
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRing.rotation.x = Math.PI / 2; 
    blackHoleGroup.add(innerRing);
    
    // 添加中层光环 - 过渡区域
    const midRingGeometry = new THREE.RingGeometry(4.5, 8, 128, 1); 
    const midRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xaa00ff, // 中环为紫色
        transparent: true,
        opacity: 0.2, 
        side: THREE.DoubleSide
    });
    const midRing = new THREE.Mesh(midRingGeometry, midRingMaterial);
    midRing.rotation.x = Math.PI / 2; 
    blackHoleGroup.add(midRing);
    
    // 添加外层光环 - 最外围区域
    const outerRingGeometry = new THREE.RingGeometry(8, 12, 128, 1); 
    const outerRingMaterial = new THREE.MeshBasicMaterial({
        color: 0x3366ff, // 外环为蓝色
        transparent: true,
        opacity: 0.15, 
        side: THREE.DoubleSide
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    outerRing.rotation.x = Math.PI / 2; 
    blackHoleGroup.add(outerRing);
    
    // 设置颜色渐变预设
    const colorPresets = {
        0: { // 默认热冷渐变
            inner: { color: new THREE.Color(0xff3300), hsl: {h: 0.05, s: 1.0, l: 0.5} }, // 红橙色
            middle: { color: new THREE.Color(0xaa00ff), hsl: {h: 0.75, s: 1.0, l: 0.5} }, // 紫色
            outer: { color: new THREE.Color(0x3366ff), hsl: {h: 0.6, s: 1.0, l: 0.6} }  // 蓝色
        },
        1: { // 紫粉渐变
            inner: { color: new THREE.Color(0xff00ff), hsl: {h: 0.83, s: 1.0, l: 0.5} }, // 粉色
            middle: { color: new THREE.Color(0x9900ff), hsl: {h: 0.75, s: 1.0, l: 0.5} }, // 紫色
            outer: { color: new THREE.Color(0x0033ff), hsl: {h: 0.65, s: 1.0, l: 0.5} }  // 蓝紫色
        },
        2: { // 火焰渐变
            inner: { color: new THREE.Color(0xffff00), hsl: {h: 0.16, s: 1.0, l: 0.5} }, // 黄色
            middle: { color: new THREE.Color(0xff6600), hsl: {h: 0.08, s: 1.0, l: 0.5} }, // 橙色
            outer: { color: new THREE.Color(0xff0000), hsl: {h: 0.0, s: 1.0, l: 0.5} }  // 红色
        }
    };
    
    // 选择颜色方案
    const colors = colorPresets[colorScheme] || colorPresets[0];
    
    // 使用粒子系统创建吸积盘 - 分为三层，每层不同的颜色渐变
    // 内层粒子 - 最热区域
    const innerFlowCount = 6000;
    const innerFlowGeometry = new THREE.BufferGeometry();
    const innerFlowPositions = new Float32Array(innerFlowCount * 3);
    const innerFlowColors = new Float32Array(innerFlowCount * 3);
    const innerFlowVelocities = [];
    
    // 中层粒子 - 过渡区域
    const midFlowCount = 8000;
    const midFlowGeometry = new THREE.BufferGeometry();
    const midFlowPositions = new Float32Array(midFlowCount * 3);
    const midFlowColors = new Float32Array(midFlowCount * 3);
    const midFlowVelocities = [];
    
    // 外层粒子 - 冷却区域
    const outerFlowCount = 9000;
    const outerFlowGeometry = new THREE.BufferGeometry();
    const outerFlowPositions = new Float32Array(outerFlowCount * 3);
    const outerFlowColors = new Float32Array(outerFlowCount * 3);
    const outerFlowVelocities = [];
    
    // 根据所处区域获取颜色 - 平滑渐变
    function getParticleColor(radius, layer) {
        let color = new THREE.Color();
        let normPos, startColor, endColor, startHSL, endHSL;
        
        if (layer === 'inner') {
            // 内层：1.8-4.5的范围，从中心向外渐变
            normPos = Math.min(1.0, (radius - 1.8) / 2.7);
            startColor = new THREE.Color(0xffffff); // 内部接近白色
            endColor = colors.inner.color;
            startHSL = {h: colors.inner.hsl.h, s: 0.5, l: 0.9};
            endHSL = colors.inner.hsl;
        } else if (layer === 'middle') {
            // 中层：4.5-8的范围
            normPos = Math.min(1.0, (radius - 4.5) / 3.5);
            startColor = colors.inner.color;
            endColor = colors.middle.color;
            startHSL = colors.inner.hsl;
            endHSL = colors.middle.hsl;
        } else { // outer
            // 外层：8-12的范围
            normPos = Math.min(1.0, (radius - 8) / 4);
            startColor = colors.middle.color;
            endColor = colors.outer.color;
            startHSL = colors.middle.hsl;
            endHSL = colors.outer.hsl;
        }
        
        // 使用HSL插值以获得更平滑的渐变
        const h = startHSL.h + (endHSL.h - startHSL.h) * normPos;
        const s = startHSL.s + (endHSL.s - startHSL.s) * normPos;
        const l = startHSL.l + (endHSL.l - startHSL.l) * normPos;
        
        return new THREE.Color().setHSL(h, s, l);
    }
    
    // 优化的粒子分布函数 - 可选分布方式
    function getRadiusDistribution(min, max, distribution = 'sqrt') {
        const r = Math.random();
        if (distribution === 'sqrt') {
            // 平方根分布，在外围产生更多粒子
            return min + (max - min) * Math.sqrt(r);
        } else if (distribution === 'cubic') {
            // 立方根分布，更均匀
            return min + (max - min) * Math.pow(r, 1/3);
        } else if (distribution === 'inverse') {
            // 倒数分布，外围极多
            return max - (max - min) * Math.pow(1 - r, 2);
        } else if (distribution === 'gaussian') {
            // 近似高斯分布，中部集中
            let sum = 0;
            for (let i = 0; i < 6; i++) {
                sum += Math.random();
            }
            sum = sum / 6;
            return min + (max - min) * sum;
        }
        // 线性分布
        return min + (max - min) * r;
    }
    
    // 初始化内层粒子 (1.8-4.5)
    for (let i = 0; i < innerFlowCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = getRadiusDistribution(1.8, 4.5, 'gaussian'); // 内层使用高斯分布
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.08; // 内层相当薄
        
        innerFlowPositions[i * 3] = x;
        innerFlowPositions[i * 3 + 1] = y;
        innerFlowPositions[i * 3 + 2] = z;
        
        const color = getParticleColor(radius, 'inner');
        
        innerFlowColors[i * 3] = color.r;
        innerFlowColors[i * 3 + 1] = color.g;
        innerFlowColors[i * 3 + 2] = color.b;
        
        // 内层粒子速度较快
        const speedFactor = 1 - (radius - 1.8) / 2.7;
        const baseSpeed = 0.01 + 0.04 * speedFactor * speedFactor;
        
        innerFlowVelocities.push({
            speed: baseSpeed,
            angle: angle,
            rotationSpeed: 0.03 + 0.06 * speedFactor,
            radius: radius
        });
    }
    
    // 初始化中层粒子 (4.5-8)
    for (let i = 0; i < midFlowCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = getRadiusDistribution(4.5, 8, 'sqrt'); // 中层使用平方根分布
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.15; // 中层略厚
        
        midFlowPositions[i * 3] = x;
        midFlowPositions[i * 3 + 1] = y;
        midFlowPositions[i * 3 + 2] = z;
        
        const color = getParticleColor(radius, 'middle');
        
        midFlowColors[i * 3] = color.r;
        midFlowColors[i * 3 + 1] = color.g;
        midFlowColors[i * 3 + 2] = color.b;
        
        // 中层粒子中等速度
        const speedFactor = 1 - (radius - 4.5) / 3.5;
        const baseSpeed = 0.005 + 0.02 * speedFactor * speedFactor;
        
        midFlowVelocities.push({
            speed: baseSpeed,
            angle: angle,
            rotationSpeed: 0.015 + 0.03 * speedFactor,
            radius: radius
        });
    }
    
    // 初始化外层粒子 (8-12)
    for (let i = 0; i < outerFlowCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = getRadiusDistribution(8, 12, 'inverse'); // 外层使用反向分布
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.25; // 外层最厚
        
        outerFlowPositions[i * 3] = x;
        outerFlowPositions[i * 3 + 1] = y;
        outerFlowPositions[i * 3 + 2] = z;
        
        const color = getParticleColor(radius, 'outer');
        
        outerFlowColors[i * 3] = color.r;
        outerFlowColors[i * 3 + 1] = color.g;
        outerFlowColors[i * 3 + 2] = color.b;
        
        // 外层粒子速度较慢
        const speedFactor = 1 - (radius - 8) / 4;
        const baseSpeed = 0.002 + 0.01 * speedFactor * speedFactor;
        
        outerFlowVelocities.push({
            speed: baseSpeed,
            angle: angle,
            rotationSpeed: 0.005 + 0.015 * speedFactor,
            radius: radius
        });
    }
    
    // 设置几何体属性
    innerFlowGeometry.setAttribute('position', new THREE.BufferAttribute(innerFlowPositions, 3));
    innerFlowGeometry.setAttribute('color', new THREE.BufferAttribute(innerFlowColors, 3));
    
    midFlowGeometry.setAttribute('position', new THREE.BufferAttribute(midFlowPositions, 3));
    midFlowGeometry.setAttribute('color', new THREE.BufferAttribute(midFlowColors, 3));
    
    outerFlowGeometry.setAttribute('position', new THREE.BufferAttribute(outerFlowPositions, 3));
    outerFlowGeometry.setAttribute('color', new THREE.BufferAttribute(outerFlowColors, 3));
    
    // 设置粒子材质
    const innerFlowMaterial = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
    });
    
    const midFlowMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
    });
    
    const outerFlowMaterial = new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
    });
    
    const innerFlowParticles = new THREE.Points(innerFlowGeometry, innerFlowMaterial);
    const midFlowParticles = new THREE.Points(midFlowGeometry, midFlowMaterial);
    const outerFlowParticles = new THREE.Points(outerFlowGeometry, outerFlowMaterial);
    
    blackHoleGroup.add(innerFlowParticles);
    blackHoleGroup.add(midFlowParticles);
    blackHoleGroup.add(outerFlowParticles);
    
    // 添加流体效果线 - 从内向外的能量流
    const streamLines = new THREE.Group();
    const streamCount = 48;
    
    for (let i = 0; i < streamCount; i++) {
        const baseAngle = (i / streamCount) * Math.PI * 2;
        // 随机变化角度，使线条不规则分布
        const angle = baseAngle + (Math.random() - 0.5) * 0.2;
        
        // 创建曲线路径
        const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(Math.cos(angle) * 2, 0, Math.sin(angle) * 2),
            new THREE.Vector3(Math.cos(angle) * 4, (Math.random() - 0.5) * 0.1, Math.sin(angle) * 4),
            new THREE.Vector3(Math.cos(angle) * 7, (Math.random() - 0.5) * 0.2, Math.sin(angle) * 7),
            new THREE.Vector3(Math.cos(angle) * 10, (Math.random() - 0.5) * 0.3, Math.sin(angle) * 10)
        );
        
        const points = curve.getPoints(50);
        const streamGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // 根据选择的颜色方案确定线条渐变
        let startColor, endColor;
        if (colorScheme === 0) {
            startColor = new THREE.Color(0xff5500);
            endColor = new THREE.Color(0x3366ff);
        } else if (colorScheme === 1) {
            startColor = new THREE.Color(0xff00ff);
            endColor = new THREE.Color(0x0033ff);
        } else {
            startColor = new THREE.Color(0xffff00);
            endColor = new THREE.Color(0xff0000);
        }
        
        // 为每个点创建渐变颜色
        const lineColors = new Float32Array(points.length * 3);
        for (let j = 0; j < points.length; j++) {
            const t = j / (points.length - 1);
            const color = new THREE.Color().lerpColors(startColor, endColor, t);
            lineColors[j * 3] = color.r;
            lineColors[j * 3 + 1] = color.g;
            lineColors[j * 3 + 2] = color.b;
        }
        
        streamGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        
        const streamMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        const streamLine = new THREE.Line(streamGeometry, streamMaterial);
        streamLine.userData = {
            angle: angle,
            phase: Math.random() * Math.PI * 2, // 随机相位，使动画不同步
            speed: 0.01 + Math.random() * 0.01
        };
        
        streamLines.add(streamLine);
    }
    
    blackHoleGroup.add(streamLines);
    
    // 添加流星效果 - 随机闪亮粒子，沿着切线飞过
    const meteorCount = 30;
    const meteors = [];
    
    for (let i = 0; i < meteorCount; i++) {
        const meteorGeometry = new THREE.BufferGeometry();
        const meteorVertices = new Float32Array(15 * 3); // 每个流星有15个点形成拖尾
        
        // 初始化不可见
        for (let j = 0; j < 15; j++) {
            meteorVertices[j * 3] = 0;
            meteorVertices[j * 3 + 1] = 0;
            meteorVertices[j * 3 + 2] = 0;
        }
        
        meteorGeometry.setAttribute('position', new THREE.BufferAttribute(meteorVertices, 3));
        
        // 根据颜色方案选择流星颜色
        let meteorColor;
        if (colorScheme === 0) {
            meteorColor = new THREE.Color(0x88aaff); // 蓝白色
        } else if (colorScheme === 1) {
            meteorColor = new THREE.Color(0xff55ff); // 粉紫色
        } else {
            meteorColor = new THREE.Color(0xffaa33); // 橙黄色
        }
        
        const meteorMaterial = new THREE.PointsMaterial({
            color: meteorColor,
            size: 0.1,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        const meteor = new THREE.Points(meteorGeometry, meteorMaterial);
        meteor.userData = {
            active: false,
            angle: 0,
            radius: 0,
            speed: 0,
            size: 0,
            lifetime: 0,
            maxLifetime: 0
        };
        
        blackHoleGroup.add(meteor);
        meteors.push(meteor);
    }
    
    // 添加光晕效果
    const glowGeometry = new THREE.SphereGeometry(1.6, 32, 32);
    let glowColor;
    
    // 根据颜色方案选择光晕颜色
    if (colorScheme === 0) {
        glowColor = 0xff3300;
    } else if (colorScheme === 1) {
        glowColor = 0xff00ff;
    } else {
        glowColor = 0xffcc00;
    }
    
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.set(1.2, 1.2, 1.2);
    blackHoleGroup.add(glow);
    
    // 添加能量波纹
    const waveCount = 4;
    const waves = [];
    
    for (let i = 0; i < waveCount; i++) {
        const waveGeometry = new THREE.RingGeometry(1.8, 1.81, 64, 1);
        const waveMaterial = new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        });
        
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.rotation.x = Math.PI / 2;
        wave.userData = {
            active: false,
            scale: 1,
            opacity: 0
        };
        
        blackHoleGroup.add(wave);
        waves.push(wave);
    }
    
    // 动画更新函数
    let animationTime = 0;
    blackHoleGroup.userData.update = function(time) {
        animationTime += 0.16;
        
        // 光环缓慢旋转
        innerRing.rotation.z = time * 0.05;
        midRing.rotation.z = time * -0.03;
        outerRing.rotation.z = time * 0.02;
        
        // 更新内层粒子
        updateParticleLayer(innerFlowParticles, innerFlowVelocities, 'inner', 1.8, 4.5);
        
        // 更新中层粒子
        updateParticleLayer(midFlowParticles, midFlowVelocities, 'middle', 4.5, 8);
        
        // 更新外层粒子
        updateParticleLayer(outerFlowParticles, outerFlowVelocities, 'outer', 8, 12);
        
        // 更新流线动画
        streamLines.children.forEach(streamLine => {
            const phase = streamLine.userData.phase + time * streamLine.userData.speed;
            const amp = 0.3 + Math.sin(phase) * 0.2;
            streamLine.material.opacity = amp;
        });
        
        // 随机触发流星效果
        if (Math.random() < 0.05) {
            for (const meteor of meteors) {
                if (!meteor.userData.active) {
                    activateMeteor(meteor);
                    break;
                }
            }
        }
        
        // 更新流星
        meteors.forEach(updateMeteor);
        
        // 随机触发波纹
        if (Math.random() < 0.01) {
            for (const wave of waves) {
                if (!wave.userData.active) {
                    wave.userData.active = true;
                    wave.userData.scale = 1;
                    wave.userData.opacity = 0.5;
                    break;
                }
            }
        }
        
        // 更新波纹
        waves.forEach(wave => {
            if (wave.userData.active) {
                wave.userData.scale += 0.1;
                wave.userData.opacity -= 0.01;
                
                wave.scale.set(wave.userData.scale, wave.userData.scale, wave.userData.scale);
                wave.material.opacity = wave.userData.opacity;
                
                if (wave.userData.opacity <= 0) {
                    wave.userData.active = false;
                }
            }
        });
        
        // 扭曲球体呼吸效果
        const breatheFactor = 0.05 + Math.sin(time * 0.3) * 0.02;
        distortion.scale.set(
            1 + Math.sin(time * 0.5) * breatheFactor,
            1 + Math.sin(time * 0.5) * breatheFactor,
            1 + Math.sin(time * 0.5) * breatheFactor
        );
    };
    
    // 辅助函数：更新粒子层
    function updateParticleLayer(particleSystem, velocities, layerName, minRadius, maxRadius) {
        const positions = particleSystem.geometry.attributes.position.array;
        const colors = particleSystem.geometry.attributes.color.array;
        
        for (let i = 0; i < positions.length / 3; i++) {
            const idx = i * 3;
            const x = positions[idx];
            const y = positions[idx + 1];
            const z = positions[idx + 2];
            
            const distanceFromCenter = Math.sqrt(x*x + z*z);
            
            if (distanceFromCenter < minRadius * 0.95) {
                // 如果粒子太靠近内边界，重置到外边界
                const angle = Math.random() * Math.PI * 2;
                const radius = maxRadius * 0.95 + Math.random() * (maxRadius * 0.05);
                
                positions[idx] = Math.cos(angle) * radius;
                positions[idx + 1] = (Math.random() - 0.5) * (layerName === 'outer' ? 0.25 : (layerName === 'middle' ? 0.15 : 0.08));
                positions[idx + 2] = Math.sin(angle) * radius;
                
                // 更新颜色
                const color = getParticleColor(radius, layerName);
                colors[idx] = color.r;
                colors[idx + 1] = color.g;
                colors[idx + 2] = color.b;
                
                // 更新速度
                const range = maxRadius - minRadius;
                const speedFactor = 1 - (radius - minRadius) / range;
                
                if (layerName === 'inner') {
                    velocities[i].speed = 0.01 + 0.04 * speedFactor * speedFactor;
                    velocities[i].rotationSpeed = 0.03 + 0.06 * speedFactor;
                } else if (layerName === 'middle') {
                    velocities[i].speed = 0.005 + 0.02 * speedFactor * speedFactor;
                    velocities[i].rotationSpeed = 0.015 + 0.03 * speedFactor;
                } else { // outer
                    velocities[i].speed = 0.002 + 0.01 * speedFactor * speedFactor;
                    velocities[i].rotationSpeed = 0.005 + 0.015 * speedFactor;
                }
                
                velocities[i].angle = angle;
                velocities[i].radius = radius;
            } else {
                // 正常更新位置
                let currentAngle = Math.atan2(z, x);
                
                // 旋转速度随距离衰减
                const rotationSpeedFactor = 1.0 - Math.min(1.0, (distanceFromCenter - minRadius) / (maxRadius - minRadius));
                const rotationAmount = velocities[i].rotationSpeed * rotationSpeedFactor;
                
                currentAngle += rotationAmount;
                
                // 向黑洞中心移动
                const moveSpeed = velocities[i].speed * (1 + (minRadius + (maxRadius - minRadius) * 0.3 - Math.min(minRadius + (maxRadius - minRadius) * 0.3, distanceFromCenter)) * 0.5);
                const newRadius = distanceFromCenter - moveSpeed;
                
                positions[idx] = Math.cos(currentAngle) * newRadius;
                positions[idx + 2] = Math.sin(currentAngle) * newRadius;
                
                // 平面收缩
                if (Math.abs(positions[idx + 1]) > 0.05) {
                    positions[idx + 1] *= 0.98;
                }
                
                // 更新颜色 - 跟随半径变化
                const color = getParticleColor(newRadius, layerName);
                colors[idx] = color.r;
                colors[idx + 1] = color.g;
                colors[idx + 2] = color.b;
                
                // 更新存储的半径
                velocities[i].radius = newRadius;
            }
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.geometry.attributes.color.needsUpdate = true;
    }
    
    // 辅助函数：激活流星
    function activateMeteor(meteor) {
        // 随机起点角度和半径
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 8; // 在3-11之间的任意位置
        
        // 设置流星参数
        meteor.userData.active = true;
        meteor.userData.angle = angle;
        meteor.userData.radius = radius;
        meteor.userData.speed = 0.05 + Math.random() * 0.1;
        meteor.userData.size = 0.05 + Math.random() * 0.1;
        meteor.userData.lifetime = 0;
        meteor.userData.maxLifetime = 50 + Math.random() * 50;
        
        // 设置初始位置
        const positions = meteor.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length / 3; i++) {
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        
        meteor.geometry.attributes.position.needsUpdate = true;
        meteor.material.opacity = 0.8;
        meteor.material.size = meteor.userData.size;
    }
    
    // 辅助函数：更新流星
    function updateMeteor(meteor) {
        if (!meteor.userData.active) return;
        
        meteor.userData.lifetime++;
        
        if (meteor.userData.lifetime >= meteor.userData.maxLifetime) {
            meteor.userData.active = false;
            meteor.material.opacity = 0;
            return;
        }
        
        // 更新角度和半径
        meteor.userData.angle += meteor.userData.speed * 0.1;
        meteor.userData.radius -= meteor.userData.speed * 0.5;
        
        // 如果太靠近中心，消失
        if (meteor.userData.radius < 2) {
            meteor.userData.active = false;
            meteor.material.opacity = 0;
            return;
        }
        
        // 更新拖尾效果
        const positions = meteor.geometry.attributes.position.array;
        
        // 保存前一个点的位置
        let prevX = positions[0];
        let prevY = positions[1];
        let prevZ = positions[2];
        
        // 更新头部点位置
        positions[0] = Math.cos(meteor.userData.angle) * meteor.userData.radius;
        positions[1] = meteor.userData.lifetime % 2 === 0 ? positions[1] + (Math.random() - 0.5) * 0.01 : positions[1];
        positions[2] = Math.sin(meteor.userData.angle) * meteor.userData.radius;
        
        // 后续点跟随前面的点，形成拖尾
        for (let i = 1; i < positions.length / 3; i++) {
            const idx = i * 3;
            const tempX = positions[idx];
            const tempY = positions[idx + 1];
            const tempZ = positions[idx + 2];
            
            // 当前点移向前一个点的位置
            positions[idx] = prevX;
            positions[idx + 1] = prevY;
            positions[idx + 2] = prevZ;
            
            // 保存原位置用于下一个点
            prevX = tempX;
            prevY = tempY;
            prevZ = tempZ;
        }
        
        meteor.geometry.attributes.position.needsUpdate = true;
        
        // 淡出效果
        if (meteor.userData.lifetime > meteor.userData.maxLifetime * 0.7) {
            const fadeRatio = 1 - (meteor.userData.lifetime - meteor.userData.maxLifetime * 0.7) / (meteor.userData.maxLifetime * 0.3);
            meteor.material.opacity = 0.8 * fadeRatio;
        }
    }
    
    log('渐变色黑洞模型创建完成');
    return blackHoleGroup;
}