import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import InputUnstyled, {
    InputUnstyledProps,
    inputUnstyledClasses,
} from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import { SearchOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UiContext } from 'context';
import useMediaQuery from '@mui/material/useMediaQuery';

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    600: '#0072E5',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledInputRoot = styled('div')(
    ({ theme }) => `
    width: 100%;
    height: 70%;
    display: flex;
    font-weight: 500;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 20px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    align-items: center;
    justify-content: center;

    &.${inputUnstyledClasses.focused} {
        outline: 3px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    }

    &:hover {
        background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
        border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
`,
);

const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 70%;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    flex-grow: 1;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: 20px;
    padding: 12px 12px;
    outline: 0;
`,
);

const IconButton = styled(ButtonUnstyled)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: inherit;
    cursor: pointer;
`;

const InputAdornment = styled('div')`
    margin: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const CustomInput = React.forwardRef(function CustomInput(
    props: InputUnstyledProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const { components, ...other } = props;
    return (
        <InputUnstyled
            components={{
                Root: StyledInputRoot,
                Input: StyledInputElement,
                ...components,
            }}
            {...other}
            ref={ref}
        />
    );
});

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

interface Props {
    side: boolean;
    [key: string]: any;
}

export const MyInput: React.FC<Props> = ({ side }) => {


    const { push } = useRouter();
    const [ search, setSearchTerm ] = React.useState('');
    const { toggleSideMenu } = React.useContext(UiContext);
    const matches = useMediaQuery('(min-width:600px)');

    const onSearchTerm = () => {
        if(search.trim().length === 0) return;
        if(!matches){
            toggleSideMenu();
        }
        push(`/search/${search}`);
    }

    return (
        <Box sx={{ display: { xs: `${side ? 'flex' : 'none'}`, sm: 'flex' }, '& > * + *': { ml: 1 }, width: `${side ? '100%': '50%'}` }}>
            <CustomInput
                type={'text'}
                value={search}
                placeholder="Buscar..."
                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                onChange={ (e) => setSearchTerm(e.target.value) }
                endAdornment={
                    <InputAdornment>
                        <IconButton
                            edge="end"
                        >
                            <SearchOutlined onClick={onSearchTerm} />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Box>
    );
}
