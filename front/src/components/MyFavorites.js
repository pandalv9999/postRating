import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentPreview from "./ApartmentPreview";

const MyFavorites = ({ user, userSetter }) => {
  const [favorites, setFavorites] = useState([]);
  const [msg, setMsg] = useState("");

  const getUser = () => {
    const url = `./users/get/${user.username}`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        setFavorites(data.favorites);
      })
      .catch((err) => {
        console.log("load favorite failed!");
        setMsg("Load favorite failed");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {favorites.length === 0 && (
        <p>You Have not favorite any apartment yet!</p>
      )}
      <ul style={{ listStyle: "none" }}>
        {favorites.map((apartment, index) => {
          return (
            <li key={`fav-apartment-${index}`}>
              <ApartmentPreview apartment={apartment} user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyFavorites;
