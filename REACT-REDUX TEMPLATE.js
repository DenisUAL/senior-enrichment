import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import store from '../store'
//import {Campus, Student} from '../../db';

import {connect} from "react-redux";

class AllCampuses extends Component {

    componentDidMount() {
        axios
            .get('/api/campuses/')
            .then(response => response.data)
            .then(campusList => this.setState({campusList}))
    }

    render() {
        if (!this.state) {
            return null
        }

        const campuses = this.props.campusList

        console.log(this.state, '<--------this is state')
        return (
            <div>
                <h1>Margaret Hamilton Interplanetary Academy of JavaScript</h1>
                <h2>Campuses:
                </h2>
                <ul>
                    {campuses.map(campus => {
                        return (
                            <Link key={campus.id} to={`/campuses/${campus.id}`}>
                                <li>
                                    <div>
                                        <h3>{campus.name}</h3>
                                        <img
                                            src={campus.image}
                                            style={{
                                            hight: 400,
                                            width: 400
                                        }}/>
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({campusList: state.campusList})

export default connect(mapStateToProps)(AllCampuses)