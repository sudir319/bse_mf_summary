import React, {Component} from 'react';
import TableGrid from '../grid/TableGrid';
class BSEStocks extends Component {
    constructor(props){
        super(props);
        this.state = {
            indices : ['AllCap'],
            loaded : false,
            data : new Map(),
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

    addData = indexData => {
        if(!this.state.data.get(indexData["scripname"])) {
            this.state.data.set(indexData["scripname"], indexData);
        }
    }

    componentDidMount() {
        if(!this.state.loaded) {
            this.state.indices.map(eachIndex => {
                var encodedIndex = ("S%26P BSE " + eachIndex).replace(/ /g, '+');
                var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/GetMktData/w?ordcol=TT&strType=index&strfilter=" + encodedIndex;
                fetch(apiLink)
                .then(response => response.json())
                .then(response => response["Table"])
                .then(response => {
                    response.forEach(eachIndexData => this.addData(eachIndexData));
                    this.setState({loaded : true});
                })
                .catch(err => {
                    console.log(err)
                    //this.setState({data: null, error: true});
                });
            })
        }
    }

    render() {
        let sortedArray;
        if(this.state.loaded) {
            const unsortedArray = Array.from(this.state.data.entries());
            sortedArray = unsortedArray.sort(([key1, value1], [key2, value2]) => key1.localeCompare(key2));
            sortedArray.forEach(eachIndexData => {
                eachIndexData = eachIndexData[1];
                const {ltradert, change_percent, change_val} = eachIndexData;
                eachIndexData["latest_val"] = parseFloat(ltradert);
                eachIndexData["change_percent"] = parseFloat(change_percent);
                eachIndexData["color"] = change_val >= 0 ? "green" : "red";
            });
            sortedArray = sortedArray.map(([eachIndex, eachIndexData]) => eachIndexData);
        }

        return !this.state.loaded ?<div>Loading ...!!!</div> : 
        (
            <TableGrid colDefs = {this.state.colDefs} rowData = {sortedArray}/>
        );
    }
}
 
export default BSEStocks;