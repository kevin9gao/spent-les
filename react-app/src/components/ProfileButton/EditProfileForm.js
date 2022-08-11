import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/session";

const EditProfileForm = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const [income, setIncome] = useState(user.annual_income ? user.annual_income : '');
  const [profilePicUrl, setProfilePicUrl] = useState(user.profile_pic_url ? user.profile_pic_url : '');
  const [previewUrl, setPreviewUrl] = useState(profilePicUrl);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);

  useEffect(() => {
    const errors = [];

    if (income) {
      if (!Number(income)) {
        errors.push('Annual income must be a number.');
      } else if (Number(income) > 99999999.99) {
        errors.push('Support for hundred millionaires coming soon.');
      }
    }

    if (profilePicUrl.length > 255) {
      errors.push('Profile pic URL must not be more than 255 characters long.');
    } else if (profilePicUrl.length) {
      setPreviewUrl(profilePicUrl);
    }

    setValidationErrors(errors);
  }, [income, profilePicUrl]);

  const handleBrokenLink = () => {
    setPreviewUrl('https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png');
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      username: user.username,
      email: user.email,
      annual_income: income,
      profile_pic_url: profilePicUrl
    };

    console.log('EditProfileForm payload', payload);

    if (validationErrors.length === 0) {
      await dispatch(updateUser(payload, user.id));
      setShowModal(false);
    } else setHideErrors(false);
  }

  return (
    <div className="edit-profile-container">
      <div id="edit-profile-form-container">
        <h2>Edit Your Profile</h2>
        <div
          className="errors"
          hidden={hideErrors}
        >
          <ul>
            {validationErrors && validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >
          <label>Annual Income</label>
          <input
            value={income}
            onChange={e => setIncome(e.target.value)}
            />
          <label>Profile Picture</label>
          <input
            value={profilePicUrl}
            onChange={e => setProfilePicUrl(e.target.value)}
            />
          <img
            id="profile-pic-preview-img"
            src={previewUrl}
            alt='prof-pic-preview'
            onError={handleBrokenLink}
            />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
