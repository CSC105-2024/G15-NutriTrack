import React, { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  faCalendar,
  faEnvelope,
  faLock,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import FormInputWithLabel from "@/components/FormInputWithLabel";
import ProfileCard from "@/components/ProfileCard";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const UserAccountPage = () => {
  useDocumentTitle("Profile");

  const [profileImage, setProfileImage] = useState(
    "https://vandclover.wordpress.com/wp-content/uploads/2013/03/1.jpg",
  );

  const handleImageChange = (newImageUrl) => {
    setProfileImage(newImageUrl);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 mx-2 lg:mx-24 items-start">
        {/* Profile Image */}
        <ProfileCard src={profileImage} onImageChange={handleImageChange} />

        {/* Fields */}
        <FormInputWithLabel
          label="Full Name"
          name="text"
          type="text"
          value="Henry Cavil"
          readOnly={true}
          iconFa={faUser}
        />
        <FormInputWithLabel
          label="Email Address"
          name="email"
          type="email"
          value="something@example.com"
          readOnly={true}
          iconFa={faEnvelope}
        />
        <FormInputWithLabel
          label="Date of Birth"
          name="dob"
          type="text"
          value="25/04/2025"
          readOnly={true}
          iconFa={faCalendar}
        />
        <FormInputWithLabel
          label="Sex (Assigned at Birth)"
          name="sex"
          type="text"
          value="Male"
          readOnly={true}
          iconFa={faVenusMars}
        />
        <FormInputWithLabel
          label="Password"
          name="password"
          type="password"
          value="something"
          readOnly={true}
          iconFa={faLock}
        />

        <Link
          to="/profile/edit"
          className="col-span-1 lg:col-span-2 flex justify-center mt-8"
        >
          <Button type="submit" text="Edit" variant="secondary" />
        </Link>
      </div>
    </>
  );
};

export default UserAccountPage;
