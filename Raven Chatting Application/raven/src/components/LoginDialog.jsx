import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { Dialog, Box, styled, Typography, List, ListItem } from "@mui/material";
import { qrCodeImage } from "../assets/data";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import jwt_decode from "jwt-decode"
import { addUser } from "../services/api";

const Component = styled(Box)`
display: flex;
`;
const Container = styled(Box)`
padding: 56px 0 56px 56px;`
const QRcode = styled('img')({
    height: 264,
    width: 264,
    margin: '50px 0 0 50px'
})

const Title = styled(Typography)`
font-size: 30px;
font-style: bold;
margin-bottom: 25px
`
const StyledList = styled(List)`
& > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 25px; 
}
`

const dialogstyle = {
    height: '96%',
    marginTop: '12%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden'
}

const LoginDialog = () => {

    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        setAccount(decoded);
        await addUser(decoded);
    }
    const onLoginError = () => {
        console.log("Error")
    }
    return (
        <Dialog
            open={true}
            PaperProps={{ sx: dialogstyle }}
            hideBackdrop={true}
        >
            <Component>
                <Container>
                    <Title>Welocme To Raven Community!</Title>
                    <StyledList>
                        <ListItem> This is a chatting application.</ListItem>
                        <ListItem>This is solely created for education purpose only.</ListItem>
                        <ListItem> We provide various Features like :</ListItem>
                        <ListItem> Geopositioning, file converters,peer-peer transfer.</ListItem>
                    </StyledList>
                </Container>
                <Box style={{ position: 'relative' }}>
                    <QRcode src={qrCodeImage} alt="logo" />
                    <Box style={{ position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)' }}>
                        <GoogleLogin
                            onSuccess={onLoginSuccess}
                            onError={onLoginError} />
                    </Box>
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;