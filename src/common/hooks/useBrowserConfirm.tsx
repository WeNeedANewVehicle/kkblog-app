import React, { useCallback } from 'react'

function useBrowserConfirm() {
  const openConfirm = useCallback((
    message: string, 
    callback: (args?: unknown) => void
  ) => {
    const isConfirmed = confirm(message);

    if (isConfirmed) {
      callback()
    }
  }, []); 

  return openConfirm;
}

export default useBrowserConfirm