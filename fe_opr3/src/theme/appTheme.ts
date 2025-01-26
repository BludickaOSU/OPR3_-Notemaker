import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundPosition: '0 0, 10px 10px, 10px 0, 0 10px, 0 0',
                },
            },
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(45deg, #177ddc 30%, #21cbf3 90%)',
                    position: "sticky",
                    top: 0,
                    left: 0,
                    height: '100vh',
                    overflow: 'auto',
                    width: '100px',
                    alignItems: 'center',
                    paddingTop: "20px",
                    outline: "2px solid black"
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(45deg, #BBDEFB 30%, #2196F3 90%)',
                    ":hover":{
                        outline: "2px solid black"
                    }
                },
            },
        },

    }
})