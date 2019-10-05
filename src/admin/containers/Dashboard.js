import React, { Component } from 'react'
import SideBar from './../components/SideBar'
import {Container, Row, Col} from 'reactstrap'
class Dashboard extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <SideBar />
                    </Col>
                    <Col md={9}>
                        {/* Routes */}
                    </Col>
                </Row>
            
            </Container>
        )
    }
}

export default Dashboard
