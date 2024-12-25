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


interface IFoodItem{
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
  is_veg: boolean;
  options: FoodOption[];
}

export interface FoodOption {
  name: string;
  type: string;
  values: IValue[];
}

interface IMenuCardProps {
  foodItem:IFoodItem;
  // category?: string
}

interface IValue{
  label : string;
  price : number
}

const MenuCard = (props : IMenuCardProps) => {
  const theme = useMantineTheme();
  console.log(props.foodItem)

  return (
    <Flex justify={"space-between"} className={classes.bd}>
      <Flex direction={"column"} >
        <Box>
          <Image src={IconVeg} className={classes.icon} />
        </Box>
        <Title order={3}>{props.foodItem.name}</Title>
        <Title order={4} className="description">
        &#8377;{props.foodItem.price}
        </Title>
        <Title order={5} className="rating">
          <IconStarFilled color="green" size={9}/> 4.7(27)
        </Title>
        <Text className="description">
          {props.foodItem.description}
        </Text>
      </Flex>
      <Flex direction={"column"} justify={"center"} align={"center"} className={classes.ml} >
        <Image radius={theme.radius.sm} src={props.foodItem.image_url} className={classes.img} />
        <Flex direction={"column"} className={classes.translate}>
        
        <ModalCart name={props.foodItem.name} options={props.foodItem.options} price={props.foodItem.price}/>
        <Text className="description_sm">Customisable</Text>

        </Flex>
      </Flex>
     

    </Flex>
  );
};

export default MenuCard;
