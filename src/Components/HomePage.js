import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/HomePage.css';
import { BiSolidLike } from 'react-icons/bi';
import { CiInstagram } from 'react-icons/ci';
import { CiTwitter } from 'react-icons/ci';


const HomePage = () => {
  const apiUrl = 'https://api.unsplash.com/search/photos';
  const apiKey = 'slUx6qxOMpexd-Jt1Vhl0DHCTkL5glzI9DpDQd0lGBM';
  const pageSize = 40;

  const [searchData, setSearchData] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [discription, setDiscription] = useState({
    imageUrl: '',
    likes: '',
    dpUrl: '',
    username: '',
    userId: '',
    instagram: '',
    twitter: '',
    downloadCont: '',
    downloadlink: '',
  });
  const [hidden, setHidden] = useState('non-hidden');
  const [pophidden, popsetHidden] = useState('hidden');

  const api = async () => {
    let res = await axios.get(
      'https://api.unsplash.com/photos/?client_id=slUx6qxOMpexd-Jt1Vhl0DHCTkL5glzI9DpDQd0lGBM'
    );

    console.log(res.data);
    setSearchData(res.data);
  };

  const apiCall = async () => {
    const result = await axios.get(
      `${apiUrl}?query=${inputVal}&page=1&per_page=${pageSize}&client_id=${apiKey}`
    );
    let c = result.data.results;
    setSearchData(c);
  };

  useEffect(() => {
    apiCall();
  }, [inputVal]);

  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <div className={`container ${hidden}`}>
        <h1>Image Search</h1>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for images"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
          <p className="search-btn" onClick={apiCall}>
            Search
          </p>
        </div>

        <div className="category-button">
          <p
            onClick={() => {
              setInputVal('Coding');
              apiCall();
            }}
          >
            Coding
          </p>
          <p
            onClick={() => {
              setInputVal('Pubg');
              apiCall();
            }}
          >
            Pubg
          </p>
          <p
            onClick={() => {
              setInputVal('Nature');
              apiCall();
            }}
          >
            Nature
          </p>
          <p
            onClick={() => {
              setInputVal('Birds');
              apiCall();
            }}
          >
            Birds
          </p>
        </div>

        <div className="screen">
          {searchData &&
            searchData.map((image) => {
              return (
                <div
                  className="display-info"
                  key={image.id}
                  onClick={() => {
                    let im = image.urls.full;
                    setDiscription({
                      imageUrl: im,
                      dpUrl: image.user.profile_image.small,
                      username: `${image.user.first_name} ${image.user.last_name}`,
                      userId: image.user.username,
                      likes: image.likes,
                      instagram: image.user.social.instagram_username,
                      twitter: image.user.social.twitter_username,
                      downloadlink: image.links.download,
                    });
                    setHidden('hidden');
                    popsetHidden("non-hidden")
                  }}
                >
                  <div className="user-likes">
                    <div className="cnt1">
                      <img src={image.urls.small} alt="" className="main-img" />
                    </div>
                    <div className="cnt2">
                      <div className="username">
                        <img
                          src={image.user.profile_image.small}
                          alt=""
                          className="profile-image"
                        />
                        <div className="user-id">
                          <p>{`${image.user.first_name} ${image.user.last_name}`}</p>
                         {image.user.username&& <p className="user-id1">@{image.user.username}</p>}
                        </div>
                      </div>
                      <div className="likes">
                        <p>
                          <BiSolidLike />
                          {image.likes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className={`hidden-popup ${pophidden} `}>
        <p
          onClick={() => {
            setHidden('non-hidden');
            popsetHidden("hidden")
          }}
          className='search-btn close-button'
        >
          Close X
        </p>
        <div className="img-corner">
          <img src={discription.imageUrl} alt="" className="hidden-main-img" />
        </div>

        <div className="user-details-handle">
          <div className="container1">
            <div className="dp-img">
              <img src={discription.dpUrl} alt="" className="hidden-dp-url" />
            </div>
            <div className="div-h2">
              <p>{discription.username}</p>
              <p className="user-id1">@{discription.userId}</p>
            </div>
            <div className="user-id2">
              <p className=''>
                <CiInstagram />/{discription.instagram}
              </p>
            </div>
            <div className="twitter-link">
              <p className="user-id2">
                <CiTwitter />/{discription.twitter}
              </p>
            </div>
          </div>

          <div className="container2">
            <p className="like-end">
              <BiSolidLike />
              {discription.likes}
            </p>
          </div>

          <div className="download-corner">
            <a
              className="search-btn"
              href={discription.downloadlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
