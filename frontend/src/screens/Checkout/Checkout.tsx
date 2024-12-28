import { Button, Checkbox, Container, Flex, Grid } from "@mantine/core";
const Checkout = () => {
  return (
    <section id="checkout">
      <Grid style={{ height: "100vh", padding: "2rem" }}>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Container>
            <p>Choose a deliver address</p>
            <p>Multiple addresses in this location</p>
          </Container>
          <Flex align="center" justify="space-between" wrap="wrap" gap={"md"}>
            <Container>
              <p>
                <span>img</span>Home
              </p>
              <p>Mukunda Jwellers, KPHB, Hyderabad, Telengana 826001, India</p>
              <p>71 Mins</p>
              <Button color="green"> Deliver Here</Button>
            </Container>
            <Container>
              <p>
                <span>img</span>Home
              </p>
              <p>Mukunda Jwellers, KPHB, Hyderabad, Telengana 826001, India</p>
              <p>71 Mins</p>
              <Button> Deliver Here</Button>
            </Container>
            <Container>
              <p>
                <span>img</span>Home
              </p>
              <p>Mukunda Jwellers, KPHB, Hyderabad, Telengana 826001, India</p>
              <p>71 Mins</p>
              <Button> Deliver Here</Button>
            </Container>
            <Container>
              <p>
                <span>img</span>Home
              </p>
              <p>Mukunda Jwellers, KPHB, Hyderabad, Telengana 826001, India</p>
              <p>71 Mins</p>
              <Button> Deliver Here</Button>
            </Container>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Flex align={"center"} justify={"center"}>
            <span>img</span>
            <p>
              <p>The Restraunt</p>
              <p>Hyderabad</p>
            </p>
          </Flex>
          <Flex align={"center"} justify={"center"}>
            <p>
              <p>
                <span>img</span>Paneer Butter Masala
                <span>
                  <Button variant="transparent" color="gray">
                    -
                  </Button>
                  0{" "}
                  <Button variant="transparent" color="green">
                    +
                  </Button>
                </span>
                <span>100</span>
              </p>
            </p>
          </Flex>

          <Flex align={"center"} justify={"center"}>
            <Checkbox />
            <p>
              <span>Opt in for No-contact Delivery</span>
              <br />
              <span>
                Unwell, or avoiding contact? Please select no-contact delivery.
                Partner will safely place the order outside your door (not for
                COD)
              </span>
            </p>
          </Flex>
        </Grid.Col>
      </Grid>
    </section>
  );
};

export default Checkout;
