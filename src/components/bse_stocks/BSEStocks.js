import React, {Component} from 'react';
import TableGrid from '../grid/TableGrid';
class BSEStocks extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            dataArray : null,
            selectedSign: null,
            selectedIndex: 'S&P BSE AllCap',
            selectedRange : null,
            differentSigns : ["All", "+ve", "-ve"],
            differentRanges : ["All", "0 - 10", "10 - 50", "50 - 100", "100 - 500", "500 - 1000", "1000 - 5000", "5000 - 10000", "> 10000"],
            differentIndices : null,
            colDefs : [
                { field: 'scripName', sortable : true, resizable: true, filter: "agTextColumnFilter" },
                { field: 'prevDayClose', sortable : true },
                { field: 'openValue', sortable : true },
                { field: 'latestValue', sortable : true },
                { field: 'lowValue', sortable : true },
                { field: 'highValue', sortable : true },
                { field: 'changeValue', sortable : true },
                { field: 'changePercent', sortable : true, filter: "agNumberColumnFilter" },
                { field: 'sign', filter: "agTextColumnFilter"},
                { field: 'range', filter: "agTextColumnFilter"}
            ]
        }
    }

    setSelectedIndex = e => {
        this.setState({selectedIndex : e.target.value});
    }

    setSelectedRange = e => {
        this.setState({selectedRange : e.target.value});
    }

    setSelectedSign = e => {
        this.setState({selectedSign : e.target.value});
    }

    getRowStyle = params => {
        return {color: params["data"]["changeValue"]  >= 0 ? "green" : "red"}
    };

    getRangeValue = latestValue => {
        let rangeStr = "";
        if(latestValue > 0 && latestValue <= 10.0) {
            rangeStr = "0 - 10";
        }
        else if(latestValue > 10.0 && latestValue <= 50.0) {
            rangeStr = "10 - 50";
        }
        else if(latestValue > 50.0 && latestValue <= 100.0) {
            rangeStr = "50 - 100";
        }
        else if(latestValue > 100.0 && latestValue <= 500.0) {
            rangeStr = "100 - 500";
        }
        else if(latestValue > 500.0 && latestValue <= 1000.0) {
            rangeStr = "500 - 1000";
        }
        else if(latestValue > 1000.0 && latestValue <= 5000.0) {
            rangeStr = "1000 - 5000";
        }
        else if(latestValue > 5000.0 && latestValue <= 10000.0) {
            rangeStr = "5000 - 10000";
        }
        else if(latestValue > 10000.0) {
            rangeStr = "> 10000";
        }
        else {
            rangeStr = "NONE";
        }

        return rangeStr;
    }

    componentDidMount() {
        if(!this.state.loaded) {
            var encodedIndex = ("S%26P BSE AllCap").replace(/ /g, '+');
            var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/GetMktData/w?ordcol=TT&strType=index&strfilter=" + encodedIndex;
            fetch(apiLink)
            .then(response => response.json())
            .then(response => response["Table"])
            .then(response => {
                const differentIndices = [];
                let dataArray = response.map(eachIndexData => {
                    let eachData = {};
                    const {ltradert, change_percent} = eachIndexData;
                    
                    eachData["latestValue"] = parseFloat(ltradert);
                    eachData["changePercent"] = parseFloat(change_percent);
                    eachData["scripName"] = eachIndexData["scripname"];
                    eachData["openValue"] = eachIndexData["openrate"];
                    eachData["lowValue"] = eachIndexData["lowrate"];
                    eachData["highValue"] = eachIndexData["highrate"];
                    eachData["prevDayClose"] = eachIndexData["prevdayclose"];
                    eachData["changeValue"] = eachIndexData["change_val"];
                    eachData["index_code"] = eachIndexData["index_code"];
                    eachData["sign"] = eachIndexData["change_val"] >= 0.0 ? "+ve" : "-ve";
                    eachData["range"] = this.getRangeValue(parseFloat(ltradert));

                    const indices = eachIndexData["index_code"].split(",");
                    indices.forEach(eachIndex => {
                        eachIndex = eachIndex.substring(1, eachIndex.length - 1);
                        if(!differentIndices.includes(eachIndex)) {
                            differentIndices.push(eachIndex);
                        }
                    });

                    return eachData;
                });

                dataArray = dataArray.sort((da1, da2) => da1["scripName"].localeCompare(da2["scripName"]));

                this.setState({loaded : true, differentIndices: differentIndices, dataArray: dataArray});
            })
            .catch(err => {
                console.log(err)
                //this.setState({data: null, error: true});
            });
        }
    }

    render() {
        let filteredArray;
        if(this.state.selectedIndex === 'S&P BSE AllCap') {
            filteredArray = this.state.dataArray;
        }
        else { 
            filteredArray = this.state.dataArray
            .filter(eachData => eachData["index_code"].includes(this.state.selectedIndex));
        }

        if(this.state.selectedSign && this.state.selectedSign !== "All") {
            filteredArray = filteredArray
            .filter(eachData => eachData["sign"] === this.state.selectedSign);
        }
        if(this.state.selectedRange && this.state.selectedRange !== "All") {
            filteredArray = filteredArray
            .filter(eachData => eachData["range"] === this.state.selectedRange);
        }

        return this.state.error ? <div>Error...!!!</div> :
            !this.state.loaded ?<div>Loading ...!!!</div> : 
            (
                <div>
                    <div>Index : <select defaultValue={this.state.selectedIndex} onChange={(event) => this.setSelectedIndex(event)}>
                    {
                        this.state.differentIndices.map(eachIndex => <option key = {eachIndex}>{eachIndex}</option>)
                    }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Range : <select defaultValue={this.state.selectedRange} onChange={(event) => this.setSelectedRange(event)}>
                    {
                        this.state.differentRanges.map(eachRange => <option key = {eachRange}>{eachRange}</option>)
                    }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Sign : <select defaultValue={this.state.selectedSign} onChange={(event) => this.setSelectedSign(event)}>
                    {
                        this.state.differentSigns.map(eachSign => <option key = {eachSign}>{eachSign}</option>)
                    }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Stock Count : {filteredArray.length}</div>
                    <TableGrid colDefs = {this.state.colDefs} rowData = {filteredArray} 
                        width = {1300} getRowStyle = {this.getRowStyle}/>
                </div>
            );
    }
}
 
export default BSEStocks;