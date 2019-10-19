import React, { Component } from 'react'
import fire from './../../../config/fireserver'

export class Products extends Component {
    constructor() {
        super()
    
        this.state = {
            categories: null,
            categoryKeys: null,
            categoriesList:null,
            productTitle:'',
            productPrice:'',
            productCategory:'',
            productImage:'',
            findImage:false
        }
        this.getCategoriesList();
    }

    handleInput= e => this.setState({[e.target.name]:e.target.value})
    
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

    handlePicture = e => {
        // Create a root reference
        var filename = e.target.files[0].filename;
        var storageRef = fire.storage().ref();
        let metadata = {
            contentType: 'image/jpeg'
        };
        // Create a reference to 'mountains.jpg'
        // var mountainsRef = storageRef.child('mountains.jpg');
        
        // Create a reference to 'images/mountains.jpg'
        var mountainImagesRef = storageRef.child('images/'+filename);

        var uploadTask = storageRef.child('products/'+this.state.productCategory+'/'+this.state.productTitle.replace(" ","_")+'.jpg').put(e.target.files[0], metadata);
        uploadTask.on('state_changed', (snapshot)=>{
            this.setState({
                findImage:true
            })
        })
        
        
        // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name            // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath    // false
    }

    getImage = ()=>{
        var storageRef = fire.storage().ref();
        console.log(storageRef.child('products/'+this.state.productCategory+'/'+this.state.productTitle.replace(" ","_")+'.jpg').getDownloadURL())
    }
    
    render() {
        if(this.state.findImage){
            this.getImage()
        }
        return (
            <div>
                <h1>Products</h1>
                <form>
                    <input type='text' placeholder="Product Title"
                    name="productTitle"
                     onChange={this.handleInput} />
                    <input type='text' placeholder="Product Price"
                    name="productPrice"
                    onChange={this.handleInput} />
                    <select onChange={this.handleInput} name="productCategory">
                        <option value='choose'>Choose Category</option>
                        {
                            this.state.categoriesList && this.state.categoriesList.map(category => <option value={category.categories}>{category.categories}</option>)
                        }
                    </select>
                    <label>Product Picture</label>
                    <input type='file' onChange={this.handlePicture} />
                </form>
            </div>
        )
    }
}

export default Products
