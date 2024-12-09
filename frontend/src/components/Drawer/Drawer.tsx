import {
  Anchor,
  Button,
  Divider,
  Drawer,
  Group,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URLs from "../../configs/URLs";
import { useCookie } from "../../hooks/useCookie";
import usePostData from "../../hooks/usePostData";
import { useUser } from "../../hooks/useUser";
import InputEmail from "../Inputs/inputEmail";
import InputPassword from "../Inputs/InputPassword";
import InputPasswordReq from "../Inputs/InputPasswordReq";
import classes from "./Drawer.module.css";

interface LoginResponse {
  authToken: string;
}

interface DrawerProps {
  variant: string;
  title: string;
}

const Drawerr = ({ variant, title }: DrawerProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoading, postData] = usePostData<LoginResponse>();

  const { addUser } = useUser();
  const { setItem } = useCookie();

  const toggleIsLoggedIn = () => {
    setIsNewUser((isNewUser) => !isNewUser);
  };
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validateInputOnChange: true,

    // onValuesChange: (values) => {
    //   console.log(values);
    // },

    validate: {
      email: isEmail("Invalid email"),
      name: (value) => {
        if (!isNewUser) {
          return null;
        }
        return value.length < 2 ? "Name must have at least 2 letters" : null;
      },
    },
  });

  const LoginUser = {
    title: "Login",
    subTitle: "create an account",
    message:
      "By clicking on Login, I accept the Terms & Conditions & Privacy Policy",
  };

  const RegisterUser = {
    title: "Sign Up",
    subTitle: "login to your account",
    message:
      "By creating an account, I accept the Terms & Conditions & Privacy Policy",
  };

  const handleSubmit = async () => {
    console.log("Current values:", form.values);
    if (isNewUser) {
      await handleSignUp();
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    console.log("Current values:", form.values);
    const response = await postData(URLs.loginUser, {
      email: form.values.email,
      password: form.values.password,
    });
    if (!isLoading && response) {
      // console.log(response);
      const user = {
        email: form.values.email,
      };
      setItem("authToken", response.authToken);
      addUser(user);
      console.log("User Login Successfully");
      navigate("/");
    }
  };

  const handleSignUp = async () => {
    const response = await postData(URLs.addUser, form.values);
    if (response) {
      console.log("User Registered Successfully");
      toast.success("User Registered Successfully");
    }
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} position="right" padding={"xl"}>
        <Title order={2} className="h1">
          {isNewUser ? RegisterUser.title : LoginUser.title}
        </Title>
        <Text span size="xs" >
          or{" "}
        </Text>
        <Anchor
          underline="never"
          size="xs"
          fw={800}
          c={"orange"}
          onClick={toggleIsLoggedIn}
        >
          {isNewUser ? RegisterUser.subTitle : LoginUser.subTitle}
        </Anchor>
        <Divider className={classes.my_4} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <InputEmail form={form} />
          {!isNewUser && <InputPassword form={form} />}
          {isNewUser && (
            <>
              <TextInput
                label="Name"
                withAsterisk
                placeholder="John Doe"
                key={form.key("name")}
                id={form.key("name")}
                {...form.getInputProps("name")}
              />
              <InputPasswordReq form={form} />
            </>
          )}
          <Group mt="md">
            <Button fullWidth type="submit" className={classes.bg_orange}>
              {isNewUser ? "CONTINUE" : "LOGIN"}
            </Button>

            <Text size="sm">
              {isNewUser ? RegisterUser.message : LoginUser.message}
            </Text>
          </Group>
        </form>
      </Drawer>

      <Button onClick={open} className={classes.button} variant={variant}>
        <IconUser size={16} className={classes.mx} />
        {title}
      </Button>
    </>
  );
};

export default Drawerr;
