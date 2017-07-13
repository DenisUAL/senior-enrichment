import {combineReducers} from 'redux'

const initialState = {
  campusList: [],
  selectedCampus: {},
  studentList: [],
  selectedStudent: {}
}

const DELETE_STUDENT = 'DELETE_STUDENT';
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES';
const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

export const deleteStudent = (student) => {
  return ({type: DELETE_STUDENT, student})
}

export const getAllStudents = (students) => {
  return ({type: GET_ALL_STUDENTS, students})
}

export const getSingleStudent = (student) => {
  return ({type: GET_SINGLE_STUDENT, student})
}

export const getSingleCampus = (campus) => {
  return ({type: GET_SINGLE_CAMPUS, campus})
}

export const getAllCampuses = (campuses) => {
  return ({type: GET_ALL_CAMPUSES, campuses})
}

const rootReducer = function (state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case DELETE_STUDENT:
      newState.studentList = newState.studentList.filter((student) => student !== action.student);
      return newState;

    case GET_SINGLE_STUDENT:
      newState.selectedStudent = action.student;
      return newState;

    case GET_ALL_STUDENTS:
      newState.studentList = action.students;
      return newState;

    case GET_SINGLE_CAMPUS:
      newState.selectedCampus = action.campus;
      return newState;

    case GET_ALL_CAMPUSES:
      newState.campusList = action.campuses;
      return newState;

    default:
      return state
  }
};

export default rootReducer
