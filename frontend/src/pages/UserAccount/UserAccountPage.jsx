import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import FormInput from "@/components/FormInput";
import {
  faCalendar,
  faEnvelope,
  faLock,
  faPen,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserAccountPage = () => {
  useDocumentTitle("Profile");

  return (
    <>
      <div className="relative inline-block w-48">
        <img
          className="rounded-full object-cover w-full h-auto border border-black"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="profile image"
        />
        <FontAwesomeIcon
          icon={faPen}
          size="lg"
          className="absolute bottom-0 right-0 bg-green-500 p-4 rounded-2xl text-gray-700 shadow-md hover:bg-green-600"
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="w-fit">
          <label htmlFor="name" className="font-bold">
            Full Name
          </label>
          <FormInput
            name="text"
            type="text"
            value="Henry Cavil"
            readOnly={true}
            iconFa={faUser}
          />
        </div>
        <div className="w-fit">
          <label htmlFor="email" className="font-bold">
            Email Address
          </label>
          <FormInput
            name="email"
            type="email"
            value="something@example.com"
            readOnly={true}
            iconFa={faEnvelope}
          />
        </div>
        <div className="w-fit">
          <label htmlFor="dob" className="font-bold">
            Date of Birth
          </label>
          <FormInput
            name="dob"
            type="text"
            value="25/04/2025"
            readOnly={true}
            iconFa={faCalendar}
          />
        </div>
        <div className="w-fit">
          <label htmlFor="sex" className="font-bold">
            Sex (Assigned at Birth)
          </label>
          <FormInput
            name="sex"
            type="text"
            value="Male"
            readOnly={true}
            iconFa={faVenusMars}
          />
        </div>
        <div className="w-fit">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <FormInput
            name="password"
            type="password"
            value="something"
            readOnly={true}
            iconFa={faLock}
          />
        </div>
      </div>
    </>
  );
};

export default UserAccountPage;
