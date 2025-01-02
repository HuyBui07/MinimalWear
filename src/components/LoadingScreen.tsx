import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ClipLoader color={"#000"} loading={true} size={150} />
    </div>
  );
}