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
                { field: 'scripname', sortable : true, filter: "agTextColumnFilter" },
                { field: 'prevdayclose', sortable : true },
                { field: 'openrate', sortable : true },
                { field: 'latest_val', sortable : true },
                { field: 'lowrate', sortable : true },
                { field: 'highrate', sortable : true },
                { field: 'change_val', sortable : true },
                { field: 'change_percent', sortable : true, filter: "agNumberColumnFilter" }
            ]
        }
    }

    setSelectedIndex = e => {
        this.setState({selectedIndex : e.target.value});
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
                let dataArray = response;
                dataArray.forEach(eachIndexData => {
                    const {ltradert, change_percent, change_val} = eachIndexData;
                    eachIndexData["latest_val"] = parseFloat(ltradert);
                    eachIndexData["change_percent"] = parseFloat(change_percent);
                    eachIndexData["color"] = change_val >= 0 ? "green" : "red";

                    const indices = eachIndexData["index_code"].split(",");
                    indices.forEach(eachIndex => {
                        eachIndex = eachIndex.substring(1, eachIndex.length - 1);
                        if(!differentIndices.includes(eachIndex)) {
                            differentIndices.push(eachIndex);
                        }
                    })
                });
                dataArray = dataArray.sort((da1, da2) => 
                    da1["scripname"].localeCompare(da2["scripname"]));

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

        return !this.state.loaded ?<div>Loading ...!!!</div> : 
        (
            <div>
                <div>Index : <select defaultValue={this.state.selectedIndex} onChange={(event) => this.setSelectedIndex(event)}>
                {
                    this.state.differentIndices.map(eachIndex => <option key = {eachIndex}>{eachIndex}</option>)
                }
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Stock Count : {filteredArray.length}</div>
                <TableGrid colDefs = {this.state.colDefs} rowData = {filteredArray}/>
            </div>
        );
    }
}
 
export default BSEStocks;