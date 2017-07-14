'use strict'

$(document).ready(function() {
    $('select').material_select();
  });

import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllCampuses from './components/Campuses'
import AllStudents from './components/Students'
import SingleCampus from './components/SingleCampus'
import HomeView from './components/Home'
import SingleStudent from './components/SingleStudent'
import AddStudentForm from './components/AddStudentForm'
import AddCampusForm from './components/AddCampusForm'

render(
  <Router>
  <Switch>
    <Route exact path='/' component={HomeView}></Route>
    <Route exact path='/campuses' component={AllCampuses}></Route>
    <Route exact path='/campuses/:id' component={SingleCampus}></Route>
    <Route exact path='/students' component={AllStudents}></Route>
    <Route exact path='/students/:id' component={SingleStudent}></Route>
    <Route exact path='/newStudent' component={AddStudentForm}></Route>
    <Route exact path='/newCampus' component={AddCampusForm}></Route>
  </Switch>
</Router>, document.getElementById('main'));