import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(3, 3, 5);
    scene.add(dir);

    // Globe wireframe
    const globeGeom = new THREE.SphereGeometry(1.5, 32, 32);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x185FA5,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globe);

    // Inner sphere (solid, subtle)
    const innerGeom = new THREE.SphereGeometry(1.48, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xF1EFE8,
      transparent: true,
      opacity: 0.3,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerSphere);

    // Risk nodes on the globe
    const nodeGroup = new THREE.Group();
    const totalRisk = risks.reduce((sum, r) => sum + r.risk_pct, 0);

    risks.forEach((risk, i) => {
      const fraction = risk.risk_pct / totalRisk;
      const size = 0.1 + fraction * 0.4;
      const color = RISK_COLORS[risk.level] || 0x5F5E5A;

      // Distribute on sphere surface
      const phi = Math.acos(1 - 2 * (i + 0.5) / risks.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = 1.55 * Math.sin(phi) * Math.cos(theta);
      const y = 1.55 * Math.sin(phi) * Math.sin(theta);
      const z = 1.55 * Math.cos(phi);

      const nodeGeom = new THREE.SphereGeometry(size, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
        metalness: 0.3,
        emissive: color,
        emissiveIntensity: 0.2,
      });
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(x, y, z);
      node.userData = { cancerType: risk.cancer_type, risk: risk.risk_pct };
      nodeGroup.add(node);

      // Connection line from node to globe center
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      nodeGroup.add(line);
    });

    scene.add(nodeGroup);

    // Animation
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
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
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [risks]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
