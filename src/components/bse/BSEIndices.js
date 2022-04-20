import React, {Component} from 'react';
import TableGrid from '../grid/TableGrid';
class BSEIndices extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories : [1, 2, 3, 4, 5, 6],
            durations: ['1D', '7D', '15D', '1M', '3M', '6M', '9M', '1Y'],
            colDefs: null,
            data : null, 
            loaded : false
        }
    }

    getOldData = (data, period) => {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        switch(period) {
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

        let neededData = this.getDataForDate(today, data);
        if(neededData && neededData.length > 0) {
            return neededData[0]["value"];
        }

        return null;
    }

    getDataForDate = (dateValue, data) => {
        let requiredData = data.filter(eachData => dateValue.toString().includes(eachData["date"]));
        if(!requiredData || requiredData.length === 0) {
            dateValue.setDate(dateValue.getDate() + 1);
            requiredData = this.getDataForDate(dateValue, data);
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
        let eachIndex;
        let noOfIndices = 0;
        this.state.categories.forEach(eachCategory => {
            var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/MktCapBoard/w?cat=" + eachCategory + "&type=2";
            fetch(apiLink)
            .then(response => response.json())
            .then(response => response["RealTime"])
            .then(response => {
                noOfIndices += response.length;
                response.forEach(eachResponse => {
                    var apiDataLink = "https://api.bseindia.com/BseIndiaAPI/api/SensexGraphData/w?index=" + eachResponse["ScripFlagCode"] + "&flag=12M&sector=&seriesid=R&frd=null&tod=null";
                    fetch(apiDataLink)
                    .then(response => response.json())
                    .then(response => JSON.parse(response.substr(response.indexOf("#@#") + 3)))
                    .then(response => {
                        let latestData = eachResponse["Curvalue"];
                        let colDefs = [];
                        let dataObject = {};
        
                        eachIndex = eachResponse["ScripFlagCode"];
                        dataObject["indexId"] = eachIndex;
                        dataObject["index"] = eachResponse["IndexName"];
                        dataObject["latestValue"] = latestData;
        
                        colDefs.push({ field: 'indexId', sortable : true});
                        colDefs.push({ field: 'index', sortable : true, filter: "agTextColumnFilter", resizable: true});
                        colDefs.push({ field: 'latestValue', sortable : true });
                        
                        if(response.length > 0) {
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
                        }
                        
                        allIndexChangeData.push(dataObject);
                        if(allIndexChangeData.length === noOfIndices) {
                            this.setState({colDefs : colDefs, data: allIndexChangeData, loaded: true});
                        }
                    })       
                });
            });
        });
    }

    render() {
        return this.state.error ? <div>Error...!!!</div> :
            !this.state.loaded ? <div>Loading...!!!</div> : 
                <TableGrid colDefs = {this.state.colDefs} rowData = {this.state.data}
                width = {2500} getCellStyle = {this.getCellStyle}/>
    }
}
 
export default BSEIndices;