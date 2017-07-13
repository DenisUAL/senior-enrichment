import React, {Component} from 'react';
// import axios from 'axios';
import store from '../store'
// import {getSingleStudent} from '../reducers'
import {Link} from 'react-router-dom'

export default class AddStudentForm extends Component {
    constructor() {
        super()
        this.state = store.getState()
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
            <div className="container form">
                <div className="row">
                    <form className="col s12">
                    <div className="row">
                        <div className="input-field col s3">
                        <input id="email" type="email" />
                        <label className="menu">Email</label>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <div className="input-field col s12 m6">
               
            </div>
        </div>
        )
    }
}