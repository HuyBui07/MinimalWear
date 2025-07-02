import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingScreen() {
  return (
    <div className="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-100">
      <ClipLoader color={"#000"} loading={true} size={150} />
    </div>
  );
}
