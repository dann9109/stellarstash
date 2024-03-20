import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const product = products.find((p) => p._id === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
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
                                    <ListGroup.Item>
                                        <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;