import { Carousel } from "@mantine/carousel";
import {
  Accordion,
  Box,
  Divider,
  Flex,
  Input,
  Title,
  useMantineTheme,
} from "@mantine/core";
import MenuCard from "../../components/Cards/MenuCard/MenuCard";
import CouponCard from "../../components/CouponCard/CouponCard";
import classes from "./Restaurant.module.css";

const Restaurant = () => {
  const theme = useMantineTheme();
  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Classic pizza with mozzarella cheese, fresh basil, and tomato sauce.",
      price: 299.0,
      category: "Pizza",
      image_url: "https://via.placeholder.com/150",
      rating: 4.5,
      is_veg: true,
    },
    {
      id: 2,
      name: "Chicken Biryani",
      description:
        "Aromatic basmati rice cooked with tender chicken pieces and spices.",
      price: 199.0,
      category: "Main Course",
      image_url: "https://via.placeholder.com/150",
      rating: 4.7,
      is_veg: false,
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description:
        "Grilled paneer cubes marinated with spices and served with chutney.",
      price: 249.0,
      category: "Starters",
      image_url: "https://via.placeholder.com/150",
      rating: 4.6,
      is_veg: true,
    },
    {
      id: 4,
      name: "Caesar Salad",
      description:
        "Crisp lettuce with parmesan cheese, croutons, and Caesar dressing.",
      price: 149.0,
      category: "Salads",
      image_url: "https://via.placeholder.com/150",
      rating: 4.3,
      is_veg: true,
    },
    {
      id: 5,
      name: "Tandoori Chicken",
      description:
        "Chicken legs marinated in yogurt and spices, cooked in a tandoor.",
      price: 349.0,
      category: "Starters",
      image_url: "https://via.placeholder.com/150",
      rating: 4.8,
      is_veg: false,
    },
    {
      id: 6,
      name: "Butter Naan",
      description: "Soft and fluffy naan bread topped with butter.",
      price: 49.0,
      category: "Breads",
      image_url: "https://via.placeholder.com/150",
      rating: 4.2,
      is_veg: true,
    },
    {
      id: 7,
      name: "Chocolate Brownie",
      description:
        "Warm chocolate brownie served with a scoop of vanilla ice cream.",
      price: 149.0,
      category: "Desserts",
      image_url: "https://via.placeholder.com/150",
      rating: 4.9,
      is_veg: true,
    },
    {
      id: 8,
      name: "Pasta Alfredo",
      description: "Creamy pasta tossed with Alfredo sauce and vegetables.",
      price: 249.0,
      category: "Pasta",
      image_url: "https://via.placeholder.com/150",
      rating: 4.4,
      is_veg: true,
    },
    {
      id: 9,
      name: "Veg Manchurian",
      description: "Crispy vegetable balls in a tangy Indo-Chinese sauce.",
      price: 189.0,
      category: "Chinese",
      image_url: "https://via.placeholder.com/150",
      rating: 4.6,
      is_veg: true,
    },
    {
      id: 10,
      name: "Mango Smoothie",
      description:
        "Refreshing mango smoothie made with fresh mango pulp and yogurt.",
      price: 99.0,
      category: "Beverages",
      image_url: "https://via.placeholder.com/150",
      rating: 4.7,
      is_veg: true,
    },
  ];

  const items = foodItems.map((item) => (
    <Accordion.Item key={item.category} value={item.category}>
      <Accordion.Control>
        {" "}
        <Title order={3}>{item.category}</Title>{" "}
      </Accordion.Control>
      <Accordion.Panel>
        <MenuCard />
      </Accordion.Panel>
      <Divider my="md" />
    </Accordion.Item>
  ));

  return (
    <>
      <main id="restraunt" className={classes.section_m}>
        <Title order={2}>Domino's Pizza</Title>
        <Box></Box>
        <Title order={3}>Deals for you</Title>
        <Carousel
          withIndicators
          slideSize={"40%"}
          slideGap={"xl"}
          align="start"
          slidesToScroll={2}
          className="px-5"
        >
          <Carousel.Slide>
            <CouponCard />
          </Carousel.Slide>
          <Carousel.Slide>
            <CouponCard />
          </Carousel.Slide>
        </Carousel>
      </main>
      <section className={classes.section_m}>
        <Flex
          content="center"
          justify={"center"}
          className={classes.menu_text_div}
        >
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#292F33"
              d="M27 23c-2.589 0-4.005-2.549-5.374-5.014C20.537 16.026 19.411 14 18 14c-1.412 0-2.537 2.026-3.626 3.986C13.004 20.451 11.588 23 9 23c-2.65 0-3.853-2.706-4.914-5.094C3.038 15.546 2.256 14 1 14a1 1 0 0 1 0-2c2.65 0 3.853 2.706 4.914 5.094C6.962 19.453 7.744 21 9 21c1.412 0 2.537-2.026 3.626-3.986C13.996 14.549 15.412 12 18 12c2.589 0 4.005 2.549 5.374 5.014C24.463 18.974 25.589 21 27 21c1.256 0 2.037-1.547 3.086-3.906C31.147 14.706 32.351 12 35 12a1 1 0 1 1 0 2c-1.256 0-2.037 1.546-3.086 3.906C30.853 20.294 29.649 23 27 23z"
            ></path>
          </svg>
          <Title order={5} className={classes.menu_text}>
            MENU
          </Title>
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#292F33"
              d="M27 23c-2.589 0-4.005-2.549-5.374-5.014C20.537 16.026 19.411 14 18 14c-1.412 0-2.537 2.026-3.626 3.986C13.004 20.451 11.588 23 9 23c-2.65 0-3.853-2.706-4.914-5.094C3.038 15.546 2.256 14 1 14a1 1 0 0 1 0-2c2.65 0 3.853 2.706 4.914 5.094C6.962 19.453 7.744 21 9 21c1.412 0 2.537-2.026 3.626-3.986C13.996 14.549 15.412 12 18 12c2.589 0 4.005 2.549 5.374 5.014C24.463 18.974 25.589 21 27 21c1.256 0 2.037-1.547 3.086-3.906C31.147 14.706 32.351 12 35 12a1 1 0 1 1 0 2c-1.256 0-2.037 1.546-3.086 3.906C30.853 20.294 29.649 23 27 23z"
            ></path>
          </svg>
        </Flex>

          <Input.Wrapper>
            <Input variant="filled" placeholder="Search for dishes" />
          </Input.Wrapper>

        <Accordion variant="filled" defaultValue="Apples">
          {items}
        </Accordion>
      </section>
    </>
  );
};

export default Restaurant;
