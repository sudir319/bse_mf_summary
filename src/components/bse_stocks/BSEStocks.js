import React, {Component} from 'react';
import IndexDetails from './IndexDetails';
class BSEStocks extends Component {
    constructor(props){
        super(props);
        this.state = {
            indices : ['AllCap'],
            loaded : false,
            data : new Map()
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
                console.log(eachIndex);
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
        }
        return !this.state.loaded ?<div>Loading ...!!!</div> : 
        (
            <table border="1" style={{borderCollapse:'collapse'}}>
                <thead>
                    <tr>
                        <th><nobr>Stock</nobr></th>
                        <th><nobr>Previous Close</nobr></th>
                        <th><nobr>Opened At</nobr></th>
                        <th><nobr>Current Value</nobr></th>
                        <th><nobr>Low Value</nobr></th>
                        <th><nobr>High Value</nobr></th>
                        <th><nobr>Change</nobr></th>
                        <th><nobr>Change %</nobr></th>
                    </tr>
                </thead>
                <tbody>
                {
                    sortedArray.map(([eachIndex, eachIndexData]) => <IndexDetails key={eachIndex} indexData={eachIndexData}/>)
                }
                </tbody>
            </table>
        );
    }
}
 
export default BSEStocks;