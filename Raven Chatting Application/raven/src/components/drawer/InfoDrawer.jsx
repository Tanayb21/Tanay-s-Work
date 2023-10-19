import { Drawer, Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styled from "@emotion/styled";
import Profile from "./Profile";

const DrawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
}
const Header = styled(Box)`
background: #3C2A21;
height: 107px;
color: #FFFFFF;
display: flex;
& > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
}
`
const Component = styled(Box)`
background: #C69749;
height: 85%;
`
const Text = styled(Typography)`
text-size: 18px;
`

const InfoDrawer = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: DrawerStyle }}
            style={{ zIndex: 1500 }}>

            <Header>
                <ArrowBack onClick={() => setOpen(false)} />
                <Text>Profile</Text>
            </Header>
            <Component>
                <Profile />
            </Component>
        </Drawer>
    )
}

export default InfoDrawer;