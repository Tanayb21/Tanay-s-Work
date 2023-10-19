import React, { useContext, useState, useEffect, useRef } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { Box, styled } from "@mui/material";
import { getMessages, newMessage } from "../../../services/api";
import Footer from "./Footer";
import Message from "./Message";

const Wrapper = styled(Box)`
  background-image: url(${`https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png`});
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 20px;
`;

const Messages = ({ person, conversation, toggleMapVisibility }) => {
  const [value, setValue] = useState("");
  //const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();
  const actionsContainerRef = useRef(null);

  const { account,messages, setMessages, socket, setNewMessageFlag, newMessageFlag } =
    useContext(AccountContext);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    };
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newMessageFlag,setMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation,setMessages]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      if (data.type === "location") {
        // Handle incoming location message
        const locationLink = `https://maps.google.com/?q=${data.lat},${data.lng}`;
        const locationMessage = {
          senderId: data.senderId,
          text: (
            <a href={locationLink} target="_blank" rel="noopener noreferrer">
              Click to view location
            </a>
          ),
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, locationMessage]);
      }
    });
  }, []);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } 
      else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }

      socket.current.emit("sendMessage", message);

      await newMessage(message);

      setValue("");
      setFile("");
      setImage("");
      setNewMessageFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message, index) => (
            <Container key={index} ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
        toggleMapVisibility={toggleMapVisibility}
      />
    </Wrapper>
  );
};

export default Messages;
