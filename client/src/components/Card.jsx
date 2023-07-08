import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

//add to cart
// context helps in solving prop drilling
//on clicking add to cart , shows in my cart.
//we use contex, wrap application to context
//use reducer => each card has its own add to cart button, using ractState we have to make individual unique states for each card. This is not feasible for large applications
//we want to store foodItem from db {regular, medium, large} in seprate placces
//how you set prices dynamically?
//finalPrice = formula,
//use priceRef, {reference Hook} , then using useEffect to set default values

const Card = (props) => {
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let data = useCart();
    let dispatch = useDispatchCart();

    const handleAddToCart = async () => {
        //update functionality to cart
        let food = []
        for (const item of data) {
            // agar phle se wo foodItem added hai
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food !== []) {
            //size remian same, only quantity changes
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                //size changes, quantity remain same
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.foodItem.img,

                })
                return

            }
            return
        }
        //if no item in cart, add then
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.foodItem.img,
        })



    }

    let finalPrice = parseInt(qty) * parseInt(options[size]);
    //useEffect loads after page completes loading
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            {/* {" "} */}
            <div className="container">
                <div
                    className="card mt-3"
                    style={{ width: "18rem", maxHeight: "360px" }}
                >
                    <img
                        src={props.foodItem.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "140px", objectFit: "fill" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">This is important</p>
                        {/* container is for mobile */}
                        <div className="container w-100">
                            <select
                                className="me-2 h-100 w-20 text-white bg-success rounded"
                                onChange={(e) => setQty(e.target.value)}
                            >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                className="me-2 h-100 w-25 bg-success text-white rounded"
                                ref={priceRef}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>
                                            {data}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="d-inline">₹{finalPrice}/-</div>
                        </div>
                        <hr />
                        <button className="btn btn-success" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
