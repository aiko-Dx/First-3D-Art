// 创建宇宙房子函数
function createSpaceHouse(colorScheme = 0) {
    // 颜色设置
    const colors = {
        base: colorScheme === 0 ? 0x663399 : (colorScheme === 1 ? 0x336699 : 0x996633),
        house: colorScheme === 0 ? 0x88ccee : (colorScheme === 1 ? 0x66aadd : 0xeecc88),
        roof: colorScheme === 0 ? 0x9966ff : (colorScheme === 1 ? 0x6699ff : 0xff9966),
        accent: 0x00ffff
    };
    
    const houseGroup = new THREE.Group();
    
    // 基础平台 - 小行星或水晶基座
    const baseGeometry = new THREE.IcosahedronGeometry(2, 1);
    const baseMaterial = new THREE.MeshPhongMaterial({
        color: colors.base,
        emissive: 0x221133,
        shininess: 60,
        flatShading: true
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.scale.set(1, 0.5, 1);
    base.position.set(0, -1.5, 0);
    houseGroup.add(base);
    
    // 房子主体 - 半透明水晶结构
    const houseGeometry = new THREE.BoxGeometry(3, 2, 3);
    const houseMaterial = new THREE.MeshPhongMaterial({
        color: colors.house,
        transparent: true,
        opacity: 0.7,
        shininess: 100,
        specular: 0xffffff
    });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.y = 0;
    houseGroup.add(house);
    
    // 屋顶 - 水晶金字塔
    const roofGeometry = new THREE.ConeGeometry(2.5, 2, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({
        color: colors.roof,
        emissive: 0x330066,
        shininess: 90,
        specular: 0xaa88ff
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2;
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);
    
    // 门 - 发光入口
    const doorGeometry = new THREE.PlaneGeometry(1, 1.6);
    const doorMaterial = new THREE.MeshBasicMaterial({
        color: colors.accent,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, -0.2, 1.51);
    houseGroup.add(door);
    
    // 窗户 - 使用简单的圆形窗户避免复杂几何体
    const windowGeometry = new THREE.CircleGeometry(0.5, 16);
    const windowMaterial = new THREE.MeshBasicMaterial({
        color: 0x3399ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    
    // 创建四个窗户
    const positions = [
        [1.51, 0.3, 0.8, Math.PI / 2],  // 右前
        [1.51, 0.3, -0.8, Math.PI / 2], // 右后
        [-1.51, 0.3, 0.8, -Math.PI / 2], // 左前
        [-1.51, 0.3, -0.8, -Math.PI / 2] // 左后
    ];
    
    positions.forEach(([x, y, z, rot]) => {
        const window = new THREE.Mesh(windowGeometry, windowMaterial.clone());
        window.position.set(x, y, z);
        window.rotation.y = rot;
        houseGroup.add(window);
    });
    
    // 添加悬浮的水晶
    const crystalsGroup = new THREE.Group();
    
    function createCrystal(x, y, z, size, color) {
        const geometry = new THREE.OctahedronGeometry(size, 0);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            shininess: 100,
            emissive: color,
            emissiveIntensity: 0.3
        });
        
        const crystal = new THREE.Mesh(geometry, material);
        crystal.position.set(x, y, z);
        crystal.userData = {
            originalY: y,
            rotateSpeed: 0.01 + Math.random() * 0.02,
            floatSpeed: 0.5 + Math.random() * 0.5
        };
        
        return crystal;
    }
    
    // 创建多个悬浮水晶
    const crystalPositions = [
        [2.5, 0.5, 2.5, 0.25, 0x66ffff],
        [-2.5, 1, 2.5, 0.2, 0xff66ff],
        [2.5, 0.8, -2.5, 0.25, 0xffff66],
        [-2.5, 0.6, -2.5, 0.28, 0x66ff66],
        [0, 3.5, 0, 0.4, 0xff88ff]
            ];

            crystalPositions.forEach(([x, y, z, size, color]) => {
                const crystal = createCrystal(x, y, z, size, color);
                crystalsGroup.add(crystal);
            });

            houseGroup.add(crystalsGroup);

            // 添加环绕光环
            const ringGeometry = new THREE.TorusGeometry(3.5, 0.1, 16, 48);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: colors.accent,
                transparent: true,
                opacity: 0.5
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.position.y = 1;
            houseGroup.add(ring);

            // 添加第二个光环
            const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
            ring2.material.color.set(0xff00ff);
            ring2.rotation.x = Math.PI / 4;
            ring2.rotation.z = Math.PI / 4;
            ring2.position.y = 1;
            houseGroup.add(ring2);

            // 添加点光源
            const housePointLight = new THREE.PointLight(0x6688FF, 1, 10);
            housePointLight.position.set(0, 1, 0);
            houseGroup.add(housePointLight);

            // 存储动画数据
            houseGroup.userData.update = function(time) {
                // 门发光效果
                door.material.opacity = 0.5 + 0.3 * Math.sin(time * 0.5);

                // 光环旋转
                ring.rotation.z = time * 0.1;
                ring2.rotation.y = time * 0.07;

                // 水晶漂浮和旋转
                crystalsGroup.children.forEach(crystal => {
                    const data = crystal.userData;

                    // 上下漂浮
                    crystal.position.y = data.originalY + Math.sin(time * data.floatSpeed) * 0.2;

                    // 旋转
                    crystal.rotation.x += data.rotateSpeed;
                    crystal.rotation.y += data.rotateSpeed * 0.7;
                });

                // 脉动光照
                housePointLight.intensity = 1 + Math.sin(time * 2) * 0.3;
            };

            log('宇宙房子模型创建完成');
            return houseGroup;
        }