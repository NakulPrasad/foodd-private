import { useState } from 'react';
import { Checkbox, Combobox, Input, InputBase, useCombobox } from '@mantine/core';

interface ISelectOptionProps{
  children?: React.ReactNode
}


const SelectOption=(props : ISelectOptionProps )=> {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox value="react" label="React" />
      <Checkbox value="svelte" label="Svelte" />
    </Checkbox.Group>
  );
}

export default SelectOption;