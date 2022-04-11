import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const TableGrid = ({rowData, colDefs}) => {
    const getRowStyle = params => {
        return {color: params["data"]["color"]}
    };
    const onGridReady = params => {
        params.api.setRowData(rowData);
        params.api.sizeColumnsToFit();
      }
   return (
       <div className="ag-theme-alpine" style={{height: 50 + rowData.length * 21 , width: 1000}}>
           <AgGridReact
               getRowStyle={getRowStyle}
               onGridReady={onGridReady}
               rowData={rowData}
               columnDefs={colDefs}>
           </AgGridReact>
       </div>
   );
};

export default TableGrid;