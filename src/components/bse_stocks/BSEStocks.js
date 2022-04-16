import React, {Component} from 'react';
import TableGrid from '../grid/TableGrid';
class BSEStocks extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            dataArray : null,
            selectedIndex: 'S&P BSE AllCap',
            differentIndices : null,
            colDefs : [
                { field: 'scripName', sortable : true, resizable: true, filter: "agTextColumnFilter" },
                { field: 'prevDayClose', sortable : true },
                { field: 'openValue', sortable : true },
                { field: 'latestValue', sortable : true },
                { field: 'lowValue', sortable : true },
                { field: 'highValue', sortable : true },
                { field: 'changeValue', sortable : true },
                { field: 'changePercent', sortable : true, filter: "agNumberColumnFilter" }
            ]
        }
    }

    setSelectedIndex = e => {
        this.setState({selectedIndex : e.target.value});
    }

    getRowStyle = params => {
        return {color: params["data"]["changeValue"]  >= 0 ? "green" : "red"}
    };

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
                    const {ltradert, change_percent, change_val} = eachIndexData;
                    
                    eachData["latestValue"] = parseFloat(ltradert);
                    eachData["changePercent"] = parseFloat(change_percent);
                    eachData["scripName"] = eachIndexData["scripname"];
                    eachData["openValue"] = eachIndexData["openrate"];
                    eachData["lowValue"] = eachIndexData["lowrate"];
                    eachData["highValue"] = eachIndexData["highrate"];
                    eachData["prevDayClose"] = eachIndexData["prevdayclose"];
                    eachData["changeValue"] = eachIndexData["change_val"];
                    eachData["index_code"] = eachIndexData["index_code"];

                    const indices = eachIndexData["index_code"].split(",");
                    indices.forEach(eachIndex => {
                        eachIndex = eachIndex.substring(1, eachIndex.length - 1);
                        if(!differentIndices.includes(eachIndex)) {
                            differentIndices.push(eachIndex);
                        }
                    });

                    return eachData;
                });

                dataArray = dataArray.sort((da1, da2) => 
                    da1["scripName"].localeCompare(da2["scripName"]));

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
                    Stock Count : {filteredArray.length}</div>
                    <TableGrid colDefs = {this.state.colDefs} rowData = {filteredArray} 
                        height = {50 + filteredArray.length * 21} width = {1000} getRowStyle = {this.getRowStyle}/>
                </div>
            );
    }
}
 
export default BSEStocks;