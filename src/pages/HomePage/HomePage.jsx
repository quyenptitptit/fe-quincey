import React, { useState, useEffect } from "react";
import "./HomePage.css";
import CardCategoryShop from "../../components/Card/CardCategoryShop";
import CardCategoryName from "../../components/Card/CardCategoryName";
import FlashSale from "../../components/FlashSale/FlashSale";
import CardItem from "../../components/Card/CardItem";
import SlideShow from "../../components/SlideShow/SlideShow";
import imgDefault from "../../datas/ImgDefault";
import productService from "../../services/ProductService";
import { fadeImages } from "../../datas/DATA";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilState } from "recoil";
import ViewMore from "../../components/ViewMore/ViewMore";

function HomePage() {
  const [data, setData] = useState([]);
  const setLoading = useSetRecoilState(loadingState);

  return (
    <div>
      <div style={{ backgroundColor: "var(--main-color)" }}>
        <SlideShow
          styleContainer={{
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
          }}
          style={{ width: "100%", height: "400px" }}
          srcImg={fadeImages}
        />
      </div>
      <div className="homepage">
        <div className="category">
          <div className="category-title">Shop By Category</div>
          <div className="category-shop">
            <CardCategoryShop img={imgDefault.imgMen} text="Men" path="/product/men" />
            <CardCategoryShop
              img={imgDefault.imgWomen}
              text="Women"
              path="/product/women"
            />
            <CardCategoryShop img={imgDefault.imgKid} text="Kids" path="/product/kids" />
            <CardCategoryShop img={imgDefault.imgLady} text="Women" path="/product/women" />
            <CardCategoryShop
              img={imgDefault.imgGentleman}
              text="Men"
              path="/product/men"
            />
          </div>
          <div className="category-name">
            <CardCategoryName img={imgDefault.imgJean} text="jean" />
            <CardCategoryName img={imgDefault.imgHoodie} text="hoodie" />
            <CardCategoryName img={imgDefault.imgDress} text="dress" />
            <CardCategoryName img={imgDefault.imgShirt} text="shirt" />
            <CardCategoryName img={imgDefault.imgTShirt} text="t-shirt" />
          </div>
        </div>
        <FlashSale />
        <ViewMore title="Discover More" max={12} isButton={true} />
      </div>
    </div>
  );
}

export default HomePage;
