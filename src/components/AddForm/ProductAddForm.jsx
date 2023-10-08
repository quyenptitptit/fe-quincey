import React, { useState } from "react";
import "./ProductAddForm.css";
import axios from "axios";
import { Image } from "cloudinary-react";
import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";
import {
  TRADEMARK,
  CATEGORY,
  COLOR,
  SIZE,
  STYLE,
  TYPE,
} from "../../datas/DATA";
import productService from "../../services/ProductService";
import { loadingState } from "../../recoil/LoadingState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import { useSetRecoilState } from "recoil";

function ProductAddForm(props) {
  const { isUpdate, dataUpdate, setDisplayForm } = props;
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const setState = useSetRecoilState(toastState);
  const [product, setProduct] = useState(
    dataUpdate || { sold: 0, sale: false, percent: 0 }
  );
  const [image, setImage] = useState("");
  const [urlImg, setUrlImg] = useState(product?.img || []);
  const [isSale, setIsSale] = useState(product?.sale || false);
  const [isChooseFile, setIsChooseFile] = useState(true);
  const setLoading = useSetRecoilState(loadingState);

  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const handleCloseImg = (id) => {
    const img = urlImg.filter((url) => url != id);
    setUrlImg(img);
  };

  const handleChange = (name, value) => {
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    setLoading(true);
    const res = await productService.createProduct(product);
    if (res?.message) {
      settingToastMess("success", res?.message);
    } else {
      settingToastMess("error", res?.data?.error);
    }
    console.log(product);
    setDisplayForm(false);
    setLoading(false);
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    const res = await productService.updateProduct(dataUpdate._id, product);
    if (res?.message) {
      settingToastMess("success", res?.message);
    } else {
      settingToastMess("error", res?.data?.error);
    }
    console.log(product);
    setDisplayForm(false);
    setLoading(false);
  };

  const uploadImage = async () => {
    setLoading(true);
    if (isChooseFile) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "quincey");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dz2fcqjpg/image/upload",
          formData
        )
        .then((response) => {
          setUrlImg([...urlImg, response.data.url]);
          handleChange("img", [...urlImg, response.data.url]);
          setLoading(false);
          setImage("");
        })
        .catch((err) => {
          settingToastMess("error", "Please select image!");
          // console.log(err);
          setLoading(false);
        });
    } else {
      setUrlImg([...urlImg, image]);
      handleChange("img", [...urlImg, image]);
      setImage("");
      setLoading(false);
    }
  };

  return (
    <div className="product-add-form">
      <div className="product-add-form-input">
        <Input
          type="text"
          label="name"
          value={product?.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          type="number"
          label="Cost"
          value={product?.price}
          onChange={(e) => {
            handleChange("price", Number(e.target.value));
            // handleChange("cost", Number(e.target.value));
          }}
        />
        <Input
          type="text"
          label="Description"
          value={product?.des}
          onChange={(e) => handleChange("des", e.target.value)}
        />
        <Input
          type="text"
          label="origin"
          value={product?.origin}
          onChange={(e) => handleChange("origin", e.target.value)}
        />
        <Input
          type="number"
          label="inventory"
          value={product?.inventory}
          onChange={(e) => handleChange("inventory", Number(e.target.value))}
        />
        <div style={{ display: "flex" }}>
          <Input
            type="number"
            label="percent"
            style={{ width: "325px" }}
            disabled={!isSale}
            value={isSale ? product?.percent : ""}
            onChange={(e) => {
              handleChange("percent", Number(e.target.value));
            }}
          />
          <div style={{ display: "block", height: "60px", margin: "15px" }}>
            <label className="p-label">Sale</label>
            <br />
            <input
              type="checkbox"
              onClick={(e) => {
                setIsSale(e.target.checked);
                handleChange("sale", e.target.checked);
              }}
              checked={product?.sale || false}
              style={{ marginTop: "10px", marginLeft: "7px" }}
            />
          </div>
        </div>
      </div>
      <div className="product-add-form-select">
        <div style={{ margin: "15px" }}>
          <label className="p-label">Image</label>
          <br />
          <div className="p-add-form-img">
            {Array.from(urlImg)?.map((url) => (
              <div style={{ position: "relative", zIndex: 1 }}>
                <Image
                  cloudName="dz2fcqjpg"
                  className="p-image"
                  publicId={url}
                />
                <button
                  onClick={() => handleCloseImg(url)}
                  className="p-image-close"
                >
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="product-add-img">
          {isChooseFile ? (
            <input
              type="file"
              accept="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          ) : (
            <input
              className="product-input-img"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          )}
          <button id="addImg" onClick={uploadImage}>
            Add Image
          </button>
          <button
            className="btn-redo"
            onClick={() => setIsChooseFile(!isChooseFile)}
          >
            <i class="fas fa-redo-alt"></i>
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            isMulti={false}
            label="category"
            options={CATEGORY}
            value={{ value: product?.category, label: product?.category }}
            onChange={(value) =>
              handleChange("category", value?.value.toLowerCase())
            }
          />
          <Checkbox
            isMulti={false}
            label="trademark"
            options={TRADEMARK}
            value={{ value: product?.trademark, label: product?.trademark }}
            onChange={(value) =>
              handleChange("trademark", value?.value.toLowerCase())
            }
          />
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            isMulti={false}
            label="style"
            options={STYLE}
            value={{ value: product?.style, label: product?.style }}
            onChange={(value) =>
              handleChange("style", value?.value.toLowerCase())
            }
          />
          <Checkbox
            isMulti={false}
            label="type"
            options={TYPE}
            value={{ value: product?.type, label: product?.type }}
            onChange={(value) =>
              handleChange("type", value?.value.toLowerCase())
            }
          />
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            isMulti={true}
            label="Size"
            options={SIZE}
            value={product?.size?.map((s) => ({ value: s, label: s }))}
            onChange={(value) => {
              const arr = value?.map((v) => v.value);
              handleChange("size", arr);
            }}
          />
          <Checkbox
            isMulti={true}
            label="color"
            options={COLOR}
            value={product?.color?.map((s) => ({ value: s, label: s }))}
            onChange={(value) => {
              const arr = value?.map((v) => v.value);
              handleChange("color", arr);
            }}
          />
          {/* <Select label="size" id="" datas={SIZE} />
          <Select label="color" id="" datas={COLOR} /> */}
        </div>
        {isUpdate ? (
          <button
            className="p-search-btn p-add-btn"
            onClick={handleUpdateProduct}
          >
            Update product
          </button>
        ) : (
          <button className="p-search-btn p-add-btn" onClick={handleAddProduct}>
            Add product
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductAddForm;
