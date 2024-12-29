import { Box, Flex, Paper, Text, Title, useMantineTheme, Image } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import classes from "./RestaurantCard.module.css";
import IconStar from "../../../assets/icons/starFilled.svg?react";
import { useNavigate } from "react-router-dom";
import Pizza from "/img/pizzahut.jpg";

interface IRestaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  location: {
    address: string;
    area:string;
    city: string;
    state: string;
    zipCode: string;
  };
  rating: number;
  image: string;
  isVeg: boolean;
  priceRange: string;
  deliveryTime: string;
  contact: {
    phone: string;
    email: string;
  };
  timing: {
    open: string;
    close: string;
  };
}


interface RestrauntCardProps {
  restraunt : IRestaurant;
}

const restaurant = (props: RestrauntCardProps) => {
  // const theme = useMantineTheme();
  const navigate = useNavigate();
  const handleClick = (address : string)=>{
    // console.log(address);
    navigate("restraunt/"+address)
  }

  return (
    <Flex direction={"column"} className={classes.card} onClick={()=>handleClick(props.restraunt.name + "-" +props.restraunt.location.area)} >
      <Paper
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${Pizza})` }}
        // style={{ backgroundImage: `url(${props.restraunt.image})` }}
        className={classes.image}
      ></Paper>
      <Box className={classes.wrapper}>
        <Title order={4} className={classes.h4}>
          {props.restraunt.name}
        </Title>
        <Flex align={"center"}>
          <IconStar />
          <Flex className={classes.mt}>
            <Title order={5}>
            {props.restraunt.rating} <IconPointFilled size={9} /> {props.restraunt.deliveryTime}
            </Title>
          </Flex>
        </Flex>
        <Text className={classes.description}>{props.restraunt.cuisine.map(item=>item + " ")}</Text>
        <Text className={classes.description}>{props.restraunt.location.area}</Text>
      </Box>
    </Flex>
  );
};

export default restaurant;
