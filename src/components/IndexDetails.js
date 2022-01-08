import React from 'react';
const IndexDetails = ({duration, indexCode, data}) => {
    let content = null;

    if(duration === '1D')
    {
        const {ScripFlagCode, IndexName, Prev_Close, Curvalue, Chg, ChgPer} = data;
        const color = Chg > 0 ? "green" : "red";
        content = (<tr>
            <td align="align"><nobr>{ScripFlagCode}</nobr></td>
            <td align="left"><nobr>{IndexName}</nobr></td>
            <td>{Prev_Close}</td>
            <td>{Curvalue}</td>
            <td><font color={color}>{Chg}</font></td>
            <td><font color={color}>{ChgPer}</font></td>
        </tr>);
    }
    else
    {
        const {Scrip, PreClose, LatestVal} = data;
        const Chg = (parseFloat(LatestVal) - parseFloat(PreClose)).toFixed(2);
        let ChgPer = null;
        const color = Chg > 0 ? "green" : "red";
        if(Chg <= 0)
        {
            ChgPer = ((Chg * 100)/parseFloat(LatestVal)).toFixed(2);
        }
        else {
            ChgPer = ((Chg * 100)/parseFloat(PreClose)).toFixed(2);
        }
        content = (<tr>
            <td align="align"><nobr>{indexCode}</nobr></td>
            <td align="left"><nobr>{Scrip}</nobr></td>
            <td>{PreClose}</td>
            <td>{LatestVal}</td>
            <td><font color={color}>{Chg}</font></td>
            <td><font color={color}>{ChgPer}</font></td>
        </tr>);
    }
    return content;
}
 
export default IndexDetails;