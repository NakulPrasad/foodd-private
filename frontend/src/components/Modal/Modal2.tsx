import { Button, Flex, Image, List, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import IconNonVeg from "/icons/non-veg-icon.png";
import classes from './Modal2.module.css'

const ModalCart = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const title = (
    <Flex direction={"column"}>
      <Text>Chicken Tikka • ₹379 - ₹849</Text>
      <Title order={3}>Customise as per your taste</Title>
    </Flex>
  );
  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <Flex direction={"column"}>
          <Title order={5}>Choose your Crust</Title>

          <List withPadding icon={<Image src={IconNonVeg} className={classes.icon}/>}>
            <List.Item>Clone or download repository from GitHub</List.Item>
            <List.Item>Install dependencies with yarn</List.Item>
            <List.Item>
              To start development server run npm start command
            </List.Item>
            <List.Item>
              Run tests to make sure your changes do not break the build
            </List.Item>
            <List.Item>Submit a pull request once you are done</List.Item>
          </List>
        </Flex>
      </Modal>

      <Button onClick={open}>ADD</Button>
    </>
  );
};

export default ModalCart;
