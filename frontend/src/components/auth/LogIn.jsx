import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Login_Page } from "../../helpers_section/helperString";
import { signInUser } from "../../store/actions/authActions";
import { setError } from "../../store/actions/commonActions";
import { useHistory } from "react-router";

const LogIn = () => {
  const history = useHistory();
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(
        dispatch,
        { msg: "All Fields are Required", type: "All" },
        400,
        "LOGIN_FORM_FAILURE"
      );
    } else {
      signInUser(dispatch, email, password, history);
    }
  };

  useEffect(() => {
    if (error.id === "LOGIN_FORM_FAILURE") {
      setMsg(error.msg.msg);
      setMsgType(error.msg.type);
    }
    if (error.id === "LOGIN_FAILURE") {
      setMsg(error.msg);
      setShow(true);
    }
    if (isAuthenticated) {
      dispatch({
        type: "CLEAR_ERROR",
      });
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <>
      <div className="form_css">
        <h2 style={{ marginBottom: "40px" }}>{Login_Page.HEADING}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{Login_Page.EMAIL}</Form.Label>
            <Form.Control
              type="email"
              placeholder={Login_Page.PLACEHOLDER_EMAIL}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={
                msgtype === "All" ? email.length === 0 : msgtype === "Email"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{Login_Page.PASSWORD}</Form.Label>
            <Form.Control
              type="password"
              placeholder={Login_Page.PLACEHOLDER_PASSWORD}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={
                msgtype === "All"
                  ? password.length === 0
                  : msgtype === "Password"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Modal centered={true} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{Login_Page.FAILURE}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <Alert color="danger" variant={"danger"}>
                  {msg}
                </Alert>
              }
            </Modal.Body>
          </Modal>
          <div className="submission">
            <Button variant="primary" type="submit">
              {Login_Page.LOGIN}
            </Button>
            <Link to="/register" className="">
              {Login_Page.MESSAGE}
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LogIn;
