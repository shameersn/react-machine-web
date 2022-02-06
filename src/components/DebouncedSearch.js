import React, {useState, useEffect} from 'react';
import {Input} from '@chakra-ui/react';
import { useDebouncedCallback } from 'use-debounce';

function DebouncedSearch({triggerFetch}) {
  const [text, setText] = useState('');
  const debounced = useDebouncedCallback(
    (value) => {
      setText(value);
    },
    400
  );
  useEffect(() => {
    triggerFetch(text)
  }, [text, triggerFetch])

  return  <Input defaultValue={''} onChange={(e) => debounced(e.target.value)} maxW='400px' size='lg' placeholder='Search Employees'  focusBorderColor="teal.400" colorScheme='teal' />;
}

export default React.memo(DebouncedSearch);
