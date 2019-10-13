import React, { Component } from 'react'
import { Form, FormGroup, Input, Button, Table, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import fire from './../../../config/fireserver';

class Categories extends Component {
    constructor() {
        super()

        this.state = {
            newCategory: '',
            categories: [],
            categoryKeys: [],
            isEditable: false,
            catKey:'',
            categoriesList:[]
        }
    }

    handleInput = e => {
        this.setState({
            newCategory: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        fire.database().ref('categories/').push().set({
            categories: this.state.newCategory
        })
            .catch((err) => console.log(err))
    }

    getCategoriesList(){
        return fire.database().ref('/categories').once('value')
            .then((snapshot) => {
                console.log(snapshot.val())
                let categoriesList = [];
                for (var category in snapshot.val()) {
                    categoriesList.push(snapshot.val()[category])
                }
                let categories = [];
                for (var cat in snapshot.val()) {
                    categories.push(cat);
                }
                this.setState({
                    categories: snapshot.val(),
                    categoryKeys: categories,
                    categoriesList
                })
            });
    }

    componentDidMount() {
        this.getCategoriesList()
    }

    toggleModal = (catKey) => {
        this.setState({
            isEditable: !this.state.isEditable,
            catKey
        })
    }

    updateCategory = (categoryKey, newValue)=>{
        this.setState({
            categoriesList:[...this.state.categoriesList]
        })
        fire.database().ref('categories/' + categoryKey).update({
            categories: newValue
        })
        .then(()=>{
            this.setState({
                isEditable:false
            },this.getCategoriesList)
        }
        )
    }

    render() {
        console.log(this.state)
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
                <ModalForm isOpen={this.state.isEditable} catKey={this.state.catKey} updateCategory={this.updateCategory} />
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
                            this.state.categoriesList.map((category, index) => <TableData name={category.categories} serial={index} key={index} categoryKey={this.state.categoryKeys[index]}
                                toggleModal={this.toggleModal}
                            />)
                        }

                    </tbody>
                </Table>


            </div>
        )
    }
}

class ModalForm extends React.Component {
    constructor() {
        super()
    
        this.state = {
            categoryName:''
        }
    }

    handleInput = e => {
        this.setState({
            categoryName:e.target.value
        })
    }
    
    render() {
        const {isOpen, catKey, updateCategory} = this.props
        return (
            <Modal isOpen={isOpen}>
                <ModalHeader>Edit Category - {catKey}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            
                            <Input type="text" name="category" placeholder="Category Name"
                            onChange={this.handleInput}
                             />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>updateCategory(catKey, this.state.categoryName)}>Edit Category</Button>{' '}
                    <Button color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

class TableData extends React.Component {
    render() {
        const { name, serial, categoryKey, toggleModal } = this.props;
        return (

            <tr>
                <th scope="row">{serial + 1}</th>
                <td>{name}</td>
                <td>
                    <Button color="primary mr-2" name={name} onClick={()=>toggleModal(categoryKey)}>Edit</Button>
                    <Button>Delete</Button>
                </td>
            </tr>
        )
    }
}

export default Categories
