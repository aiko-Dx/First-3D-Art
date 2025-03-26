// 创建终极高科技宇宙飞船
function createSpaceship(colorScheme = 0) {
    console.log("正在创建终极高科技宇宙飞船，颜色方案:", colorScheme);
    
    // 创建主飞船组
    const shipGroup = new THREE.Group();
    
    // 颜色配置 - 更加未来感的色彩组合
    const colors = getUltraModernColors(colorScheme);
    
    // === 核心船体构建 ===
    buildShipCore(shipGroup, colors);
    
    // === 构建先进推进系统 ===
    buildAdvancedPropulsion(shipGroup, colors);
    
    // === 添加武器系统 ===
    buildWeaponSystems(shipGroup, colors);
    
    // === 构建能量护盾和力场 ===
    buildEnergyShields(shipGroup, colors);
    
    // === 添加高科技细节 ===
    buildHighTechDetails(shipGroup, colors);
    
    // === 设置全息投影效果 ===
    buildHolographicEffects(shipGroup, colors);
    
    // === 添加先进动画系统 ===
    setupAdvancedAnimations(shipGroup, colors);
    
    // === 增强飞船头部 ===
    enhanceShipHead(shipGroup, colors);
    
    // === 修复护盾附着 ===
    fixShieldAttachment(shipGroup);
    
    console.log("终极高科技宇宙飞船创建完成");
    return shipGroup;
}

// 定义超现代色彩方案
function getUltraModernColors(scheme) {
    const schemes = [
        {   // 量子蓝 - 超现代蓝色科技
            primary: 0x0033ff,       // 深蓝色主体
            secondary: 0x00aaff,     // 蓝色细节
            accent: 0x00ffff,        // 青色强调
            energy: 0x66ffff,        // 能量蓝
            weapon: 0xff3366,        // 武器红
            propulsion: 0xff9500,    // 推进橙
            shield: 0x3399ff,        // 护盾蓝
            hologram: 0x00ffaa,      // 全息绿蓝
            glow: {
                primary: 0x0066ff,
                secondary: 0x00ddff
            }
        },
        {   // 等离子紫 - 未来感紫色调
            primary: 0x6600ff,       // 深紫色主体
            secondary: 0xaa00ff,     // 亮紫色细节
            accent: 0xff00ff,        // 粉紫色强调
            energy: 0xff66ff,        // 能量粉
            weapon: 0xffff00,        // 武器黄
            propulsion: 0xff00aa,    // 推进粉红
            shield: 0x9966ff,        // 护盾淡紫
            hologram: 0xaa88ff,      // 全息淡紫
            glow: {
                primary: 0xaa00ff,
                secondary: 0xff00ff
            }
        },
        {   // 反物质绿 - 外星科技绿色调
            primary: 0x00aa66,       // 深绿色主体
            secondary: 0x00ff99,     // 浅绿色细节
            accent: 0x88ff00,        // 黄绿色强调
            energy: 0xaaff66,        // 能量黄绿
            weapon: 0xff0066,        // 武器红
            propulsion: 0xffaa00,    // 推进金
            shield: 0x66ffaa,        // 护盾绿
            hologram: 0x00ffcc,      // 全息青绿
            glow: {
                primary: 0x00dd66,
                secondary: 0x66ff99
            }
        }
    ];
    
    return schemes[scheme % schemes.length];
}

// 构建飞船核心船体
function buildShipCore(group, colors) {
    // 主船体 - 使用更加复杂的几何形状
    const coreGroup = new THREE.Group();
    
    // 创建主体形状 - 流线型未来感主体
    const mainHullGeometry = new THREE.CylinderGeometry(0.8, 1.2, 4, 16);
    const mainHullMaterial = new THREE.MeshPhongMaterial({
        color: colors.primary,
        specular: 0xffffff,
        shininess: 100,
        emissive: colors.primary,
        emissiveIntensity: 0.2
    });
    
    const mainHull = new THREE.Mesh(mainHullGeometry, mainHullMaterial);
    mainHull.scale.set(1, 0.5, 0.6);
    mainHull.rotation.z = Math.PI / 2;
    coreGroup.add(mainHull);
    
    // 前部造型 - 尖锐的前端
    const noseGeometry = new THREE.ConeGeometry(0.5, 2, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({
        color: colors.secondary,
        shininess: 100,
        emissive: colors.secondary,
        emissiveIntensity: 0.1
    });
    
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(2.5, 0, 0);
    coreGroup.add(nose);
    
    // 中央舰桥 - 凸起的驾驶舱
    const bridgeGeometry = new THREE.SphereGeometry(0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bridgeMaterial = new THREE.MeshPhongMaterial({
        color: colors.energy,
        transparent: true,
        opacity: 0.9,
        shininess: 150,
        emissive: colors.energy,
        emissiveIntensity: 0.2
    });
    
    const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
    bridge.rotation.z = -Math.PI / 2;
    bridge.position.set(1.2, 0.4, 0);
    coreGroup.add(bridge);
    
    // 添加黑色镜面座舱玻璃
    const glassGeometry = new THREE.SphereGeometry(0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const glassMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.7,
        shininess: 500,
        specular: 0xffffff,
        emissive: colors.glow.secondary,
        emissiveIntensity: 0.1
    });
    
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.rotation.z = -Math.PI / 2;
    glass.position.set(1.2, 0.4, 0);
    glass.scale.set(0.9, 0.9, 0.9);
    coreGroup.add(glass);
    
    // 上层结构 - 增加垂直元素
    const upperStructureGeometry = new THREE.BoxGeometry(2, 0.3, 0.8);
    const upperStructureMaterial = new THREE.MeshPhongMaterial({
        color: colors.secondary,
        shininess: 80
    });
    
    const upperStructure = new THREE.Mesh(upperStructureGeometry, upperStructureMaterial);
    upperStructure.position.set(0, 0.6, 0);
    coreGroup.add(upperStructure);
    
    // 下层结构 - 平衡设计
    const lowerStructure = new THREE.Mesh(upperStructureGeometry, upperStructureMaterial);
    lowerStructure.position.set(0, -0.6, 0);
    coreGroup.add(lowerStructure);
    
    // 侧翼几何结构 - 四边形动态机翼
    const wingGeometry = new THREE.BoxGeometry(3, 0.15, 1.2);
    const wingMaterial = new THREE.MeshPhongMaterial({
        color: colors.secondary,
        shininess: 100,
        emissive: colors.secondary,
        emissiveIntensity: 0.1
    });
    
    // 左上翼
    const topLeftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    topLeftWing.position.set(-0.5, 0.5, 1.5);
    topLeftWing.rotation.y = Math.PI / 18; // 轻微倾斜
    topLeftWing.userData = { type: 'wing', side: 'topLeft' };
    coreGroup.add(topLeftWing);
    
    // 右上翼
    const topRightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    topRightWing.position.set(-0.5, 0.5, -1.5);
    topRightWing.rotation.y = -Math.PI / 18; // 反向倾斜
    topRightWing.userData = { type: 'wing', side: 'topRight' };
    coreGroup.add(topRightWing);
    
    // 左下翼
    const bottomLeftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    bottomLeftWing.position.set(-0.5, -0.5, 1.5);
    bottomLeftWing.rotation.y = Math.PI / 18; // 轻微倾斜
    bottomLeftWing.userData = { type: 'wing', side: 'bottomLeft' };
    coreGroup.add(bottomLeftWing);
    
    // 右下翼
    const bottomRightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    bottomRightWing.position.set(-0.5, -0.5, -1.5);
    bottomRightWing.rotation.y = -Math.PI / 18; // 反向倾斜
    bottomRightWing.userData = { type: 'wing', side: 'bottomRight' };
    coreGroup.add(bottomRightWing);
    
    // 添加翼尖发光装置
    const wingTipGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.3);
    const wingTipMaterial = new THREE.MeshBasicMaterial({
        color: colors.energy,
        transparent: true,
        opacity: 0.9
    });
    
    // 为每个机翼添加翼尖
    const addWingTip = (wing, offsetX, offsetZ) => {
        const wingTip = new THREE.Mesh(wingTipGeometry, wingTipMaterial.clone());
        const wingPos = wing.position;
        wingTip.position.set(wingPos.x + offsetX, wingPos.y, wingPos.z + offsetZ);
        wingTip.rotation.y = wing.rotation.y;
        wingTip.userData = { type: 'wingTip', parent: wing.userData.side, animation: 'pulse' };
        coreGroup.add(wingTip);
        return wingTip;
    };
    
    // 添加所有翼尖
    const topLeftTip = addWingTip(topLeftWing, 1.4, 0.45);
    const topRightTip = addWingTip(topRightWing, 1.4, -0.45);
    const bottomLeftTip = addWingTip(bottomLeftWing, 1.4, 0.45);
    const bottomRightTip = addWingTip(bottomRightWing, 1.4, -0.45);
    
    group.add(coreGroup);
}

