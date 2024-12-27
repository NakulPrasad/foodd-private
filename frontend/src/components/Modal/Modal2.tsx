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
import { FoodOption, IValue } from "../Cards/MenuCard/MenuCard";
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
      <Text>{props.name} • ₹{props.price} - ₹{props.price + 650}</Text>
      <Title order={3}>Customise as per your taste</Title>
    </Flex>
  );

  const [value, setValue] = useState<Record<string, IValue | IValue[] | number>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (
    groupName: string,
    selectedValue: IValue | IValue[] |number,
  ) => {
    // console.log(groupName)
    setValue((prev) => ({
      ...prev,
      [groupName]: selectedValue,

    }));
  };

  const handleAddToCart = ()=>{
    console.log(value);
  }

  useEffect(() => {
    // console.log(value);
    let calculatedTotal = props.price;
  
    Object.entries(value).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        // For arrays, parse each item and add the prices
        val.forEach((item) => {
          const price = Object.values(item)[1];
          calculatedTotal += parseInt(price, 10);
        });
      }
      else if (typeof val === "object") {
        // For strings, parse JSON and add the price
        const price = Object.values(val)[1];
        
        calculatedTotal += parseInt(price, 10);
      } 
    });
 
    setTotalPrice(calculatedTotal);
  }, [value]);

  const handleClose = ()=>{
    close();
    setTotalPrice(props.price)
  }
  
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title={title} centered>
        <Flex direction={"column"} className={classes.modalBody}>
          {props.options.map((option, index) => (
            <div key={index}>
              {option.type === "checkbox" && (
           
                <Checkbox.Group
                // value={
                //   Array.isArray(value[option.name])
                //   ? (value[option.name] as string[])
                //   : []
                // }
                
                
                  onChange={(selectedValues) =>
                    handleChange(option.name,  selectedValues.map((selected) => JSON.parse(selected)) )
                  }
                  label={`Choose ${option.name}`}
                >
                  {option.values.map((v, idx) => (
                    <Checkbox
                      key={idx}
                      value={JSON.stringify({ label: v.label, price: v.price })}
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
                required
                // value={
                //   typeof value[option.name] === "object"
                //     ? (value[option.name] as IValue).label
                //     : ""
                // }
                // defaultValue={'thin'}
                  onChange={(selectedValues) =>
                    
                    handleChange(option.name, JSON.parse(selectedValues))
                  }
                  label={`Choose ${option.name}`}
                >
                  {option.values.map((v, idx) => (
                    <Radio
                      key={idx}
                      value={JSON.stringify({ label: v.label, price: v.price })}
            
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
          {totalPrice}<Button onClick={handleAddToCart}>Add Item to cart</Button>
        </Flex>
      </Modal>

      <Button onClick={open}>ADD</Button>
    </>
  );
};

export default ModalCart;
