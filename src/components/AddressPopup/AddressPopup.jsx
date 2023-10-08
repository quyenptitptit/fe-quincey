import React, { useState, useEffect } from "react";
import "./AddressPopup.css";
import axios from "axios";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../recoil/UserState";
import userService from '../../services/UserService'

function AddressPopup(props) {
  const { isPopup, setIsPopup } = props;
  const [user, setUser] = useRecoilState(userState)
  const [address, setAddress] = useState({});
  const setLoading = useSetRecoilState(loadingState);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [listAddress, setListAddress] = useState(user?.address)

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    setListCity(res.data);
    setLoading(false);
  };

  const handleChange = (name, value) => {
    setAddress({ ...address, [name]: value });
  };

  const handleChangeCity = (value) => {
    const city = listCity.find((city) => city.Name === value);
    setListDistrict(city.Districts);
    handleChange("city", value)
  };

  const handleChangeDistrict = (value) => {
    const district = listDistrict.find((dis) => dis.Name === value);
    setListWard(district.Wards);
    handleChange("district", value)
  };

  const handleClickBack = () => {
    setIsPopup(false);
  };

  const handleClickSave = async () => {
    setLoading(true)
    setListAddress([...listAddress, address])
    await userService.updateUser(user?._id, {...user, ['address']: [...listAddress, address]})
    const res = await userService.getUser(user?._id)
    setUser(res.data)
    localStorage.setItem("user", JSON.stringify(res?.data))
    setIsPopup(false)
    setLoading(false)
    console.log(res?.data?.address)
  };

  useEffect(() => {
    getData();
  }, [isPopup]);

  return (
    <div
      className="address-popup"
      style={isPopup ? { display: "flex" } : { display: "none" }}
    >
      <div className="address-popup-container">
        <div className="address-popup-header">New Address</div>
        <div className="address-popup-body">
          <input
            className="a-popup-input"
            placeholder="Fullname"
            style={{ marginRight: "20px" }}
            onChange={(e) => handleChange("name", e.target.value)}
            autoFocus
          />
          <input
            className="a-popup-input"
            placeholder="Phone number"
            onChange={(e) => handleChange("phonenumber", e.target.value)}
          />
          <div>
            <select
              className="a-popup-checkbox"
              id="city"
              aria-label=".form-select-sm"
              onChange={(e) => handleChangeCity(e.target.value)}
            >
              <option value="" selected>
              Select province
              </option>
              {listCity?.map((city) => (
                <option value={city.Name}>{city.Name}</option>
              ))}
            </select>

            <select
              className="a-popup-checkbox"
              id="district"
              aria-label=".form-select-sm"
              onChange={(e) => handleChangeDistrict(e.target.value)}
            >
              <option value="" selected>
                Select district
              </option>
              {listDistrict?.map((district) => (
                <option value={district.Name}>{district.Name}</option>
              ))}
            </select>

            <select
              className="a-popup-checkbox"
              id="ward"
              aria-label=".form-select-sm"
              onChange={(e) => handleChange("ward", e.target.value)}
            >
              <option value="" selected>
                Select ward
              </option>
              {listWard?.map((ward) => (
                <option value={ward.Name}>{ward.Name}</option>
              ))}
            </select>
          </div>
          <input
            className="a-popup-input"
            placeholder="Specific address"
            style={{ width: "100%" }}
            onChange={(e) => handleChange("specificaddress", e.target.value)}
          />
          <div className="address-popup-footer">
            <button
              className="a-popup-btn a-popup-btn-back"
              onClick={handleClickBack}
            >
              Back
            </button>
            <button className="a-popup-btn" onClick={handleClickSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressPopup;
