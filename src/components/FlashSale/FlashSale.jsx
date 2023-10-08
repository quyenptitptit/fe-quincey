import React, { useState, useEffect } from "react";
import "./FlashSale.css";
import CardSale from "../Card/CardSale";
import imgDefault from "../../datas/ImgDefault";
import productService from "../../services/ProductService";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilValue } from "recoil";

function FlashSale() {
  const setLoading = useSetRecoilState(loadingState);
  const [isViewMore, setIsViewMore] = useState(false);
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    setLoading(true);
    const res = await productService.getProductSale();
    setDatas(res?.data);
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="sale">
      <div className="sale-title">FLASH SALE</div>
      <div className="sale-item">
        {isViewMore
          ? datas?.map((data) => {
              if (data?.percent > 0) {
                return (
                  <CardSale
                    data={data}
                    price={data?.price}
                    percent={data?.percent}
                    img={data?.img[0]}
                  />
                );
              }
            })
          : datas?.slice(0, 7).map((data) => {
              if (data?.percent > 0) {
                return (
                  <CardSale
                    data={data}
                    price={data?.price}
                    percent={data?.percent}
                    img={data?.img[0]}
                  />
                );
              }
            })}
        {datas?.length > 6 && (
          <button
            className="sale-more"
            onClick={() => setIsViewMore(!isViewMore)}
          >
            {isViewMore ? (
              <i class="far fa-chevron-circle-down"></i>
            ) : (
              <i class="far fa-chevron-circle-right"></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default FlashSale;
