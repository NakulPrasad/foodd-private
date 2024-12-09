import { Box, Flex, Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { IconPointFilled, IconStar } from "@tabler/icons-react";
import classes from "./RestaurantCard.module.css";

interface CollectionCardProps {
  image: string;
}

const restaurant = ({ image }: CollectionCardProps) => {
    const theme = useMantineTheme();
  return (
    <Flex direction={"column"}>
      <Paper
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      ></Paper>
      <Box className={classes.wrapper}>
        <Title order={4} className={classes.h4}>
          Pizza Hut
        </Title>
        <Flex align={"center"} className={classes}>
            <IconStar />
            <Flex className={classes.mt}>

            <Title order={5} className={classes.h5}>
            4.6 <IconPointFilled size={9}/> 30-35 mins
            </Title>
            </Flex>

        </Flex>
        <Text className={classes.description}>Lorem, ipsum.</Text>
        <Text className={classes.description}>Pizza Hut</Text>
      </Box>
    </Flex>
  );
};

export default restaurant;
