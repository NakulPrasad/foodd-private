import { Button, Divider, Drawer, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import InputEmail from "../Inputs/inputEmail";
import InputPassword from "../Inputs/InputPassword";
import InputPasswordReq from "../Inputs/InputPasswordReq";
import classes from "./Drawer.module.css";

interface DrawerProps {
  variant: string;
  title: string;
}

const Drawerr = ({ variant, title }: DrawerProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const toggleIsLoggedIn = () => {
    setIsNewUser((isNewUser) => !isNewUser);
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
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

  return (
    <>
      <Drawer opened={opened} onClose={close} position="right" padding={"xl"}>
        <Text size="xl" fw={500}>
          {isNewUser ? RegisterUser.title : LoginUser.title}
        </Text>
        <Text span size="xs">
          or{" "}
        </Text>
        <Text span size="xs" fw={500} c={"orange"} onClick={toggleIsLoggedIn}>
          {isNewUser ? RegisterUser.subTitle : LoginUser.subTitle}
        </Text>
        <Divider className={classes.my_4} />
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <InputEmail form={form} />
          {!isNewUser && <InputPassword form={form}/>}
          {isNewUser && (
            <>
              <TextInput label="Name" withAsterisk placeholder="John Doe" key={form.key('name')} id={form.key('name')}
        {...form.getInputProps('name')} />
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
