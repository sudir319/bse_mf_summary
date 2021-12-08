import React, {Component} from 'react';
import IndexDetails from './IndexDetails';
class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null
        }
    }
    componentDidMount() {
        var apiLink = "https://api.bseindia.com/BseIndiaAPI/api/MktCapBoard/w?cat=" + this.props.category + "&type=2";
        fetch(apiLink)
        .then(response => response.json())  
        .then(response => {
            this.setState({data : response.RealTime});
        });
    }

    render() { 
        const data = this.state.data;
        var content = null;
        if(data)
        {
            content = data.map((eachIndexDetails, index) => <IndexDetails key={index} data={eachIndexDetails}/>)
        }
        else
        {
            content = "Loading...!!!";
        }
        return <React.Fragment>{content}</React.Fragment>;
    }
}
 
export default Summary;