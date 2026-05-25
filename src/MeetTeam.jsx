import React from 'react';
import { teamMembers } from './MeetTeam.js';
import './MeetTeam.css';

const MeetTeam = () => (
  <div className="life-page">
    <div className="life-grain" aria-hidden />
    <div className="life-glow life-glow--a" aria-hidden />
    <div className="life-glow life-glow--b" aria-hidden />

    <section
      className="life-section life-section--team"
      id="meet-the-team"
      aria-labelledby="meet-team-heading"
    >
      <div className="container">
        <div className="life-section-head">
          <h1 id="meet-team-heading" className="life-section-title">
            Meet the Team!
          </h1>
          <p className="life-section-sub">
            The people building wearable impact monitoring at Magnified Systems.
          </p>
        </div>

        <div className="life-friends-masonry">
          {teamMembers.map((member) => (
            <article key={member.id} className="life-polaroid">
              <div className="life-polaroid-inner">
                <div className="life-polaroid-photo">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="life-polaroid-meta">
                  <div className="life-polaroid-meta-top">
                    <p className="life-polaroid-name">{member.name}</p>
                    <p className="life-polaroid-role">{member.job_title}</p>
                  </div>
                  <div className="life-polaroid-meta-bottom">
                    <p className="life-polaroid-school">{member.program_degree}</p>
                    <div className="life-polaroid-social">
                      {member.github ? (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on GitHub`}
                        >
                          <img src="/Github.jpg" alt="" width={22} height={22} />
                        </a>
                      ) : null}
                      {member.linkedin ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <img src="/Linkedin.png" alt="" width={22} height={22} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default MeetTeam;
