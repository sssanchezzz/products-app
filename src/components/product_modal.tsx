import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ProductForm, { ProductFormProps } from 'components/product_form';
import React, { FC } from 'react';

type Props = {
    open: boolean;
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
    dialogTitle: string;
} & ProductFormProps;

const ProductModal: FC<Props> = ({ onClose, open, dialogTitle, ...props }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { borderRadius: '7px', padding: '10px 0' } }}
        >
            <DialogTitle textAlign="center">{dialogTitle}</DialogTitle>
            <DialogContent>
                <ProductForm {...props} />
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
