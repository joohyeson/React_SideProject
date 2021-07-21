/*Details:  */

import React, {useEffect} from 'react';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import firebase from './firebase';

import ChatPage from './Components/Admin/ChatPage';
import PatientChatPage from './Components/Patient/ChatPagePatient.js';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';

import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  clearUser
} from './Redux/actions/user_action';

function App() {
  let history=useHistory();
  let dispatch=useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      
      if (user) {//로그인이 됐을 때
        var starCountRef = firebase.database().ref('users/' + user.uid + '/role');//데이터베이스에서 값을 읽어옴
        starCountRef.on('value', (snapshot) => {
          if(snapshot.val()==='admin')//로그인 했는데 역할이 관리자인 경우
          {
            history.push("/admin");
            dispatch(setUser(user))
          }
          else if(snapshot.val()==='patient')//로그인 했는데 역할이 환자인 경우
          {
            history.push("/patient");
            dispatch(setUser(user))
          }
          else
          {
            history.push("/login");
            dispatch(clearUser(user))
          }
          
        });
        
      } else {//로그인 실패시
        history.push("/login");
        dispatch(clearUser(user))
      }
    })
  }, [])

  if (isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  } else {
    return (
    <Switch>
      <Route exact path="/admin" component={ChatPage} />
      <Route exact path="/patient" component={PatientChatPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
    );
  }
}

export default App;
