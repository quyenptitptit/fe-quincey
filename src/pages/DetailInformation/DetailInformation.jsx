import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailInformation.css";
import "../HomePage/HomePage.css";
import productService from "../../services/ProductService";
import SlideShow from "../../components/SlideShow/SlideShow";
import ViewMore from "../../components/ViewMore/ViewMore";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "../../recoil/LoadingState";
import { addToCart, cartState } from "../../recoil/CartState";
import { alertState } from "../../recoil/AlertState";
import { userState } from "../../recoil/UserState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function DetailInformation() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const setLoading = useSetRecoilState(loadingState);
  const [cart, setCart] = useRecoilState(cartState);
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const setState = useSetRecoilState(toastState);
  const setIsAlert = useSetRecoilState(alertState);
  const user = useRecoilValue(userState);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cartItem, setCartItem] = useState({
    product: data,
    quantity: quantity,
    color: "",
    size: "",
  });

  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const handleClick = (name, value) => {
    setCartItem({
      ...cartItem,
      [name]: value,
    });
  };

  // add
  const handleClickIncrease = () => {
    handleClick("quantity", quantity + 1);
    setQuantity(quantity + 1);
  };

  // sub
  const handleClickDecrease = () => {
    if (quantity > 1) {
      handleClick("quantity", quantity - 1);
      setQuantity(quantity - 1);
    } else {
      handleClick("quantity", 1);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (user) {
      const newCart = addToCart(cart, cartItem);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      settingToastMess("success", "success");
      setSelectedColor("");
      setSelectedSize("");
    } else {
      setIsAlert(true);
    }
  };

  let lists = Object.keys(data);
  lists = lists.filter(
    (item) =>
      item == "name" ||
      item == "des" ||
      item == "category" ||
      item == "trademark" ||
      item == "style" ||
      item == "origin" ||
      item == "inventory"
  );

  const getPriceSale = () => {
    const price = data?.price;
    return price - (price * data?.percent) / 100;
  };

  const getData = async () => {
    setLoading(true);
    const res = await productService.getProductById(id);
    setData(res?.data);
    setCartItem({
      ...cartItem,
      product: res?.data,
    });
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="infor">
      <div className="infor-general c-infor">
        <div className="infor-general-img">
          {data?.img?.length == 1 ? (
            <img src={data?.img} className="i-general-img-big" />
          ) : (
            <SlideShow
              styleContainer={{
                height: "500px",
                width: "500px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
              style={{ height: "500px", width: "500px" }}
              srcImg={data?.img}
            />
          )}
          <div className="i-share" style={{ marginTop: "20px" }}>
            <i
              class="fas fa-share"
              style={{ color: "#8a95a8", marginRight: "10px" }}
            ></i>
            <i
              class="fab fa-facebook-messenger"
              style={{ color: "#2369e1" }}
            ></i>
            <i class="fab fa-facebook" style={{ color: "#193971" }}></i>
            <i class="fab fa-pinterest" style={{ color: "#e13737" }}></i>
            <i class="fab fa-twitter" style={{ color: "#6899ee" }}></i>
          </div>
        </div>
        <div className="infor-general-txt">
          <h2 className="i-general-des">{data?.des}</h2>
          <div className="i-general-review">
            <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
            <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
            <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
            <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
            <i class="fas fa-star" style={{ color: "#D8D9DA" }}></i>
            <p style={{ color: "var(--star-color)" }}>(1000+ Reviewrs)</p>
          </div>
          {data?.sale && data?.percent > 0 ? (
            <div className="infor-genetal-price">
              <p className="i-general-price">${getPriceSale().toFixed(2)}</p>
              <del>
                <p className="i-general-price-sale c-sale-price-sale">
                  {data?.price.toFixed(2)}
                </p>
              </del>
            </div>
          ) : (
            <p className="c-item-cost">${data?.price?.toFixed(2)}</p>
          )}
          <div className="i-general-infor">
            <div className="i-general-infor-form">
              <p className="i-label">category</p>
              <p className="i-txt">{data?.category}</p>
            </div>
            <div className="i-general-infor-form">
              <p className="i-label">style</p>
              <p className="i-txt">{data?.style}</p>
            </div>
            <div className="i-general-infor-form">
              <p className="i-label">trademark</p>
              <p className="i-txt">{data?.trademark}</p>
            </div>
            <div className="i-general-infor-form">
              <p className="i-label">Color</p>
              {data?.color?.map((c) => (
                <button
                  value={c}
                  className={
                    c === selectedColor ? "i-item i-item-focus" : "i-item"
                  }
                  onClick={(e) => {
                    handleClick("color", e.target.innerText);
                    setSelectedColor(c);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="i-general-infor-form">
              <p className="i-label">size</p>
              {data?.size?.map((c) => (
                <button
                  className={
                    c === selectedSize ? "i-item i-item-focus" : "i-item"
                  }
                  onClick={(e) => {
                    handleClick("size", e.target.innerText);
                    setSelectedSize(c);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="i-general-infor-form">
              <p className="i-label">quantity</p>
              <div className="i-input-quantity">
                <button
                  className="i-input-select"
                  onClick={handleClickDecrease}
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="text"
                  className="i-input-display"
                  value={quantity}
                />
                <button
                  className="i-input-select"
                  onClick={handleClickIncrease}
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <button
            className="i-btn"
            onClick={handleAddToCart}
            disabled={
              !selectedColor || !selectedSize || !quantity ? true : false
            }
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="infor-detail c-infor">
        <div className="i-title">Product details</div>
        <div className="infor-detail-txt">
          {lists.map((a) => (
            <div className="i-general-infor-form">
              <p className="i-label">{a}</p>
              <p className="i-txt">{data[a]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="infor-des c-infor">
        <div className="i-title">Product description</div>
        <div className="infor-des-txt">
          <h3>Men’s Workout Clothing</h3>
          <p>
            Our shirts are perfect for all your workout needs. With advanced
            moisture-wicking technology and quick dry design, you’ll have your
            shirt ready to wear right after your workout. Sweat condensation is
            eliminated while you train with this shirt. It is easy to wash, and
            you won’t have to worry about shrinkage!
          </p>
          <br />
          <h3>Men’s Tshirts</h3>
          <p>
            These t-shirts are a comfortable and durable alternative to standard
            cotton tees. It’s designed to be worn all day by the man in demand.
            This classic design will keep you looking presentable on the go with
            a gentle fabric for comfort all day. You won’t perform at your best
            if you’re irritated by your clothing. This sleek take on a
            well-loved classic features a tried and tested spread collar and
            slim fit.
          </p>
          <br />
          <h3>Summer Dresses</h3>
          <p>
            Turn heads this summer with the perfect set of summer dresses. Our
            dresses are designed to make you feel like the confident, stylish
            woman you were destined to be. The Lace Reflection Dresses are lined
            with soft, breathable tulle fabric and adorned with airy lace. They
            feature classical detailing in a range of colors, letting you bring
            a classic touch to summer trends. The skirt length is low enough to
            be modest but just high enough to give your legs a more extended and
            slimmer look. It can be perfectly paired with your favorite pair of
            flats because of its length.
          </p>
          <br />
          <h3>Sleepwear</h3>
          <p>
            Get the comfortable sleep you deserve after a long hard day. Our
            sleepwear has premium quality. They are soft as a cloud and
            breathable. Find comfort and style in our warm flannel pajamas, cozy
            cardigans, and pajama sets. Start your day refreshed and relaxed
            with our modern-day comfort.
          </p>
          <br />
          <h3>Suits</h3>
          <p>
            Want to look sharp for an event? If so, our suits are the perfect
            fit. They are unmatched in sophistication and style. These are made
            of high-grade material that is not only sleek and shiny but also
            breathable and comfortable. These are custom-built suits for
            game-changers. It’s slim fit and has accentuated shoulders that give
            a classic style. How you dress affects how people perceive you, and
            with this suit, they will see you as the boss.
          </p>
          <br />
          <h3>Jackets and Sweaters</h3>
          <p>
            The cold won’t bother you anymore when you wear one of our jackets
            and sweaters. They’re made of the most durable materials and are
            superbly dense to keep you warm even on the coldest nights. As an
            added extra, we’ve also constructed them with a comfortable fabric
            that wicks moisture away from your body. It stops you from feeling
            that usual, odd chill.
          </p>
          <br />
          <h3>Evening Dresses</h3>
          <p>
            Evening events are the prime time for clothing. Go to your dinner
            date in style with a dress that will make jaws drop. Our dresses are
            made from lightweight fabric and highlighted with delicate
            detailing. You can choose from a variety of sweetheart neckline
            dresses, sparkle dresses, wrap dresses, midi dresses, and evening
            dresses covered with sequins. They come in various colors, helping
            you match your dressing style with your moods.
          </p>
          <br />
        </div>
      </div>
      <ViewMore
        title="Discover More"
        max={10}
        style={{ margin: "0px" }}
        styleItem={{ margin: "18px" }}
        isButton={true}
      />
    </div>
  );
}

export default DetailInformation;
