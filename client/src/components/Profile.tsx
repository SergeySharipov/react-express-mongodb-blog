import React from "react";
import { getCurrentUser } from "../services/auth.service";
import { deleteAllTodos } from '../services/todo.service'
import { RouteComponentProps } from "react-router-dom";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Profile: React.FC<Props> = ({ history }) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    history.push("/login");
    window.location.reload();
  }

  const handleDeleteTodos = (): void => {
    if (currentUser.id) {
      deleteAllTodos(currentUser.id)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todos are not deleted')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h1>
          Profile
        </h1>
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <button className="btn btn-danger btn-block" onClick={handleDeleteTodos}>
          <span>Delete All Todos</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
