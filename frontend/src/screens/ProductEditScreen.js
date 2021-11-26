import React, {useState, useEffect} from 'react'
import{ useTranslation } from 'react-i18next'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen({match, history}) {
    const {t, i18n} = useTranslation()

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate ){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push(`/admin/productlist`)
        }else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

        
    }, [dispatch, product, productId, history, successUpdate ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    // Need to fix the uploading images of product ////// it was done i fixed that
        const uploadFileHandler = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()

            formData.append('image', file)
            formData.append('product_id', productId)

            setUploading(true)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const { data } = await axios.post('/api/products/upload/', formData, config)


                setImage(data)
                setUploading(false)

            } catch (error) {
                setUploading(false)
            }
    }

    return (
        <div>

            <Link to='/admin/productlist'>
                {t('goBack')}
            </Link>

            <FormContainer>
                <h2>{t("Edit product")}</h2>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="name">
                                <Form.Label>{t("productName")}</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>{t("price")}</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>{t("image")}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    readOnly
                                >
                                </Form.Control>

                                {uploading && <Loader />}

                                <Form.Group controlId="formFileMultiple"  className="mb-3">
                                    <Form.Control custom onChange={uploadFileHandler} size='sm' type="file" multiple />
                                </Form.Group>

                            </Form.Group>
                                                        
                            <Form.Group controlId="brand">
                                <Form.Label>{t("brand")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>{t("category")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="countInStock">
                                <Form.Label>{t("stock")}</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter countInStock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='py-3' controlId="description">
                                <Form.Label>{t("description")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                {t("update")} 
                            </Button>

                        </Form>
                )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
