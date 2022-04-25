import React, {Component} from 'react';
import TableGrid from '../grid/TableGrid';
class BSE_ETFs extends Component {
    constructor(props){
        super(props);
        this.state = {
            indexCodes : [
                590095, 590096, 590106, 590103, 590098, 533230, 590104, 590108, 541097, 538057, 
                590101, 533385, 590097, 537007, 535276, 533244, 540787, 533570, 590113, 537708, 
                536960, 539517, 555555, 590099, 590107, 539313, 532985, 539487, 533719, 533408, 
                537008, 539312, 537483, 590110, 590115, 590109
            ],
            durations: ['1D', '7D', '15D', '1M', '3M', '6M', '9M', '1Y'],
            colDefs: null,
            data : null, 
            loaded : false
        }
    }

    getOldData = (data, interval) => {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        switch(interval) {
            case '1D' : today.setDate(today.getDate() - 1);
                        break;
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
            default   : break;
        }

        let neededData = this.getDataForDate(today, data, interval);
        if(neededData && neededData.length > 0) {
            return neededData[0]["vale1"];
        }

        return null;
    }

    getDataForDate = (dateValue, data, interval) => {
        let requiredData = data.filter(eachData => dateValue.toString().includes(eachData["dttm"]));
        if(!requiredData || requiredData.length === 0) {
            if(interval === '1D')
            {
                dateValue.setDate(dateValue.getDate() - 1);
            }
            else 
            {
                dateValue.setDate(dateValue.getDate() + 1);
            }
            requiredData = this.getDataForDate(dateValue, data, interval);
        }
        return requiredData;
    }
    
    getCellStyle = params => {
        var data = params["data"];
        var col = params["colDef"]["field"].substring(0, 2);
        return {color: data["latestValue"] >= data[col] ? "green" : "red"};
    };

    componentDidMount() {
        let allIndexChangeData = [];
        this.state.indexCodes.forEach(eachIndex => {
            var latestDataLink = "https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=" + eachIndex + "&flag=0&fromdate=&todate=&seriesid=";
            fetch(latestDataLink)
            .then(response => response.json())
            .then(response => {
                let latestData = parseFloat(response["CurrVal"]).toFixed(2);
                let apiLink = "https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=" + eachIndex + "&flag=12M&fromdate=&todate=&seriesid=";
                fetch(apiLink)
                .then(response => response.json())
                .then(response => {
                    let dataArray = JSON.parse(response["Data"]);
                    let colDefs = [];
                    let dataObject = {};
    
                    dataObject["fundId"] = eachIndex;
                    dataObject["fund"] = response["Scripname"];
                    dataObject["latestValue"] = latestData;
    
                    colDefs.push({ field: 'fundId', sortable : true});
                    colDefs.push({ field: 'fund', sortable : true, filter: "agTextColumnFilter", resizable: true});
                    colDefs.push({ field: 'latestValue', sortable : true });
    
                    this.state.durations.forEach(eachDuration => {
                        let oldData = parseFloat(this.getOldData(dataArray, eachDuration));
                        let oldDataChange = parseFloat(latestData - oldData).toFixed(2);
                        let oldDataChangePer = parseFloat((oldDataChange) * 100 / oldData).toFixed(2);
    
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
            });
        })
    }
    render() {
        return this.state.error ? <div>Error...!!!</div> :
            !this.state.loaded ? <div>Loading...!!!</div> : 
                <TableGrid colDefs = {this.state.colDefs} rowData = {this.state.data}
                width = {2500} getCellStyle = {this.getCellStyle}/>
    }
}
 
export default BSE_ETFs;