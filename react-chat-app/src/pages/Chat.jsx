import { Flex } from "@chakra-ui/react";
import Divider from "../Components/Divider";
import Footer from "../Components/Footer";
import Message from "../Components/Message";
import { useState } from "react";

const Chat = () => {
  //state for initial chat messages
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hey" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Patel" },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);

  //state for input messages
  const [inputmessage, setInputMessage] = useState("");

  ////state for input messages
  const [inputImage, setInputImage] = useState(null);

  const handleSendMessage = () => {
    //trim() method is used to remove any whitespace characters from the beginning and end of the string
    if (!inputmessage.trim().length) {
      return;
    }
    const data = inputmessage;

    // Send the data as a POST request to the server
    fetch("http://localhost:8080/inputmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputmessage: data }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error sending message to server:", error);
      });

    setMessages((old) => [
      ...old,
      { from: "me", text: data, image: inputImage },
    ]);
    setInputMessage("");
    setInputImage("");

    setTimeout(() => {
      setMessages((old) => [
        ...old,
        { from: "computer", text: data, image: inputImage },
      ]);
    }, 1000);

    console.log(messages);
  };

  const handleImageUpload = (file) => {
    setInputImage(file);
    setInputMessage(file.name);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w="80%" h="90%" flexDir="column">
        <Message messages={messages} />
        <Divider />
        <Footer
          inputmessage={inputmessage}
          setInputMessage={setInputMessage}
          setInputImage={setInputImage}
          handleSendMessage={handleSendMessage}
          handleImageUpload={handleImageUpload}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
