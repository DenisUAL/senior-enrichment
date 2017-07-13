import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import store from '../store'
import {getAllCampuses} from '../reducers'
//import {Campus, Student} from '../../db';

export default class AllCampuses extends Component {
    constructor() {
        super()
        this.state = store.getState();
    }

    componentDidMount() {
        axios
            .get('/api/campuses/')
            .then(response => response.data)
            .then(campusList => store.dispatch(getAllCampuses(campusList)))
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (!this.state) {
            return null
        }

        const campuses = this.state.campusList
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
                <h2 className="pageTitle">Campuses:</h2>
                <div className="container fluid">
                    <div className="row">
                        {campuses.map(campus => {
                            return (
                                <div key={campus.id} className="row shad">
                                    <Link to={`/campuses/${campus.id}`}>
                                        <img src={campus.image} style={{ hight: 250, width: 250}} />
                                        <h2 className="menu">{campus.name}</h2>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}