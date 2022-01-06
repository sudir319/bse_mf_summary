import React, {Component} from 'react';
import Summary from './Summary';
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories : [1, 2, 3, 4, 5, 6],
            indexCodes : [16, 98, 99, 22, 100, 81, 82, 23, 102, 103, 104, 105, 17, 87, 93, 95, 94, 113, 88, 89, 90, 83, 91, 84, 92, 85, 96, 97, 42, 53, 25, 27, 35, 37, 69, 67, 45, 111, 79, 86, 80, 44, 114, 109, 108, 110, 107, 106, 72, 76, 47, 48, 101, 77, 75]
            //indexCodes : [16]
        }
    }
    render() { 
        return <table border="1" style={{borderCollapse:'collapse'}}>
            <thead>
                <tr>
                    <th>Index Id</th>
                    <th>Index</th>
                    <th><nobr>Prev Close</nobr></th>
                    <th><nobr>Current Value</nobr></th>
                    <th>Change</th>
                    <th><nobr>Change %</nobr></th>
                </tr>
            </thead>
            <tbody>
            {
                this.props.duration == '1D'
                ? this.state.categories.map(eachCategory => <Summary key={eachCategory} duration={this.props.duration} category={eachCategory}/>)
                : this.state.indexCodes.map(eachIndexCode => <Summary key={eachIndexCode} duration={this.props.duration} indexCode={eachIndexCode}/>)
            }
            </tbody>
        </table>;
    }
}
 
export default Dashboard;