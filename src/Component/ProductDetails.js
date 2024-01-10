import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { addtocart } from "../Redux/Actions/CartAction";

function ProductDetails() {

    var data = useParams();
    let dispatch = useDispatch();
    let [product, setProduct] = useState({})
    let [count, setCount] = useState(0);
    let [rate, setRate] = useState();
    let [qu, setQu] = useState(1);
    let [cart, setCart] = useState([]);

    useEffect(() => {
        let getDetails = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/" + data.id)
                    .then(async (res) => {
                        let data = await res.json();
                        setRate(data.rating.rate)
                        setCount(data.rating.count)
                        setProduct(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }, 500);
        }

        let getCartData = () => {
            let cc = JSON.parse(localStorage.getItem('Cart'));
            if (cc == null) {
                setCart([]);
            }
            else {
                setCart(cc);
            }
        }

        getDetails();
        getCartData();

    }, setProduct)

    let getQuantityValue = (e) => {
        let v = parseInt(e.target.value);
        setQu(v)
    }

    let submitCartData = (e) => {
        e.preventDefault();

        let cartObj = {
            quantity: e.target.quantity.value,
            id: e.target.productId.value,
            title: e.target.productTitle.value,
            price: Math.round(e.target.productPrice.value),
            image: e.target.productImage.value
        }

        let pos = cart.findIndex((v, i) => v.id == product.id)
        if (pos == -1) {
            let cartData = [...cart, cartObj];
            setCart(cartData);
            localStorage.setItem('Cart', JSON.stringify(cartData));
            dispatch(addtocart());
        }
        else {
            alert("Product Already Into Cart")
        }
    }


    return (
        <Container>
            <h2 style={{ margin: "10px 0" }}>Product Details</h2>
            <div className="detail">
                <Row>
                    <Col lg={4}>
                        <img src={product.image} height={550} width={450} />
                    </Col>
                    <Col lg={8}>
                        <div className="detail-info">
                            <h2>{product.title}</h2>
                            <p style={{ color: "#bbbbbb", margin: '5px 0' }}> MRP <span style={{ textDecoration: "line-through" }}> $ {Math.round(product.price + 100)} </span>  (Inclusive of all taxes) </p>
                            <h5 style={{ color: "#ff2341", fontSize: '24px' }}> $ {Math.round(product.price)} </h5>
                            <hr />
                            <p>{product.description}</p>
                            <p>Ratting : {rate ? rate : 0} / 5</p>
                            <p>{count ? count > 0 ? <span style={{ color: "green" }}>Available</span> : <span style={{ color: "red" }}>Not Available</span> : 0}</p>

                            <form method="post" onSubmit={(e) => submitCartData(e)}>
                                <input type="hidden" value={product.id} name="productId" />
                                <input type="hidden" value={product.title} name="productTitle" />
                                <input type="hidden" value={product.price} name="productPrice" />
                                <input type="hidden" value={product.image} name="productImage" />
                                Quantity : <input type="number" name="quantity" min="1" max="5" value={qu} onChange={(e) => getQuantityValue(e)} />
                                <button className="addToCart" type="submit">ADD TO CART</button>
                            </form>

                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default ProductDetails;