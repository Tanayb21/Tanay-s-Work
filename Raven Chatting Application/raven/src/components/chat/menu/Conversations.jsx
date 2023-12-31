import { useEffect, useState, useContext } from "react";
import { Box, styled, Divider } from "@mui/material";
import { getUsers } from "../../../services/api";
import Conversation from "./Conversation";
import { AccountContext } from "../../../context/AccountProvider";

const Components = styled(Box)`
height: 81vh;
overflow: overlay;
`
const StyledDivider = styled(Divider)`
margin: 0 0 0 70px;
background: #e9edef;
opacity: .4;
`


const Conversations = ({ text }) => {

    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers();
            const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUsers', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    },[account,socket])

    return (
        <Components>
            {
                users.map(user => (
                    user.sub !== account.sub &&
                    <>
                        <Conversation user={user} />
                        <StyledDivider />
                    </>
                ))
            }
        </Components>
    )
}

export default Conversations;
