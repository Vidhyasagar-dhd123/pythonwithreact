import React , {Component} from 'react';
import ReactDOM from 'react-dom/client';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
        <div>
            <h1>Hello, World!</h1>
            <p>Welcome to my React app!</p>
        </div>
        );
    }
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);