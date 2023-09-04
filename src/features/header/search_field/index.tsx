import { InputAdornment, TextField, styled } from '@mui/material';
import { searchProducts } from 'features/header/search_field/search_products';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from '@mui/material/utils';

const SearchField: FC = () => {
    const dispatch = useAppDispatch();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        dispatch(searchProducts(e.target.value));
    };

    const delayedInputChange = debounce(handleInputChange, 500);

    return (
        <TextInput
            onChange={delayedInputChange}
            variant="standard"
            label="Search"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

const TextInput = styled(TextField)`
    width: 350px;
    padding: 10px 0;
`;

export default SearchField;
