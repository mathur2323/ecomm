import React, { Component } from 'react'
import SideBar from './../components/SideBar'
import {Container, Row, Col} from 'reactstrap'
import Home from '../components/Dashboard/Home'
import Products from '../components/Dashboard/Products'
import Categories from '../components/Dashboard/Categories'
import Users from '../components/Dashboard/Users'
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
class Dashboard extends Component {
    render() {
        if(!this.props.auth.uid){
            this.props.history.push("/")
        }
        return (
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                        <SideBar />
                    </Col>
                    <Col md={10} className="ml-auto">
                        <Route path="/dashboard/home" component={Home} />
                        <Route path="/dashboard/products" component={Products} />
                        <Route path="/dashboard/categories" component={Categories} />
                        <Route path="/dashboard/users" component={Users} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps, null)(Dashboard)
