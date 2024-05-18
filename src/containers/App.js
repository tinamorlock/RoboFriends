import React, { Component } from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
    constructor() {
        super();
        this.state= {
            robots: [],
            searchfield: ''
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            console.log(response);
            const users = await response.json();
            console.log(users);
            this.setState({robots: users});
        } catch (error) {
            console.error('Error:', error);
        }
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
        console.log(this.state.searchfield);
    }
    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1>Loading . . . </h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1 light-green'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>

                </div>
            );
        }
    }
}

export default App;