// 增强飞船头部的高科技感
function enhanceShipHead(shipGroup, colors) {
    const headEnhancementGroup = new THREE.Group();
    
    // 添加先进扫描阵列
    const scannerRingGeometry = new THREE.TorusGeometry(0.4, 0.05, 12, 24);
    const scannerRingMaterial = new THREE.MeshPhongMaterial({
        color: colors.secondary,
        emissive: colors.energy,
        emissiveIntensity: 0.3,
        shininess: 100
    });
    
    const scannerRing = new THREE.Mesh(scannerRingGeometry, scannerRingMaterial);
    scannerRing.position.set(2.8, 0, 0);
    scannerRing.rotation.y = Math.PI / 2;
    headEnhancementGroup.add(scannerRing);
    
    // 添加扫描光束
    const scanBeamGeometry = new THREE.CylinderGeometry(0.01, 0.2, 0.6, 16);
    const scanBeamMaterial = new THREE.MeshBasicMaterial({
        color: colors.energy,
        transparent: true,
        opacity: 0.7
    });
    
    const scanBeam = new THREE.Mesh(scanBeamGeometry, scanBeamMaterial);
    scanBeam.position.set(3.2, 0, 0);
    scanBeam.rotation.z = Math.PI / 2;
    scanBeam.userData = { type: 'scanBeam', animation: 'pulse' };
    headEnhancementGroup.add(scanBeam);
    
    // 添加高科技传感器阵列
    const sensorCount = 8;
    for (let i = 0; i < sensorCount; i++) {
        const angle = (i / sensorCount) * Math.PI * 2;
        const radius = 0.35;
        
        // 传感器底座
        const sensorBaseGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.05);
        const sensorBaseMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 80
        });
        
        const sensorBase = new THREE.Mesh(sensorBaseGeometry, sensorBaseMaterial);
        sensorBase.position.set(
            2.8,
            Math.sin(angle) * radius,
            Math.cos(angle) * radius
        );
        sensorBase.lookAt(new THREE.Vector3(3.5, Math.sin(angle) * radius, Math.cos(angle) * radius));
        headEnhancementGroup.add(sensorBase);
        
        // 传感器发光部分
        const sensorTipGeometry = new THREE.SphereGeometry(0.02, 8, 8);
        const sensorTipMaterial = new THREE.MeshBasicMaterial({
            color: colors.hologram,
            transparent: true,
            opacity: 0.9
        });
        
        const sensorTip = new THREE.Mesh(sensorTipGeometry, sensorTipMaterial);
        sensorTip.position.set(
            2.84,
            Math.sin(angle) * radius,
            Math.cos(angle) * radius
        );
        sensorTip.userData = { type: 'sensorTip', index: i, animation: 'randomPulse' };
        headEnhancementGroup.add(sensorTip);
    }
    
    // 添加前部装甲板和科技细节
    const frontPlateGeometry = new THREE.CylinderGeometry(0.6, 0.4, 0.15, 16);
    const frontPlateMaterial = new THREE.MeshPhongMaterial({
        color: colors.primary,
        shininess: 80,
        emissive: colors.primary,
        emissiveIntensity: 0.1
    });
    
    const frontPlate = new THREE.Mesh(frontPlateGeometry, frontPlateMaterial);
    frontPlate.position.set(2.3, 0, 0);
    frontPlate.rotation.z = Math.PI / 2;
    headEnhancementGroup.add(frontPlate);
    
    // 添加头部导航灯
    const navLightGeometry = new THREE.SphereGeometry(0.06, 12, 12);
    const redNavLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.8
    });
    const greenNavLightMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8
    });
    
    // 左侧红灯
    const leftNavLight = new THREE.Mesh(navLightGeometry, redNavLightMaterial);
    leftNavLight.position.set(2.4, 0, 0.7);
    leftNavLight.userData = { type: 'navLight', side: 'left', animation: 'pulse' };
    headEnhancementGroup.add(leftNavLight);
    
    // 右侧绿灯
    const rightNavLight = new THREE.Mesh(navLightGeometry, greenNavLightMaterial);
    rightNavLight.position.set(2.4, 0, -0.7);
    rightNavLight.userData = { type: 'navLight', side: 'right', animation: 'pulse' };
    headEnhancementGroup.add(rightNavLight);
    
    // 添加高科技纹理面板
    const techPanelGeometry = new THREE.PlaneGeometry(0.4, 0.2);
    const techPanelMaterial = new THREE.MeshBasicMaterial({
        color: colors.energy,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    
    // 顶部面板
    const topTechPanel = new THREE.Mesh(techPanelGeometry, techPanelMaterial.clone());
    topTechPanel.position.set(2.3, 0.5, 0);
    topTechPanel.rotation.x = Math.PI / 2;
    topTechPanel.userData = { type: 'techPanel', position: 'top', animation: 'flicker' };
    headEnhancementGroup.add(topTechPanel);
    
    // 底部面板
    const bottomTechPanel = new THREE.Mesh(techPanelGeometry, techPanelMaterial.clone());
    bottomTechPanel.position.set(2.3, -0.5, 0);
    bottomTechPanel.rotation.x = Math.PI / 2;
    bottomTechPanel.userData = { type: 'techPanel', position: 'bottom', animation: 'flicker' };
    headEnhancementGroup.add(bottomTechPanel);
    
    // 将新的头部增强组添加到飞船
    shipGroup.add(headEnhancementGroup);
    
    // 添加动画组件引用
    if (shipGroup.userData.update) {
        const originalUpdate = shipGroup.userData.update;
        shipGroup.userData.update = function(time) {
            originalUpdate(time);
            
            // 头部扫描器动画
            scanBeam.material.opacity = 0.5 + 0.3 * Math.sin(time * 3);
            scanBeam.scale.y = 1 + 0.2 * Math.sin(time * 2);
            
            // 传感器闪烁
            headEnhancementGroup.children.forEach(obj => {
                if (obj.userData && obj.userData.type === 'sensorTip') {
                    const idx = obj.userData.index || 0;
                    obj.material.opacity = 0.7 + 0.3 * Math.sin(time * 2 + idx);
                    
                    // 随机闪烁
                    if (Math.random() < 0.005) {
                        obj.userData.flashing = true;
                        obj.userData.flashTime = time;
                    }
                    
                    if (obj.userData.flashing) {
                        const flashDuration = 0.2;
                        const elapsed = time - obj.userData.flashTime;
                        
                        if (elapsed < flashDuration) {
                            obj.material.opacity = 1;
                            obj.scale.set(1.5, 1.5, 1.5);
                        } else {
                            obj.userData.flashing = false;
                            obj.scale.set(1, 1, 1);
                        }
                    }
                }
                
                // 导航灯动画
                if (obj.userData && obj.userData.type === 'navLight') {
                    const blinkRate = obj.userData.side === 'left' ? 1.5 : 1.3;
                    obj.material.opacity = 0.6 + 0.4 * Math.sin(time * blinkRate);
                }
                
                // 技术面板闪烁
                if (obj.userData && obj.userData.type === 'techPanel') {
                    const offset = obj.userData.position === 'top' ? 0 : 0.5;
                    obj.material.opacity = 0.4 + 0.2 * Math.sin(time * 1.5 + offset) + 0.1 * Math.sin(time * 10 + offset);
                }
            });
        };
    }
    
    return headEnhancementGroup;
}

// 修复护盾同步并停止旋转
function fixShieldAttachment(shipGroup) {
    // 首先找到护盾组和飞船主体
    let shieldObjects = [];
    
    // 遍历查找所有护盾相关对象
    shipGroup.traverse(obj => {
        if (obj.userData && obj.userData.type) {
            // 收集所有护盾相关对象
            if (obj.userData.type === 'shield' || 
                obj.userData.type === 'shieldWireframe' || 
                obj.userData.type === 'shieldWave' || 
                obj.userData.type === 'shieldProjector') {
                shieldObjects.push(obj);
                
                // 保存对象的原始旋转，以便后续使用
                obj.userData.originalRotation = {
                    x: obj.rotation.x,
                    y: obj.rotation.y,
                    z: obj.rotation.z
                };
            }
        }
    });
    
    console.log("找到护盾对象:", shieldObjects.length, "个");
    
    // 修改原来的动画系统
    if (shipGroup.userData.update) {
        const originalUpdate = shipGroup.userData.update;
        shipGroup.userData.update = function(time) {
            try {
                // 调用原始动画函数
                originalUpdate(time);
                
                // 确保护盾对象的位置和旋转与飞船保持一致
                shieldObjects.forEach(obj => {
                    if (obj.userData.type === 'shieldWireframe') {
                        // 护盾线框使用固定的较慢旋转，而不是随飞船移动的旋转
                        obj.rotation.y = time * 0.01; // 慢速自转而非跟随飞船旋转
                    } else if (obj.userData.type === 'shieldWave') {
                        // 波纹可以有自己的动画，但确保位置与飞船保持一致
                        // 波纹动画保留原有逻辑
                    } else {
                        // 其他护盾对象应该有固定的旋转
                        if (obj.userData.originalRotation) {
                            obj.rotation.set(
                                obj.userData.originalRotation.x,
                                obj.userData.originalRotation.y,
                                obj.userData.originalRotation.z
                            );
                        }
                    }
                    
                    // 脉冲动画只影响透明度和缩放，不影响位置和旋转
                    if (obj.userData.animation === 'pulse') {
                        obj.material.opacity = 0.1 + 0.05 * Math.sin(time * 0.5);
                    }
                });
                
            } catch (e) {
                console.error("动画更新错误:", e);
            }
        };
    }
    
    console.log("护盾与飞船同步修复完成");
}

// 构建先进推进系统
function buildAdvancedPropulsion(group, colors) {
    const propulsionGroup = new THREE.Group();
    
    // 主引擎 - 大型后方推进器
    const mainEngineGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5, 16);
    const mainEngineMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        shininess: 50,
        emissive: colors.primary,
        emissiveIntensity: 0.1
    });
    
    const mainEngine = new THREE.Mesh(mainEngineGeometry, mainEngineMaterial);
    mainEngine.position.set(-2.5, 0, 0);
    mainEngine.rotation.z = Math.PI / 2;
    propulsionGroup.add(mainEngine);
    
    // 引擎内部发光核心
    const engineCoreGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.4, 16);
    const engineCoreMaterial = new THREE.MeshBasicMaterial({
        color: colors.propulsion,
        transparent: true,
        opacity: 0.9
    });
    
    const engineCore = new THREE.Mesh(engineCoreGeometry, engineCoreMaterial);
    engineCore.position.set(-3.0, 0, 0);
    engineCore.rotation.z = Math.PI / 2;
    engineCore.userData = { type: 'engineCore', animation: 'pulse' };
    propulsionGroup.add(engineCore);
    
    // 四个辅助引擎 - 围绕主引擎
    const subEngineGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1, 16);
    const subEngineMaterial = new THREE.MeshPhongMaterial({
        color: 0x444444,
        shininess: 60
    });
    
    // 创建四个辅助引擎
    const createSubEngine = (x, y, z) => {
        const engine = new THREE.Mesh(subEngineGeometry, subEngineMaterial);
        engine.position.set(x, y, z);
        engine.rotation.z = Math.PI / 2;
        propulsionGroup.add(engine);
        
        // 添加发光核心
        const coreGeometry = new THREE.CylinderGeometry(0.15, 0.25, 0.3, 16);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: colors.propulsion,
            transparent: true,
            opacity: 0.9
        });
        
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.position.set(x - 0.4, y, z);
        core.rotation.z = Math.PI / 2;
        core.userData = { type: 'subEngineCore', animation: 'pulse' };
        propulsionGroup.add(core);
        
        return { engine, core };
    };
    
    // 添加四个引擎
    const topLeftEngine = createSubEngine(-2.2, 0.7, 0.7);
    const topRightEngine = createSubEngine(-2.2, 0.7, -0.7);
    const bottomLeftEngine = createSubEngine(-2.2, -0.7, 0.7);
    const bottomRightEngine = createSubEngine(-2.2, -0.7, -0.7);
    
    // 引擎喷射效果 - 主引擎
    const engineFlameGeometry = new THREE.ConeGeometry(0.8, 3, 16);
    const engineFlameMaterial = new THREE.MeshBasicMaterial({
        color: colors.propulsion,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    
    const engineFlame = new THREE.Mesh(engineFlameGeometry, engineFlameMaterial);
    engineFlame.position.set(-4.5, 0, 0);
    engineFlame.rotation.z = -Math.PI / 2;
    engineFlame.userData = { type: 'engineFlame', animation: 'pulse' };
    propulsionGroup.add(engineFlame);
    
    // 添加辅助引擎喷射效果
    const createSubFlame = (x, y, z) => {
        const flameGeometry = new THREE.ConeGeometry(0.3, 1.5, 16);
        const flameMaterial = new THREE.MeshBasicMaterial({
            color: colors.propulsion,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        
        const flame = new THREE.Mesh(flameGeometry, flameMaterial);
        flame.position.set(x, y, z);
        flame.rotation.z = -Math.PI / 2;
        flame.userData = { type: 'subEngineFlame', animation: 'pulse' };
        propulsionGroup.add(flame);
        
        return flame;
    };
    
    // 添加四个辅助引擎喷射
    const topLeftFlame = createSubFlame(-3.0, 0.7, 0.7);
    const topRightFlame = createSubFlame(-3.0, 0.7, -0.7);
    const bottomLeftFlame = createSubFlame(-3.0, -0.7, 0.7);
    const bottomRightFlame = createSubFlame(-3.0, -0.7, -0.7);
    
    // 创建高级粒子推进效果
    createPropulsionParticles(propulsionGroup, colors);
    
    // 能量传输管道 - 将能源从反应堆传输到引擎
    const energyPipeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
    const energyPipeMaterial = new THREE.MeshBasicMaterial({
        color: colors.energy,
        transparent: true,
        opacity: 0.8
    });
    
    // 添加多条能量管道
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 0.5;
        
        const pipe = new THREE.Mesh(energyPipeGeometry, energyPipeMaterial.clone());
        pipe.position.set(-1.5, Math.sin(angle) * radius, Math.cos(angle) * radius);
        pipe.rotation.z = Math.PI / 2;
        pipe.userData = { type: 'energyPipe', animation: 'pulse', offset: i * 0.25 };
        propulsionGroup.add(pipe);
    }
    
    group.add(propulsionGroup);
}

// 创建推进粒子效果
function createPropulsionParticles(group, colors) {
    // 主引擎粒子
    const particleCount = 150; // 控制性能和效果的平衡
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const spread = Math.random() * 0.8;
        const distance = Math.random() * 6;
        
        // 主引擎粒子位置 - 后方扩散锥形
        particlePositions[i3] = -3 - distance;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * spread * distance/3;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * spread * distance/3;
        
        // 粒子尺寸 - 由大到小
        particleSizes[i] = 0.08 + (Math.random() * 0.08) * (1 - distance/6);
        
        // 颜色 - 从中心到外围渐变
        let particleColor;
        if (distance < 2) {
            // 内部 - 亮色
            particleColor = new THREE.Color(colors.propulsion);
        } else if (distance < 4) {
            // 中部 - 混合
            const ratio = (distance - 2) / 2;
            particleColor = new THREE.Color(colors.propulsion).lerp(new THREE.Color(colors.energy), ratio);
        } else {
            // 外部 - 暗色
            particleColor = new THREE.Color(colors.energy);
        }
        
        particleColors[i3] = particleColor.r;
        particleColors[i3 + 1] = particleColor.g;
        particleColors[i3 + 2] = particleColor.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData = { type: 'engineParticles' };
    group.add(particles);
    
    // 添加辅助引擎粒子 - 每个引擎30个粒子
    const subEnginePositions = [
        [-3.0, 0.7, 0.7],  // 左上
        [-3.0, 0.7, -0.7], // 右上
        [-3.0, -0.7, 0.7], // 左下
        [-3.0, -0.7, -0.7] // 右下
    ];
    
    subEnginePositions.forEach((pos, idx) => {
        const subParticleCount = 30;
        const subGeometry = new THREE.BufferGeometry();
        const subPositions = new Float32Array(subParticleCount * 3);
        const subColors = new Float32Array(subParticleCount * 3);
        const subSizes = new Float32Array(subParticleCount);
        
        for (let i = 0; i < subParticleCount; i++) {
            const i3 = i * 3;
            const spread = Math.random() * 0.3;
            const distance = Math.random() * 2;
            
            // 位置
            subPositions[i3] = pos[0] - distance;
            subPositions[i3 + 1] = pos[1] + (Math.random() - 0.5) * spread * distance/2;
            subPositions[i3 + 2] = pos[2] + (Math.random() - 0.5) * spread * distance/2;
            
            // 尺寸
            subSizes[i] = 0.05 + (Math.random() * 0.05) * (1 - distance/2);
            
            // 颜色
            const particleColor = new THREE.Color(colors.propulsion).lerp(
                new THREE.Color(colors.energy),
                Math.random() * 0.5
            );
            
            subColors[i3] = particleColor.r;
            subColors[i3 + 1] = particleColor.g;
            subColors[i3 + 2] = particleColor.b;
        }
        
        subGeometry.setAttribute('position', new THREE.BufferAttribute(subPositions, 3));
        subGeometry.setAttribute('color', new THREE.BufferAttribute(subColors, 3));
        subGeometry.setAttribute('size', new THREE.BufferAttribute(subSizes, 1));
        
        const subMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        const subParticles = new THREE.Points(subGeometry, subMaterial);
        subParticles.userData = { type: 'subEngineParticles', index: idx };
        group.add(subParticles);
    });
}

// 构建武器系统
function buildWeaponSystems(group, colors) {
    const weaponsGroup = new THREE.Group();
    
    // 1. 前部主炮 - 大型能量炮
    const mainCannonGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 16);
    const mainCannonMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        shininess: 80,
        emissive: colors.weapon,
        emissiveIntensity: 0.1
    });
    
    const mainCannon = new THREE.Mesh(mainCannonGeometry, mainCannonMaterial);
    mainCannon.position.set(3, 0, 0);
    mainCannon.rotation.z = Math.PI / 2;
    weaponsGroup.add(mainCannon);
    
    // 能量炮口发光效果
    const cannonTipGeometry = new THREE.RingGeometry(0.1, 0.2, 16);
    const cannonTipMaterial = new THREE.MeshBasicMaterial({
        color: colors.weapon,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
    });
    
    const cannonTip = new THREE.Mesh(cannonTipGeometry, cannonTipMaterial);
    cannonTip.position.set(4.01, 0, 0);
    cannonTip.rotation.y = Math.PI / 2;
    cannonTip.userData = { type: 'cannonTip', animation: 'pulse' };
    weaponsGroup.add(cannonTip);
    
    // 2. 侧面武器挂载点 - 多个小型炮塔
    const turretPositions = [
        [1, 0.6, 1],   // 前左上
        [1, 0.6, -1],  // 前右上
        [-1, 0.6, 1],  // 后左上
        [-1, 0.6, -1], // 后右上
        [1, -0.6, 1],  // 前左下
        [1, -0.6, -1], // 前右下
        [-1, -0.6, 1], // 后左下
        [-1, -0.6, -1] // 后右下
    ];
    
    // 创建炮塔
    turretPositions.forEach((pos, idx) => {
        // 炮塔底座
        const turretBaseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.2, 8);
        const turretBaseMaterial = new THREE.MeshPhongMaterial({
            color: colors.secondary,
            shininess: 70
        });
        
        const turretBase = new THREE.Mesh(turretBaseGeometry, turretBaseMaterial);
        turretBase.position.set(pos[0], pos[1], pos[2]);
        weaponsGroup.add(turretBase);
        
        // 炮管
        const turretBarrelGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.4, 8);
        const turretBarrelMaterial = new THREE.MeshPhongMaterial({
            color: 0x444444,
            shininess: 60
        });
        
        // 计算朝外的方向
        const direction = new THREE.Vector3(pos[0], pos[1], pos[2]).normalize();
        
        const turretBarrel = new THREE.Mesh(turretBarrelGeometry, turretBarrelMaterial);
        // 位置略微偏移 - 沿着方向
        turretBarrel.position.set(
            pos[0] + direction.x * 0.25,
            pos[1] + direction.y * 0.25,
            pos[2] + direction.z * 0.25
        );
        
        // 炮管朝外
        turretBarrel.lookAt(
            pos[0] + direction.x * 2,
            pos[1] + direction.y * 2,
            pos[2] + direction.z * 2
        );
        
        turretBarrel.userData = { type: 'turretBarrel', index: idx };
        weaponsGroup.add(turretBarrel);
        
        // 炮口发光效果
        const turretTipGeometry = new THREE.CircleGeometry(0.05, 8);
        const turretTipMaterial = new THREE.MeshBasicMaterial({
            color: colors.weapon,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const turretTip = new THREE.Mesh(turretTipGeometry, turretTipMaterial);
        // 计算炮口位置 - 沿方向再偏移
        turretTip.position.set(
            pos[0] + direction.x * 0.5,
            pos[1] + direction.y * 0.5,
            pos[2] + direction.z * 0.5
        );
        
        // 炮口朝外
        turretTip.lookAt(
            pos[0] + direction.x * 2,
            pos[1] + direction.y * 2,
            pos[2] + direction.z * 2
        );
        
        turretTip.userData = { type: 'turretTip', index: idx, animation: 'randomPulse' };
        weaponsGroup.add(turretTip);
    });
    
    // 3. 鱼雷/导弹发射管
    const torpedoLauncherGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
    const torpedoLauncherMaterial = new THREE.MeshPhongMaterial({
        color: colors.secondary,
        shininess: 60
    });
    
    // 侧面导弹发射器
    const leftLauncher = new THREE.Mesh(torpedoLauncherGeometry, torpedoLauncherMaterial);
    leftLauncher.position.set(1.2, 0, 1.1);
    weaponsGroup.add(leftLauncher);
    
    const rightLauncher = new THREE.Mesh(torpedoLauncherGeometry, torpedoLauncherMaterial);
    rightLauncher.position.set(1.2, 0, -1.1);
    weaponsGroup.add(rightLauncher);
    
    // 发射管开口发光效果
    const launcherTipGeometry = new THREE.PlaneGeometry(0.15, 0.15);
    const launcherTipMaterial = new THREE.MeshBasicMaterial({
        color: colors.weapon,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    
    const leftLauncherTip = new THREE.Mesh(launcherTipGeometry, launcherTipMaterial);
    leftLauncherTip.position.set(1.2, 0, 1.21);
    leftLauncherTip.rotation.y = Math.PI / 2;
    leftLauncherTip.userData = { type: 'launcherTip', side: 'left', animation: 'randomPulse' };
    weaponsGroup.add(leftLauncherTip);
    
    const rightLauncherTip = new THREE.Mesh(launcherTipGeometry, launcherTipMaterial);
    rightLauncherTip.position.set(1.2, 0, -1.21);
    rightLauncherTip.rotation.y = Math.PI / 2;
    rightLauncherTip.userData = { type: 'launcherTip', side: 'right', animation: 'randomPulse' };
    weaponsGroup.add(rightLauncherTip);
    
    group.add(weaponsGroup);
}

// 构建能量护盾和力场 - 修改版本
function buildEnergyShields(group, colors) {
    const shieldsGroup = new THREE.Group();
    
    // 1. 护盾投影发射器 - 小型突起
    const projectorGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const projectorMaterial = new THREE.MeshBasicMaterial({
        color: colors.shield,
        transparent: true,
        opacity: 0.9
    });
    
    // 六个投影点
    const projectorPositions = [
        [1.5, 0.6, 0.6],   // 前上右
        [1.5, 0.6, -0.6],  // 前上左
        [1.5, -0.6, 0.6],  // 前下右
        [1.5, -0.6, -0.6], // 前下左
        [-1.5, 0, 0.6],    // 后右
        [-1.5, 0, -0.6]    // 后左
    ];
    
    projectorPositions.forEach((pos, idx) => {
        const projector = new THREE.Mesh(projectorGeometry, projectorMaterial.clone());
        projector.position.set(pos[0], pos[1], pos[2]);
        projector.userData = { type: 'shieldProjector', index: idx, animation: 'pulse' };
        shieldsGroup.add(projector);
    });
    
    // 2. 整体护盾 - 大型透明半球
    const shieldGeometry = new THREE.SphereGeometry(3.2, 32, 32);
    const shieldMaterial = new THREE.MeshPhongMaterial({
        color: colors.shield,
        transparent: true,
        opacity: 0.15,
        shininess: 100,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });
    
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.scale.set(1.4, 0.7, 0.8);
    shield.userData = { type: 'shield', animation: 'pulse' };
    shieldsGroup.add(shield);
    
    // 3. 护盾网格效果 - 线框
    const shieldWireframeGeometry = new THREE.SphereGeometry(3.21, 16, 16);
    const shieldWireframeMaterial = new THREE.MeshBasicMaterial({
        color: colors.shield,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    
    const shieldWireframe = new THREE.Mesh(shieldWireframeGeometry, shieldWireframeMaterial);
    shieldWireframe.scale.set(1.4, 0.7, 0.8);
    shieldWireframe.userData = { type: 'shieldWireframe', animation: 'rotate' };
    shieldsGroup.add(shieldWireframe);
    
    // 4. 添加护盾能量波纹 - 多个薄环
    const waveCount = 3;
    for (let i = 0; i < waveCount; i++) {
        const waveGeometry = new THREE.RingGeometry(3.2 + i * 0.1, 3.25 + i * 0.1, 64);
        const waveMaterial = new THREE.MeshBasicMaterial({
            color: colors.shield,
            transparent: true,
            opacity: 0.2 - i * 0.05,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.scale.set(1.4, 1, 0.8);
        wave.rotation.x = Math.PI / 2;
        wave.userData = { type: 'shieldWave', index: i, animation: 'expand' };
        wave.visible = false; // 初始隐藏，动画时显示
        shieldsGroup.add(wave);
    }
    
    // 重要：确保护盾组作为飞船的子对象被正确添加
    group.add(shieldsGroup);
    
    // 保存护盾组的引用，以便在整体飞船动画中使用
    group.userData.shieldsGroup = shieldsGroup;
}

// 构建高科技细节
function buildHighTechDetails(group, colors) {
    const detailsGroup = new THREE.Group();
    
    // 1. 添加能量管道 - 飞船表面的发光线条
    const addEnergyLine = (start, end, width = 0.04, color = colors.energy) => {
        // 计算管道方向和长度
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        
        const lineGeometry = new THREE.CylinderGeometry(width, width, length, 8);
        const lineMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8
        });
        
        // 创建管道
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        
        // 定位和朝向
        line.position.copy(start).add(direction.multiplyScalar(0.5));
        line.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.clone().normalize()
        );
        
        line.userData = { type: 'energyLine', animation: 'pulse' };
        detailsGroup.add(line);
        
        return line;
    };
    
    // 添加多条能量线
    const energyLines = [
        // 上方线路
        addEnergyLine(new THREE.Vector3(2, 0.5, 0), new THREE.Vector3(-2, 0.5, 0)),
        // 下方线路
        addEnergyLine(new THREE.Vector3(2, -0.5, 0), new THREE.Vector3(-2, -0.5, 0)),
        // 侧面线路
        addEnergyLine(new THREE.Vector3(1, 0.3, 0.5), new THREE.Vector3(-1, 0.3, 0.5)),
        addEnergyLine(new THREE.Vector3(1, 0.3, -0.5), new THREE.Vector3(-1, 0.3, -0.5)),
        // 机翼连接线
        addEnergyLine(new THREE.Vector3(0, 0.5, 0.6), new THREE.Vector3(0, 0.5, 1.4)),
        addEnergyLine(new THREE.Vector3(0, 0.5, -0.6), new THREE.Vector3(0, 0.5, -1.4)),
        addEnergyLine(new THREE.Vector3(0, -0.5, 0.6), new THREE.Vector3(0, -0.5, 1.4)),
        addEnergyLine(new THREE.Vector3(0, -0.5, -0.6), new THREE.Vector3(0, -0.5, -1.4))
    ];
    
    // 2. 舰船重要节点上的发光点
    const addGlowPoint = (x, y, z, size = 0.1, color = colors.glow.primary) => {
        const pointGeometry = new THREE.SphereGeometry(size, 16, 16);
        const pointMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9
        });
        
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        point.userData = { type: 'glowPoint', animation: 'pulse' };
        detailsGroup.add(point);
        
        return point;
    };
    
    // 添加多个发光点
    const glowPoints = [
        // 头部节点
        addGlowPoint(3, 0, 0, 0.08, colors.glow.secondary),
        // 机翼节点
        addGlowPoint(-0.5, 0.5, 1.5, 0.1, colors.glow.primary),
        addGlowPoint(-0.5, 0.5, -1.5, 0.1, colors.glow.primary),
        addGlowPoint(-0.5, -0.5, 1.5, 0.1, colors.glow.primary),
        addGlowPoint(-0.5, -0.5, -1.5, 0.1, colors.glow.primary),
        // 上下结构节点
        addGlowPoint(0.8, 0.6, 0, 0.07, colors.glow.secondary),
        addGlowPoint(0.8, -0.6, 0, 0.07, colors.glow.secondary),
        // 引擎连接点
        addGlowPoint(-2, 0.5, 0, 0.09, colors.propulsion),
        addGlowPoint(-2, -0.5, 0, 0.09, colors.propulsion)
    ];
    
    // 3. 天线与通讯设备
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 90
    });
    
    const antenna1 = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna1.position.set(0.5, 0.85, 0);
    detailsGroup.add(antenna1);
    
    const antenna2 = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna2.position.set(-0.5, 0.85, 0);
    antenna2.rotation.z = Math.PI / 15; // 轻微倾斜
    detailsGroup.add(antenna2);
    
    // 添加天线顶端发光点
    addGlowPoint(0.5, 1.1, 0, 0.04, colors.glow.secondary);
    addGlowPoint(-0.5, 1.12, 0, 0.04, colors.glow.secondary);
    
    // 4. 技术面板与显示屏
    const panelGeometry = new THREE.PlaneGeometry(0.3, 0.2);
    const panelMaterial = new THREE.MeshBasicMaterial({
        color: colors.hologram,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    
    // 在不同位置添加面板
    const panelPositions = [
        [0.8, 0.4, 0.5, 0, Math.PI / 2, 0],      // 侧面
        [0.8, 0.4, -0.5, 0, -Math.PI / 2, 0],    // 侧面
        [0.5, 0.6, 0.3, Math.PI / 2, 0, 0],      // 顶部
        [-1.6, 0, 0.5, 0, Math.PI / 2, 0],       // 引擎区域
        [-1.6, 0, -0.5, 0, -Math.PI / 2, 0]      // 引擎区域
    ];
    
    panelPositions.forEach((pos, idx) => {
        const panel = new THREE.Mesh(panelGeometry, panelMaterial.clone());
        panel.position.set(pos[0], pos[1], pos[2]);
        panel.rotation.set(pos[3], pos[4], pos[5]);
        panel.userData = { type: 'panel', index: idx, animation: 'flicker' };
        detailsGroup.add(panel);
    });
    
    group.add(detailsGroup);
}

// 构建全息投影效果
function buildHolographicEffects(group, colors) {
    const holoGroup = new THREE.Group();
    
    // 1. 主操作台全息投影 - 驾驶舱上方
    const mainHoloGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const mainHoloMaterial = new THREE.MeshBasicMaterial({
        color: colors.hologram,
        transparent: true,
        opacity: 0.5,
        wireframe: true
    });
    
    const mainHolo = new THREE.Mesh(mainHoloGeometry, mainHoloMaterial);
    mainHolo.position.set(1.2, 0.9, 0);
    mainHolo.userData = { type: 'hologram', id: 'main', animation: 'rotate' };
    holoGroup.add(mainHolo);
    
    // 2. 小型全息显示 - 机翼和炮塔周围
    const smallHoloGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const smallHoloMaterial = new THREE.MeshBasicMaterial({
        color: colors.hologram,
        transparent: true,
        opacity: 0.4,
        wireframe: true
    });
    
    // 添加多个小型全息投影
    const smallHoloPositions = [
        [1, 0.3, 1.2],     // 左机翼
        [1, 0.3, -1.2],    // 右机翼
        [-1.5, 0.5, 0.8],  // 左后方
        [-1.5, 0.5, -0.8]  // 右后方
    ];
    
    smallHoloPositions.forEach((pos, idx) => {
        const smallHolo = new THREE.Mesh(smallHoloGeometry, smallHoloMaterial.clone());
        smallHolo.position.set(pos[0], pos[1], pos[2]);
        smallHolo.userData = { type: 'hologram', id: `small${idx}`, animation: 'rotate', speed: 1 + Math.random() };
        holoGroup.add(smallHolo);
    });
    
    // 3. 全息控制面板 - 飞行员控制区
    const controlPanelGeometry = new THREE.PlaneGeometry(0.5, 0.3);
    const controlPanelMaterial = new THREE.MeshBasicMaterial({
        color: colors.hologram,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    
    const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
    controlPanel.position.set(1, 0.6, 0);
    controlPanel.rotation.x = Math.PI / 4; // 倾斜放置
    controlPanel.userData = { type: 'hologram', id: 'controlPanel', animation: 'flicker' };
    holoGroup.add(controlPanel);
    
    // 4. 引擎状态全息投影
    const engineHoloGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 16);
    const engineHoloMaterial = new THREE.MeshBasicMaterial({
        color: colors.propulsion,
        transparent: true,
        opacity: 0.4,
        wireframe: true
    });
    
    const engineHolo = new THREE.Mesh(engineHoloGeometry, engineHoloMaterial);
    engineHolo.position.set(-1.8, 0.7, 0);
    engineHolo.rotation.x = Math.PI / 2;
    engineHolo.userData = { type: 'hologram', id: 'engine', animation: 'pulse' };
    holoGroup.add(engineHolo);
    
    // 5. 全息投影光源
    const holoLightGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const holoLightMaterial = new THREE.MeshBasicMaterial({
        color: colors.hologram,
        transparent: true,
        opacity: 0.9
    });
    
    // 在全息投影位置下方添加投影发射器
    const addHoloProjector = (x, y, z) => {
        const projector = new THREE.Mesh(holoLightGeometry, holoLightMaterial.clone());
        projector.position.set(x, y, z);
        projector.userData = { type: 'holoProjector', animation: 'pulse' };
        holoGroup.add(projector);
        
        // 添加投影光束
        const beamGeometry = new THREE.CylinderGeometry(0.01, 0.05, 0.3, 8);
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: colors.hologram,
            transparent: true,
            opacity: 0.3
        });
        
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.set(x, y + 0.15, z); // 向上偏移一半高度
        beam.userData = { type: 'holoBeam', projector: projector, animation: 'pulse' };
        holoGroup.add(beam);
    };
    
    // 添加投影发射器在主要全息投影下方
    addHoloProjector(1.2, 0.7, 0); // 主投影
    addHoloProjector(1, 0.45, 0);  // 控制面板
    
    group.add(holoGroup);
}

