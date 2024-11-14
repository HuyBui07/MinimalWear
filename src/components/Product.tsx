interface ProductProps {
  image: string;
  productName: string;
  price: number;
}

function Product({ image, productName, price }: ProductProps) {
  const formattedPrice = new Intl.NumberFormat("de-DE").format(price);

  return (
    <div className="flex flex-col w-64 mb-11 cursor-pointer">
      <img src={image} className="h-64 w-64" />
      <div className="flex flex-col">
        <span className="mt-3 text-lg font-medium w-fit">{productName}</span>
        <span className="mt-3 text-3xl font-semibold">{formattedPrice} VND</span>
      </div>
    </div>
  );
}

export default Product;
