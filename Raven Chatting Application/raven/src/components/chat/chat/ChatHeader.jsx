import { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { MoreVert, Search } from "@mui/icons-material";
import { AccountContext } from "../../../context/AccountProvider";

// ...
const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const ImageBox = styled(Box)`
  position: relative;
`;

const Image = styled('img')({
  height: 40,
  width: 40,
  borderRadius: '50%',
  objectFit: 'cover',
});

const StatusDot = styled(Box)`
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  position: absolute;
  bottom: 2px;
  right: 2px;
  display: ${({ online }) => (online ? 'block' : 'none')};
`;


const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 24px;
    color: #000;
  }
`;


const ChatHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext);

  const isUserOnline = activeUsers?.find((user) => user.sub === person.sub);

  return (
    <Header>
      <ImageBox>
        <Image src={person.picture} alt="dp" />
        <StatusDot online={isUserOnline} />
      </ImageBox>
      <Box>
        <Name>{person.name}</Name>
        <Status>{isUserOnline ? 'Online' : 'Offline'}</Status>
      </Box>
      <RightContainer>
        <Search />
        <MoreVert />
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
