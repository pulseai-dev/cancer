import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OncologyNetworkGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();

    // Wireframe sphere
    const sphereGeom = new THREE.SphereGeometry(1.6, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x185FA5,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    globeGroup.add(sphere);

    // Network hubs
    const nodePositions = [
      [1.2, 0.8, 0.8],
      [-0.9, 1.1, 0.7],
      [0.6, -1.2, 0.9],
      [-1.3, 0.2, 0.8],
      [0.3, 1.2, -1.0],
      [-0.8, -0.7, 1.2],
    ];

    nodePositions.forEach((pos, idx) => {
      const isGold = idx % 2 === 1;
      const color = isGold ? 0xba7517 : 0x185FA5;

      const nodeGeom = new THREE.SphereGeometry(0.08, 16, 16);
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(pos[0], pos[1], pos[2]);
      globeGroup.add(node);

      // Connection ring
      const ringGeom = new THREE.RingGeometry(0.12, 0.15, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(node.position);
      ring.lookAt(0, 0, 0);
      globeGroup.add(ring);
    });

    scene.add(globeGroup);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0x185FA5, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.005;
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
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" style={{ background: 'transparent' }} />;
}
