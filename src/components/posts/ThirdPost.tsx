import newCollectionImage from "../../assets/new_product.png";

function ThirdPost() {
  return (
    <div className="flex flex-row w-full h-120 border-b-2 bg-postcl">
      <img src={newCollectionImage} className="h-120 w-96" />
      <div className="w-full px-28 py-16 space-y-7">
        <p className="font-extralight text-5xl">New Collection Launch</p>

        <p className="font-bold text-2xl tracking-extrawide">
          EXCLUSIVE STYLES
        </p>

        <div className="h-5 w-40 ml-auto bg-black"></div>

        <p className="font-light text-xl">
          Discover our latest collection featuring the trendiest styles of the
          season. From chic dresses to stylish accessories, our new collection
          has everything you need to refresh your wardrobe. Be the first to shop
          these exclusive pieces and elevate your fashion game!
        </p>

        <button className="w-40 h-10 bg-black text-white font-bold rounded">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default ThirdPost;
