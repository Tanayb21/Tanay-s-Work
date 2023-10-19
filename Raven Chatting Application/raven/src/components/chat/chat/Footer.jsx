import { useEffect, useState, useRef } from "react";
import { Box, Fab, InputBase, Tooltip, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from "@mui/icons-material";
import { uploadFile } from "../../../services/api";
import EmojiPicker from 'emoji-picker-react';
import { Data } from 'emoji-mart';
import { light } from "@mui/material/styles/createPalette";
import { File, ArrowsDownUp, NavigationArrow } from 'phosphor-react';
import ConversionDialog from "./ConversionDialog";
import Map from "./Map";


const Container = styled(Box)`
height: 55px;
background: #ededed;
display:flex;
width: 100%;
align-items: center;
padding: 0 15px;
& > *{
    margin: 5px;
    color: #919191;
}
`;

const Search = styled(Box)`
background-color: #FFFFFF;
border-radius: 18px;
width: calc(94% - 100px); 
`;

const InputField = styled(InputBase)`
width: 100%;
padding: 20px;
height: 20px;
padding-left: 25px;
font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
transform: rotate(40deg);
`

const ActionsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Actions = [
    {
        color: "#F0E68C",
        icon: <File size={24} />,
        y: 102,
        title: "File",
    },
    {
        color: "#F0E68C",
        icon: <NavigationArrow size={24} />,
        y: 172,
        title: "Location",
    },
    {
        color: "#F0E68C",
        icon: <ArrowsDownUp size={24} />,
        y: 102,
        title: "File Conversion",
    },
];


const Footer = ({ sendText, setValue, value, file, setFile, setImage,toggleMapVisibility }) => {

    const [showEmoji, setShowEmoji] = useState(false);
    const [openActions, setOpenActions] = useState(false);
    const [conversionDialogOpen, setConversionDialogOpen] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [convertedFileName, setConvertedFileName] = useState("");



    const handleSendConvertedFile = async (blob) => {
        // Implement the logic to send the converted file here, similar to how you did it for the file in this component
        console.log("Sending converted file:", blob);

        // After successfully sending the file, close the dialog
        setConversionDialogOpen(false);
    };



    useEffect(() => {
        console.log("showMap:", showMap);
    }, [showMap]);

    const handleCloseDialog = () => {
        setConversionDialogOpen(false);
    };

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                let response = await uploadFile(data);
                console.log("footer", response);
                setImage(response.data);
            }
        }
        getImage();
    }, [file, setFile]);


    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

    const onEmojiClick = (emojiData, e) => {
        const updatedValue = `${value}${emojiData.emoji}`;
        setValue(updatedValue);
    };

    const actionsContainerRef = useRef(null);
    const emojiPickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                actionsContainerRef.current &&
                !actionsContainerRef.current.contains(event.target)
            ) {
                setOpenActions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);






    return (
        <>
            <Box sx={{ display: showEmoji ? "inline" : "none", zIndex: 10, position: 'fixed', bottom: 81 }}>
                <EmojiPicker
                    data={Data}
                    emojiStyle="google"
                    defaultSkinTone="neutral"
                    theme={light}
                    onEmojiSelect={console.log}
                    onEmojiClick={onEmojiClick}
                    width={400}
                    height={400}
                />
            </Box>
            <Container>
                <EmojiEmotionsOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setShowEmoji((prev) => !prev);
                    }}
                />
                <ActionsContainer
                    ref={actionsContainerRef}
                    sx={{ display: openActions ? "inline-block" : "none", marginBottom: openActions ? '350px' : '0' }}>
                    {Actions.map((el, index) => (
                        <Tooltip placement="right" title={el.title}>
                            <Fab key={el.title} sx={{ backgroundColor: el.color, marginLeft: '5px', marginBottom: '20px', width: '35px', height: '30px', position: 'absolute', top: `${index * 45}px` }}
                                onClick={() => {
                                    if (el.title === "File") {
                                        const fileInput = document.getElementById("fileInput");
                                        fileInput.click();
                                    }
                                    if (el.title === "File Conversion") {
                                        setConversionDialogOpen(true);
                                        setOpenActions((prev) => !prev);
                                    }
                                    if (el.title === "Location") {
                                        toggleMapVisibility();
                                    }
                                }}
                            >
                                {el.icon}
                            </Fab>
                        </Tooltip>
                    ))}
                </ActionsContainer>
                <ClipIcon onClick={() => {
                    setOpenActions((prev) => !prev);
                    setShowEmoji(false);
                }} />
                <label htmlFor="fileInput">
                </label>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => onFileChange(e)}
                />
                <Search>
                    <InputField
                        placeholder="Type a message to your Raven"
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => sendText(e)}
                        value={value} />
                </Search>
                <Mic />
            </Container >
            {conversionDialogOpen && (
                <ConversionDialog
                    open={conversionDialogOpen}
                    onClose={() => setConversionDialogOpen(false)}
                    setFile={setFile}
                    setValue={setValue}
                    setImage={setImage}
                    file={file}
                    value={value}
                    setConversionDialogOpen={setConversionDialogOpen}
                 // Pass the callback function
                />

            )}
            
        </>
    )
}


export default Footer;