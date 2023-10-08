import React, { useState, useEffect } from "react";
import "./ViewMore.css";
import CardItem from "../Card/CardItem";
import productService from "../../services/ProductService";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState } from "recoil";

function ViewMore(props) {
  const { title, max, style, styleItem, isButton } = props;
  const [data, setData] = useState([]);
  const [isViewMore, setIsViewMore] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  const getData = async () => {
    setLoading(true);
    const res = await productService.getProducts();
    setData(res?.data);
  };

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  return (
    <div className="more" style={style}>
      {title && <div className="more-title">{title}</div>}
      <div className="more-item">
        {isViewMore
          ? data?.map((d) => (
              <CardItem style={styleItem} data={d} name="home" />
            ))
          : data
              ?.slice(0, max)
              .map((d) => <CardItem style={styleItem} data={d} name="home" />)}
      </div>
      {(isButton && data?.length > max ) && (
        <div className="more-button">
          <button onClick={() => setIsViewMore(!isViewMore)}>
            {isViewMore ? "Hide Less" : "View More"}
            {isViewMore ? (
              <i class="fas fa-angle-up" style={{ marginLeft: "20px" }}></i>
            ) : (
              <i class="fas fa-angle-down" style={{ marginLeft: "20px" }}></i>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewMore;
