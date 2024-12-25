import {
  Button,
  Checkbox,
  Flex,
  Modal,
  Radio,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FoodOption } from "../Cards/MenuCard/MenuCard";
import classes from "./Modal2.module.css";

interface IModalCartProps {
  name: string;
  options: FoodOption[];
  price : number;
}

const ModalCart = (props: IModalCartProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const title = (
    <Flex direction={"column"}>
      <Text>{props.name} • ₹379 - ₹849</Text>
      <Title order={3}>Customise as per your taste</Title>
    </Flex>
  );

  const [value, setValue] = useState<Record<string, string | string[] | number>>({price : props.price});
  const [total, setTotal] = useState(props.price);

  // console.log(props.options)
  const handleChange = (
    groupName: string,
    selectedValue: string | string[],
    // price : number
  ) => {
    setValue((prev) => ({
      ...prev,
      [groupName]: selectedValue,
      // [price] : prev.price
    }));
  };

  useEffect(()=>{
    console.log(value);
    
  }, [value])
  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <Flex direction={"column"} className={classes.modalBody}>
          {props.options.map((option, index) => (
            <div key={index}>
              {option.type === "checkbox" && (
                <Checkbox.Group
                  value={
                    Array.isArray(value[option.name])
                      ? (value[option.name] as string[])
                      : []
                  }
                  onChange={(selectedValues) =>
                    handleChange(option.name, selectedValues, )
                  }
                  label={`Choose ${option.name}`}
                >
                  {option.values.map((v, idx) => (
                    <Checkbox
                      key={idx}
                      value={JSON.stringify({[v.label ]: v.price})}
                      className={classes.checkbox}
                      label={
                        <Flex justify={"space-around"}>
                          <Text>{v.label}</Text>
                          <Text>{v.price}</Text>
                        </Flex>
                      }
                    />
                  ))}
                </Checkbox.Group>
              )}
              {option.type === "select" && (
                <Radio.Group
                  value={
                    typeof value[option.name] === "string"
                      ? (value[option.name] as string)
                      : ""
                  }
                  onChange={(selectedValues) =>
                    handleChange(option.name, selectedValues)
                  }
                  label={`Choose ${option.name}`}
                >
                  {option.values.map((v, idx) => (
                    <Radio
                      key={idx}
                      value={JSON.stringify({[v.label ]: v.price})}
                      label={
                        <Flex justify={"space-around"}>
                          <Text>{v.label} - </Text>
                          <Text>{v.price}</Text>
                        </Flex>
                      }
                    />
                  ))}
                </Radio.Group>
              )}
            </div>
          ))}
        </Flex>

        <Flex>
          {value.price}<Button>Add Item to cart</Button>
        </Flex>
      </Modal>

      <Button onClick={open}>ADD</Button>
    </>
  );
};

export default ModalCart;
