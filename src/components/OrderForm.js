import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

// build schema for validation

const formSchema = yup.object().shape({
  name: yup.string().required("Name required").min(2, "must be 2+ characters"),
  size: yup.string().required("size required"),
  sauce: yup.string().required("choose sauce"),
  instructions: yup.string(),
  pepperoni: yup.string(),
  mushrooms: yup.string(),
  peppers: yup.string(),
  onions: yup.string(),
  jalapenos: yup.string(),
  terms: yup
    .bool()
    .oneOf([true], "no term acceptance, no pizza!")
    .required("must accept terms"),
});

const url = "https://reqres.in/api/users";

// the shape of the state that drives the form

const initialFormValues = {
  name: "",
  size: "",
  sauce: "",
  pepperoni: "",
  mushrooms: "",
  peppers: "",
  onions: "",
  jalapenos: "",
  instructions: "",
  terms: "",
};

//the shape of the validation errors object
const initialFormErrors = {
  name: "",
  size: "",
  sauce: "",
  terms: "",
};

export default function OrderForm() {
  const [orders, setOrders] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  // keeps track of whether submit button is disabled
  const [formDisabled, setFormDisabled] = useState(true);

  // state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  // validation
  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setFormDisabled(!valid);
    });
  }, [formValues]);

  const validate = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    yup
    .reach(formSchema, name)
    .validate(name === "terms" ? evt.target.checked : value)
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name]: err.formErrors,
      });
    });
  }

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    const orderData = {
      ...formValues,
      [name]: evt.target.type === "checkbox" ? evt.target.checked : [value],
    };
    console.log('data here', orderData);
    validate(evt);
    setFormValues(orderData);
  };

  const postOrder = (e) => {
    e.preventDefault();
    axios
      .post(url, formValues)
      .then((res) => {
        setOrders(res.data);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        debugger;
      });
  };

  return (
    <form onSubmit={postOrder}>
      <Link to={"/"}>
        <button> Home </button>
      </Link>

      <div className="errors">{formErrors.name}</div>

      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          value={formValues.name}
          onChange={onInputChange}
        />
      </label>

      <label htmlFor="size">
        size?
        <select id="size" name="size" onChange={onInputChange}>
        <option defaultValue="">Please choose</option>
          <option name="small" value="small">
            10"
          </option>
          <option name="medium" value="medium">
            14"
          </option>
          <option name="large" value="large">
            16"
          </option>
          <option name="xLarge" value="xLarge">
            18"
          </option>
        </select>
      </label>

      <label htmlFor="sauce">
        sauce?
        <select id="sauce" name="sauce" onChange={onInputChange}>
          <option defaultValue="">Please choose</option>
          <option name="original" value="original">
            Original
          </option>
          <option name="spicy" value="spicy">
            Spicy Marinara
          </option>
        </select>
      </label>

      <fieldset>
        <legend>Toppings</legend>

        <p>give me toppings!</p>

        <div>
          <label>
            <input type="checkbox" value="pepperoni" name="pepperoni" checked={formValues.pepperoni} onChange={onInputChange}/>
            Pepperoni
          </label>
          <label>
            <input type="checkbox" value="mushrooms" name="mushrooms" checked={formValues.mushrooms} onChange={onInputChange}/>
            Mushroom
          </label>
          <label>
            <input type="checkbox" value="peppers" name="peppers" checked={formValues.peppers} onChange={onInputChange}/>
            Peppers
          </label>
          <label>
            <input type="checkbox" value="onions" name="onions" checked={formValues.onions} onChange={onInputChange}/>
            Onions
          </label>
          <label>
            <input type="checkbox" value="jalapenos" name="jalapenos" checked={formValues.jalapenos} onChange={onInputChange}/>
            Jalapenos
          </label>
        </div>
      </fieldset>

      <label htmlFor="instructions">
        Instructions or special requests?
        <input
          id="instructions"
          type="text"
          name="instructions"
          value={formValues.instructions}
          onChange={onInputChange}
        />
      </label>

      <label htmlFor="terms">
        I agree to the terms & services
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formValues.terms}
          onChange={onInputChange}
        />
      </label>

      <pre>{JSON.stringify(orders)}</pre>

      <button disabled={formDisabled}>submit order!</button>
    </form>
  );
}
