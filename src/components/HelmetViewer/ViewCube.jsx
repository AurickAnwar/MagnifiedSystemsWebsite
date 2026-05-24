import React from 'react';

const FACES = [
  { id: 'front', label: 'FRONT', transform: 'rotateY(0deg) translateZ(38px)' },
  { id: 'back', label: 'BACK', transform: 'rotateY(180deg) translateZ(38px)' },
  { id: 'right', label: 'RIGHT', transform: 'rotateY(90deg) translateZ(38px)' },
  { id: 'left', label: 'LEFT', transform: 'rotateY(-90deg) translateZ(38px)' },
  { id: 'bottom', label: 'BOTTOM', transform: 'rotateX(90deg) translateZ(38px)' },
  { id: 'top', label: 'TOP', transform: 'rotateX(-90deg) translateZ(38px)' },
];

const EDGES = [
  { id: 'top-front', label: 'TF', transform: 'rotateX(45deg) translateZ(38px)' },
  { id: 'top-back', label: 'TB', transform: 'rotateX(45deg) rotateY(180deg) translateZ(38px)' },
  { id: 'top-left', label: 'TL', transform: 'rotateX(45deg) rotateY(-90deg) translateZ(38px)' },
  { id: 'top-right', label: 'TR', transform: 'rotateX(45deg) rotateY(90deg) translateZ(38px)' },
  { id: 'bottom-front', label: 'BF', transform: 'rotateX(-45deg) translateZ(38px)' },
  { id: 'bottom-back', label: 'BB', transform: 'rotateX(-45deg) rotateY(180deg) translateZ(38px)' },
  { id: 'bottom-left', label: 'BL', transform: 'rotateX(-45deg) rotateY(-90deg) translateZ(38px)' },
  { id: 'bottom-right', label: 'BR', transform: 'rotateX(-45deg) rotateY(90deg) translateZ(38px)' },
  { id: 'front-left', label: 'FL', transform: 'rotateY(-45deg) translateZ(38px)' },
  { id: 'front-right', label: 'FR', transform: 'rotateY(45deg) translateZ(38px)' },
  { id: 'back-left', label: 'BK', transform: 'rotateY(-135deg) translateZ(38px)' },
  { id: 'back-right', label: 'BR', transform: 'rotateY(135deg) translateZ(38px)' },
];

const CORNERS = [
  { id: 'top-front-right', transform: 'rotateX(35deg) rotateY(45deg) translateZ(38px)' },
  { id: 'top-front-left', transform: 'rotateX(35deg) rotateY(-45deg) translateZ(38px)' },
  { id: 'top-back-right', transform: 'rotateX(35deg) rotateY(135deg) translateZ(38px)' },
  { id: 'top-back-left', transform: 'rotateX(35deg) rotateY(-135deg) translateZ(38px)' },
  { id: 'bottom-front-right', transform: 'rotateX(-35deg) rotateY(45deg) translateZ(38px)' },
  { id: 'bottom-front-left', transform: 'rotateX(-35deg) rotateY(-45deg) translateZ(38px)' },
  { id: 'bottom-back-right', transform: 'rotateX(-35deg) rotateY(135deg) translateZ(38px)' },
  { id: 'bottom-back-left', transform: 'rotateX(-35deg) rotateY(-135deg) translateZ(38px)' },
];

const ViewCube = ({ rotation }) => (
    <div className="view-cube-scene-inner">
      <div
        className="view-cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {FACES.map(({ id, label, transform }) => (
          <button
            key={id}
            type="button"
            className="view-cube__face"
            data-view={id}
            style={{ transform }}
            title={label}
          >
            {label}
          </button>
        ))}
        {EDGES.map(({ id, label, transform }) => (
          <button
            key={id}
            type="button"
            className="view-cube__edge"
            data-view={id}
            style={{ transform }}
            title={id}
          >
            {label}
          </button>
        ))}
        {CORNERS.map(({ id, transform }) => (
          <button
            key={id}
            type="button"
            className="view-cube__corner"
            data-view={id}
            style={{ transform }}
            title={id.replace(/-/g, ' ')}
          />
        ))}
      </div>
    </div>
);

export default ViewCube;
