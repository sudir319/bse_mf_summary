import React, {Component} from 'react';
class IndexDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {duration: '', data:null};
    }
    componentDidMount() {
        var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/SensexGraphData/w?index=" + this.props.code + "&flag=1&sector=&seriesid=R&frd=null&tod=null";
        fetch(apiLink)
        .then(response => response.json())
        .then(response => {
            response = response.substring(0, response.indexOf("#@#"));
            this.setState({data : JSON.parse(response)[0]})
        });
    }
    render() { 
        const duration = this.state.duration;
        const data = this.state.data;
        var content = null;
        if(data)
        {
            console.log(data);
            const indexName = data.Scrip;
            const prevClose = data.PreClose;
            const latestValue = data.LatestVal;
            const differece = (parseFloat(latestValue) - parseFloat(prevClose)).toFixed(2);
            console.log(parseFloat(prevClose));
            console.log(parseFloat(latestValue));
            const color = differece > 0 ? "green" : "red";

            content = (
                <React.Fragment>
                    <tr>
                        <th colSpan="2">{indexName}</th>
                    </tr>
                    <tr>
                        <td>Previous Close</td><td>{prevClose}</td>
                    </tr>
                    <tr>
                        <td>Latest Value</td><td>{latestValue}</td>
                    </tr>
                    <tr>
                        <td>Difference</td><td><font color={color}>{differece}</font></td>
                    </tr>
                </React.Fragment>)
        }
        else
        {
            content = (<div>Loading...</div>);
        }
        return content;
    }
}
 
export default IndexDetails;