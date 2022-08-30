import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import EditProfileModal from "./EditProfileModal";
import './ProfileButton.css';

const ProfileButton = () => {
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.profile_pic_url);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleBrokenLink = () => {
    setAvatarUrl('https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png');
  }

  return (
    <div className="profile-btn-container">
      <button onClick={openMenu} id='profile-btn'>
        <img
          id="profile-btn-img"
          src={avatarUrl}
          onError={handleBrokenLink} />
      </button>
      <div>
        <EditProfileModal user={user} showModal={showModal} setShowModal={setShowModal} />
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <button
            className="edit-profile-btn"
            onClick={() => setShowModal(true)}>Edit Profile
          </button>
          <div>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
