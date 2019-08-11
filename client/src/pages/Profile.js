import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const ThisSection = styled.div`
  height: 100vh;

  .main-bg {
    margin: 4rem 0rem 4rem 9rem;
    height: 8rem;
  }
`;

const Shadow = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 28rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.6rem;
  border: 3px solid rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem 2rem 6rem 2rem;
  transition: 1s ease-out;

  @media (max-width: 1300px) {
    top: 61%;
    width: 50%;
    border: 2px solid #aaa;
  }

  @media (max-width: 600px) {
    width: 75%;
  }
`;

const Profile = ({
  location: {
    state: {
      profile: { data }
    }
  }
}) => {
  const gamer = {
    name: data.platformInfo.platformUserId,
    avatar: data.platformInfo.avatarUrl,
    image: data.segments[1].metadata.imageUrl,
    rank: {},
    level: data.segments[0].stats.level.displayValue,
    levelPercent: data.segments[0].stats.level.percentile,
    legend: data.metadata.activeLegendName,
    seasonWins: data.segments[0].stats.season2Wins.displayValue,
    seasonWinsPercent: data.segments[0].stats.season2Wins.percentile,
    damage: data.segments[0].stats.damage
      ? data.segments[0].stats.damage.displayValue
      : 0,
    damagePercent: data.segments[0].stats.damage
      ? data.segments[0].stats.damage.percentile
      : 0
  };

  return (
    <ThisSection>
      <img className='main-bg' src={Logo} />
      <Shadow>
        <div className='gamer-tag fact'>
          <img src={gamer.avatar} alt='' />
          <h4 className='glitch' data-glitch={gamer.name}>
            {gamer.name}
          </h4>
        </div>

        <div className='grid'>
          <img className='big-img' src={gamer.image} alt='' />

          <div className='fact'>
            <h5>Selected Legend</h5>
            <p>{gamer.legend}</p>
          </div>
          <div className='fact'>
            <h5>Apex Level</h5>
            <p>
              {gamer.level}
              <span>({gamer.levelPercent}%)</span>
            </p>
          </div>
          <div className='fact'>
            <h5>Season 2 wins</h5>
            <p>
              {gamer.seasonWins}
              <span>({gamer.seasonWinsPercent}%)</span>
            </p>
          </div>
          <div className='fact'>
            <h5>Damage Done</h5>
            <p>
              {gamer.damage}
              <span>({gamer.damagePercent}%)</span>
            </p>
          </div>
        </div>

        <Link to='/'> Back</Link>
      </Shadow>
    </ThisSection>
  );
};

export default Profile;
