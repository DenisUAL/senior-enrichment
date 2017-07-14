import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import store from '../store'
import {getAllCampuses, deleteCampus} from '../reducers'
//import {Campus, Student} from '../../db';

export default class AllCampuses extends Component {
    constructor() {
        super()
        this.state = store.getState();
        this.deleteHandler = this.deleteHandler.bind(this);
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

     deleteHandler(evt){
        store.dispatch(deleteCampus(evt))
        axios.delete('/api/campuses/' + evt.id);
    }

    render() {
        if (!this.state) {
            return null
        }

        const campuses = this.state.campusList
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
                <h2 className="pageTitle">Campuses:</h2>
                <div className="container">
                    <div className="row">
                        {campuses.map(campus => {
                            return (
                                <div key={campus.id} className="row shad">
                                    <Link to={`/campuses/${campus.id}`}>
                                      <div className="col s3">
                                        <img src={campus.image} style={{ hight: 250, width: 250}} />
                                      </div>
                                      <div className="col s6">
                                        <h2 className="menu">{campus.name}</h2>
                                      </div>
                                    </Link>
                                     <div style={{paddingTop: 70}} className="col s3">
                                        <a onClick={() => this.deleteHandler(campus)} className="btn-floating btn-large waves-effect waves-light orange darken-3"><i className="material-icons">delete</i></a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Link to="/newCampus">
                    <div className="fixed-action-btn">
                        <a className="waves-effect waves-light btn-large orange darken-3">
                        <i className="material-icons right">account_balance</i>add Campus</a>
                    </div> 
                </Link>  
            </div>
        )
    }
}