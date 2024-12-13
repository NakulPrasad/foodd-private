import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import classes from "./MenuCard.module.css";
import IconVeg from "/icons/veg-icon.png";
import Pizza from "/img/pizza.jpg";
import ModalCart from "../../Modal/Modal2";

const MenuCard = () => {
  const theme = useMantineTheme();

  return (
    <Flex justify={"space-between"} className={classes.bd}>
      <Flex direction={"column"} >
        <Box>
          <Image src={IconVeg} className={classes.icon} />
        </Box>
        <Title order={3}>My Box - Non Veg</Title>
        <Title order={4} className="description">
          $319
        </Title>
        <Title order={5} className="rating">
          <IconStarFilled color="green" size={9}/> 4.7(27)
        </Title>
        <Text className="description">
          Serves 1 | 1 personal non veg pizza, 2 pc garlic bread & 1 Pepsi PET.
          For Meals, refer to the nutritional data for individual products.
        </Text>
      </Flex>
      <Flex direction={"column"} justify={"center"} align={"center"} className={classes.ml} >
        <Image radius={theme.radius.sm} src={Pizza} className={classes.img} />
        <Flex direction={"column"} className={classes.translate}>
        
        <ModalCart/>
        <Text className="description_sm">Customisable</Text>

        </Flex>
      </Flex>
     

    </Flex>
  );
};

export default MenuCard;
