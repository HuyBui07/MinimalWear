import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pageTitle = location.pathname.split("/")[1];
  const pageTitleText = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <div className="text-xl font-bold flex w-full items-center h-20 border-b border-gray-200 pl-16">
      {pageTitleText}
    </div>
  );
}
