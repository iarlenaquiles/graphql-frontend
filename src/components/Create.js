import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const createUser = gql`
    mutation createUser(
        $name: String!,
        $last_name: String!,
        $email: String!) {
          createUser(
            name: $name,
            last_name: $last_name,
            email: $email
           ) {
            id
        }
    }
`;

class Create extends Component {
  
    render() {
      let name, last_name, email;

      return (
        <Mutation mutation={createUser} onCompleted={() => this.props.history.push('/')}>
            {(createUser, { loading, error }) => (
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD USER
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">User List</Link></h4>
                            <form onSubmit={e => {
                                e.preventDefault();
                                createUser({ variables: { name: name.value, last_name: last_name.value, email: email.value } });
                                name.value = "";
                                last_name.value = "";
                                email.value = "";
                            }}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className="form-control" name="name" ref={node => {
                                        name = node;
                                    }} placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name:</label>
                                    <input type="text" className="form-control" name="last_name" ref={node => {
                                        last_name = node;
                                    }} placeholder="Last name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" className="form-control" name="email" ref={node => {
                                        email = node;
                                    }} placeholder="E-mail" />
                                </div>
                                
                               
                               
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error:( Please try again</p>}
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;