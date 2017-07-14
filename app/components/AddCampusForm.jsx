import React, {Component} from 'react';
import axios from 'axios';
import store from '../store'
import {Row, Input} from 'react-materialize'
import {Link} from 'react-router-dom'
import {getAllCampuses, addCampus} from '../reducers'

export default class AddCampusForm extends Component {
    constructor() {
        super()
        this.state = store.getState()
        this.newCampus = {
            name: 'TestCampus',
            image: 'http://img10.deviantart.net/0bf7/i/2012/137/e/0/space_station_by_mysticmorning-d5049am.png'
        }
        this.nameChange = this.nameChange.bind(this);
        this.urlChange = this.urlChange.bind(this);
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
        this.newCampus.name = evt.target.value
    }

    urlChange(evt){
        this.newCampus.image = evt.target.value
    }

    submitForm(){
        axios.post('/api/campuses', this.newCampus).then(store.dispatch(addCampus(this.newCampus)));
    }

    render() {

         if (!this.state) {
            return null
        }

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
                            <Input onChange={(evt) => this.nameChange(evt)} s={10}  label="Name" />
                            <Input onChange={(evt) => this.urlChange(evt)} s={10} label="Picture URL"  />
                    </Row>
                    <Row className="center">
                        {/*<Input s={12} type='select' label="Select campus">
                            {campuses.map(campus => <option className="menu input sized" key={campus.id}>{campus.name}</option>)}
                        </Input>*/}
                        <div onClick={this.submitForm} className="action-btn lg">
                            <a className="waves-effect waves-light btn-large orange darken-3">
                            <i className="material-icons right">school</i>add Campus</a>
                        </div> 
                    </Row>
                    </div>
                </div>
            </div>
            
        </div>
        )
    }
}