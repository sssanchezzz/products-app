import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { getProductCategories } from 'features/products/categories/categories_slice.';
import { useAppDispatch } from 'store';
import { createProduct } from 'features/products/add_product_modal/create_product_form/create_product_slice';
import { camelize } from 'utils/camelize';

const initialProduct = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    images: [],
    rating: 0,
    stock: 0,
    category: '',
};

const CreateProductForm = () => {
    const dispatch = useAppDispatch();

    const categories = useSelector(getProductCategories);

    const validationSchema = yup.object({
        title: yup.string().required('Product name is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().min(0).required('Price is required'),
        stock: yup.number().min(0).required('Stock is required'),
        category: yup
            .string()
            .required('Category is required')
            .oneOf(categories),
    });

    const formik = useFormik({
        initialValues: initialProduct,
        validationSchema: validationSchema,
        onSubmit: values => {
            dispatch(createProduct(values));
        },
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                />
                <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <TextField
                    fullWidth
                    id="stock"
                    name="stock"
                    label="Stock"
                    type="number"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{ inputProps: { min: 0 } }}
                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                />
                <FormControl fullWidth>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                        labelId="select-label"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        label="Category"
                        error={
                            formik.touched.category &&
                            Boolean(formik.errors.category)
                        }
                        onChange={formik.handleChange}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={category} value={category}>
                                {camelize(category)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ float: 'right', mt: '10px' }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

const Form = styled.form`
    margin: auto;
    & > div {
        margin: 10px 0 0 0;
    }
`;

export default CreateProductForm;
