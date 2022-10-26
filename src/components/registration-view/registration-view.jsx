import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import './registration-view.scss';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  //Hook for each input
  const [nameErr, setNameErr] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!name) {
      setNameErr('Name is Required');
      isReq = false;
    } else if (name.length < 5) {
      setNameErr('Name must be at least 5 characters long');
      isReq = false;
    } else if (username.length < 1) {
      setUsernameErr('Username required');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    } else if (email.indexOf('@') == -1) {
      setEmailErr('Enter valid email');
      isReq = false;
    }

    return isReq;
  };

  const notify = () =>
    toast.success('Registration successful.Please Log in!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReq = validate();
    if (isReq) {
      axios
        .post('https://my-flix-app-1910.herokuapp.com/users', {
          Name: name,
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          notify();
          console.log(data);
          setName('');
          setUsername('');
          setPassword('');
          setEmail('');
          setBirthday('');

          // window.open('/', '_self');
          // props.onRegistration(data); //Check this
        })
        .catch((response) => {
          console.log(response);
        });

      console.log(name, username, password, email, birthday);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        <Card className="register-card">
          <Card.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                />
                {nameErr && <p className="error_msg">{nameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
                {usernameErr && <p className="error_msg">{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
                {passwordErr && <p className="error_msg">{passwordErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
                {emailErr && <p className="error_msg">{emailErr}</p>}
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="info"
                className="m-2 register-button"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};

export default RegistrationView;
