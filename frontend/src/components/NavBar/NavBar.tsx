import { memo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import {
  Box,
  Button,
  Center,
  Group,
  HoverCard,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearAuth } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import LoginDrawer from "../Drawer/LoginDrawer";
import classes from "./NavBar.module.css";
import Logo from "/img/LOGO-bgremove.png";

const NavBar = () => {
  const { removeUser } = useUser();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { cartItems } = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeUser();
    dispatch(clearAuth());
  };

  const theme = useMantineTheme();

  return (
    <Box>
      <header className={`${classes.header} section-mx`}>
        <Group justify="space-between" h="100%">
          <Image src={Logo} className={classes.logo} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>

            <Link to="#" className={classes.link}>
              Learn
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link to="/checkout" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      {cartItems && (
                        <Text span c={theme.primaryColor}>
                          {" "}
                          {cartItems.length}{" "}
                        </Text>
                      )}
                      Cart
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Cart Empty
                      </Text>
                      <Text size="xs" c="dimmed">
                        Good food is always cooking! Go ahead, order some yummy
                        items from the menu.
                      </Text>
                    </div>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group visibleFrom="sm">
            {isAuthenticated ? (
              <Button onClick={handleLogout}>Sign Out</Button>
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
