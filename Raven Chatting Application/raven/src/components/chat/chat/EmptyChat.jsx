import styled from "@emotion/styled";
import { Box} from "@mui/material";
//import emptyChatLogo from "../../../../public/assets";

const Component = styled(Box)`
background: #f8f9fa;
padding: 30px 0;
text-align: center;
height: 100%;
`;
const Container = styled(Box)`
padding: 0 200px;
`;
const Image = styled('img')({
    marginTop: '5%',
    marginLeft: '15%',
    height: 600,
    width: 600
});






const EmptyChat = () => {
    return (
        <Component>
            <Container>
                <Image src={process.env.PUBLIC_URL + '/assets/emptyChatLogo.png'} alt="emptychatLogo" />
            </Container>
        </Component>
    )
}

export default EmptyChat;