export function getBackgroundColor(color: string) {
  switch (color) {
    case "black":
      return "bg-black";
    case "red":
      return "bg-red-500";
    case "green":
      return "bg-green-500";
    case "blue":
      return "bg-blue-500";
    case "white":
      return "bg-gray-100";
    case "gray":
      return "bg-gray-300";
    case "brown":
      return "bg-brown";
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
