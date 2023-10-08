import React, { useState } from "react";
import "./MyProfile.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import { userState } from "../../recoil/UserState";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { loadingState } from "../../recoil/LoadingState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import userService from "../../services/UserService";

function MyProfile() {
  const [user, setUser] = useRecoilState(userState);
  const [female, setFemale] = useState(user?.gender ? true : false);
  const setLoading = useSetRecoilState(loadingState);
  const setState = useSetRecoilState(toastState);
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const [urlImg, setUrlImg] = useState(user?.avatar || "");

  const settingToastMess = (type, txt) => {
    setState(true);
    setType(type);
    setTxt(txt);
  };

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const uploadImage = async (img) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "quincey");

    await axios
      .post("https://api.cloudinary.com/v1_1/dz2fcqjpg/image/upload", formData)
      .then((response) => {
        setUrlImg(response.data.url);
        handleChange("avatar", response.data.url);
        setLoading(false);
      })
      .catch((err) => {
        settingToastMess("error", "Please select image!");
        setLoading(false);
      });
  };

  const handleClickSave = async () => {
    setLoading(true)
    const res = await userService.updateUser(user?._id, user)
    if (res?.message) {
      settingToastMess("success", res?.message);
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      settingToastMess("error", res?.data?.error);
    }
    setLoading(false)
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h4 style={{ margin: "0" }}>My Profile</h4>
        <p>Manage profile information for account security</p>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div className="profile-information">
          <Input
            label="email"
            type="text"
            style={{ width: "500px" }}
            value={user?.email}
            disabled={true}
          />
          <Input
            label="fullname"
            type="text"
            style={{ width: "500px" }}
            value={user?.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
          <Input
            label="phone number"
            type="text"
            style={{ width: "500px" }}
            value={user?.phonenumber}
            onChange={(e) => handleChange("phonenumber", e.target.value)}
          />
          <label>
            <input
              type="radio"
              name="gender"
              value={0}
              className="profile-radio"
              checked={!female}
              onChange={(e) => {
                handleChange("gender", Number(e.target.value) ? true : false);
                setFemale(Number(e.target.value) ? true : false);
              }}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value={1}
              className="profile-radio"
              checked={female}
              onChange={(e) => {
                handleChange("gender", Number(e.target.value) ? true : false);
                setFemale(Number(e.target.value) ? true : false);
              }}
            />
            Female
          </label>
        </div>
        <div className="profile-avt">
          <Image
            cloudName="dz2fcqjpg"
            className="image-avt"
            publicId={urlImg}
          />
          <input
            style={{ width: "100%" }}
            accept="image"
            type="file"
            onChange={(e) => uploadImage(e.target.files[0])}
          />
        </div>
      </div>
      <Button name="Save" onClick={handleClickSave} />
    </div>
  );
}

export default MyProfile;
