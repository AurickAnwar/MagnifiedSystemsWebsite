import React from 'react';
import { IMPACT_LEVELS } from './impactData';

const ImpactCard = ({ level }) => {
  const data = IMPACT_LEVELS[level];
  if (!data || level === 'off') return null;

  const isGreen = level === 'green';

  return (
    <div
      className={`impact-card impact-card--${level} impact-card--visible`}
      role="status"
      aria-live="polite"
    >
      {isGreen ? (
        <img
          className="impact-card__bg"
          src="/images/StartupBackground.png"
          alt=""
          aria-hidden="true"
        />
      ) : null}
      <div className="impact-card__content">
        <p className="impact-card__headline">{data.headline}</p>
        <pre className="impact-card__readout">
{`===== IMPACT COMPLETE =====
Duration (ms): ${data.duration}
Peak accel delta: ${data.peakAccel}
Peak gyro: ${data.peakGyro}
Severity score: ${data.severity}
Status: ${data.status}`}
        </pre>
      </div>
    </div>
  );
};

export default ImpactCard;
