import React, {Component} from 'react';
import TableGrid from '../grid/TableGrid';
class BSEIndices extends Component {
    constructor(props){
        super(props);
        this.state = {
            indexCodes : [16, 98, 99, 22, 100, 81, 82, 23, 102, 103, 104, 105, 17, 87, 93, 95, 94, 113, 88, 89, 90, 83, 91, 84, 92, 85, 96, 97, 42, 53, 25, 27, 35, 37, 69, 67, 45, 111, 79, 86, 80, 44, 109, 108, 110, 107, 106, 72, 76, 47, 48, 101, 77, 75],
            // indexCodes : [16],
            indexNames : {
                16: "BSE SENSEX", 98:	"BSE SENSEX 50", 99: "BSE SENSEX Next 50", 22: "BSE 100",
                100: "BSE Bharat 22 Index", 81: "BSE MidCap", 82:	"BSE SmallCap", 23: "BSE 200",
                102: "BSE 150 MidCap Index", 103: "BSE 250 SmallCap Index", 104: "BSE 250 LargeMidCap Index",
                105: "BSE 400 MidSmallCap Index", 17: "BSE 500", 87: "BSE AllCap", 93: "BSE LargeCap",
                95: "BSE SmallCap Select Index", 94: "BSE MidCap Select Index", 113: "BSE 100 LargeCap TMC Index",
                88: "BSE Basic Materials", 89: "BSE Consumer Discretionary Goods & Services",
                90: "BSE Energy", 83: "BSE Fast Moving Consumer Goods", 91: "BSE Finance", 84: "BSE Healthcare",
                92: "BSE Industrials", 85: "BSE Information Technology", 96: "BSE Telecom", 97: "BSE Utilities",
                42: "BSE AUTO", 53: "BSE BANKEX", 25: "BSE CAPITAL GOODS", 27: "BSE CONSUMER DURABLES",
                35: "BSE METAL", 37: "BSE OIL & GAS", 69: "BSE POWER", 67: "BSE REALTY", 45: "BSE TECK",
                111: "BSE Diversified Financials Revenue Growth Index", 79: "BSE India Infrastructure Index",
                86: "BSE India Manufacturing Index", 80: "BSE CPSE", 44: "BSE PSU", 114: "BSE Private Banks Index",
                109: "BSE Momentum Index", 108: "BSE Low Volatility Index", 110: "BSE Quality Index", 
                107: "BSE Enhanced Value Index", 106: "BSE Dividend Stability Index", 72: "BSE IPO",
                76: "BSE SME IPO", 47: "BSE DOLLEX 30", 65: "BSE DOLLEX 100", 48: "BSE DOLLEX 200",
                101: "BSE 100 ESG Index", 77: "BSE CARBONEX", 75: "BSE GREENEX"
            },
            durations: ['7D', '15D', '1M', '3M', '6M', '9M', '1Y'],
            colDefs: null,
            data : null, 
            loaded : false
        }
    }

    getOldData = (data, period) => {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        switch(period) {
            case '7D' : today.setDate(today.getDate() - 7);
                        break;
            case '15D' : today.setDate(today.getDate() - 15);
                        break;
            case '1M' : today.setMonth(today.getMonth() - 1);
                        break;
            case '3M' : today.setMonth(today.getMonth() - 3);
                        break;
            case '6M' : today.setMonth(today.getMonth() - 6);
                        break;
            case '9M' : today.setMonth(today.getMonth() - 9);
                        break;
            case '1Y' : today.setFullYear(today.getFullYear() - 1);
                        break;
        }

        let neededData = this.getDataForDate(today, data);
        if(neededData && neededData.length > 0) {
            return neededData[0]["value"];
        }

        return null;
    }

    getDataForDate = (dateValue, data) => {
        let requiredData = data.filter(eachData => dateValue.toString().includes(eachData["date"]));
        if(!requiredData || requiredData.length == 0) {
            dateValue.setDate(dateValue.getDate() + 1);
            requiredData = this.getDataForDate(dateValue, data);
        }
        return requiredData;
    }
    
    getCellStyle = params => {
        return {color: params.value >= 0 ? "green" : "red"};
    };

    componentDidMount() {
        let allIndexChangeData = [];
        this.state.indexCodes.forEach(eachIndex => {
            var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/SensexGraphData/w?index=" + eachIndex + "&flag=12M&sector=&seriesid=R&frd=null&tod=null";
            fetch(apiLink)
            .then(response => response.json())
            .then(response => JSON.parse(response.substr(response.indexOf("#@#") + 3)))
            .then(response => {
                let latestData = parseFloat(response[response.length - 1]["value"]);
                let colDefs = [];
                let dataObject = {};

                dataObject["indexId"] = eachIndex;
                dataObject["index"] = this.state.indexNames[eachIndex];
                dataObject["1D"] = latestData;

                colDefs.push({ field: 'indexId', sortable : true});
                colDefs.push({ field: 'index', sortable : true, filter: "agTextColumnFilter", resizable: true});
                colDefs.push({ field: '1D', sortable : true });

                this.state.durations.forEach(eachDuration => {
                    var oldData = parseFloat(this.getOldData(response, eachDuration));
                    var oldDataChange = parseFloat(latestData - oldData).toFixed(2);
                    var oldDataChangePer = parseFloat((oldDataChange) * 100 / oldData).toFixed(2);

                    colDefs.push({ field: eachDuration, sortable : true, cellStyle: this.getCellStyle });
                    colDefs.push({ field: eachDuration + 'Chg', sortable : true, cellStyle: this.getCellStyle });
                    colDefs.push({ field: eachDuration + 'Chg%', sortable : true, cellStyle: this.getCellStyle });

                    dataObject[eachDuration] = oldData;
                    dataObject[eachDuration + "Chg"] = parseFloat(oldDataChange);
                    dataObject[eachDuration + "Chg%"] = parseFloat(oldDataChangePer);
                })
                
                allIndexChangeData.push(dataObject);
                if(allIndexChangeData.length === this.state.indexCodes.length) {
                    this.setState({colDefs : colDefs, data: allIndexChangeData, loaded: true});
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({data: null, error: true});
            });
        })
    }
    render() {
        
        return !this.state.loaded ? <div>Loading...!!!</div> : 
            <TableGrid colDefs = {this.state.colDefs} rowData = {this.state.data}
            height = {45 + this.state.data.length * 42} width = {2500} getCellStyle = {this.getCellStyle}/>
    }
}
 
export default BSEIndices;