import { Paper, Text, Title } from '@mantine/core';
import classes from "./RestaurantCard.module.css"
import { IconStar } from "@tabler/icons-react";


interface CollectionCardProps{
    image: string
}

const restaurant = ({image}:CollectionCardProps) => {
    return (
        <>
        <Paper
          p="xl"
          radius="md"
          style={{ backgroundImage: `url(${image})` }}
          className={classes.card}
          >
        </Paper>
        <div className={classes.wrapper}>

        <Title order={4} className={classes.h4}>Pizza Hut</Title>
        <Text><IconStar/>Pizza Hut</Text>
        <Text className={classes.description}>Pizza Hut</Text>
        <Text className={classes.description}>Pizza Hut</Text>
        </div>
            </>
      );
}

export default restaurant