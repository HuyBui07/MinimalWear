import men from "../../assets/men.png";

function Footer() {
  return (
    <div className="flex items-center w-full h-64 shadow-upward-md px-28">
      <div className='text-lg'>
        <p className="text-gray-500 text-xl mb-6">
          BẢN QUYỀN THUỘC CÔNG TY TNHH MENNIMAL. BẢO LƯU MỌI QUYỀN
        </p>
        <p>Tên công ty: MENIMAL VIETCAM CO., LTD</p>
        <p>Địa chỉ: 123 Đường ABC, Phường DEF, Quận GHI, TP. HCM</p>
        <p>Hotline: 0123 456 789</p>
        <p>Email: 21520909@gm.uit.edu.vn</p>
        <p>Giờ làm việc: 9:00 - 18:00 (Thứ Hai - Chủ Nhật)</p>
      </div>

      <img src={men} className="ml-auto" />
    </div>
  );
}

export default Footer;
