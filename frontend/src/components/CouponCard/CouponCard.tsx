import { Flex, Image, Box, Text, Title, useMantineTheme } from "@mantine/core"
import DealOfDay from '/icons/deal-of-day.png'
import classes from './CouponCard.module.css'

const CouponCard = () => {
  const theme = useMantineTheme();
  return (
    <Flex id="couponcard" p={theme.spacing.md} className={classes.couponcard}>
        <Image src={DealOfDay} className={classes.icon} />
        <Box><Title order={4} >Items at 99</Title>
        <Text className="description_sm_bold">ENDS IN 09:00</Text>
        </Box>
    </Flex>
  )
}

export default CouponCard