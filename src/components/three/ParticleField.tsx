import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

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
    const particleCount = 250;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const primaryColor = new THREE.Color(0x185FA5);
    const accentColor = new THREE.Color(0xba7517);
    const neutralColor = new THREE.Color(0x5f5e5a);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? primaryColor : colorChoice < 0.7 ? accentColor : neutralColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x185FA5,
      transparent: true,
      opacity: 0.06,
    });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // Animation
    let raf: number;
    let frameCount = 0;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frameCount++;

      // Smooth mouse
      mouseRef.current.x += (mouseRef.current.x - mouseRef.current.x) * 0.01;

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posAttr.array[i3] += velocities[i].x;
        posAttr.array[i3 + 1] += velocities[i].y;
        posAttr.array[i3 + 2] += velocities[i].z;

        if (Math.abs(posAttr.array[i3]) > 9) velocities[i].x *= -1;
        if (Math.abs(posAttr.array[i3 + 1]) > 6) velocities[i].y *= -1;
        if (Math.abs(posAttr.array[i3 + 2]) > 5) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Rebuild lines every 12 frames (CPU savings)
      if (frameCount % 12 === 0) {
        while (lineGroup.children.length > 0) {
          const child = lineGroup.children[0];
          lineGroup.remove(child);
          if (child instanceof THREE.Line) child.geometry.dispose();
        }

        const threshold = 2.8;
        let lineCount = 0;
        const maxLines = 30;

        for (let i = 0; i < particleCount && lineCount < maxLines; i++) {
          for (let j = i + 1; j < particleCount && lineCount < maxLines; j++) {
            const i3 = i * 3;
            const j3 = j * 3;
            const dx = posAttr.array[i3] - posAttr.array[j3];
            const dy = posAttr.array[i3 + 1] - posAttr.array[j3 + 1];
            const dz = posAttr.array[i3 + 2] - posAttr.array[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < threshold) {
              const pts = [
                new THREE.Vector3(posAttr.array[i3], posAttr.array[i3 + 1], posAttr.array[i3 + 2]),
                new THREE.Vector3(posAttr.array[j3], posAttr.array[j3 + 1], posAttr.array[j3 + 2]),
              ];
              const lg = new THREE.BufferGeometry().setFromPoints(pts);
              const line = new THREE.Line(lg, lineMaterial);
              lineGroup.add(line);
              lineCount++;
            }
          }
        }
      }

      // Camera subtle movement
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.8, 0.02);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseRef.current.y * 0.5, 0.02);
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
  }, [handleMouseMove]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
