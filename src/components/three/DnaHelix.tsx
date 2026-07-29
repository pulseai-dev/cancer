import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DnaHelix() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.6);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    // DNA Helix parameters
    const strandCount = 2;
    const pointsPerStrand = 80;
    const helixRadius = 1.2;
    const helixHeight = 10;
    const turns = 3;

    const dnaGroup = new THREE.Group();

    // Create strands
    for (let strand = 0; strand < strandCount; strand++) {
      const points: THREE.Vector3[] = [];
      const phaseOffset = strand * Math.PI;

      for (let i = 0; i <= pointsPerStrand; i++) {
        const t = i / pointsPerStrand;
        const angle = t * turns * Math.PI * 2 + phaseOffset;
        const x = Math.cos(angle) * helixRadius;
        const y = (t - 0.5) * helixHeight;
        const z = Math.sin(angle) * helixRadius;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeometry = new THREE.TubeGeometry(curve, 128, 0.08, 8, false);
      const tubeMaterial = new THREE.MeshStandardMaterial({
        color: strand === 0 ? 0x185FA5 : 0x5F5E5A,
        roughness: 0.5,
        metalness: 0.2,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      dnaGroup.add(tube);
    }

    // Create base pairs (rungs)
    const rungCount = 25;
    for (let i = 0; i < rungCount; i++) {
      const t = (i + 1) / (rungCount + 1);
      const angle1 = t * turns * Math.PI * 2;
      const angle2 = angle1 + Math.PI;
      const y = (t - 0.5) * helixHeight;

      const start = new THREE.Vector3(
        Math.cos(angle1) * helixRadius,
        y,
        Math.sin(angle1) * helixRadius
      );
      const end = new THREE.Vector3(
        Math.cos(angle2) * helixRadius,
        y,
        Math.sin(angle2) * helixRadius
      );

      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();
      direction.normalize();

      const rungGeometry = new THREE.CylinderGeometry(0.04, 0.04, length, 6);
      const rungMaterial = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0x185FA5 : 0xBA7517,
        roughness: 0.6,
        metalness: 0.1,
      });
      const rung = new THREE.Mesh(rungGeometry, rungMaterial);

      const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      rung.position.copy(midpoint);

      const axis = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
      rung.quaternion.copy(quaternion);

      dnaGroup.add(rung);

      // Small spheres at connection points
      const sphereGeom = new THREE.SphereGeometry(0.07, 8, 8);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x185FA5,
        roughness: 0.4,
        metalness: 0.3,
      });
      const sphere1 = new THREE.Mesh(sphereGeom, sphereMat);
      sphere1.position.copy(start);
      dnaGroup.add(sphere1);

      const sphere2 = new THREE.Mesh(sphereGeom, sphereMat.clone());
      sphere2.material.color.setHex(0x5F5E5A);
      sphere2.position.copy(end);
      dnaGroup.add(sphere2);
    }

    dnaGroup.rotation.x = 0.2;
    scene.add(dnaGroup);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.003;
      dnaGroup.rotation.x = 0.2 + mouseY * 0.1;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2, 0.02);
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
      window.removeEventListener('mousemove', handleMouseMove);
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
      style={{ background: 'transparent' }}
    />
  );
}
