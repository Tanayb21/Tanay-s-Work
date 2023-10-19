import { useContext } from "react";
import { Typography, styled, Box } from "@mui/material";
import { FormatDate, downloadMedia } from "../../../utils/common-utils";
import { AccountContext } from "../../../context/AccountProvider";
import GetAppIcon from "@mui/icons-material/GetApp";
import { iconPDF } from "../../../assets/data";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { red } from "@mui/material/colors";



//Sender message css
const Own = styled(Box)`
background: #F0E68C;
max-width: 60%;
margin-left: auto;
padding: 5px;
width: fit-content;
display: flex;
border-radius: 10px;
word-break: break-word;
`;

//Received message css
const Wrapper = styled(Box)`
background: #FFFFFF;
max-width: 60%;
padding: 5px;
width: fit-content;
display: flex;
border-radius: 10px;
word-break: break-word;
`;
const Text = styled(Typography)`
font-size: 14px;
padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
font-size: 10px;
color: #000000;
margin-top: 6px;
word-break: keep-all;
margin-top: auto;
`;


export const Message = ({ message }) => {
    const { account } = useContext(AccountContext);

    return (
        <>
            {
                account.sub === message.senderId ?
                    <Own>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }

                    </Own>
                    :
                    <Wrapper>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Wrapper>
            }
        </>
    )
}

const ImageMessage = ({ message }) => {
    return (
        <Box style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <Box style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf" style={{ width: 50 }} />
                        <Typography style={{ fontSize: 14 }}>{message.text.split('/').pop()}</Typography>
                    </Box>
                    :
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt="img" />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon
                onClick={(e) => downloadMedia(e,message.text)}
                    style={{ marginRight: 10 }}
                    fontSize="small"
                />
                {FormatDate(message.createdAt)}</Time>
        </Box>
        
    )
}



const TextMessage = ({ message }) => {
    return (
        <>
            {message.text ? (
                 <>
                 <Text>{message.text}</Text>
                 <Time>{FormatDate(message.createdAt)}</Time>
                 </>
               )
            :(
               <>
               <div style={{ display: 'flex', alignItems: 'center' }}>
               <LocationOnIcon style={{color: '#008000',marginBottom: 20, fontSize: 25}} />
               <div>
                <Typography>Click to view the location</Typography>
                 <a href={`https://maps.google.com/?q=${message.lat},${message.lng}`} target="_blank" rel="noopener noreferrer">
              {`https://maps.google.com/?q=${message.lat},${message.lng}`|| "location"}
            </a>
            </div>
            </div>
                </> 
            )}
        </>
    )
}

export default Message;  