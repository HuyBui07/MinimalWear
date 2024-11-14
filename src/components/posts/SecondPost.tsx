import saleImage from "../../assets/sale.png";

function SecondPost() {
  return (
    <div className="flex flex-row w-full h-120 border-b-2 bg-postcl">
      <div className="w-full px-28 py-16 space-y-7">
        <p className="font-extralight text-5xl">11/11 Mega Sale</p>

        <p className="font-bold text-2xl tracking-extrawide">
          UNBELIEVABLE DISCOUNTS
        </p>

        <div className="h-5 w-40 ml-auto bg-black"></div>

        <p className="font-light text-xl">
          Don't miss out on our biggest sale of the year! Enjoy massive
          discounts on all your favorite items. Whether you're shopping for
          yourself or looking for the perfect gift, our 11/11 Mega Sale has
          something for everyone. Hurry, these deals won't last long!
        </p>

        <button className="w-40 h-10 bg-black text-white font-bold rounded">
          Shop Now
        </button>
      </div>

      <img src={saleImage} className="h-120 w-96" />
    </div>
  );
}

export default SecondPost;
