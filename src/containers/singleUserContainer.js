import React  from 'react';
import {Link} from 'react-router-dom';
import Request from './../helpers/request'
import SingleUserView from './../components/user/singleUserView'
import { Redirect } from 'react-router-dom'

class SingleUserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      redirectDelete: false,
      deleted: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.directToEditForm = this.directToEditForm.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount(){
    const request = new Request();
    request.get("http://134.209.17.105:8080/api/users/" + this.props.id).then((data) => {
      this.setState({user: data})
    })
  }

  setRedirect(){
    console.log("setRedirect called");
    this.setState({redirectDelete: true})
  }
  renderRedirect(){
    console.log("renderRedirect called");
    if(this.state.redirectDelete){
    return <Redirect to='/' />
  }
    }



  handleDelete(){
    const url = 'http://134.209.17.105:8080/api/users/' + this.props.id;
    let request = new Request();
    request.delete(url);
    this.setState({deleted:true});
  }

  directToEditForm(){
    window.location = '/users/edit/' + this.props.id;
  }


  getId(){
    return this.state.id
  }



  render(){

    if(!this.state.user){
      return null;
    }

    console.log("singleUserContainer props", this.state.user);
    console.log("singleUserContainer id", this.state.id);

    if(this.state.deleted){
      return(
        <React.Fragment>
        <div>
        <h4>User deleted</h4>
        </div>
        <div className="loginButtonDiv">
        {this.renderRedirect()}
        <button className ="loginButton" onClick={this.setRedirect}>Home</button>
        </div>
        </React.Fragment>
      )
    }


    return (
      <div className="component">
      <SingleUserView user={this.state.user}/>

      <div className="loginButtonDiv">
      <button className ="loginButton" onClick={this.handleDelete}>Delete</button>
      <Link to={"/users/edit/" + this.props.id} className="buttonLink">
      <button className ="loginButton" >Edit</button>
      </Link>

      </div>
      </div>
    )
  }
}

export default SingleUserContainer;
