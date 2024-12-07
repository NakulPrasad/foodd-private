import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

const Drawerr = ()=> {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication" position='right'>
        {/* Drawer content */}
      </Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </>
  );
}

export default Drawerr;