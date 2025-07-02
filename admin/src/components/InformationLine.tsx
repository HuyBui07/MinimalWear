const InformationLine = (props: any) => {
  return (
    <div className="flex flex-row items-center justify-between w-2/5 mb-2">
      <label className="m-0 font-bold">{props.label}</label>
      <div style={{ width: "41%" }}>
        <label style={{ fontWeight: "300" }}>{props.content}</label>
      </div>
    </div>
  );
};

export default InformationLine;
