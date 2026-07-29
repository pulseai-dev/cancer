import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: { x: number; y: number; z: number }[] = [];

    const primaryColor = new THREE.Color(0x185FA5);
    const accentColor = new THREE.Color(0xBA7517);
    const neutralColor = new THREE.Color(0x5F5E5A);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 16;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? primaryColor : colorChoice < 0.7 ? accentColor : neutralColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 0.02 + Math.random() * 0.04;

      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connection lines (nearby particles)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x185FA5,
      transparent: true,
      opacity: 0.08,
    });

    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let raf: number;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    let frameCount = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frameCount++;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posAttr.array[i3] += velocities[i].x;
        posAttr.array[i3 + 1] += velocities[i].y;
        posAttr.array[i3 + 2] += velocities[i].z;

        // Boundary wrap
        if (Math.abs(posAttr.array[i3]) > 8) velocities[i].x *= -1;
        if (Math.abs(posAttr.array[i3 + 1]) > 5) velocities[i].y *= -1;
        if (Math.abs(posAttr.array[i3 + 2]) > 4) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Update connection lines every 5 frames
      if (frameCount % 5 === 0) {
        while (lineGroup.children.length > 0) {
          lineGroup.remove(lineGroup.children[0]);
        }

        const threshold = 2.5;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const i3 = i * 3;
            const j3 = j * 3;
            const dx = posAttr.array[i3] - posAttr.array[j3];
            const dy = posAttr.array[i3 + 1] - posAttr.array[j3 + 1];
            const dz = posAttr.array[i3 + 2] - posAttr.array[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < threshold) {
              const lineGeom = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(posAttr.array[i3], posAttr.array[i3 + 1], posAttr.array[i3 + 2]),
                new THREE.Vector3(posAttr.array[j3], posAttr.array[j3 + 1], posAttr.array[j3 + 2]),
              ]);
              const line = new THREE.Line(lineGeom, lineMaterial);
              lineGroup.add(line);
            }
          }
        }
      }

      // Camera subtle movement
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.5, 0.02);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 0.3, 0.02);
      camera.lookAt(0, 0, 0);

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
