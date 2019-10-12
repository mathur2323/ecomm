import React, { Component } from 'react'
import {
    Form, FormGroup, Label, Col,
    Input, Container, Row, Button
} from 'reactstrap';
import fire from './../../config/fireserver';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess } from './../../actions';
import { ClipLoader } from 'react-spinners';

class Login extends Component {

    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            authenticating: false
        }
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({
            authenticating: true
        })
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userInfo) => {
                sessionStorage.setItem("_sessionToken", userInfo.user.uid);
                this.props.loginSuccess(sessionStorage.getItem("_sessionToken"))
                this.setState({
                    authenticating: false
                })
            })
            .catch((err) => alert(err));
    }

    render() {
        return (
            <Container>
                <Row className="my-5">
                    <Col md={{ offset: 3, size: 6 }}>
                        <h1 className="text-center mb-3">Admin Login</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email"
                                        name="email"
                                        placeholder="Email Address or Username"
                                        onChange={this.handleInput} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={this.handleInput} />
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={this.state.authenticating}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: (uid) => dispatch(loginSuccess(uid))
})

export default connect(null, mapDispatchToProps)(Login)
