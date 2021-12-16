import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Register_Page } from "../../helpers_section/helperString";
import { useHistory } from "react-router";
import { signUpUser } from "../../store/actions/authActions";
import { setError } from "../../store/actions/commonActions";

const Register = () => {
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const history = useHistory();
  const dispatch = useDispatch();

  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (error.id === "REGISTRATION_FORM_FAILURE") {
      setMsg(error.msg.msg);
      setMsgType(error.msg.type);
    }
    if (error.id === "REGISTRATION_FAILURE") {
      setMsg(error.msg);
      setShow(true);
    }
    if (isAuthenticated) {
      dispatch({
        type: "CLEAR_ERROR",
      });
    }
  }, [dispatch, error, isAuthenticated, msg]);

  const form_validation = () => {
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0 ||
      password.trim().length === 0 ||
      address.trim().length === 0
    ) {
      setError(
        dispatch,
        { msg: "All Fields are Required", type: "All" },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    }
    //check if name meets all requirements
    else if (!name.trim().match(/^[a-zA-Z\s]*$/)) {
      setError(
        dispatch,
        { msg: "Name Should Contain Only Letters", type: "Name" },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    } else if (name.trim().length < 3) {
      setError(
        dispatch,
        { msg: "Name Should Contain Atleast 3 Characters", type: "Name" },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    }

    //check if phone number meets all requirements
    else if (!phone.trim().match(/^[0-9]*$/) || !(phone.trim().length === 10)) {
      setError(
        dispatch,
        { msg: "Please Enter a Valid Phone Number", type: "Phone" },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    } else if (address.length > 200) {
      setError(
        dispatch,
        {
          msg: "Address Length is too High. 200 Character Limit",
          type: "Address",
        },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    }

    //check if password meets all requirements
    else if (
      !password
        .trim()
        .match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
    ) {
      const message =
        "Password should be Minimum of 8 Characters, Should Include atleast 1 Lowercase, 1 Uppercase, 1 Digit and 1 Special Character";
      setError(
        dispatch,
        { msg: message, type: "Password" },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    } else if (password.trim() !== password_confirm.trim()) {
      setError(
        dispatch,
        { msg: "Passwords Do Not Match", type: "Confirm_Password" },
        400,
        "REGISTRATION_FORM_FAILURE"
      );
    }

    //if all fields are valid
    else {
      signUpUser(dispatch, name, email, phone, password, address, history);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form_validation();
  };

  return (
    <>
      <div className="form_css">
        <h2 style={{ marginBottom: "40px" }}>{Register_Page.HEADING}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{Register_Page.NAME}</Form.Label>
            <Form.Control
              type="name"
              placeholder={Register_Page.PLACEHOLDER_REGISTER_NAME}
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={
                msgtype === "All" ? name.length === 0 : msgtype === "Name"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{Register_Page.EMAIL}</Form.Label>
            <Form.Control
              type="email"
              placeholder={Register_Page.PLACEHOLDER_EMAIL}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={
                msgtype === "All" ? email.length === 0 : msgtype === "Email"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{Register_Page.MOBILE}</Form.Label>
            <Form.Control
              type="number"
              placeholder={Register_Page.PLACEHOLDER_MOBILE}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              isInvalid={
                msgtype === "All" ? phone.length === 0 : msgtype === "Phone"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{Register_Page.ADDRESS}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={Register_Page.PLACEHOLDER_ADDRESS}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              isInvalid={
                msgtype === "All" ? address.length === 0 : msgtype === "Address"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{Register_Page.PASSWORD}</Form.Label>
            <Form.Control
              type="password"
              placeholder={Register_Page.PLACEHOLDER_PASSWORD}
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
          <Form.Group className="mb-3">
            <Form.Label>{Register_Page.CONFIRM}</Form.Label>
            <Form.Control
              type="password"
              placeholder={Register_Page.PLACEHOLDER_CONFIRM_PASSWORD}
              value={password_confirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              isInvalid={
                msgtype === "All"
                  ? password_confirm.length === 0
                  : msgtype === "Confirm_Password"
              }
            />
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
          </Form.Group>
          <Modal centered={true} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{Register_Page.FAILURE}</Modal.Title>
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
              {Register_Page.REGISTER}
            </Button>
            <Link to="/login" className="">
              {Register_Page.MESSAGE}
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
