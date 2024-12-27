import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useCookie } from "../../hooks/useCookie";
import LoginDrawer from "../Drawer/LoginDrawer";
import classes from "./NavBar.module.css";
import Logo from "/img/LOGO-bgremove.png";
import { RootState } from "../../redux/store";
import { clearAuth } from "../../redux/slices/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const { getItem, removeItem } = useCookie();
  const { removeUser, user } = useUser();
  const { isAuthenticated } = useAppSelector((state : RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeUser();
    dispatch(clearAuth());
  };

  // const [cartView, setCartView] = useState(false)

  // const data = useCart()

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
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Cart
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
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

    // <header className='p-3 bg-dar'>
    //   <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start '>
    //     <span className='fs-4 mx-3 fst-italic '>Foodd</span>

    //     <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
    //       <li className='nav-item'>
    //         <Link to='/' className='nav-link active text-white'>
    //           Home
    //         </Link>
    //       </li>

    //       {user && (
    //         <>
    //           <li className='nav-item'>
    //             <Link to='/myOrder' className='nav-link text-white '>
    //               My Orders
    //             </Link>
    //           </li>
    //           <li className='nav-item'>
    //             <Link to='/partner-with-us/new' className='nav-link text-white '>
    //               Add Restraunt
    //             </Link>
    //           </li>
    //         </>
    //       )}
    //     </ul>

    //     <div className='text-end'>
    //       {!user
    //         ? (
    //           <div>
    //             <Link to='/login' className='btn btn-warning me-2'>
    //               Login
    //             </Link>
    //             <Link to='/login' className='btn btn-warning'>
    //               Sign-up
    //             </Link>
    //           </div>
    //           )
    //         : (
    //           <div>
    //             <button
    //               className='btn btn-warning me-2'
    //               onClick={() => {
    //                 setCartView(true)
    //               }}
    //             >
    //               My Cart{' '}
    //               <span className='mw-1 badge bg-danger'>{data.length}</span>
    //             </button>
    //             {cartView
    //               ? (
    //                 <Modal onClose={() => setCartView(false)}>
    //                   <Cart />
    //                 </Modal>
    //                 )
    //               : null}
    //             <Link to='' className='btn btn-danger' onClick={handleLogout}>
    //               Log Out
    //             </Link>
    //           </div>
    //           )}
    //     </div>
    //   </div>
    // </header>
  );
};

export default memo(NavBar);
