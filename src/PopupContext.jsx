import { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}
