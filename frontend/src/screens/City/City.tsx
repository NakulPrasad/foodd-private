import { Carousel } from "@mantine/carousel";
import { Box, Button, Divider, Flex, Image, Text, Title } from "@mantine/core";
import { useRef } from "react";
import CollectionCard from "../../components/Cards/CollectionCard/CollectionCard";
import RestaurantCard from "../../components/Cards/RestaurantCard/RestaurantCard";
import classes from "./City.module.css";
import Biryani from "/img/biryani.png";
import Burger from "/img/burger.png";
import BurgerKing from "/img/burgerking.jpg";
import Chinese from "/img/chinese.png";
import CityHeader from "/img/city_header.png";
import KFC from "/img/kfc.jpg";
import PizzaHut from "/img/pizzahut.jpg";


const City = () => {
  const carouselRef = useRef(null);
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };
  return (
    <>
      <header id="banner">
        <Flex
          align={"center"}
          justify={"space-around"}
          className={classes.bg_gradient}
        >
          <Box className={classes.mw}>
            <Title order={1} textWrap="balance" className="h1" >
              Order Food <br />
              Online in Hyderabad
            </Title>
          <svg width="128px" height="10px" viewBox="0 0 78 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.25939C27 -0.240624 53.5 -0.2406 77 4.25939" stroke="#FF5200" stroke-width="1.5"></path></svg>

          </Box>

          <Image
            src={CityHeader}
            alt=""
            height={300}
            fit="cover"
            className={classes.bg_tansparent}
          />
        </Flex>
      </header>
      <section id="suggestions" className={classes.section_m}>
        <Flex>
          <Title order={2} className={classes.h2}>What's on your mind?</Title>
          {/* <Button onClick={handlePrevious}> Prev</Button>
          <Button onClick={handleNext}> Nex</Button> */}
        </Flex>

        <Carousel
          ref={carouselRef}
          withIndicators
          slideSize={{ base: "26%", md: "12%" }}
          slideGap={{ base: "sm", md: 2 }}
          align="start"
          slidesToScroll={2}
          className="px-5"
        >
          <Carousel.Slide>
            <CollectionCard image={Biryani} />
          </Carousel.Slide>
          <Carousel.Slide>
            <CollectionCard image={Burger} />
          </Carousel.Slide>
          <Carousel.Slide>
            <CollectionCard image={Chinese} />
          </Carousel.Slide>
        </Carousel>
      </section>
      <section id="topbrands" className={classes.section_m}>
        <Title order={2} className={classes.h2}>Top restaurant chains in Hyderabad</Title>
        <Carousel
          ref={carouselRef}
          withIndicators
          slideSize={"30%"}
          slideGap={"xl"}
          align="start"
          slidesToScroll={2}
          className="px-5"
        >
          <Carousel.Slide>
            <RestaurantCard image={KFC} />
          </Carousel.Slide>
          <Carousel.Slide>
            <RestaurantCard image={BurgerKing} />
          </Carousel.Slide>
          <Carousel.Slide>
            <RestaurantCard image={PizzaHut} />
          </Carousel.Slide>
          <Carousel.Slide>
            <RestaurantCard image={KFC} />
          </Carousel.Slide>
        </Carousel>
      </section>
      <Divider/>
      <section id="restraunts">
        <Title order={2}>Restaurants with online food delivery in Hyderabad</Title>
      </section>
    </>
  );
};

export default City;
