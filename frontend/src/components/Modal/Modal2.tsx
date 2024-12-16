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
            <List.Item>Korean Sweet Chilli Cheese Burst</List.Item>
            <List.Item>Cheese Burst</List.Item>
          </List>
        </Flex>
      </Modal>

      <Button onClick={open}>ADD</Button>
    </>
  );
};

export default ModalCart;
