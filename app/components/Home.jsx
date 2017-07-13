import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import store from '../store'
import {getAllCampuses} from '../reducers'

export default class HomeView extends Component {
    constructor() {
        super()
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render() {
        return (
            <div className="homeView">
                <h1 className="pageTitle">Margaret Hamilton Interplanetary Academy of JavaScript</h1>
                <nav>
                    <div className="nav-wrapper pageTitle">
                    <a id="LOGO" className="pageTitle">IJSAcademy</a>
                    <ul id="nav" className="right hide-on-med-and-down">                    
                        <li><Link to={`/`}><a className="pageTitle sized">Home</a></Link></li>
                        <li><Link to={`/campuses`}><a className="pageTitle sized">Campuses</a></Link></li>
                        <li><Link to={`/students`}><a className="pageTitle sized">Students</a></Link></li>
                    </ul>
                    </div>
                </nav>
                <div className="menu">
                <ul>
                    <Link to={`/campuses`}>
                        <h2>Campuses</h2>
                    </Link>
                    <Link to={`/students`}>
                        <h2>Students</h2>
                    </Link>
                </ul>
                </div>
            </div>
        )
    }
}
