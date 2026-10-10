import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Eye, Sparkles, RefreshCw, Info, User, Check } from 'lucide-react';

interface ThreeDModelViewerProps {
  garmentName?: string;
  garmentColor?: string; // hex
  pantsColor?: string; // hex
  sleeveType?: 'chen' | 'thung'; // Tay chẽn vs Tay thụng
  hasManCuon?: boolean;
  hasKiengBac?: boolean;
  onAnnotationClick?: (title: string, desc: string) => void;
}

export const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({
  garmentName = 'Áo Dài Truyền Thống / Ngũ Thân',
  garmentColor = '#1e3a8a',
  pantsColor = '#ffffff',
  sleeveType = 'chen',
  hasManCuon = true,
  hasKiengBac = true,
  onAnnotationClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [avatarGender, setAvatarGender] = useState<'female' | 'male'>('female');
  const [selectedHotspot, setSelectedHotspot] = useState<{ title: string; desc: string } | null>(null);

  // References for live updates without full scene recreation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const humanGroupRef = useRef<THREE.Group | null>(null);

  const gownMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pantsMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const manMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const leftSleeveRef = useRef<THREE.Mesh | null>(null);
  const rightSleeveRef = useRef<THREE.Mesh | null>(null);
  const manMeshRef = useRef<THREE.Mesh | null>(null);
  const kiengMeshRef = useRef<THREE.Mesh | null>(null);
  const hairBunRef = useRef<THREE.Mesh | null>(null);

  const autoRotateRef = useRef<boolean>(true);
  autoRotateRef.current = isAutoRotate;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 540;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfbf9f5);

    // 2. Camera: Positioned to capture full human figure beautifully
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 3.2);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting Setup (Soft beauty studio lighting for human face and silk robe)
    const ambientLight = new THREE.AmbientLight(0xfff6ec, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2.5, 3.5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffe4cc, 1.2);
    fillLight.position.set(-2.5, 2, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfef08a, 1.5); // Golden backlight for hair and shoulders
    rimLight.position.set(0, 3, -2.5);
    scene.add(rimLight);

    // Subtle Ground Pedestal
    const groundGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.04, 40);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xede4d5,
      roughness: 0.7,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1.18;
    ground.receiveShadow = true;
    scene.add(ground);

    // 5. Main Human Model Group
    const humanGroup = new THREE.Group();
    humanGroupRef.current = humanGroup;
    scene.add(humanGroup);

    // --- MATERIALS ---
    // Warm natural Asian skin material
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf6dfcf, // Natural warm peach skin tone
      roughness: 0.55,
      metalness: 0.05,
    });

    // Dark silk hair
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1f1917, // Natural black/dark brunette
      roughness: 0.35,
      metalness: 0.15,
    });

    // Outer Gown Silk
    const gownMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(garmentColor),
      roughness: 0.32,
      metalness: 0.18,
      side: THREE.DoubleSide,
    });
    gownMaterialRef.current = gownMat;

    // Pants Silk
    const pantsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(pantsColor),
      roughness: 0.38,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });
    pantsMaterialRef.current = pantsMat;

    // Gold Buttons
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.18,
    });

    // Silver Jewelry
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.12,
    });

    // Red lipstick & facial features
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0xc4454d,
      roughness: 0.4,
    });

    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x181412,
      roughness: 0.2,
    });

    // --- HUMAN HEAD & FACE ---
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.88;
    humanGroup.add(headGroup);

    // Head base (ovoid human skull)
    const headGeo = new THREE.SphereGeometry(0.125, 28, 24);
    headGeo.scale(0.92, 1.15, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Chin definition
    const chinGeo = new THREE.SphereGeometry(0.055, 16, 16);
    chinGeo.scale(0.8, 0.9, 0.9);
    const chinMesh = new THREE.Mesh(chinGeo, skinMat);
    chinMesh.position.set(0, -0.1, 0.06);
    headGroup.add(chinMesh);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.018, 0.045, 8);
    noseGeo.rotateX(Math.PI / 2.3);
    const noseMesh = new THREE.Mesh(noseGeo, skinMat);
    noseMesh.position.set(0, -0.01, 0.122);
    headGroup.add(noseMesh);

    // Stylized Gentle Eyes
    const eyeGeo = new THREE.SphereGeometry(0.012, 12, 12);
    eyeGeo.scale(1.4, 0.6, 0.5);

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.038, 0.02, 0.112);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.038, 0.02, 0.112);
    headGroup.add(rightEye);

    // Eyebrows
    const browGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.032, 8);
    browGeo.rotateZ(Math.PI / 2);

    const leftBrow = new THREE.Mesh(browGeo, hairMat);
    leftBrow.position.set(-0.038, 0.045, 0.115);
    leftBrow.rotation.z = 0.12;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, hairMat);
    rightBrow.position.set(0.038, 0.045, 0.115);
    rightBrow.rotation.z = -0.12;
    headGroup.add(rightBrow);

    // Gentle Lip smile
    const lipGeo = new THREE.CapsuleGeometry(0.009, 0.025, 8, 8);
    lipGeo.rotateZ(Math.PI / 2);
    const lipMesh = new THREE.Mesh(lipGeo, lipMat);
    lipMesh.position.set(0, -0.055, 0.11);
    headGroup.add(lipMesh);

    // Human Ears
    const earGeo = new THREE.SphereGeometry(0.03, 12, 12);
    earGeo.scale(0.4, 0.8, 0.5);

    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.115, 0.0, 0.0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(0.115, 0.0, 0.0);
    headGroup.add(rightEar);

    // Pearl / Lotus Earrings
    const earringGeo = new THREE.SphereGeometry(0.008, 12, 12);
    const leftEarring = new THREE.Mesh(earringGeo, silverMat);
    leftEarring.position.set(-0.12, -0.025, 0.0);
    headGroup.add(leftEarring);

    const rightEarring = new THREE.Mesh(earringGeo, silverMat);
    rightEarring.position.set(0.12, -0.025, 0.0);
    headGroup.add(rightEarring);

    // Hair Structure (Tóc vấn gọn gàng)
    const hairCapGeo = new THREE.SphereGeometry(0.128, 24, 20);
    hairCapGeo.scale(0.96, 1.16, 1.02);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.02, -0.015);
    headGroup.add(hairCap);

    // High Elegant Bun (Búi tóc truyền thống)
    const bunGeo = new THREE.SphereGeometry(0.065, 20, 20);
    bunGeo.scale(1.1, 0.8, 0.9);
    const hairBun = new THREE.Mesh(bunGeo, hairMat);
    hairBun.position.set(0, 0.12, -0.065);
    headGroup.add(hairBun);
    hairBunRef.current = hairBun;

    // --- ACCESSORIES ON HEAD ---
    // 1. Mấn Cuộn Vải Gấm (Vương miện / Khăn vấn)
    const manGeo = new THREE.TorusGeometry(0.138, 0.038, 18, 36);
    const manMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(garmentColor),
      roughness: 0.3,
      metalness: 0.2,
    });
    manMaterialRef.current = manMat;
    const manMesh = new THREE.Mesh(manGeo, manMat);
    manMesh.position.set(0, 0.07, 0.01);
    manMesh.rotation.x = Math.PI / 2.25;
    manMesh.visible = Boolean(hasManCuon);
    headGroup.add(manMesh);
    manMeshRef.current = manMesh;

    // --- NECK & COLLAR ---
    // Slender Human Neck
    const neckGeo = new THREE.CylinderGeometry(0.065, 0.078, 0.18, 20);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = 0.72;
    humanGroup.add(neckMesh);

    // 2. Kiềng Bạc Hoa Sen (Necklace)
    const kiengGeo = new THREE.TorusGeometry(0.115, 0.008, 16, 32);
    const kiengMesh = new THREE.Mesh(kiengGeo, silverMat);
    kiengMesh.position.set(0, 0.63, 0.02);
    kiengMesh.rotation.x = Math.PI / 2.3;
    kiengMesh.visible = Boolean(hasKiengBac);
    humanGroup.add(kiengMesh);
    kiengMeshRef.current = kiengMesh;

    // --- ÁO DÀI GOWN STRUCTURE ---
    // High Stand Collar (Cổ Lập Lĩnh 4-5cm ôm trọn chân cổ)
    const collarGeo = new THREE.CylinderGeometry(0.088, 0.096, 0.09, 24, 1, true);
    const collarMesh = new THREE.Mesh(collarGeo, gownMat);
    collarMesh.position.y = 0.73;
    humanGroup.add(collarMesh);

    // Inner White Collar Trim
    const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const innerCollarGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.022, 24, 1, true);
    const innerCollarMesh = new THREE.Mesh(innerCollarGeo, whiteTrimMat);
    innerCollarMesh.position.y = 0.76;
    humanGroup.add(innerCollarMesh);

    // Fitted Upper Robe (Thân áo thon thả theo đường cong thiếu nữ)
    const upperRobeGeo = new THREE.CylinderGeometry(0.20, 0.155, 0.58, 24);
    const upperRobeMesh = new THREE.Mesh(upperRobeGeo, gownMat);
    upperRobeMesh.position.y = 0.36;
    upperRobeMesh.castShadow = true;
    humanGroup.add(upperRobeMesh);

    // The 5 Golden Buttons along Right Lapel (Ngũ cúc Hữu Nhậm)
    const buttonPositions = [
      [0.015, 0.69, 0.095],
      [0.08, 0.59, 0.12],
      [0.135, 0.48, 0.115],
      [0.155, 0.36, 0.10],
      [0.145, 0.22, 0.085],
    ];
    buttonPositions.forEach(([bx, by, bz]) => {
      const btnGeo = new THREE.SphereGeometry(0.013, 12, 12);
      const btnMesh = new THREE.Mesh(btnGeo, goldMat);
      btnMesh.position.set(bx, by, bz);
      humanGroup.add(btnMesh);
    });

    // Lapel piping
    const lapelCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.01, 0.71, 0.095),
      new THREE.Vector3(0.07, 0.61, 0.12),
      new THREE.Vector3(0.13, 0.49, 0.115),
      new THREE.Vector3(0.155, 0.36, 0.10),
      new THREE.Vector3(0.145, 0.20, 0.085),
    ]);
    const lapelTubeGeo = new THREE.TubeGeometry(lapelCurve, 20, 0.006, 8, false);
    const lapelTubeMesh = new THREE.Mesh(lapelTubeGeo, goldMat);
    humanGroup.add(lapelTubeMesh);

    // --- HUMAN ARMS & HANDS WITH GENTLE POISE ---
    // Graceful bent arms holding fan in front
    const isThungInitial = sleeveType === 'thung';
    const sleeveRadiusTop = 0.075;
    const sleeveRadiusBottom = isThungInitial ? 0.21 : 0.055;
    const sleeveLength = 0.58;

    // Left Sleeve
    const leftSleeveGeo = new THREE.CylinderGeometry(sleeveRadiusTop, sleeveRadiusBottom, sleeveLength, 20);
    const leftSleeveMesh = new THREE.Mesh(leftSleeveGeo, gownMat);
    leftSleeveMesh.position.set(-0.24, 0.42, 0.08);
    leftSleeveMesh.rotation.set(0.35, 0, 0.52);
    leftSleeveMesh.castShadow = true;
    humanGroup.add(leftSleeveMesh);
    leftSleeveRef.current = leftSleeveMesh;

    // Right Sleeve
    const rightSleeveGeo = leftSleeveGeo.clone();
    const rightSleeveMesh = new THREE.Mesh(rightSleeveGeo, gownMat);
    rightSleeveMesh.position.set(0.24, 0.42, 0.08);
    rightSleeveMesh.rotation.set(0.35, 0, -0.52);
    rightSleeveMesh.castShadow = true;
    humanGroup.add(rightSleeveMesh);
    rightSleeveRef.current = rightSleeveMesh;

    // Natural Human Forearms & Hands emerging from sleeves
    const handGeo = new THREE.SphereGeometry(0.028, 12, 12);
    handGeo.scale(0.7, 1.4, 0.5);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.06, 0.22, 0.22);
    leftHand.rotation.set(0.2, 0, 0.4);
    humanGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.06, 0.22, 0.22);
    rightHand.rotation.set(0.2, 0, -0.4);
    humanGroup.add(rightHand);

    // Traditional Scented Wooden Folding Fan (Quạt nan trầm cầm tay)
    const fanGroup = new THREE.Group();
    fanGroup.position.set(0, 0.22, 0.24);
    fanGroup.rotation.set(-0.2, 0, 0);

    const fanBoneMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b, roughness: 0.5, metalness: 0.2 });
    const fanBladeShape = new THREE.Shape();
    fanBladeShape.moveTo(0, 0);
    fanBladeShape.lineTo(-0.11, 0.16);
    fanBladeShape.quadraticCurveTo(0, 0.22, 0.11, 0.16);
    fanBladeShape.lineTo(0, 0);

    const fanBladeGeo = new THREE.ShapeGeometry(fanBladeShape);
    const fanBladeMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const fanBladeMesh = new THREE.Mesh(fanBladeGeo, fanBladeMat);
    fanGroup.add(fanBladeMesh);

    // Fan ribs
    const fanRibGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.22, 6);
    const fanRib = new THREE.Mesh(fanRibGeo, fanBoneMat);
    fanRib.position.set(0, 0.09, 0.002);
    fanGroup.add(fanRib);

    humanGroup.add(fanGroup);

    // --- FLOWING ROBE FLAPS (TÀ TRƯỚC VÀ TÀ SAU) ---
    const flapLength = 1.05;
    const frontFlapShape = new THREE.Shape();
    frontFlapShape.moveTo(-0.14, 0);
    frontFlapShape.lineTo(0.14, 0);
    frontFlapShape.quadraticCurveTo(0.22, -flapLength * 0.5, 0.20, -flapLength);
    frontFlapShape.lineTo(-0.20, -flapLength);
    frontFlapShape.quadraticCurveTo(-0.22, -flapLength * 0.5, -0.14, 0);

    const frontFlapGeo = new THREE.ShapeGeometry(frontFlapShape, 16);
    const frontPos = frontFlapGeo.attributes.position;
    for (let i = 0; i < frontPos.count; i++) {
      const y = frontPos.getY(i);
      const zOffset = Math.sin((-y / flapLength) * Math.PI * 0.8) * 0.045 + 0.105;
      frontPos.setZ(i, zOffset);
    }
    frontFlapGeo.computeVertexNormals();

    const frontFlapMesh = new THREE.Mesh(frontFlapGeo, gownMat);
    frontFlapMesh.position.set(0, 0.08, 0);
    frontFlapMesh.castShadow = true;
    humanGroup.add(frontFlapMesh);

    const backFlapGeo = frontFlapGeo.clone();
    const backPos = backFlapGeo.attributes.position;
    for (let i = 0; i < backPos.count; i++) {
      const y = backPos.getY(i);
      const zOffset = -(Math.sin((-y / flapLength) * Math.PI * 0.8) * 0.04 + 0.105);
      backPos.setZ(i, zOffset);
    }
    backFlapGeo.computeVertexNormals();

    const backFlapMesh = new THREE.Mesh(backFlapGeo, gownMat);
    backFlapMesh.position.set(0, 0.08, 0);
    backFlapMesh.rotation.y = Math.PI;
    backFlapMesh.castShadow = true;
    humanGroup.add(backFlapMesh);

    // --- SILK TROUSERS (QUẦN LỤA ỐNG RỘNG) ---
    const pantLegGeo = new THREE.CylinderGeometry(0.10, 0.155, 1.1, 20);
    const leftPant = new THREE.Mesh(pantLegGeo, pantsMat);
    leftPant.position.set(-0.08, -0.46, 0);
    leftPant.castShadow = true;
    humanGroup.add(leftPant);

    const rightPant = new THREE.Mesh(pantLegGeo, pantsMat);
    rightPant.position.set(0.08, -0.46, 0);
    rightPant.castShadow = true;
    humanGroup.add(rightPant);

    // --- TRADITIONAL WOODEN CLOGS (GUỐC MỘC QUAI NHUNG) ---
    const shoeWoodMat = new THREE.MeshStandardMaterial({ color: 0x543825, roughness: 0.5 });
    const shoeVelvetMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.3 }); // Red velvet strap

    [-0.08, 0.08].forEach((xPos) => {
      // Wood sole
      const soleGeo = new THREE.BoxGeometry(0.08, 0.035, 0.18);
      const soleMesh = new THREE.Mesh(soleGeo, shoeWoodMat);
      soleMesh.position.set(xPos, -1.02, 0.02);
      soleMesh.castShadow = true;
      humanGroup.add(soleMesh);

      // Velvet strap
      const strapGeo = new THREE.TorusGeometry(0.04, 0.008, 8, 16);
      const strapMesh = new THREE.Mesh(strapGeo, shoeVelvetMat);
      strapMesh.position.set(xPos, -0.99, 0.04);
      strapMesh.rotation.x = Math.PI / 2;
      humanGroup.add(strapMesh);
    });

    // --- INTERACTIVE ORBIT CONTROLS ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !humanGroup) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      humanGroup.rotation.y += deltaX * 0.01;
      camera.position.y = Math.max(-0.2, Math.min(1.2, camera.position.y - deltaY * 0.004));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(1.8, Math.min(4.5, camera.position.z + e.deltaY * 0.003));
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation
      if (autoRotateRef.current && !isDragging && humanGroup) {
        humanGroup.rotation.y += delta * 0.38;
      }

      // Subtle breathing & wind swaying
      if (frontFlapMesh) {
        frontFlapMesh.rotation.x = Math.sin(elapsedTime * 1.8) * 0.025;
      }
      if (backFlapMesh) {
        backFlapMesh.rotation.x = -Math.sin(elapsedTime * 1.8) * 0.025;
      }
      if (fanGroup) {
        fanGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  // Material and Prop Live Updates
  useEffect(() => {
    if (gownMaterialRef.current) {
      gownMaterialRef.current.color.set(garmentColor);
    }
    if (manMaterialRef.current) {
      manMaterialRef.current.color.set(garmentColor);
    }
  }, [garmentColor]);

  useEffect(() => {
    if (pantsMaterialRef.current) {
      pantsMaterialRef.current.color.set(pantsColor);
    }
  }, [pantsColor]);

  useEffect(() => {
    if (manMeshRef.current) {
      manMeshRef.current.visible = Boolean(hasManCuon);
    }
  }, [hasManCuon]);

  useEffect(() => {
    if (kiengMeshRef.current) {
      kiengMeshRef.current.visible = Boolean(hasKiengBac);
    }
  }, [hasKiengBac]);

  // Update sleeves when sleeveType changes (Tay chẽn vs Tay thụng)
  useEffect(() => {
    if (!leftSleeveRef.current || !rightSleeveRef.current) return;
    const isThung = sleeveType === 'thung';
    const sleeveRadiusTop = 0.075;
    const sleeveRadiusBottom = isThung ? 0.22 : 0.055;
    const sleeveLength = 0.58;

    const newSleeveGeo = new THREE.CylinderGeometry(sleeveRadiusTop, sleeveRadiusBottom, sleeveLength, 20);
    leftSleeveRef.current.geometry.dispose();
    leftSleeveRef.current.geometry = newSleeveGeo;

    const newRightGeo = newSleeveGeo.clone();
    rightSleeveRef.current.geometry.dispose();
    rightSleeveRef.current.geometry = newRightGeo;
  }, [sleeveType]);

  const handleResetCamera = () => {
    if (cameraRef.current && humanGroupRef.current) {
      cameraRef.current.position.set(0, 0.35, 3.2);
      humanGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleZoom = (inOut: 'in' | 'out') => {
    if (cameraRef.current) {
      const step = inOut === 'in' ? -0.3 : 0.3;
      cameraRef.current.position.z = Math.max(1.8, Math.min(4.5, cameraRef.current.position.z + step));
    }
  };

  const hotspots = [
    {
      title: 'Khuôn Mặt & Mấn Cuộn Hoàng Triều',
      desc: 'Người mẫu thanh tú với mái tóc vấn cao kết hợp mấn cuộn gấm, tôn đường nét khuôn mặt Á Đông quý phái.',
    },
    {
      title: 'Cổ Lập Lĩnh & Kiềng Bạc Hoa Sen',
      desc: 'Cổ áo đứng vuông vức cao 4-5cm ôm sát chân cổ, kết hợp kiềng bạc chạm hoa sen tạo vẻ đài các, đoan trang.',
    },
    {
      title: 'Quy Thức 5 Cúc Khảm Vàng (Hữu Nhậm)',
      desc: 'Vạt áo phải cài đè lên vạt trái với 5 hạt cúc tượng trưng cho Ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín.',
    },
    {
      title: 'Dáng Đứng Cầm Quạt Trầm Khoan Thai',
      desc: 'Hai tay cầm quạt nan nan trầm phía trước bụng theo nghi thức chào đón và tiếp khách cung đình xưa.',
    },
  ];

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] bg-gradient-to-b from-[#FAF8F5] via-[#F3ECE0] to-[#FAF8F5] rounded-3xl border border-amber-900/15 overflow-hidden shadow-md flex flex-col justify-between p-4 sm:p-5 text-left select-none">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge & Header */}
      <div className="relative z-10 flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-700" />
              Mô Hình Người 3D Việt Phục
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/90 border border-stone-200 text-stone-700 font-bold backdrop-blur-2xs">
              Người Mẫu Thật 360°
            </span>
          </div>

          <div className="bg-white/90 px-3.5 py-1.5 rounded-2xl backdrop-blur-md border border-white/80 shadow-2xs">
            <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900">
              {garmentName}
            </h3>
            <p className="text-[11px] text-stone-600 font-medium">
              Người mẫu mặc áo dáng {sleeveType === 'thung' ? 'tay thụng một tấc' : 'tay chẽn ôm thon'}
            </p>
          </div>
        </div>

        {/* View Controls Toolbar */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-white/95 p-1.5 rounded-2xl border border-stone-200 shadow-xs backdrop-blur-md">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isAutoRotate ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-stone-600 hover:bg-stone-100'
            }`}
            title="Bật/Tắt xoay tự động 360°"
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => handleZoom('in')}
            className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all cursor-pointer"
            title="Đặt lại góc nhìn chính diện"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Heritage Hotspots on the Human Body */}
      <div className="relative z-10 pointer-events-auto flex flex-wrap gap-1.5 pt-2">
        {hotspots.map((hs, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedHotspot(hs);
              if (onAnnotationClick) onAnnotationClick(hs.title, hs.desc);
            }}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-white/95 hover:bg-amber-100 border border-amber-200/90 text-stone-800 shadow-2xs backdrop-blur-xs transition-all cursor-pointer flex items-center space-x-1"
          >
            <span className="w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[9px] font-bold">
              {idx + 1}
            </span>
            <span className="hidden sm:inline">{hs.title.split('&')[0]}</span>
            <span className="sm:hidden">Điểm {idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Selected Hotspot Detail Toast */}
      {selectedHotspot && (
        <div className="relative z-10 pointer-events-auto bg-white/95 p-3.5 rounded-2xl border border-amber-300 shadow-md backdrop-blur-md max-w-sm space-y-1 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-amber-700" />
              {selectedHotspot.title}
            </span>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            {selectedHotspot.desc}
          </p>
        </div>
      )}

      {/* Bottom Hint Indicator */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between text-[11px] text-stone-600 bg-white/80 px-3.5 py-2 rounded-2xl border border-white/90 backdrop-blur-xs">
        <span className="flex items-center">
          <Eye className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
          Kéo chuột / vuốt chạm để xoay 360° • Người mẫu cử động mềm mại tự nhiên
        </span>
        <span className="font-mono text-amber-900 font-bold hidden sm:inline bg-amber-100/70 px-2 py-0.5 rounded-lg border border-amber-200">
          {sleeveType === 'thung' ? 'Áo Tấc (Tay Thụng)' : 'Áo Ngũ Thân (Tay Chẽn)'}
        </span>
      </div>
    </div>
  );
};
