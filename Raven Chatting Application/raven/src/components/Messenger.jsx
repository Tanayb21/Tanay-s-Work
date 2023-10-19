import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import LoginDialog from "./LoginDialog";
import ChatDialog from "./chat/ChatDialog";


const Header = styled(AppBar)`
height: 125px;
background-color: #3C2A21;
box-shahow: none;
`
const LoginHeader = styled(AppBar)`
height: 250px;
background-color: #3C2A21;
box-shahow: none;
`
const Component = styled(Box)`
height: 100vh;
background: #C69749;
`

const Messenger = () => {

    const { account } = useContext(AccountContext);

    return (
        <Component>
            {
                account ?
                    <>
                        <Header>
                            <Toolbar>

                            </Toolbar>
                        </Header>
                        
                        <ChatDialog />
                    </>

                    :
                    <>
                        <LoginHeader>
                            <Toolbar>

                            </Toolbar>
                        </LoginHeader>
                        <LoginDialog />
                    </>
            }
        </Component>
    )
}

export default Messenger;