// 设置高级动画系统
function setupAdvancedAnimations(shipGroup, colors) {
    // 存储动画组件引用
    const animationComponents = {
        // 推进系统
        engineParticles: null,
        subEngineParticles: [],
        engineCore: null,
        engineFlame: null,
        subEngineFlames: [],
        energyPipes: [],
        
        // 护盾系统
        shield: null,
        shieldWireframe: null,
        shieldWaves: [],
        shieldProjectors: [],
        
        // 机翼系统
        wings: {
            topLeft: null,
            topRight: null,
            bottomLeft: null,
            bottomRight: null
        },
        wingTips: [],
        
        // 武器系统
        cannonTip: null,
        turretTips: [],
        launcherTips: [],
        
        // 全息系统
        holograms: [],
        holoProjectors: [],
        
        // 细节系统
        energyLines: [],
        glowPoints: [],
        panels: []
    };
    
    // 遍历查找所有需要动画的组件
    shipGroup.traverse(obj => {
        if (!obj.userData || !obj.userData.type) return;
        
        const type = obj.userData.type;
        const animation = obj.userData.animation;
        
        switch (type) {
            case 'engineParticles':
                animationComponents.engineParticles = obj;
                break;
            case 'subEngineParticles':
                animationComponents.subEngineParticles.push(obj);
                break;
            case 'engineCore':
                animationComponents.engineCore = obj;
                break;
            case 'engineFlame':
                animationComponents.engineFlame = obj;
                break;
            case 'subEngineFlame':
                animationComponents.subEngineFlames.push(obj);
                break;
            case 'energyPipe':
                animationComponents.energyPipes.push(obj);
                break;
            case 'shield':
                animationComponents.shield = obj;
                break;
            case 'shieldWireframe':
                animationComponents.shieldWireframe = obj;
                break;
            case 'shieldWave':
                animationComponents.shieldWaves.push(obj);
                break;
            case 'shieldProjector':
                animationComponents.shieldProjectors.push(obj);
                break;
            case 'wing':
                animationComponents.wings[obj.userData.side] = obj;
                break;
            case 'wingTip':
                animationComponents.wingTips.push(obj);
                break;
            case 'cannonTip':
                animationComponents.cannonTip = obj;
                break;
            case 'turretTip':
                animationComponents.turretTips.push(obj);
                break;
            case 'launcherTip':
                animationComponents.launcherTips.push(obj);
                break;
            case 'hologram':
                animationComponents.holograms.push(obj);
                break;
            case 'holoProjector':
                animationComponents.holoProjectors.push(obj);
                break;
            case 'energyLine':
                animationComponents.energyLines.push(obj);
                break;
            case 'glowPoint':
                animationComponents.glowPoints.push(obj);
                break;
            case 'panel':
                animationComponents.panels.push(obj);
                break;
        }
    });
    
    // 主动画更新函数
    shipGroup.userData.update = function(time) {
        try {
            // 推进系统动画
            animateEngineSystems(animationComponents, time);
            
            // 护盾系统动画 - 注意：这个会被fixShieldAttachment函数重写
            animateShieldSystems(animationComponents, time);
            
            // 武器系统动画
            animateWeaponSystems(animationComponents, time);
            
            // 全息系统动画
            animateHolographicSystems(animationComponents, time);
            
            // 细节动画
            animateDetailSystems(animationComponents, time);
            
            // 整体飞船动画
            animateShipBody(shipGroup, animationComponents, time);
        } catch (e) {
            console.error("高级宇宙飞船动画错误:", e);
        }
    };
}

