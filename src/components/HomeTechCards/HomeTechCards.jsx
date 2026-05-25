import React from 'react';
import { homeTechCards } from './homeTechData';
import './HomeTechCards.css';

const CardIcon = ({ type }) => {
  if (type === 'pulse') {
    return (
      <svg className="tech-card__icon-svg" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M3 12h3l2-7 4 14 3-10 2 6h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'wave') {
    return (
      <svg className="tech-card__icon-svg" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M4 8v8M8 5v14M12 9v6M16 4v16M20 7v10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === 'chart') {
    return (
      <svg className="tech-card__icon-svg" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M6 18V8M10 18V12M14 18V6M18 18V10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
};

const HomeTechCards = () => (
  <section className="home-tech" aria-labelledby="home-tech-heading">
    <h2 id="home-tech-heading" className="home-tech__heading">
      How it will work
    </h2>
    <div className="home-tech__grid">
      {homeTechCards.map((card) => (
        <div key={card.id} className="home-tech__column">
        <article className={`tech-card tech-card--${card.id}`}>
          <header className="tech-card__head">
            <h2 className="tech-card__title">
              <span className="tech-card__index">{card.index}</span>
              <span className="tech-card__index-slash">/</span>
              <span className="tech-card__title-text">{card.title}</span>
            </h2>
            <CardIcon type={card.icon} />
          </header>

          <div className="tech-card__visual">
            <div className="tech-card__visual-inner">
              <div className="tech-card__img-wrap">
                <img src={card.image} alt={card.imageAlt} loading="lazy" />
              </div>
            </div>

            {card.callout ? (
              <div className="tech-card__callout">
                <p className="tech-card__callout-title">{card.callout.title}</p>
                <p className="tech-card__callout-detail">{card.callout.detail}</p>
              </div>
            ) : null}

            {card.legend ? (
              <ul className="tech-card__legend" aria-label="Severity levels">
                {card.legend.map(({ level, label }) => (
                  <li key={level} className={`tech-card__legend-item tech-card__legend-item--${level}`}>
                    <span className="tech-card__legend-dot" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>

        <div className="home-tech__connector" aria-hidden="true">
          <span className="home-tech__connector-line" />
          <svg className="home-tech__connector-arrow" viewBox="0 0 24 32" fill="none">
            <path
              d="M12 2v22M6 18l6 8 6-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <aside className="home-tech__step-card">
          <h3 className="home-tech__step-card-title">{card.stepTitle}</h3>
          <p className="home-tech__step-card-text">{card.description}</p>
        </aside>
        </div>
      ))}
    </div>
  </section>
);

export default HomeTechCards;
