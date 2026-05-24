import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ViewCube from './ViewCube';

/** camera-controls.rotate() expects radians */
const ROTATE_RAD_PER_PX = 0.012;
const CLICK_THRESHOLD_PX = 8;

const ViewCubeWidget = ({ onSelectView, controlsRef }) => {
  const interactionRef = useRef(null);
  const [cubeRot, setCubeRot] = useState({ x: -22, y: 38 });

  const getControls = () => controlsRef?.current ?? null;

  const syncCubeRotation = useCallback(() => {
    const controls = getControls();
    if (!controls) return;
    const az = THREE.MathUtils.radToDeg(controls.azimuthAngle ?? 0);
    const pol = THREE.MathUtils.radToDeg(controls.polarAngle ?? 0);
    setCubeRot({ x: -(pol - 90), y: -az });
  }, [controlsRef]);

  useEffect(() => {
    let detach = null;
    let raf = 0;

    const tryAttach = () => {
      const controls = getControls();
      if (!controls) {
        raf = requestAnimationFrame(tryAttach);
        return;
      }

      const onChange = () => syncCubeRotation();
      controls.addEventListener('update', onChange);
      controls.addEventListener('sleep', onChange);
      syncCubeRotation();
      detach = () => {
        controls.removeEventListener('update', onChange);
        controls.removeEventListener('sleep', onChange);
      };
    };

    tryAttach();
    return () => {
      cancelAnimationFrame(raf);
      detach?.();
    };
  }, [controlsRef, syncCubeRotation]);

  const startInteraction = (e) => {
    if (e.button !== 0) return;
    if (!getControls()) return;

    const viewBtn = e.target.closest('[data-view]');
    interactionRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      viewId: viewBtn?.dataset?.view ?? null,
      dragged: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const onMove = (e) => {
      const state = interactionRef.current;
      const controls = getControls();
      if (!state || state.pointerId !== e.pointerId || !controls) return;

      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;

      if (!state.dragged && Math.hypot(dx, dy) >= CLICK_THRESHOLD_PX) {
        state.dragged = true;
      }

      if (!state.dragged) return;

      const stepX = e.clientX - state.lastX;
      const stepY = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;

      controls.rotate(
        stepX * ROTATE_RAD_PER_PX,
        stepY * ROTATE_RAD_PER_PX,
        false
      );
      syncCubeRotation();
    };

    const onUp = (e) => {
      const state = interactionRef.current;
      if (!state || state.pointerId !== e.pointerId) return;

      if (!state.dragged && state.viewId) {
        onSelectView(state.viewId);
        requestAnimationFrame(syncCubeRotation);
      }

      interactionRef.current = null;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [controlsRef, onSelectView, syncCubeRotation]);

  return (
    <div
      className="view-cube-widget"
      aria-label="View orientation cube"
      onPointerDown={startInteraction}
      title="Drag to orbit · click a face for that view"
    >
      <ViewCube rotation={cubeRot} />
    </div>
  );
};

export default ViewCubeWidget;
