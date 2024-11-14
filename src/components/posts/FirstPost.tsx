import firstpost from "../../assets/firstpost.png";

function FirstPost() {
  return (
    <div className="flex flex-row w-100 h-120 border-b-2 bg-postcl">
      <img src={firstpost} className="h-120 w-96" />

      <div className="w-full px-28 py-16 space-y-7">
        <p className="font-extralight text-5xl">Men Minimal</p>

        <p className="font-bold text-2xl tracking-extrawide">FUTURE FASHION</p>

        <div className="h-5 w-40 ml-auto bg-black"></div>

        <p className="font-light text-xl">
          Cửa hàng quần áo của chúng tôi chuyên về phong cách tối giản, cung cấp
          bộ sưu tập các món đồ vượt thời gian, ưu tiên chất lượng và sự đơn
          giản. Mỗi sản phẩm được thiết kế để linh hoạt và thanh lịch, hoàn hảo
          cho tủ đồ hiện đại.
        </p>

        <button className="w-40 h-14 font-semibold text-xl tracking-widest border-black border rounded-none hover:text-white hover:bg-black">
          MUA NGAY
        </button>
      </div>
    </div>
  );
}

export default FirstPost;
