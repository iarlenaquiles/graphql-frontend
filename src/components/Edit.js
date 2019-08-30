import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
           id
           name
           last_name
           email
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser(
        $id: ID!,
        $name: String!,
        $last_name: String!,
        $email: String!) {
        updateUser(
        id: $id,
        name: $name,
        last_name: $last_name,
        email: $email) {
            updatedAt
        }
    }
`;

class Edit extends Component {

  render() {
    let name, last_name, email;
    return (
        <Query query={GET_USER} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_USER} key={data.user.id} onCompleted={() => this.props.history.push(`/`)}>
                        {(updateUser, { loading, error }) => (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            EDIT USER
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        <h4><Link to="/" className="btn btn-primary">User List</Link></h4>
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            updateUser({ variables: { id: data.user.id, name: name.value, last_name: last_name.value, email: email.value } });
                                            name.value = "";
                                            last_name.value = "";
                                            email.value = "";
                                            
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" className="form-control" name="name" ref={node => {
                                                    name = node;
                                                }} placeholder="name" defaultValue={data.user.name} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="last_name">Last Name:</label>
                                                <input type="text" className="form-control" name="last_name" ref={node => {
                                                    last_name = node;
                                                }} placeholder="Title" defaultValue={data.user.last_name} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">email:</label>
                                                <input type="text" className="form-control" name="email" ref={node => {
                                                    email = node;
                                                }} placeholder="email" defaultValue={data.user.email} />
                                            </div>
                                            
                                           
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
  }
}

export default Edit;