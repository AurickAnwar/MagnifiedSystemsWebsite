/** Azimuth / polar angles for CameraControls.rotateTo (radians) */
const P = Math.PI / 2;
const Q = Math.PI / 4;

export const VIEW_SPHERICAL = {
  front: [0, P],
  back: [Math.PI, P],
  left: [-P, P],
  right: [P, P],
  top: [0, 0],
  bottom: [0, Math.PI],
  'top-front': [0, Q],
  'top-back': [Math.PI, Q],
  'top-left': [-P, Q],
  'top-right': [P, Q],
  'bottom-front': [0, P + Q],
  'bottom-back': [Math.PI, P + Q],
  'bottom-left': [-P, P + Q],
  'bottom-right': [P, P + Q],
  'front-left': [-Q, P],
  'front-right': [Q, P],
  'back-left': [-Math.PI + Q, P],
  'back-right': [Math.PI - Q, P],
  'top-front-right': [Q, Q],
  'top-front-left': [-Q, Q],
  'top-back-right': [Math.PI - Q, Q],
  'top-back-left': [-Math.PI + Q, Q],
  'bottom-front-right': [Q, P + Q],
  'bottom-front-left': [-Q, P + Q],
  'bottom-back-right': [Math.PI - Q, P + Q],
  'bottom-back-left': [-Math.PI + Q, P + Q],
};

export const goToView = (controls, viewKey) => {
  const angles = VIEW_SPHERICAL[viewKey];
  if (!controls || !angles) return;
  controls.rotateTo(angles[0], angles[1], true);
};
