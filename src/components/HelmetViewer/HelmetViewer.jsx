import React, { Suspense, useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import HelmetScene from './HelmetScene';
import ViewCubeWidget from './ViewCubeWidget';
import ImpactCard from './ImpactCard';
import { goToView } from './cameraViews';
import './HelmetViewer.css';

const TOGGLES = [
  { id: 'off', label: 'Off' },
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'red', label: 'Red' },
];

const HelmetViewer = () => {
  const controlsRef = useRef();
  const stageRef = useRef(null);
  const [impactLevel, setImpactLevel] = useState('off');

  const handleSelectView = useCallback((viewKey) => {
    goToView(controlsRef.current, viewKey);
  }, []);

  return (
    <div className="helmet-viewer">
      <div className="helmet-viewer__stage" ref={stageRef}>
        <div
          className={`helmet-viewer__flash helmet-viewer__flash--${impactLevel}`}
          aria-hidden="true"
        />

        <Canvas
          className="helmet-viewer__canvas"
          camera={{ fov: 42, near: 0.01, far: 200 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <HelmetScene impactLevel={impactLevel} controlsRef={controlsRef} />
          </Suspense>
        </Canvas>

        <ViewCubeWidget onSelectView={handleSelectView} controlsRef={controlsRef} />
        <ImpactCard level={impactLevel} />
      </div>

      <div className="impact-toggles" role="group" aria-label="Impact severity simulation">
        {TOGGLES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`impact-toggle impact-toggle--${id} ${
              impactLevel === id ? 'impact-toggle--active' : ''
            }`}
            onClick={() => setImpactLevel(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HelmetViewer;
