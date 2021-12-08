import React, {Component} from 'react';
import IndexDetails from './IndexDetails';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codes : [16, 22, 87, 85, 93, 81, 82, 114, 79, 86, 42, 96, 90, 91, 92, 83, 84, 35, 37, 69]
        }
    }
    render() { 
        const codesDetails = this.state.codes.map(eachCode => <React.Fragment key={eachCode}><IndexDetails code={eachCode} /><tr><td colspan="2">&nbsp;</td></tr></React.Fragment>);
        return <table><tbody>{codesDetails}</tbody></table>;
    }
}
 
export default Dashboard;