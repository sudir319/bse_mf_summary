import React, {Component} from 'react';
import IndexDetails from './IndexDetails';
class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            error: false
        }
    }
    componentDidMount() {
        if(this.props.duration == '1D')
        {
            var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/MktCapBoard/w?cat=" + this.props.category + "&type=2";
            fetch(apiLink)
            .then(response => response.json())  
            .then(response => {
                this.setState({data : response.RealTime});
            });
        }
        else
        {
            var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/SensexGraphData/w?index=" + this.props.indexCode + "&flag=" + this.props.duration + "&sector=&seriesid=R&frd=null&tod=null";
            fetch(apiLink)
            .then(response => response.json())
            .then(response => JSON.parse(response.substring(0, response.indexOf("#@#"))))
            .then(response => {
                this.setState({data: response[0], error: false});
            })
            .catch(err => {
                console.log(err)
                this.setState({data: null, error: true});
            });
        }
    }

    render() { 
        const data = this.state.data;
        const error = this.state.error;
        var content = null;

        if(!error && data)
        {
            content = this.props.duration == '1D'
            ? data.map((eachIndexDetails, index) => <IndexDetails key={index} duration={this.props.duration} data={eachIndexDetails}/>)
            : <IndexDetails duration={this.props.duration} indexCode={this.props.indexCode} data={data}/>
        }
        else if(error)
        {
            content = <tr><td colSpan='6'>Failed to fetch data...!!!</td></tr>;
        }
        else
        {
            content = <tr><td colSpan='6'>Loading...!!!</td></tr>;
        }
        return <React.Fragment>{content}</React.Fragment>;
    }
}
 
export default Summary;