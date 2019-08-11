import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import axios from 'axios';
import Loader from '../components/Loader';

const ThisSection = styled.div`
  height: 100vh;
  img {
    margin: 4rem 0rem 4rem 9rem;
    height: 8rem;
  }
`;

const Shadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 12rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.6rem;
  border: 3px solid #aaa;
  color: white;
  padding: 1rem 2rem 8rem 2rem;

  transition: 1s ease-out;

  @media (max-width: 1300px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const Dashboard = () => {
  const [platform, setPlatform] = useState('psn');
  const [gamerTag, setGamerTag] = useState('');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (gamerTag) {
      try {
        const res = await axios.get(`/api/v1/profile/${platform}/${gamerTag}`);
        setProfile(res.data);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  };

  const redirect = () => {
    return (
      <Redirect
        to={{
          pathname: `/profile/${platform}/${gamerTag}`,
          state: { profile }
        }}
      />
    );
  };

  return (
    <ThisSection>
      <img src={Logo} />
      <Shadow>
        {loading ? (
          <div className='LoaderContainer'>
            <Loader />
          </div>
        ) : loaded ? (
          redirect()
        ) : (
          <>
            <h3>Search Player</h3>
            <form onSubmit={onSubmit}>
              <div>
                <span>Platform</span>
                <select
                  value={platform}
                  name='platform'
                  onChange={e => setPlatform(e.target.value)}
                >
                  <option value='psn'>PlayStation</option>
                  <option value='xbl'>xBox</option>
                  <option value='Origin'>Origin</option>
                </select>
              </div>
              <div>
                <span>Gamertag</span>
                <input
                  value={gamerTag}
                  type='text'
                  name='gamerTag'
                  onChange={e => setGamerTag(e.target.value)}
                />
              </div>
              <button type='submit'>Submit</button>
            </form>
          </>
        )}
      </Shadow>
    </ThisSection>
  );
};

export default Dashboard;
