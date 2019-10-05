import React, { Component } from 'react'
import { Form, FormGroup, Label, Col, 
    Input, Container, Row, Button } from 'reactstrap';
import fire from './../../config/fireserver';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor() {
        super()
    
        this.state = {
             email:'',
             password:'',
             authenticating:false
        }
    }

    handleInput = e => this.setState({[e.target.name]:e.target.value})

    handleSubmit = async e => {
        e.preventDefault();
        // const result = await fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        // console.log(result);
        this.setState({
            authenticating:true
        })
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userInfo)=>{
            sessionStorage.setItem("_sessionToken",userInfo.user.uid);
            this.setState({
                authenticating:false
            })
        })
        .catch((err)=>alert(err));
    }    

    render() {
        if(!!sessionStorage.getItem("_sessionToken")){
            return <Redirect to="/dashboard" from="/" />
        }
        
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login
