import React from 'react'
import EditUserView from './../components/user/editUserView'
import Request from './../helpers/request'
import { Redirect } from 'react-router-dom';

class EditUserContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  handleUserUpdate(user){
    console.log("handleUserPost called", user);
    const request = new Request();
    request.put('http://134.209.17.105:8080/api/users/' + this.props.id, user);
    this.setRedirect();
  }

  setRedirect() {
  this.setState({
    redirect: true
  })
  }


renderRedirect(){
  if (this.state.redirect) {
    return <Redirect to='/users' />
  }
}

  render(){
    return(
      <div>
      {this.renderRedirect()}
      <EditUserView handleUserUpdate={this.handleUserUpdate} id={this.props.id}/>
      </div>
    )
  }

}





export default EditUserContainer
