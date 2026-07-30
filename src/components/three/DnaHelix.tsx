import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DnaHelix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    x: 0, y: 0,
    targetX: 0, targetY: 0,
    dragging: false,
    dragStartX: 0, dragStartY: 0,
    rotY: 0, rotX: 0.3,
    velY: 0, velX: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse events only on the container — not window
    const onPointerMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      const rect = container.getBoundingClientRect();
      m.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      m.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (m.dragging) {
        const dx = (e.clientX - m.dragStartX) * 0.008;
        const dy = (e.clientY - m.dragStartY) * 0.006;
        m.velY = dx;
        m.velX = dy;
        m.rotY += dx;
        m.rotX = Math.max(-1.2, Math.min(1.2, m.rotX + dy));
        m.dragStartX = e.clientX;
        m.dragStartY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.dragging = true;
      m.dragStartX = e.clientX;
      m.dragStartY = e.clientY;
      m.velY = 0;
      m.velX = 0;
    };

    const onPointerUp = () => {
      mouseRef.current.dragging = false;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    // ===== THREE.JS SETUP =====
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf1efe8, 0.02);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ===== LIGHTING =====
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.DirectionalLight(0x185FA5, 1.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xba7517, 0.4);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x185FA5, 1.8, 25);
    rimLight.position.set(-2, -4, 6);
    scene.add(rimLight);

    const spotLight = new THREE.SpotLight(0x185FA5, 1.2, 20, Math.PI / 5, 0.5, 1);
    spotLight.position.set(0, 4, 8);
    scene.add(spotLight);

    // ===== DNA GROUP — centered =====
    const dnaGroup = new THREE.Group();
    const helixRadius = 0.65;
    const helixHeight = 7;
    const turns = 2;
    const pointsPerStrand = 80;

    const strandMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x185FA5,
      roughness: 0.08,
      metalness: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.3,
      thickness: 0.4,
      transparent: true,
      opacity: 0.95,
    });

    const strandMat2 = new THREE.MeshPhysicalMaterial({
      color: 0x2c2c2a,
      roughness: 0.15,
      metalness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });

    for (let strand = 0; strand < 2; strand++) {
      const points: THREE.Vector3[] = [];
      const phaseOffset = strand * Math.PI;
      for (let i = 0; i <= pointsPerStrand; i++) {
        const t = i / pointsPerStrand;
        const angle = t * turns * Math.PI * 2 + phaseOffset;
        points.push(new THREE.Vector3(
          Math.cos(angle) * helixRadius,
          (t - 0.5) * helixHeight,
          Math.sin(angle) * helixRadius
        ));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 120, 0.06, 8, false),
        strand === 0 ? strandMat1 : strandMat2
      );
      dnaGroup.add(tube);
    }

    // Base pairs
    const rungMatBlue = new THREE.MeshPhysicalMaterial({
      color: 0x185FA5, roughness: 0.15, metalness: 0.5,
      clearcoat: 0.9, transparent: true, opacity: 0.8,
      emissive: 0x185FA5, emissiveIntensity: 0.05,
    });
    const rungMatGold = new THREE.MeshPhysicalMaterial({
      color: 0xba7517, roughness: 0.15, metalness: 0.5,
      clearcoat: 0.9, transparent: true, opacity: 0.7,
      emissive: 0xba7517, emissiveIntensity: 0.05,
    });
    const sphereGeom = new THREE.SphereGeometry(0.06, 10, 10);

    const rungs: { mesh: THREE.Mesh; sphere1: THREE.Mesh; sphere2: THREE.Mesh }[] = [];
    const rungCount = 20;
    for (let i = 0; i < rungCount; i++) {
      const t = (i + 1) / (rungCount + 1);
      const angle1 = t * turns * Math.PI * 2;
      const y = (t - 0.5) * helixHeight;
      const start = new THREE.Vector3(Math.cos(angle1) * helixRadius, y, Math.sin(angle1) * helixRadius);
      const end = new THREE.Vector3(Math.cos(angle1 + Math.PI) * helixRadius, y, Math.sin(angle1 + Math.PI) * helixRadius);
      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      dir.normalize();

      const mat = i % 2 === 0 ? rungMatBlue : rungMatGold;
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, len, 8), mat);
      rung.position.lerpVectors(start, end, 0.5);
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      dnaGroup.add(rung);

      const s1 = new THREE.Mesh(sphereGeom, rungMatBlue);
      s1.position.copy(start);
      dnaGroup.add(s1);
      const s2 = new THREE.Mesh(sphereGeom, rungMatGold);
      s2.position.copy(end);
      dnaGroup.add(s2);

      rungs.push({ mesh: rung, sphere1: s1, sphere2: s2 });
    }

    dnaGroup.rotation.x = 0.3;
    scene.add(dnaGroup);

    // ===== GLASS ORBS =====
    const glassOrbs: THREE.Mesh[] = [];
    const orbPositions = [
      { x: -1.8, y: 2, z: 1 },
      { x: 2.2, y: -1.5, z: -1 },
      { x: -1, y: -2.5, z: 1.5 },
      { x: 2, y: 2.5, z: -1.5 },
    ];

    orbPositions.forEach((pos) => {
      const geom = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 32, 32);
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.92,
        thickness: 0.5,
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.6,
      });
      const orb = new THREE.Mesh(geom, mat);
      orb.position.set(pos.x, pos.y, pos.z);
      orb.userData = { basePos: { ...pos }, phase: Math.random() * Math.PI * 2 };
      scene.add(orb);
      glassOrbs.push(orb);
    });

    // ===== TORUS RINGS =====
    const toruses: THREE.Mesh[] = [];
    const torusData = [
      { radius: 1.8, tube: 0.02, color: 0x185FA5, rotX: 0.8, rotZ: 0.3 },
      { radius: 2.2, tube: 0.015, color: 0xba7517, rotX: 1.2, rotZ: -0.5 },
      { radius: 1.4, tube: 0.018, color: 0x5f5e5a, rotX: 0.4, rotZ: 0.8 },
    ];

    torusData.forEach((td) => {
      const geom = new THREE.TorusGeometry(td.radius, td.tube, 16, 100);
      const mat = new THREE.MeshPhysicalMaterial({
        color: td.color,
        roughness: 0.15,
        metalness: 0.7,
        clearcoat: 0.8,
        transparent: true,
        opacity: 0.3,
      });
      const torus = new THREE.Mesh(geom, mat);
      torus.rotation.x = td.rotX;
      torus.rotation.z = td.rotZ;
      torus.userData = { speed: 0.002 + Math.random() * 0.003, axis: Math.random() > 0.5 ? 'x' : 'z' };
      scene.add(torus);
      toruses.push(torus);
    });

    // ===== FLOATING PARTICLES =====
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const pVel: { x: number; y: number; z: number }[] = [];
    const pColor1 = new THREE.Color(0x185FA5);
    const pColor2 = new THREE.Color(0xba7517);
    const pColor3 = new THREE.Color(0x5f5e5a);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 16;
      pPos[i3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i3 + 2] = (Math.random() - 0.5) * 8;

      const r = Math.random();
      const c = r < 0.4 ? pColor1 : r < 0.6 ? pColor2 : pColor3;
      pCol[i3] = c.r;
      pCol[i3 + 1] = c.g;
      pCol[i3 + 2] = c.b;

      pVel.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.001,
      });
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeom, pMat));

    // ===== MOUSE GLOW =====
    const glowGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x185FA5, transparent: true, opacity: 0.06,
    });
    const glowSphere = new THREE.Mesh(glowGeom, glowMat);
    glowSphere.position.set(0, 0, 5);
    scene.add(glowSphere);

    // ===== ANIMATION =====
    let raf: number;
    let frameCount = 0;
    const posAttr = pGeom.getAttribute('position') as THREE.BufferAttribute;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frameCount++;
      const m = mouseRef.current;

      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;

      // DNA rotation — drag + momentum
      if (!m.dragging) {
        m.rotY += m.velY;
        m.rotX += m.velX;
        m.rotX = Math.max(-1.2, Math.min(1.2, m.rotX));
        m.velY *= 0.94;
        m.velX *= 0.94;
        m.rotY += 0.003;
      }

      dnaGroup.rotation.y += (m.rotY - dnaGroup.rotation.y) * 0.12;
      dnaGroup.rotation.x += (m.rotX - dnaGroup.rotation.x) * 0.12;

      // Camera parallax
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, m.x * 1.2, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -m.y * 0.8, 0.04);
      camera.lookAt(0, 0, 0);

      // Spotlight
      spotLight.position.x = THREE.MathUtils.lerp(spotLight.position.x, m.x * 5, 0.03);
      spotLight.position.y = THREE.MathUtils.lerp(spotLight.position.y, -m.y * 3 + 4, 0.03);

      // Glow cursor
      glowSphere.position.x = THREE.MathUtils.lerp(glowSphere.position.x, m.x * 4, 0.06);
      glowSphere.position.y = THREE.MathUtils.lerp(glowSphere.position.y, -m.y * 3, 0.06);
      glowSphere.material.opacity = 0.05 + Math.abs(m.x) * 0.03;

      // Glass orbs float
      glassOrbs.forEach((orb) => {
        const ud = orb.userData;
        const t = frameCount * 0.01;
        orb.position.x = ud.basePos.x + Math.sin(t + ud.phase) * 0.3 + m.x * 0.5;
        orb.position.y = ud.basePos.y + Math.cos(t * 0.7 + ud.phase) * 0.25 - m.y * 0.4;
        orb.position.z = ud.basePos.z + Math.sin(t * 0.5 + ud.phase * 2) * 0.15;
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.008;
      });

      // Torus spin
      toruses.forEach((torus) => {
        const ud = torus.userData;
        if (ud.axis === 'x') {
          torus.rotation.x += ud.speed;
          torus.rotation.z += m.x * 0.003;
        } else {
          torus.rotation.z += ud.speed;
          torus.rotation.x += m.y * 0.003;
        }
      });

      // Base pair hover glow
      const mouseLocal = new THREE.Vector3(m.x * 4, -m.y * 3, 0);
      rungs.forEach((rung) => {
        const worldPos = new THREE.Vector3();
        rung.mesh.getWorldPosition(worldPos);
        const dist = worldPos.distanceTo(mouseLocal);
        const glow = dist < 2.5 ? Math.max(0, 1 - dist / 2.5) * 0.4 : 0;
        (rung.mesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.05 + glow;
        (rung.sphere1.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.05 + glow * 0.8;
        (rung.sphere2.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.05 + glow * 0.8;
      });

      // Particles
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        pPos[i3] += pVel[i].x;
        pPos[i3 + 1] += pVel[i].y;
        pPos[i3 + 2] += pVel[i].z;

        const dx = pPos[i3] - mouseLocal.x;
        const dy = pPos[i3 + 1] - mouseLocal.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 3) {
          const force = 0.012 / (distSq + 0.1);
          pVel[i].x += dx * force;
          pVel[i].y += dy * force;
        }

        pVel[i].x *= 0.998;
        pVel[i].y *= 0.998;
        pVel[i].z *= 0.998;

        if (Math.abs(pPos[i3]) > 8) pVel[i].x *= -1;
        if (Math.abs(pPos[i3 + 1]) > 6) pVel[i].y *= -1;
        if (Math.abs(pPos[i3 + 2]) > 4) pVel[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      rimLight.intensity = 1.8 + Math.sin(frameCount * 0.02) * 0.4;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: 'transparent', cursor: 'grab', userSelect: 'none' }}
      onMouseDown={() => { if (containerRef.current) containerRef.current.style.cursor = 'grabbing'; }}
      onMouseUp={() => { if (containerRef.current) containerRef.current.style.cursor = 'grab'; }}
    />
  );
}
