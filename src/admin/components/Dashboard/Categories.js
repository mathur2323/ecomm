import React, { Component } from 'react'
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';
import fire from './../../../config/fireserver';

class Categories extends Component {
    constructor() {
        super()

        this.state = {
            newCategory: '',
            categories:[]
        }
    }

    handleInput = e => {
        this.setState({
            newCategory: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        fire.database().ref('categories/').set({
            categories: this.state.newCategory
        })
            .catch((err) => console.log(err))
    }

    componentDidMount() {
        return fire.database().ref('/categories').once('value')
            .then((snapshot) => {
                this.setState({
                    categories:[...this.state.categories,snapshot.val()]
                })
            });
    }

    render() {
        return (
            <div>
                <h1>Categories</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="text" name="newCategory" placeholder="Category Name"
                            onChange={this.handleInput} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map((category,index) => <TableData name={category.categories} key={index} />)
                        }
                        
                    </tbody>
                </Table>

            </div>
        )
    }
}

const TableData = ({name}) => {
    return (
        <tr>
            <th scope="row">1</th>
            <td>{name}</td>
            <td>
                <Button color="primary mr-2">Edit</Button>
                <Button>Delete</Button>
            </td>
        </tr>
    )
}

export default Categories
