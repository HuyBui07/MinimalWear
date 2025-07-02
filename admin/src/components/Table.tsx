import { DataGrid } from "@mui/x-data-grid";

function Table(props: any) {
  const noCheckboxSelection = props.noCheckboxSelection;
  const disableRowSelectionOnClick = props.disableRowSelectionOnClick || false;
  const identifyRoute = props.identifyRoute;
  const setModalOpen = props.setModalState;
  const setSelectedProductId = props.setSelectedProductId;

  const handlePaginationChange = (params: any) => {
    console.log(params.page);
    if (props.paginationModel.page !== params.page) {
      props.onPaginationModelChange({
        ...props.paginationModel,
        page: params.page,
      });
    }
  };

  const handleCellClick = props.handleCellClick
    ? props.handleCellClick
    : (params: any, event: React.MouseEvent) => {
        if (params.field === identifyRoute) {
          event.stopPropagation();
        }
        if (setModalOpen && (params.field === "name" || params.field === "id")) {
          setModalOpen(true);
          console.log(params.row[identifyRoute]);
          setSelectedProductId(params.row[identifyRoute]);
          return;
        }
      };

  return (
    <div className="w-full h-full mt-2 mb-5">

      <DataGrid
        className="w-auto"
        paginationMode="server"
        rowCount={props.paginationModel?.total ?? 0}
        rows={props.rows}
        columns={props.columns}
        checkboxSelection={!noCheckboxSelection}
        onRowSelectionModelChange={props.onRowSelection}
        rowSelectionModel={props.selectedRowIds}
        pagination={true}
        paginationModel={props.paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[10]}
        onCellClick={handleCellClick}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#EAECF0",
          },
          "& .MuiDataGrid-cell": {
            border: "1px solid #EAECF0",
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#EAECF0",
            border: "1px solid #EAECF0",
          },
        }}
      />
    </div>
  );
}

export default Table;
