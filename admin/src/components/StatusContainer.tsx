const StatusContainer = ({ status }: { status: string }) => {
  const pascalCaseStatus = status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={
          "rounded-2xl px-5 py-1 font-medium w-2/3 text-center text-sm " +
          (status === "pending"
            ? "bg-yellow-200 text-yellow-800"
            : status === "processing"
            ? "bg-blue-200 text-blue-800"
            : status === "delivering"
            ? "bg-purple-200 text-purple-800"
            : status === "completed"
            ? "bg-green-200 text-green-800"
            : status === "cancelled"
            ? "bg-red-200 text-red-800"
            : "")
        }
      >
        {pascalCaseStatus}
      </div>
    </div>
  );
};

export default StatusContainer;
