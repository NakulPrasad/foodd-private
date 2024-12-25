import { Flex, Image, Box, Text, Title, useMantineTheme } from "@mantine/core"
import DealOfDay from '/icons/deal-of-day.png'
import classes from './CouponCard.module.css'

interface ICouponProps{
  coupon: ICoupon
}

export interface ICoupon{
  id: string;
  title: string;
  description: string;
  discount_type: "percentage" | "flat" | "delivery" | "bogo"; // Assuming "flat" could be another type.
  discount_value: number | null;
  max_discount: number | null;
  min_order_value: number | null;
  validity: {
    start_date: string; // Format: YYYY-MM-DD
    end_date: string;   // Format: YYYY-MM-DD
  };
  applicable_on: string[]; // Categories like food, drinks, etc.
  usage_limit_per_user: number;
  is_new_user_only?: boolean
  days_of_week?: string[]
}

const CouponCard = (props : ICouponProps) => {
  const theme = useMantineTheme();
  return (
    <Flex id="couponcard" p={theme.spacing.md} className={classes.couponcard}>
        <Image src={DealOfDay} className={classes.icon} />
        <Box><Title order={4} >{props.coupon.title}</Title>
        <Text className="description_sm_bold">{props.coupon.validity.end_date}</Text>
        </Box>
    </Flex>
  )
}

export default CouponCard