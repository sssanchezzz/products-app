import {
    getIsFetchingProducts,
    getIsLoading,
    getProducts,
} from 'features/products/products_slice';

import { useSelector } from 'react-redux';
import { FC } from 'react';
import {
    GridColDef,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { Box, IconButton, LinearProgress, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from 'store';

import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import styled from '@emotion/styled';
import { deleteProducts } from 'features/products/products_table/delete_products';
import Stack from '@mui/material/Stack';
import StyledDataGrid from 'components/styled_data_grid';
import Loader from 'components/loader';
export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'thumbnail',
        headerName: 'Thumbnail',
        renderCell: params =>
            params.value ? (
                <ThumbnailImg src={params.value} alt="product thumbnail" />
            ) : (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            ),
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 4,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 6,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'stock',
        headerName: 'Stock',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        flex: 2,
        headerAlign: 'right',
        align: 'right',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
];

type PaginationProps = Pick<
    TablePaginationProps,
    'page' | 'onPageChange' | 'className'
>;

const Pagination: FC<PaginationProps> = ({ page, onPageChange, className }) => {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
};
const CustomPagination: FC = (props: any) => {
    const apiRef = useGridApiContext();
    const selectedRows = apiRef.current.getSelectedRows();
    const dispatch = useAppDispatch();

    const handleDeleteClick = () => {
        const rowIds = Array.from(selectedRows.keys());

        dispatch(deleteProducts(rowIds));
    };
    return (
        <PaginationContainer>
            <SelectedRows>
                {selectedRows.size > 0 && (
                    <>
                        Selected rows: {selectedRows.size}
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </SelectedRows>
            <GridPagination ActionsComponent={Pagination} {...props} />{' '}
        </PaginationContainer>
    );
};

const ProductsTable: FC = () => {
    const products = useSelector(getProducts);
    const isLoading = useSelector(getIsLoading);
    const isFetching = useSelector(getIsFetchingProducts);

    return (
        <Box sx={{ width: '100%' }}>
            {isFetching && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}
            <GridContainer noRows={products.length === 0 && !isLoading}>
                {!isFetching && (
                    <StyledDataGrid
                        rows={products}
                        autoHeight
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 30 },
                            },
                        }}
                        slots={{
                            footer: CustomPagination,
                            noRowsOverlay: () => (
                                <Stack
                                    sx={{
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    List is empty
                                </Stack>
                            ),
                            loadingOverlay: LinearProgress,
                        }}
                        checkboxSelection
                        loading={isLoading}
                    />
                )}
            </GridContainer>
        </Box>
    );
};

const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    border-radius: 7px;
    position: sticky;
    bottom: 0;
`;

const SelectedRows = styled(Box)`
    display: flex;
    align-items: center;
    padding-left: 15px;
`;

const GridContainer = styled.div<{ noRows: boolean }>`
    height: ${props => (props.noRows ? '100vh' : '100%')};
`;

const ThumbnailImg = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;
export default ProductsTable;
