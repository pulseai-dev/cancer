import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { RiskResult } from '../../types';

interface RiskGlobeProps {
  risks: RiskResult[];
}

const RISK_COLORS: Record<string, number> = {
  High: 0xE24B4A,
  Moderate: 0xBA7517,
  Low: 0x639922,
  'Very Low': 0x639922,
};

export default function RiskGlobe({ risks }: RiskGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x185FA5, 1.0);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xba7517, 0.3);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    // Globe — outer wireframe
    const globeGeom = new THREE.IcosahedronGeometry(1.6, 3);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0x185FA5,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      roughness: 0.5,
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globe);

    // Inner glow sphere
    const innerGeom = new THREE.SphereGeometry(1.55, 32, 32);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1efe8,
      transparent: true,
      opacity: 0.15,
      roughness: 0.8,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerSphere);

    // Core glow
    const coreGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x185FA5,
      transparent: true,
      opacity: 0.3,
      emissive: 0x185FA5,
      emissiveIntensity: 0.5,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    // Risk nodes on the globe
    const nodeGroup = new THREE.Group();
    const totalRisk = risks.reduce((sum, r) => sum + r.risk_pct, 0);

    risks.forEach((risk, i) => {
      const fraction = risk.risk_pct / totalRisk;
      const size = 0.08 + fraction * 0.25;
      const color = RISK_COLORS[risk.level] || 0x5f5e5a;

      // Fibonacci sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / risks.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = 1.65 * Math.sin(phi) * Math.cos(theta);
      const y = 1.65 * Math.sin(phi) * Math.sin(theta);
      const z = 1.65 * Math.cos(phi);

      // Node sphere
      const nodeGeom = new THREE.SphereGeometry(size, 16, 16);
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.3,
        metalness: 0.4,
        clearcoat: 0.8,
        emissive: color,
        emissiveIntensity: 0.3,
      });
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(x, y, z);
      nodeGroup.add(node);

      // Glow ring around node
      const ringGeom = new THREE.RingGeometry(size * 1.3, size * 1.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(node.position);
      ring.lookAt(0, 0, 0);
      nodeGroup.add(ring);

      // Connection line
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      nodeGroup.add(line);
    });

    scene.add(nodeGroup);

    // Orbit rings
    for (let i = 0; i < 3; i++) {
      const orbitGeom = new THREE.RingGeometry(1.8 + i * 0.3, 1.82 + i * 0.3, 64);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0x185FA5,
        transparent: true,
        opacity: 0.04 - i * 0.01,
        side: THREE.DoubleSide,
      });
      const orbit = new THREE.Mesh(orbitGeom, orbitMat);
      orbit.rotation.x = Math.PI / 2 + i * 0.3;
      orbit.rotation.z = i * 0.5;
      scene.add(orbit);
    }

    // Animation
    let raf: number;
    let frameCount = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frameCount++;

      controls.update();

      // Pulse core
      core.material.opacity = 0.25 + Math.sin(frameCount * 0.03) * 0.1;
      core.scale.setScalar(1 + Math.sin(frameCount * 0.03) * 0.05);

      // Subtle mouse influence on node group
      nodeGroup.rotation.x = mouseRef.current.y * 0.1;
      nodeGroup.rotation.y = mouseRef.current.x * 0.1;

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
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', handleMouseMove);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [risks, handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
