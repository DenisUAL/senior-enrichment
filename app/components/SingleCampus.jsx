import React, {Component} from 'react';
import axios from 'axios';
import store from '../store'
import {getSingleCampus} from '../reducers'
import {Link} from 'react-router-dom'

export default class SingleCampus extends Component {
    constructor() {
        super()
        this.state = store.getState()
    }

    componentDidMount() {
        axios
            .get('/api/campuses/' + this.props.match.params.id)
            .then(response => response.data)
            .then(campus => store.dispatch(getSingleCampus(campus)))
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (!this.state) {
            return null
        }

        const campus = this.state.selectedCampus;

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
                    <h1 className="pageTitle">{campus.name} Campus</h1>
                    <img
                        src={campus.image}
                        style={{
                        hight: 400,
                        width: 400
                    }}/>
                </span>
            </div>
        )
    }
}