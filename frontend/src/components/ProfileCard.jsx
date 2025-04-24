import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ src }) => {
  return (
    <div className="relative inline-block w-48 col-span-2 justify-self-center mb-8">
      <img
        className="rounded-full object-cover w-full h-auto border border-black"
        src={src}
        alt="profile image"
      />
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="absolute bottom-0 right-0 cursor-pointer bg-[#DAFFDD]  p-4 rounded-2xl text-gray-700 shadow-md hover:bg-[#F8FFE6]"
      />
    </div>
  );
};

export default ProfileCard;
