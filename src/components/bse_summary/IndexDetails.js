import React from 'react';
const IndexDetails = ({data}) => {
    const {IndexName, Prev_Close, Curvalue, Chg, ChgPer} = data;
    const color = Chg > 0 ? "green" : "red";

    return (<tr>
        <td align="left"><nobr>{IndexName}</nobr></td>
        <td>{Prev_Close}</td>
        <td>{Curvalue}</td>
        <td><font color={color}>{Chg}</font></td>
        <td><font color={color}>{ChgPer}</font></td>
    </tr>);
}
 
export default IndexDetails;