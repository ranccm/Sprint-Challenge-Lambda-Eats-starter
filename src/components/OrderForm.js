import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'


const url = "https://reqres.in/api/users"

// the shape of the state that drives the form

const initialFormValues = {
    name: '',
    size: '',
    sauce: '',


}

//the shape of the validation errors object
const initialFormErrors = {

}

// build schema for validation

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name required")
        .min(2, 'must be 2+ characters'),
    size: yup
        .string()
        .required('size required'),
    sauce: yup
        .string()
        .required('choose sauce'),
    toppings: yup
        .boolean()
        .oneOf([]),
    instructions: yup
        .string(),
    terms: yup
        .string()
})

export default function OrderForm() {
    const [orders, setOrders] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)

    // keeps track of whether submit button is disabled
    const [formDisabled, setFormDisabled] = useState(true)

    // state to keep track of validation errors
    const [formErrors, setFormErrors] = useState(initialFormErrors)

    // fetch orders from the api and then set them in state 

    const getOrders = () => {
        axios.get(url)
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                debugger
            })
    }

    //get orders from api
    useEffect(() => {
        getOrders()
    }, [])

    const postOrder = order => {
        axios.post(url, order)
            .then(res => {
                setOrders([...orders, res.data])
            })

            .catch(err => {
                debugger
            })
    }
    return (
        <form> 
            <Link to={"/"}> <button> Home </button> </Link>
            <label htmlFor="name">
                Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={onInputChange}
                />
            </label>

            <label htmlFor="size">
                size?
                <select
                    id="size"
                    name="size"
                    onChange={onInputChange}>
                    <option name="small" value="small">10"</option>
                    <option name="medium" value="medium">14"</option>
                    <option name="large" value="large">16"</option>
                    <option name="xLarge" value="xLarge">18"</option>
                </select>
            </label>

            <label htmlFor="sauce">
                sauce?
                <select
                    id="sauce"
                    name="sauce"
                    onChange={onInputChange}>
                    <option name="original" value="original">Original</option>
                    <option name="spicy" value="spicy">Spicy Marinara</option>
                </select>
            </label>

            <fieldset>
                <legend>Toppings</legend>

                <p>give me toppings!</p>

                <p>
                    <label><input type="checkbox" onChange={onCheckboxChange} checked={values.toppings.pepperoni} name="pepperoni" /> Pepperoni </label>
                    <label><input type="checkbox" onChange={onCheckboxChange} checked={values.toppings.mushrooms} name="mushroom" /> Mushroom </label>
                    <label><input type="checkbox" onChange={onCheckboxChange} checked={values.toppings.peppers} name="peppers" /> Peppers </label>
                    <label><input type="checkbox" onChange={onCheckboxChange} checked={values.toppings.onions} name="oninos" /> Onions </label>
                    <label><input type="checkbox" onChange={onCheckboxChange} checked={values.toppings.jalapenos} name="jalapenos" /> Jalapenos </label>
         </p>  
            </fieldset>

                <label htmlFor="instructions">
                    Instructions or special requests?
                <input
                        id="instructions"
                        name="instructions"
                        value={value.instructions}
                        onChange={OnInputChange}
                    />
                </label>

                <label htmlFor="terms">
                    I agree to the terms & services
                <input
                        id="terms"
                        type="checkbox"
                        name="terms"
                        checked={value.instructions}
                        onChange={inputChange}
                    />
                </label>
                <button onCLick={onsubmit} disabled={disabled}>submit order!</button>
        </form>

    )
}
