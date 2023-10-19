import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const ImageContainer = styled(Box)`
display: flex;
justify-content: center;
`


const ProfilePicture = styled('img')({
    height: 200,
    width: 200,
    borderRadius: '50%',
    padding: '25px 0'
})
const BoxWrapper = styled(Box)`
background: #FFFFFF;
padding: 12px 30px 2px;
box-shadow: 0 1px 3px rgba(0,0,0,0.08);
& :first-child {
    font-size: 13px;
    color: #3C2A21;
    font-weight: 200;
}
& :last-child {
    margin: 14px 0;
    color: #4A4A4A;
}
`
const Description = styled(Box)`
padding: 15px 20px 28px 30px; 
& > p{
    font-size: 13px;
    color: #ffffff;
}
`


const Profile = () => {
    const { account } = useContext(AccountContext);
    return (
        <>
            <ImageContainer>
                <ProfilePicture src={account.picture} alt="dp" />
            </ImageContainer>
            <BoxWrapper>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrapper>
            <Description>
                <Typography>The Profile Name and Picture are both obtained from Google. They can't be changed from here</Typography>
            </Description>
            <BoxWrapper>
                <Typography>About</Typography>
                <Typography>Hey! I am using Raven</Typography>
            </BoxWrapper>
        </>
    )
}

export default Profile;