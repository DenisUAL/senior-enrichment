import React, {Component} from 'react';
import axios from 'axios';
import store from '../store'
import {Row, Input} from 'react-materialize'
import {Link} from 'react-router-dom'
import {getAllCampuses, addStudent} from '../reducers'

export default class AddStudentForm extends Component {
    constructor() {
        super()
        this.state = store.getState()
        this.newStudent = {
            name: 'TestStudent',
            email: 'test@test.com',
            image: 'https://lh4.ggpht.com/wKrDLLmmxjfRG2-E-k5L5BUuHWpCOe4lWRF7oVs1Gzdn5e5yvr8fj-ORTlBF43U47yI=w300',
            campusId: 1
        }
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.urlChange = this.urlChange.bind(this);
        this.campusSelect = this.campusSelect.bind(this);
        this.submitForm = this.submitForm.bind(this);
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

    nameChange(evt){
        this.newStudent.name = evt.target.value
    }

    emailChange(evt){
        this.newStudent.email = evt.target.value
    }

    urlChange(evt){
        this.newStudent.image = evt.target.value
    }

    campusSelect(evt){
        if(evt.target.value !== 'Pick Campus'){
            this.newStudent.campusId = evt.target.value;
        }else{
            alert('Pick Campus!!!!!!!!!!!');
        }
    }

    submitForm(){
        axios.post('/api/students', this.newStudent).then(store.dispatch.addStudent(this.newStudent));
    }

    render() {

         if (!this.state) {
            return null
        }

        const campuses = this.state.campusList;
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
                    <div className="col position shad s12">
                    <Row>
                            <Input onChange={(evt) => this.nameChange(evt)} s={5}  className="input" label="Name" />
                            <Input onChange={(evt) => this.emailChange(evt)} s={5}  className="input" label="Email" />
                            <Input onChange={(evt) => this.urlChange(evt)} s={10} className="input" label="Picture URL"  />
                    </Row>
                    <Row className="center">
                        <Input onChange={(evt) => this.campusSelect(evt)} s={12} type='select' label="Select campus">
                         <option className="menu input sized" defaultValue>Pick Campus</option>
                            {campuses.map(campus => <option className="menu input sized" key={campus.id} value={campus.id}>{campus.name}</option>)}
                        </Input>
                        <div onClick={this.submitForm} className="action-btn input lg">
                            <a className="waves-effect waves-light btn-large orange darken-3">
                            <i className="material-icons right">school</i>add Student</a>
                        </div> 
                    </Row>
                    </div>
                </div>
            </div>
            
        </div>
        )
    }
}