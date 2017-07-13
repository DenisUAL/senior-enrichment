import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import store from '../store'
import {getAllStudents, deleteStudent} from '../reducers'
//import {Campus, Student} from '../../db';

export default class AllStudents extends Component {
    constructor() {
        super()
        this.state = store.getState();
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    componentDidMount() {
        axios
            .get('/api/students/')
            .then(response => response.data)
            .then(studentList => store.dispatch(getAllStudents(studentList)))
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    deleteHandler(evt){

        store.dispatch(deleteStudent(evt))
        axios.delete('/api/students/' + evt.id);
    }

    render() {

        if (!this.state) {
            return null
        }

        const students = this.state.studentList
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
                <h2 className="pageTitle">Students:</h2>
                <ul className="container">
                    {students.map(student => {
                        return (
                            <li key={student.id}>
                                <div className="row shad">
                                    <Link  to={`/students/${student.id}`}>
                                        <div className="col s3">
                                            <img src={student.image} alt="" className="userPhoto"/>
                                        </div>
                                        <div className="col s6">
                                            <span className="title"><h2 className="menu">{student.name}</h2></span>
                                        </div>
                                    </Link>
                                    <div style={{paddingTop: 70}} className="col s3">
                                        <a onClick={() => this.deleteHandler(student)} className="btn-floating btn-large waves-effect waves-light orange darken-3"><i className="material-icons">delete</i></a>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <Link to="/new">
                    <div className="fixed-action-btn">
                        <a className="waves-effect waves-light btn-large orange darken-3">
                        <i className="material-icons right">school</i>add Student</a>
                    </div> 
                </Link>   
            </div>
        )
    }
}