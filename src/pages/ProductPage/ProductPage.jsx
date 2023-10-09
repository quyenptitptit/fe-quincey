import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "antd";
import "./ProductPage.css";
import CardItem from "../../components/Card/CardItem";
import productService from "../../services/ProductService";
import ProductAddForm from "../../components/AddForm/ProductAddForm";
import { CATEGORY, TRADEMARK, TYPE } from "../../datas/DATA";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { popupReload } from "../../recoil/PopupState";

function ProductPage() {
  const name = useParams().name || "";

  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [displayForm, setDisplayForm] = useState(false); // display the information filling form
  const [dataUpdate, setDataUpdate] = useState({});
  const [isUpdate, setIsUpdate] = useState(false); // false - form update && true - form add new
  const [isClear, setIsClear] = useState(false)
  const [type, setType] = useState();
  const [category, setCategory] = useState();
  const [trademark, setTrademark] = useState();
  const [valueSliderMin, setValueSliderMin] = useState(0); // value min of price in search
  const [valueSliderMax, setValueSliderMax] = useState(100); // value max of price in search

  const setLoading = useSetRecoilState(loadingState);
  const isReload = useRecoilValue(popupReload);

  const onChange = (value) => {
    setValueSliderMin(value[0]);
    setValueSliderMax(value[1]);
  };

  const getData = async () => {
    setLoading(true);
    let res = {};
    if (name) {
      res = await productService.getProductByName(name);
    } else {
      res = await productService.getProducts();
    }
    setProduct(res?.data);
    setData(res?.data);
  };

  const handleSearchType = (data) => {
    if (type) {
      return data.filter((dt) => dt.type == type);
    } else return data;
  };

  const handleSearchCategory = (data) => {
    if (category) {
      return data.filter((dt) => dt.category == category);
    } else return data;
  };

  const handleSearchTrademark = (data) => {
    if (trademark) {
      return data.filter((dt) => dt.trademark == trademark);
    } else return data;
  };

  const handleSearchPrice = (data) => {
    return data.filter(dt => (dt.price >= valueSliderMin && dt.price <= valueSliderMax))
  };

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
    const res1 = handleSearchType(product)
    const res2 = handleSearchTrademark(res1);
    const res3 = handleSearchCategory(res2)
    const res4 = handleSearchPrice(res3)
    setData(res4);
  };

  const handleClear = () => {
    setIsClear(!isClear)
    setType("")
    setCategory("")
    setTrademark("")
    setValueSliderMax(100)
    setValueSliderMin(0)
    setData(product)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    getData();
    // setDisplayForm(false)
    window.scrollTo(0, 0);
  }, [name, displayForm, isReload, isClear]);

  return (
    <div className="product">
      {!name && (
        <div className="product-add">
          <button
            className={displayForm ? "product-list-btn" : "product-add-btn"}
            onClick={() => {
              setDisplayForm(!displayForm);
              setIsUpdate(false);
              setDataUpdate({});
            }}
          >
            {displayForm ? "Product List" : "Add New Product"}
          </button>
        </div>
      )}
      <div className="product-search">
        {!name ? (
          <div className="product-search-item">
            <form>
              <p className="p-title">Type</p>
              {TYPE?.map((tr) => (
                <>
                  <label for="type">
                    <input
                      type="radio"
                      className="p-category"
                      name="type"
                      value={tr.value}
                      // checked={type ? true : false}
                      onChange={(e) => setType(e.target.value)}
                    />
                    {tr.label}
                  </label>
                  <br />
                </>
              ))}
            </form>
          </div>
        ) : (
          <></>
        )}
        <div className="product-search-item">
          <form>
            <p className="p-title">Category</p>
            {CATEGORY?.map((tr) => (
              <>
                <label for="category">
                  <input
                    type="radio"
                    className="p-category"
                    name="category"
                    value={tr.value}
                    // checked={category ? true : false}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {tr.label}
                </label>
                <br />
              </>
            ))}
          </form>
        </div>
        <div className="product-search-item">
          <form>
            <p className="p-title">Trademark</p>
            {TRADEMARK.map((tr) => (
              <div>
                <label for="trademark">
                  <input
                    type="radio"
                    className="p-category"
                    name="trademark"
                    value={tr.value}
                    // checked={trademark ? true : false}
                    onChange={(e) => setTrademark(e.target.value)}
                  />
                  {tr.label}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="product-search-item">
          <p className="p-title">Price</p>
          <Slider
            range
            defaultValue={[0, 100]}
            onChange={onChange}
            value={[valueSliderMin, valueSliderMax]}
            style={{ marginLeft: "10px", marginRight: "10px" }}
            // onAfterChange={onAfterChange}
          />
          <div className="p-search-value">
            <p>${valueSliderMin}</p>
            <p>${valueSliderMax}</p>
          </div>
        </div>
        <div className="product-search-btn">
          <button className="p-search-btn" onClick={handleSearch}>
            Search
          </button>
          <button className="p-clear-btn" onClick={handleClear}>Clear All</button>
        </div>
      </div>
      <div className="product-manage">
        {displayForm && !name ? (
          <ProductAddForm
            isUpdate={isUpdate} // true-form update || false-form add new
            dataUpdate={dataUpdate}
            setDisplayForm={setDisplayForm}
          />
        ) : (
          <div className="product-list">
            {data?.map((d) => (
              <CardItem
                style={{ margin: "20px" }}
                name={name}
                data={d}
                setDisplayForm={setDisplayForm}
                setIsUpdate={setIsUpdate}
                setDataUpdate={setDataUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
