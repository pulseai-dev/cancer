import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export default function DnaHelix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, pressed: false });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  const handleMouseDown = useCallback(() => { mouseRef.current.pressed = true; }, []);
  const handleMouseUp = useCallback(() => { mouseRef.current.pressed = false; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf1efe8, 0.035);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ===== LIGHTING =====
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const keyLight = new THREE.DirectionalLight(0x185FA5, 1.4);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xba7517, 0.5);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x185FA5, 2, 30);
    rimLight.position.set(-3, -5, 8);
    scene.add(rimLight);

    // Mouse-reactive spotlight that follows cursor
    const spotLight = new THREE.SpotLight(0x185FA5, 1.5, 25, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 5, 10);
    scene.add(spotLight);

    // ===== DNA GROUP =====
    const dnaGroup = new THREE.Group();
    const helixRadius = 1.4;
    const helixHeight = 14;
    const turns = 3;
    const pointsPerStrand = 120;

    // Strand materials
    const strandMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x185FA5,
      roughness: 0.15,
      metalness: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.9,
    });

    const strandMat2 = new THREE.MeshPhysicalMaterial({
      color: 0x2c2c2a,
      roughness: 0.25,
      metalness: 0.5,
      clearcoat: 0.6,
      transparent: true,
      opacity: 0.8,
    });

    // Build strands
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
        new THREE.TubeGeometry(curve, 200, 0.1, 12, false),
        strand === 0 ? strandMat1 : strandMat2
      );
      dnaGroup.add(tube);
    }

    // Base pairs
    const rungMatBlue = new THREE.MeshPhysicalMaterial({
      color: 0x185FA5, roughness: 0.2, metalness: 0.6,
      clearcoat: 0.8, transparent: true, opacity: 0.75,
    });
    const rungMatGold = new THREE.MeshPhysicalMaterial({
      color: 0xba7517, roughness: 0.2, metalness: 0.6,
      clearcoat: 0.8, transparent: true, opacity: 0.65,
    });
    const sphereGeom = new THREE.SphereGeometry(0.09, 12, 12);

    const rungCount = 35;
    for (let i = 0; i < rungCount; i++) {
      const t = (i + 1) / (rungCount + 1);
      const angle1 = t * turns * Math.PI * 2;
      const y = (t - 0.5) * helixHeight;
      const start = new THREE.Vector3(Math.cos(angle1) * helixRadius, y, Math.sin(angle1) * helixRadius);
      const end = new THREE.Vector3(Math.cos(angle1 + Math.PI) * helixRadius, y, Math.sin(angle1 + Math.PI) * helixRadius);

      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      dir.normalize();

      const rung = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, len, 8),
        i % 2 === 0 ? rungMatBlue : rungMatGold
      );
      rung.position.lerpVectors(start, end, 0.5);
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      dnaGroup.add(rung);

      // End spheres
      const s1 = new THREE.Mesh(sphereGeom, rungMatBlue);
      s1.position.copy(start);
      dnaGroup.add(s1);
      const s2 = new THREE.Mesh(sphereGeom, rungMatGold);
      s2.position.copy(end);
      dnaGroup.add(s2);
    }

    dnaGroup.rotation.x = 0.4;
    dnaGroup.rotation.z = 0.1;
    dnaGroup.position.x = 3;
    scene.add(dnaGroup);

    // ===== FLOATING PARTICLES =====
    const pCount = 150;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const pVel: { x: number; y: number; z: number }[] = [];
    const pColor1 = new THREE.Color(0x185FA5);
    const pColor2 = new THREE.Color(0xba7517);
    const pColor3 = new THREE.Color(0x5f5e5a);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 30;
      pPos[i3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i3 + 2] = (Math.random() - 0.5) * 15;

      const r = Math.random();
      const c = r < 0.4 ? pColor1 : r < 0.6 ? pColor2 : pColor3;
      pCol[i3] = c.r;
      pCol[i3 + 1] = c.g;
      pCol[i3 + 2] = c.b;

      pVel.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // ===== CONNECTION LINES =====
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x185FA5, transparent: true, opacity: 0.05,
    });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // ===== MOUSE TRAIL / GLOW SPHERE =====
    const glowGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x185FA5,
      transparent: true,
      opacity: 0.08,
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

      // Smooth mouse interpolation
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;

      // === DNA ROTATION — aggressive mouse follow ===
      dnaGroup.rotation.y += 0.004;
      dnaGroup.rotation.x = 0.4 + m.y * 0.35;
      dnaGroup.rotation.z = 0.1 + m.x * 0.15;

      // Scale pulse on mouse press
      const targetScale = m.pressed ? 1.08 : 1.0;
      dnaGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      // === CAMERA — follows mouse ===
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, m.x * 3, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -m.y * 2, 0.04);
      camera.lookAt(1, 0, 0);

      // === SPOTLIGHT follows mouse ===
      spotLight.position.x = THREE.MathUtils.lerp(spotLight.position.x, m.x * 8, 0.03);
      spotLight.position.y = THREE.MathUtils.lerp(spotLight.position.y, -m.y * 5 + 5, 0.03);

      // === GLOW SPHERE follows mouse in 3D ===
      glowSphere.position.x = THREE.MathUtils.lerp(glowSphere.position.x, m.x * 6, 0.05);
      glowSphere.position.y = THREE.MathUtils.lerp(glowSphere.position.y, -m.y * 4, 0.05);
      glowSphere.material.opacity = 0.06 + Math.abs(m.x) * 0.04;

      // === PARTICLES — repel from mouse ===
      const mouseWorld = new THREE.Vector3(m.x * 8, -m.y * 5, 0);
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        pPos[i3] += pVel[i].x;
        pPos[i3 + 1] += pVel[i].y;
        pPos[i3 + 2] += pVel[i].z;

        // Mouse repulsion
        const dx = pPos[i3] - mouseWorld.x;
        const dy = pPos[i3 + 1] - mouseWorld.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 4) {
          const force = 0.02 / (distSq + 0.1);
          pVel[i].x += dx * force;
          pVel[i].y += dy * force;
        }

        // Damping
        pVel[i].x *= 0.998;
        pVel[i].y *= 0.998;
        pVel[i].z *= 0.998;

        // Bounds
        if (Math.abs(pPos[i3]) > 15) pVel[i].x *= -1;
        if (Math.abs(pPos[i3 + 1]) > 10) pVel[i].y *= -1;
        if (Math.abs(pPos[i3 + 2]) > 8) pVel[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // === CONNECTION LINES — every 10 frames ===
      if (frameCount % 10 === 0) {
        while (lineGroup.children.length > 0) {
          const child = lineGroup.children[0];
          lineGroup.remove(child);
          if (child instanceof THREE.Line) child.geometry.dispose();
        }

        const threshold = 3;
        let lc = 0;
        for (let i = 0; i < pCount && lc < 30; i++) {
          for (let j = i + 1; j < pCount && lc < 30; j++) {
            const i3 = i * 3;
            const j3 = j * 3;
            const dx = pPos[i3] - pPos[j3];
            const dy = pPos[i3 + 1] - pPos[j3 + 1];
            const dz = pPos[i3 + 2] - pPos[j3 + 2];
            if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
              const pts = [
                new THREE.Vector3(pPos[i3], pPos[i3 + 1], pPos[i3 + 2]),
                new THREE.Vector3(pPos[j3], pPos[j3 + 1], pPos[j3 + 2]),
              ];
              const lg = new THREE.BufferGeometry().setFromPoints(pts);
              lineGroup.add(new THREE.Line(lg, lineMat));
              lc++;
            }
          }
        }
      }

      // === RIM LIGHT PULSE ===
      rimLight.intensity = 2 + Math.sin(frameCount * 0.02) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
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
      style={{ background: 'transparent', cursor: 'crosshair' }}
    />
  );
}
