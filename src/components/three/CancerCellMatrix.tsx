import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CancerCellMatrix() {
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

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pointLight1 = new THREE.PointLight(0x185FA5, 1.5, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xba7517, 1.2, 10);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Group
    const matrixGroup = new THREE.Group();

    // Outer Bounding Box / Wireframe Box
    const boxGeom = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x185FA5,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const boundingBox = new THREE.Mesh(boxGeom, boxMat);
    matrixGroup.add(boundingBox);

    // Cells inside the cube
    const cells: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number }[] = [];
    const cellGeom = new THREE.IcosahedronGeometry(0.18, 2);

    for (let x = -0.8; x <= 0.8; x += 0.8) {
      for (let y = -0.8; y <= 0.8; y += 0.8) {
        for (let z = -0.8; z <= 0.8; z += 0.8) {
          const isCore = Math.abs(x) < 0.1 && Math.abs(y) < 0.1 && Math.abs(z) < 0.1;
          const color = isCore ? 0xba7517 : 0x185FA5;

          const cellMat = new THREE.MeshPhysicalMaterial({
            color,
            emissive: color,
            emissiveIntensity: isCore ? 0.6 : 0.2,
            roughness: 0.15,
            metalness: 0.3,
            clearcoat: 0.9,
            transparent: true,
            opacity: 0.85,
          });

          const cell = new THREE.Mesh(cellGeom, cellMat);
          const basePos = new THREE.Vector3(x, y, z);
          cell.position.copy(basePos);
          matrixGroup.add(cell);

          cells.push({
            mesh: cell,
            basePos,
            speed: 0.5 + Math.random() * 1.5,
          });
        }
      }
    }

    scene.add(matrixGroup);

    // Animation
    let raf: number;
    let clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      matrixGroup.rotation.y = elapsedTime * 0.2;
      matrixGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2;

      cells.forEach((item) => {
        const offset = Math.sin(elapsedTime * item.speed + item.basePos.x * 2) * 0.05;
        item.mesh.position.x = item.basePos.x + offset;
        item.mesh.position.y = item.basePos.y + offset * 0.8;
      });

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
