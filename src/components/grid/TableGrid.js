import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const TableGrid = ({rowData, colDefs}) => {
    const getRowStyle = params => {
        if (params["data"]["trend"] === "+") {
            return { color: 'green' };
        }
        return {color: 'red'}
    };
    const onGridReady = params => {
        params.api.setRowData(rowData);
        params.api.sizeColumnsToFit();
      }
   return (
       <div className="ag-theme-alpine" style={{ width: '100%', height: '100%;' }}>
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