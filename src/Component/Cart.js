import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { deleteCart } from "../Redux/Actions/CartAction";

function Cart() {

    let [cart, setCart] = useState([]);
    let [total, setTotal] = useState(0);

    let dispatch = useDispatch();

    useEffect(() => {
        let getCartData = () => {
            let cartData = JSON.parse(localStorage.getItem('Cart'))

            if (cartData != null) {
                setCart(cartData);
                grandTotal();
            }
        }

        getCartData();
    }, setCart)

    let grandTotal = () => {
        let cartData = JSON.parse(localStorage.getItem('Cart'))

        let sum = 0;
        cartData.map((v, i) => {
            sum = sum + (v.price * v.quantity)
        })
        setTotal(sum)
    }

    let deleteCartData = (pos) => {
        console.log(pos);
        cart.splice(pos, 1)
        localStorage.setItem('Cart', JSON.stringify(cart))
        let newData = [...cart];
        setCart(newData)
        dispatch(deleteCart())
        grandTotal();
    }

    return (
        <Container>
            <h1>Cart</h1>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {cart ? cart.map((v, i) => {
                        return (
                            <tr>
                                <td>{++i}</td>
                                <td><img src={v.image} height={100} /></td>
                                <td>{v.title}</td>
                                <td> $ {v.price}</td>
                                <td>{v.quantity}</td>
                                <td> $ {v.price * v.quantity}</td>
                                <td><button className="closeBtn" onClick={(e) => deleteCartData(--i)}> <img src="https://icones.pro/wp-content/uploads/2022/05/icone-fermer-et-x-rouge.png" width={25} /> </button></td>
                            </tr>
                        )
                    }) : ''}


                    <tr>
                        <td colSpan={5} align="right">Final Total  </td>
                        <td colSpan={2}> $ {total}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default Cart;