import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import axios from 'axios';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { addToCart } from '../slices/cartSlice';


const ProductScreen = () => {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const addtoCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    };
    
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  

    // if (!productId) {
    //     return <div>Product not found</div>;
    // }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
                    <Row>

                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating}
                                text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroupItem>Description: {product.description}</ListGroupItem>
                        <ListGroup.Item>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    { product.countInStock > 0 && (
                                        <ListGroup.Item>
                                        <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button className="btn-block" type="button" disabled={product.countInStock === 0}
                                        onClick={addtoCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>)}
            
        </>
    );
};

export default ProductScreen;