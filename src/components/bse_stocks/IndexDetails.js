import React from 'react';
const IndexDetails = ({indexData}) => {
    const {scripname, prevdayclose, openrate, ltradert} = indexData;
    const {lowrate, highrate, change_val, change_percent} = indexData;
    const latest_val = parseInt(ltradert);
    const color = change_val > 0 ? "green" : "red";

    return (<tr>
        <td align="left"><nobr>{scripname}</nobr></td>
        <td><nobr>{prevdayclose}</nobr></td>
        <td><nobr>{openrate}</nobr></td>
        <td><nobr>{latest_val}</nobr></td>
        <td><nobr>{lowrate}</nobr></td>
        <td><nobr>{highrate}</nobr></td>
        <td><font color={color}>{change_val}</font></td>
        <td><font color={color}>{change_percent}</font></td>
    </tr>);
}
 
export default IndexDetails;