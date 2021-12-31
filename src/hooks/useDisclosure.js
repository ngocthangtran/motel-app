import { useState } from 'react';

function useDisclosure(props) {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => setIsVisible(false);
  const onOpen = () => setIsVisible(true);
  return [isVisible, onOpen, onClose];
}

export default useDisclosure;
