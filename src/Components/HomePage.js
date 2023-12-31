
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/HomePage.css";
import { BiSolidLike } from "react-icons/bi";

import { FiTwitter } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { Skeleton } from "@mui/material";

const HomePage = () => {
  const apiUrl = "https://api.unsplash.com/search/photos";
  const apiKey = "slUx6qxOMpexd-Jt1Vhl0DHCTkL5glzI9DpDQd0lGBM";
  const pageSize = 20;

  const [searchData, setSearchData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [discription, setDiscription] = useState({
    imageUrl: "",
    likes: "",
    dpUrl: "",
    username: "",
    userId: "",
    instagram: "",
    twitter: "",
    downloadCont: "",
    downloadlink: "",
  });
  const [hidden, setHidden] = useState("non-hidden");
  const [pophidden, popsetHidden] = useState("hidden");
  const [page, setpages] = useState(1);
  const [loading, setloading] = useState(false);



  const HandleSearch = async()=>{
    setloading(true); 
    setSearchData([]); 
    const result = await axios.get(
      `${apiUrl}?query=${inputVal}&page=${page}&per_page=${pageSize}&client_id=${apiKey}`
    );
    let c = result.data.results;
    setSearchData(c);
    setloading(false);
  }

  useEffect(() => {
    const apiCall = async () => {
      setloading(true);
      const result = await axios.get(
        `${apiUrl}?query=${inputVal}&page=${page}&per_page=${pageSize}&client_id=${apiKey}`
      );
      let c = result.data.results;
      setSearchData(c);
      setloading(false);
    };
    apiCall();
  // eslint-disable-next-line
  }, [page]);

  
  //  console.log(searchData);
  useEffect(() => {
    const api = async () => {
      let res = await axios.get(
        "https://api.unsplash.com/photos/?client_id=slUx6qxOMpexd-Jt1Vhl0DHCTkL5glzI9DpDQd0lGBM"
      );
  
      let x = res.data;
      setSearchData(x);
    };
    api();

  // eslint-disable-next-line
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
          <p
            className="search-btn"
            onClick={HandleSearch}
          >
            Search
          </p>
        </div>

        <div className="category-button">
          <p
            onClick={() => {
              setInputVal("Coding");
            }}
          >
            Coding
          </p>
          <p
            onClick={() => {
              setInputVal("Pubg");
            }}
          >
            Pubg
          </p>
          <p
            onClick={() => {
              setInputVal("Nature");
            }}
          >
            Nature
          </p>
          <p
            onClick={() => {
              setInputVal("Birds");
            }}
          >
            Birds
          </p>
        </div>

        <div className="screen">
          {searchData.map((image) => {
            return (
              <div
                className="display-info"
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
                  setHidden("hidden");
                  popsetHidden("non-hidden");
                }}
              >
                <div className="user-likes">
                  <div className="cnt1">
                  {loading ? (
 
  <Skeleton variant="rectangular" width={210} height={250} />
) : (
  
  <img src={image.urls.small} alt="abc" className="main-img" />
)}

                  </div>
                  <div className="cnt2">
  {loading ? (
    <Skeleton variant="text" />
  ) : (
    <div className="username">
      <img
        src={image.user.profile_image.small}
        alt=""
        className="profile-image"
      />
      <div className="user-id">
        <p>{`${image.user.first_name} ${image.user.last_name}`}</p>
        {image.user.username && (
          <p className="user-id1">@{image.user.username}</p>
        )}
      </div>
    </div>
  )}

  <div className="likes">
    {loading ? (
      <Skeleton variant="text" />
    ) : (
      <p>
        <BiSolidLike />
        {image.likes}
      </p>
    )}
  </div>
</div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="next-prev-btn">
          <p
            className="pags-btn"
            onClick={() => {
              if (page > 1) setpages(page - 1);
            }}
          >
            Prev Page
          </p>
          <p
            className="pags-btn"
            onClick={() => {
              if (page >= 1 && page < 6) {
                setpages(page + 1);
              }
            }}
          >
            Next Page
          </p>
        </div>
      </div>

      <div className={`hidden-popup ${pophidden} `}>
        <p
          onClick={() => {
            setHidden("non-hidden");
            popsetHidden("hidden");
          }}
          className="search-btn close-button"
        >
          Close X
        </p>
        <div className="img-corner">
          {discription.imageUrl ? (
            <img
              src={discription.imageUrl}
              alt=""
              className="hidden-main-img"
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={60} />
          )}
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
              <p className="">
                <BsInstagram />/{discription.instagram}
              </p>
            </div>
            <div className="twitter-link">
              <p className="user-id2">
                <FiTwitter />/{discription.twitter}
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