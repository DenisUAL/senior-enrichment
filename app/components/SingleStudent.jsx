import React, {Component} from 'react';
import axios from 'axios';
import store from '../store'
import {getSingleStudent} from '../reducers'
import {Link} from 'react-router-dom'

export default class SingleStudent extends Component {
    constructor() {
        super()
        this.state = store.getState()
    }

    componentDidMount() {
        axios
            .get('/api/students/' + this.props.match.params.id)
            .then(response => response.data)
            .then(student => store.dispatch(getSingleStudent(student)))
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (!this.state) {
            return null
        }

        const student = this.state.selectedStudent;
        return (
            <div>
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
                <span>
                    <h1 className="pageTitle">{student.name}'s profile page</h1>
                    <img src={student.image} style={{ hight: 250}} />  
                </span>
            </div>
        )
    }
}