// 引擎系统动画
function animateEngineSystems(components, time) {
    // 主引擎粒子
    if (components.engineParticles) {
        const positions = components.engineParticles.geometry.attributes.position.array;
        const particleCount = positions.length / 3;
        
        for (let i = 0; i < particleCount; i++) {
            const idx = i * 3;
            
            // 向后移动
            positions[idx] += 0.04;
            
            // 当粒子移出范围，重置到引擎后方
            if (positions[idx] > -2) {
                const spread = Math.random() * 0.8;
                const distance = Math.random() * 6;
                
                positions[idx] = -3 - distance;
                positions[idx + 1] = (Math.random() - 0.5) * spread * distance/3;
                positions[idx + 2] = (Math.random() - 0.5) * spread * distance/3;
            }
            
            // 添加一些随机波动
            positions[idx + 1] += (Math.random() - 0.5) * 0.02;
            positions[idx + 2] += (Math.random() - 0.5) * 0.02;
        }
        
        components.engineParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    // 副引擎粒子
    components.subEngineParticles.forEach(particles => {
        const positions = particles.geometry.attributes.position.array;
        const particleCount = positions.length / 3;
        
        for (let i = 0; i < particleCount; i++) {
            const idx = i * 3;
            
            // 向后移动
            positions[idx] += 0.03;
            
            // 重置超出范围的粒子
            if (positions[idx] > -2) {
                const basePos = [-3.0, 0, 0]; // 默认位置
                
                // 使用存储的索引确定正确的引擎位置
                const engineIdx = particles.userData.index;
                if (engineIdx === 0) basePos[1] = 0.7, basePos[2] = 0.7;
                else if (engineIdx === 1) basePos[1] = 0.7, basePos[2] = -0.7;
                else if (engineIdx === 2) basePos[1] = -0.7, basePos[2] = 0.7;
                else if (engineIdx === 3) basePos[1] = -0.7, basePos[2] = -0.7;
                
                const spread = Math.random() * 0.3;
                const distance = Math.random() * 2;
                
                positions[idx] = basePos[0] - distance;
                positions[idx + 1] = basePos[1] + (Math.random() - 0.5) * spread;
                positions[idx + 2] = basePos[2] + (Math.random() - 0.5) * spread;
            }
            
            // 随机波动
            positions[idx + 1] += (Math.random() - 0.5) * 0.01;
            positions[idx + 2] += (Math.random() - 0.5) * 0.01;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
    });
    
    // 引擎核心脉动
    if (components.engineCore) {
        components.engineCore.material.opacity = 0.7 + 0.3 * Math.sin(time * 5);
        components.engineCore.scale.set(
            1 + 0.1 * Math.sin(time * 7),
            1 + 0.1 * Math.sin(time * 7),
            1 + 0.1 * Math.sin(time * 7)
        );
    }
    
    // 引擎火焰动画
    if (components.engineFlame) {
        components.engineFlame.scale.x = 1 + 0.15 * Math.sin(time * 3);
        components.engineFlame.scale.y = 1 + 0.1 * Math.sin(time * 5);
        components.engineFlame.material.opacity = 0.5 + 0.3 * Math.sin(time * 4);
    }
    
    // 辅助引擎火焰
    components.subEngineFlames.forEach((flame, idx) => {
        const offset = idx * 0.25;
        flame.scale.x = 1 + 0.2 * Math.sin(time * 4 + offset);
        flame.scale.y = 1 + 0.1 * Math.sin(time * 6 + offset);
        flame.material.opacity = 0.5 + 0.3 * Math.sin(time * 3 + offset);
    });
    
    // 能量管道脉动
    components.energyPipes.forEach((pipe, idx) => {
        const offset = pipe.userData.offset || (idx * 0.2);
        pipe.material.opacity = 0.5 + 0.3 * Math.sin(time * 2 + offset);
    });
}

// 护盾系统动画 - 已修复版本，此方法将被fixShieldAttachment重写
function animateShieldSystems(components, time) {
    // 注意：这个函数被fixShieldAttachment重新定义了，此处保留原有逻辑作为参考
    // 但此函数不会被实际执行
    
    // 主护盾脉动
    if (components.shield) {
        components.shield.material.opacity = 0.08 + 0.07 * Math.sin(time * 0.5);
    }
    
    // 护盾线框旋转 - 降低旋转速度并增加轻微波动以匹配飞船动画风格
    if (components.shieldWireframe) {
        // 修改为更慢的旋转速度，并增加细微的波动效果
        components.shieldWireframe.rotation.y = time * 0.03 + Math.sin(time * 0.4) * 0.02;
    }
    
    // 护盾发射器脉动
    components.shieldProjectors.forEach((projector, idx) => {
        const offset = idx * 0.2;
        projector.material.opacity = 0.7 + 0.3 * Math.sin(time * 1.5 + offset);
    });
    
    // 护盾波纹效果 - 每隔一段时间展开一个波纹
    if (components.shieldWaves.length > 0 && Math.random() < 0.005) {
        // 随机选择一个波纹
        const waveIdx = Math.floor(Math.random() * components.shieldWaves.length);
        const wave = components.shieldWaves[waveIdx];
        
        // 重置并激活波纹
        wave.scale.set(1.4, 1, 0.8); // 与护盾大小相同的初始值
        wave.material.opacity = 0.3;
        wave.visible = true;
        wave.userData.active = true;
        wave.userData.startTime = time;
    }
    
    // 更新活跃的波纹
    components.shieldWaves.forEach(wave => {
        if (wave.userData.active) {
            const elapsedTime = time - wave.userData.startTime;
            // 扩大并淡出，但保持y轴缩放不变
            const scaleFactor = 1 + elapsedTime * 0.5;
            wave.scale.set(1.4 * scaleFactor, 1, 0.8 * scaleFactor);
            
            wave.material.opacity = 0.3 * (1 - elapsedTime / 3);
            
            // 当波纹消失时停止
            if (elapsedTime > 3) {
                wave.visible = false;
                wave.userData.active = false;
            }
        }
    });
}

// 武器系统动画
function animateWeaponSystems(components, time) {
    // 主炮炮口脉动
    if (components.cannonTip) {
        components.cannonTip.material.opacity = 0.7 + 0.3 * Math.sin(time * 2);
        components.cannonTip.scale.set(
            1 + 0.1 * Math.sin(time * 3),
            1 + 0.1 * Math.sin(time * 3),
            1
        );
    }
    
    // 炮塔炮口随机闪烁
    components.turretTips.forEach((tip, idx) => {
        // 随机闪烁
        if (Math.random() < 0.005) {
            tip.userData.blinking = true;
            tip.userData.blinkStart = time;
            tip.userData.blinkDuration = 0.2 + Math.random() * 0.3; // 0.2-0.5秒闪烁
        }
        
        // 闪烁动画
        if (tip.userData.blinking) {
            const blinkElapsed = time - tip.userData.blinkStart;
            const blinkProgress = blinkElapsed / tip.userData.blinkDuration;
            
            if (blinkProgress < 1) {
                // 亮起然后暗下来
                tip.material.opacity = blinkProgress < 0.5 ?
                    0.5 + blinkProgress : 1 - blinkProgress;
                
                // 闪烁时略微变大
                const scale = 1 + 0.3 * Math.sin(blinkProgress * Math.PI);
                tip.scale.set(scale, scale, 1);
            } else {
                // 闪烁结束
                tip.material.opacity = 0.5;
                tip.scale.set(1, 1, 1);
                tip.userData.blinking = false;
            }
        }
    });
    
    // 导弹发射管闪烁
    components.launcherTips.forEach((tip, idx) => {
        // 更缓慢的随机闪烁
        if (Math.random() < 0.002) {
            tip.userData.charging = true;
            tip.userData.chargeStart = time;
            tip.userData.chargeDuration = 1 + Math.random() * 2; // 1-3秒充能
        }
        
        // 充能动画
        if (tip.userData.charging) {
            const chargeElapsed = time - tip.userData.chargeStart;
            const chargeProgress = chargeElapsed / tip.userData.chargeDuration;
            
            if (chargeProgress < 1) {
                // 逐渐亮起然后闪烁
                if (chargeProgress < 0.8) {
                    // 前80%逐渐亮起
                    tip.material.opacity = 0.5 + chargeProgress * 0.5;
                } else {
                    // 最后20%闪烁
                    const flashProgress = (chargeProgress - 0.8) / 0.2;
                    tip.material.opacity = 1 - Math.abs(Math.sin(flashProgress * Math.PI * 5)) * 0.4;
                }
            } else {
                // 充能结束
                tip.material.opacity = 0.7;
                tip.userData.charging = false;
            }
        } else {
            // 正常状态下轻微脉动
            tip.material.opacity = 0.5 + 0.2 * Math.sin(time * 1.5 + idx);
        }
    });
}

// 全息投影动画
function animateHolographicSystems(components, time) {
    // 全息投影旋转和脉动
    components.holograms.forEach(hologram => {
        const animation = hologram.userData.animation;
        const speed = hologram.userData.speed || 1;
        
        if (animation === 'rotate') {
            // 旋转动画
            hologram.rotation.y = time * speed;
            hologram.rotation.x = Math.sin(time * 0.5) * 0.2;
        } else if (animation === 'pulse') {
            // 脉动动画
            hologram.material.opacity = 0.3 + 0.2 * Math.sin(time * speed);
        } else if (animation === 'flicker') {
            // 闪烁动画
            hologram.material.opacity = 0.4 + 0.2 * Math.sin(time * speed) + 0.1 * Math.sin(time * 10 * speed);
        }
    });
    
    // 全息投影发射器
    components.holoProjectors.forEach((projector, idx) => {
        projector.material.opacity = 0.7 + 0.3 * Math.sin(time * 2 + idx * 0.5);
    });
}

// 细节系统动画
function animateDetailSystems(components, time) {
    // 能量线脉动
    components.energyLines.forEach((line, idx) => {
        line.material.opacity = 0.6 + 0.3 * Math.sin(time * 1.5 + idx * 0.1);
    });
    
    // 发光点闪烁
    components.glowPoints.forEach((point, idx) => {
        point.material.opacity = 0.7 + 0.3 * Math.sin(time * 2 + idx * 0.3);
        
        // 轻微缩放动画
        const scale = 1 + 0.1 * Math.sin(time * 3 + idx * 0.5);
        point.scale.set(scale, scale, scale);
    });
    
    // 面板闪烁
    components.panels.forEach((panel, idx) => {
        // 随机数据闪烁
        panel.material.opacity = 0.5 + 0.2 * Math.sin(time * 1.2 + idx) + 0.1 * Math.sin(time * 8 + idx * 2);
    });
}

// 整体飞船动画
function animateShipBody(shipGroup, components, time) {
    // 轻微漂浮效果
    shipGroup.position.y = Math.sin(time * 0.5) * 0.05;
    
    // 轻微俯仰
    shipGroup.rotation.x = Math.sin(time * 0.3) * 0.02;
    
    // 机翼轻微摆动
    if (components.wings.topLeft) components.wings.topLeft.rotation.y = Math.PI / 18 + Math.sin(time * 0.4) * 0.02;
    if (components.wings.topRight) components.wings.topRight.rotation.y = -Math.PI / 18 + Math.sin(time * 0.4) * 0.02;
    if (components.wings.bottomLeft) components.wings.bottomLeft.rotation.y = Math.PI / 18 + Math.sin(time * 0.4) * 0.02;
    if (components.wings.bottomRight) components.wings.bottomRight.rotation.y = -Math.PI / 18 + Math.sin(time * 0.4) * 0.02;
}