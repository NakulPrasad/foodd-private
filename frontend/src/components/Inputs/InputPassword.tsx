import { PasswordInput } from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';

interface InputPasswordProps{
  form : any
}

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

const InputPassword = ({form}:InputPasswordProps)=> {
  return (
    <PasswordInput
    id={form.key('password')}
      mx="auto"
      label="Password"
      defaultValue="secret"
      placeholder='*****'
      visibilityToggleIcon={VisibilityToggleIcon}
      withAsterisk
      key={form.key('password')}
      {...form.getInputProps('password')}
    />
  );
}

export default InputPassword;