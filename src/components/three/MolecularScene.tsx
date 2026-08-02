import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MolecularScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(4, 3, 4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0x185FA5, 1.2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const goldLight = new THREE.PointLight(0xba7517, 0.8, 10);
    goldLight.position.set(-3, -2, 2);
    scene.add(goldLight);

    // Group
    const group = new THREE.Group();

    const atoms = [
      { pos: [0, 0, 0], color: 0x185FA5, scale: 0.35 },
      { pos: [1.6, 0.7, 0.3], color: 0xba7517, scale: 0.28 },
      { pos: [-1.4, 1.1, -0.5], color: 0x3b82f6, scale: 0.24 },
      { pos: [0.5, -1.5, 0.7], color: 0x185FA5, scale: 0.3 },
      { pos: [-0.8, -0.5, 1.4], color: 0xd97706, scale: 0.22 },
      { pos: [1.1, 1.4, -1.1], color: 0xba7517, scale: 0.23 },
    ];

    const bonds = [
      [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [3, 4]
    ];

    bonds.forEach(([i, j]) => {
      const start = new THREE.Vector3(...atoms[i].pos);
      const end = new THREE.Vector3(...atoms[j].pos);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dir = end.clone().sub(start);
      const length = dir.length();

      const geom = new THREE.CylinderGeometry(0.04, 0.04, length, 8);
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x185FA5,
        transparent: true,
        opacity: 0.5,
        emissive: 0x185FA5,
        emissiveIntensity: 0.2
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      group.add(mesh);
    });

    atoms.forEach((atom) => {
      const geom = new THREE.SphereGeometry(atom.scale, 32, 32);
      const mat = new THREE.MeshPhysicalMaterial({
        color: atom.color,
        emissive: atom.color,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.3,
        clearcoat: 0.8
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(...(atom.pos as [number, number, number]));
      group.add(mesh);
    });

    scene.add(group);

    // Animation
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      group.rotation.y += 0.008;
      group.rotation.x += 0.003;
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
