import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const Footer = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleImageUpload,
}) => {
  return (
    <Flex w="100%" mt="4">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid blue",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        name="inputMessage" // updated name attribute
      />

      <Input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          handleImageUpload(file);
        }}
        name="inputImage"
        id="imageUploader"
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        //disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
