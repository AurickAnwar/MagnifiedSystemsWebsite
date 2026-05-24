import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/helmet.glb');

const PULSE_COLORS = {
  green: '#00ffd1',
  yellow: '#f5c542',
  red: '#ff4d5a',
};

const FIT_PADDING = 0.04;

function brightenMaterial(mat) {
  const next = mat.clone();
  if (next.emissive) {
    next.emissive = next.emissive.clone();
  } else {
    next.emissive = new THREE.Color(0x000000);
  }
  next.emissiveIntensity = 0;

  if (next.color) {
    const lum =
      next.color.r * 0.299 + next.color.g * 0.587 + next.color.b * 0.114;
    if (lum < 0.2) {
      next.color = new THREE.Color(0x5c5c66);
    }
  }

  if ('metalness' in next) next.metalness = Math.min(next.metalness ?? 0.5, 0.55);
  if ('roughness' in next) next.roughness = Math.max(next.roughness ?? 0.5, 0.38);
  return next;
}

function fitCameraToHelmet(camera, controls, object) {
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return false;

  if (typeof controls.fitToBox === 'function') {
    controls.fitToBox(box, false, {
      cover: false,
      paddingLeft: FIT_PADDING,
      paddingRight: FIT_PADDING,
      paddingTop: FIT_PADDING,
      paddingBottom: FIT_PADDING,
    });
  } else {
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const fov = (camera.fov * Math.PI) / 180;
    const aspect = camera.aspect || 1;
    const distV = size.y / 2 / Math.tan(fov / 2);
    const distH = size.x / 2 / Math.tan(fov / 2) / aspect;
    const distance = Math.max(distV, distH) * 1.02;
    const dir = new THREE.Vector3(0.22, 0.08, 1).normalize();
    controls.setLookAt(
      center.x + dir.x * distance,
      center.y + dir.y * distance,
      center.z + dir.z * distance,
      center.x,
      center.y,
      center.z,
      false
    );
  }

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const radius = size.length() * 0.5;
  controls.minDistance = radius * 0.35;
  controls.maxDistance = radius * 3.5;
  controls.setTarget(center.x, center.y, center.z, false);
  return true;
}

function ImpactPulse({ level }) {
  const group = useRef();
  const rings = useRef([]);

  useFrame((state) => {
    if (!group.current) return;
    const active = level !== 'off';
    group.current.visible = active;
    if (!active) return;

    const t = state.clock.elapsedTime;
    const burst = (Math.sin(t * 6) + 1) * 0.5;

    rings.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 1.8 + i * 0.35) % 1;
      mesh.scale.setScalar(0.55 + phase * 2.4);
      mesh.material.opacity = (1 - phase) * (0.5 + burst * 0.45);
    });
  });

  const color = PULSE_COLORS[level] || PULSE_COLORS.green;

  return (
    <group ref={group} visible={level !== 'off'}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            rings.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.95, 1.12, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      <pointLight color={color} intensity={4} distance={14} />
    </group>
  );
}

function HelmetModel({ level, helmetRef }) {
  const { scene } = useGLTF('/models/helmet.glb');

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 8 / maxDim;

    clone.position.sub(center);
    clone.scale.setScalar(scale);
    clone.rotation.set(0, Math.PI * 0.12, 0);

    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      child.material = Array.isArray(child.material)
        ? child.material.map(brightenMaterial)
        : brightenMaterial(child.material);
      child.castShadow = true;
      child.receiveShadow = true;
    });

    return clone;
  }, [scene]);

  useFrame((state) => {
    const materials = [];
    model.traverse((child) => {
      if (child.isMesh?.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        materials.push(...mats);
      }
    });

    if (level === 'off') {
      materials.forEach((mat) => {
        if (mat.emissive) {
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.08, 0.1);
        }
      });
      return;
    }

    const pulse = (Math.sin(state.clock.elapsedTime * 7) + 1) * 0.5;
    const hex = PULSE_COLORS[level];
    materials.forEach((mat) => {
      if (mat.emissive) {
        mat.emissive.set(hex);
        mat.emissiveIntensity = 0.4 + pulse * 1.5;
      }
    });
  });

  return (
    <group ref={helmetRef}>
      <primitive object={model} />
    </group>
  );
}

const HelmetScene = ({ impactLevel, controlsRef }) => {
  const helmetRef = useRef();
  const { camera, size } = useThree();
  const fitAttempts = useRef(0);

  useFrame(() => {
    if (!helmetRef.current || !controlsRef.current) return;
    if (fitAttempts.current > 120) return;

    const box = new THREE.Box3().setFromObject(helmetRef.current);
    if (box.isEmpty()) {
      fitAttempts.current += 1;
      return;
    }

    fitCameraToHelmet(camera, controlsRef.current, helmetRef.current);
    fitAttempts.current = 999;
  });

  useEffect(() => {
    if (fitAttempts.current < 999 || !helmetRef.current || !controlsRef.current) return;
    fitCameraToHelmet(camera, controlsRef.current, helmetRef.current);
  }, [size.width, size.height, camera, controlsRef]);

  return (
    <>
      <color attach="background" args={['#1a1a1e']} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 10, 8]} intensity={2.2} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.9} />
      <pointLight position={[0, 3, 5]} intensity={1.2} color="#e8f4ff" />
      <Environment preset="studio" />
      <CameraControls
        ref={controlsRef}
        makeDefault
        mouseButtons={{ left: 1, middle: 0, right: 0, wheel: 0 }}
        touches={{ one: 1, two: 0, three: 0 }}
      />
      <HelmetModel level={impactLevel} helmetRef={helmetRef} />
      <ImpactPulse level={impactLevel} />
    </>
  );
};

export default HelmetScene;
