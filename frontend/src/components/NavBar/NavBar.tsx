import { memo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  HoverCard,
  Image,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useCart } from "../../hooks/useCart";
import { clearAuth } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import LoginDrawer from "../Drawer/LoginDrawer";
import classes from "./NavBar.module.css";
import IconNonVeg from "/icons/non-veg-icon.png";
import IconVeg from "/icons/veg-icon.png";
import Logo from "/img/LOGO-bgremove.png";
import KFC from "/img/kfc.jpg";

const NavBar = () => {
  const { removeUser } = useUser();
  // const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const { cartItems } = useAppSelector((state: RootState) => state.cart);
  const { currentRestaurant, cart } = useCart();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeUser();
    dispatch(clearAuth());
  };

  const handleCartClick = () => {
    // if (!isAuthenticated) {
    //   toast.info("Please Login before continue");
    //   return;
    // }
    // navigate("/checkout");
  };

  const theme = useMantineTheme();
  const avatarUrl = user?.avatarUrl;
  console.log(avatarUrl);

  return (
    <Box>
      <header className={`${classes.header} section-mx`}>
        <Group justify="space-between" h="100%">
          <Image src={Logo} className={classes.logo} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>

            {user && (
              <>
                <Menu
                  trigger="hover"
                  openDelay={100}
                  closeDelay={400}
                  shadow="md"
                  width={300}
                >
                  <Avatar src={avatarUrl} alt="it's me" />
                  <Menu.Target>
                    <Text fw={600}>{user?.name}</Text>
                  </Menu.Target>
                  <Menu.Dropdown className={classes.dropdownMenu} fw={600}>
                    <Menu.Item>Profile</Menu.Item>
                    <Menu.Item>Orders</Menu.Item>
                    <Menu.Item>Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}

            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                {/* <Link to="/checkout" className={classes.link} onClick={handleCartClick}> */}
                <Box onClick={handleCartClick} className={classes.link}>
                  <Box component="span" mr={5}>
                    {cartItems.length > 0 && (
                      <Text span c={theme.primaryColor}>
                        {" "}
                        {cartItems.length}{" "}
                      </Text>
                    )}
                    Cart
                  </Box>
                  <IconChevronDown size={16} color={theme.colors.blue[6]} />
                </Box>
                {/* </Link> */}
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                {cartItems.length === 0 && (
                  <Box className={classes.dropdownFooter}>
                    <Text fw={500} fz="sm">
                      Cart Empty
                    </Text>
                    <Text size="xs" c="dimmed">
                      Good food is always cooking! Go ahead, order some yummy
                      items from the menu.
                    </Text>
                  </Box>
                )}
                {cartItems.length > 0 && (
                  <Box className={classes.dropdownFooter_sm}>
                    <Flex direction={"column"}>
                      <Flex justify={"space-between"} pb={theme.spacing.sm}>
                        <Image src={KFC} className={classes.img} />
                        {/* <Text>{currentRestaurant}</Text> */}
                        <Text>Pizza Hut</Text>
                      </Flex>
                      <Divider p={theme.spacing.sm} />
                      <Flex direction={"column"}>
                        {cartItems.map((item) => {
                          return (
                            <Flex key={item.id} justify={"space-between"} pb={theme.spacing.sm}>
                              <Flex>
                                <Image
                                mx={6}
                                  className={classes.icon}
                                  src={item.is_veg ? IconNonVeg : IconVeg}
                                />
                              <Text>
                                {item.name} x {item.quantity}
                              </Text>
                              </Flex>
                              <Text>{item.price}</Text>
                            </Flex>
                          );
                        })}
                      </Flex>
                      <Flex justify={"space-between"}>
                        <Text fw={700}>SubTotal : </Text>
                        <Text fw={700}>{cart.price}</Text>

                      </Flex>
                      <Button>CHECKOUT</Button>
                    </Flex>
                  </Box>
                )}
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group visibleFrom="sm">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() =>
                    (window.location.href =
                      "https://mern-dashboard-blond.vercel.app")
                  }
                >
                  Dashboard
                </Button>
                <Button onClick={handleLogout}>Sign Out</Button>
              </>
            ) : (
              <LoginDrawer variant="default" title="Sign In" />
            )}
          </Group>
        </Group>
      </header>
    </Box>
  );
};

export default memo(NavBar);
