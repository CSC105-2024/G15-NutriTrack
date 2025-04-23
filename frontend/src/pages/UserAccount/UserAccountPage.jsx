import React from "react";
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

const UserAccountPage = () => {
  useDocumentTitle("Profile");

  return (
    <>
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 mx-24 items-start">
        {/* Profile Image */}
        <ProfileCard src="https://vandclover.wordpress.com/wp-content/uploads/2013/03/1.jpg" />

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
      </div>
    </>
  );
};

export default UserAccountPage;
