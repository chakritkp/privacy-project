import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    typography: {
        fontFamily: '"Lato", "Helvetica", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontWeight: 700,
            color: "#F2FCFC",
        },
        h2: {
            fontWeight: 700,
            color: "#F2FCFC",
        },
        h3: {
            fontWeight: 700,
            color: "#F2FCFC",
        },
        h4: {
            fontWeight: 500,
            color: '#F2FCFC'
        },
        h5: {
            fontWeight: 500,
            color: '#F2FCFC'
        },
        h6: {
            fontWeight: 500,
            color: '#F2FCFC'
        },
        body1: {
            fontWeight: 400,
            color: "#F2FCFC",
        },
        body2: {
            fontWeight: 400,
            color: "#F2FCFC",
        },
        caption: {
            fontWeight: 400,
            color: "#7D7D7D",
        },
        overline: {
            fontWeight: 400,
            color: "#7D7D7D",
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#5AB2FF ",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#F8C794",
            contrastText: "#FFFFFF",
        },
        error: {
            main: "#E21818",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#03C988",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#8FBAF3",
            paper: "#008DDA",
        },
        text: {
            primary: "#4A4A4A",
            secondary: "#7D7D7D",
        },
    },
});

///#BDF1F6 third color

const darkTheme = createTheme({
    typography: {
        fontFamily: '"Lato", "Helvetica", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontWeight: 700,
            color: "#F7E7DC",
        },
        h2: {
            fontWeight: 700,
            color: "#F7E7DC",
        },
        h3: {
            fontWeight: 700,
            color: "#F7E7DC",
        },
        h4: {
            fontWeight: 500,
            color: '#EEEEEE'
        },
        h5: {
            fontWeight: 500,
            color: '#EEEEEE'
        },
        h6: {
            fontWeight: 500,
            color: '#EEEEEE'
        },
        body1: {
            fontWeight: 400,
            color: "#EEEEEE",
        },

        body2: {
            fontWeight: 400,
            color: "#EEEEEE",
        },
        caption: {
            fontWeight: 400,
            color: "#FFFFFF",
        },
        overline: {
            fontWeight: 400,
            color: "#FFFFFF",
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#4477CE",
            contrastText: "#F7E7DC", // สีหลัก Teal
        },
        secondary: {
            main: "#222831",
            contrastText: "#F7E7DC", // สีรอง Sky Light
        },
        error: {
            main: "#D72323",
            contrastText: "#F7E7DC",
        },
        success: {
            main: "#4E9F3D",
            contrastText: "#F7E7DC", // สีเขียวสด
        },
        background: {
            default: "#31363F", // สีพื้นหลัง Sky Light
        },
        text: {
            primary: "#40534C",
        },
    },
});

export { lightTheme, darkTheme }