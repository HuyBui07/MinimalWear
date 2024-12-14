export function getBackgroundColor(color: string) {
  switch (color) {
    case "Black":
      return "bg-black";
    case "Red":
      return "bg-red-500";
    case "Green":
      return "bg-green-500";
    case "Blue":
      return "bg-blue-500";
    case "White":
      return "bg-gray-100";
    case "Gray":
      return "bg-gray-300";
    default:
      return "bg-gray-500";
  }
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
