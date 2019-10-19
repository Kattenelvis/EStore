import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'
import Error from './ErrorMessage'

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $title: String!,
        $description: String!,
        $image: String,
        $largeImage: String,
        $price: Int!
    
    ){
        createItem(    
        title: $title
        description: $description 
        image: $image
        largeImage: $largeImage
        price: $price 
    ){
        id
    }
}
`

export default class UpdateItem extends Component {
    
    state={
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    }

    handleChange = (e) =>{
        const {name, type, value} = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({[name]: val})
    }
    
    render() {
        return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} 
            variables={this.state}>
            {(createItem, {loading, error}) => (

            <Form onSubmit={async (e) =>{
                e.preventDefault();
                const res = await createItem()
                
            }}>
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                    {this.state.image && <img width="200px" src={this.state.image} alt="Upload Preview"/>}
                    <label htmlFor="title">
                        Title
                        <input type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Title" 
                        required 
                        value={this.state.title}
                        onChange={this.handleChange}></input>
                        
                    </label>
                    <label htmlFor="price">
                        Price
                        <input type="text" 
                        id="price" 
                        name="price" 
                        placeholder="Price" 
                        required 
                        value={this.state.price}
                        onChange={this.handleChange}></input>
                        
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea type="text" 
                        id="description" 
                        name="description" 
                        placeholder="Enter a Description" 
                        required 
                        value={this.state.description}
                        onChange={this.handleChange}></textarea>
                        
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
                <h2>Sell an item</h2>
            </Form>
            )}
        </Mutation>

        )
    }
}

export {UPDATE_ITEM_MUTATION} 