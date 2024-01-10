import { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";


function Product() {

    let [product, setProduct] = useState([]);
    let [category, setCategory] = useState([]);

    useEffect(() => {
        let getProductList = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products")
                    .then(async (res) => {
                        let pro = await res.json();
                        setProduct(pro);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }, 500)
        }

        let getCategoryList = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/categories")
                    .then(async (res) => {
                        let cat = await res.json();
                        setCategory(cat);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }, 500)
        }

        getProductList();
        getCategoryList();
    }, setProduct)

    let getCategory = (cat) => {
        let url = '';
        cat == 'All' ? url = "https://fakestoreapi.com/products" : url = "https://fakestoreapi.com/products/category/" + cat;
        fetch(url)
            .then(async (res) => {
                let cat = await res.json();
                setProduct(cat);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <Container>
            <h2 style={{ margin: "10px 0" }}>Product</h2>

            <div className="category">
                <button onClick={(e) => getCategory('All')}>All</button>
                {category.map((v, i) => {
                    return (
                        <button onClick={(cat) => getCategory(v)}>{v}</button>
                    )
                })}
            </div>

            <div className="product">
                {product.map((v, i) => {
                    return (
                        <div className="product-item">
                            <img src={v.image} width='100%' height={250} />
                            <div className="product-content">
                                <h5>{v.title}</h5>
                                <p> $ {Math.round(v.price)} / <span style={{ textDecoration: "line-through" }}> $ { Math.round (v.price + 100)} </span> </p>
                                <Link to={"/details/" + v.id} className="viewBtn">View</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default Product;