import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query, Mutation} from 'react-apollo';

const GET_USERS = gql`
  {
    users {
      id
      name
      last_name
      email
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id:$id) {
      id
    }
  }
`;

class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF USERS
                  </h3>
                  <h4><Link to="/create">Add User</Link></h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                          <Mutation mutation={deleteUser} key={user.id} onCompleted={() => this.props.history.push('/')}>
                                    {(deleteUser, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    deleteUser({ variables: { id: user.id } });
                                                }}>
                                                <Link to={`/edit/${user.id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        
                                        </div>
                                    )}
                                </Mutation>
                                </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;