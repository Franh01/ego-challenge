import * as React from "react";

const CarsContext = React.createContext({ cars: [] });
export const useCarsContext = () => React.useContext(CarsContext);
const ContextProvider = ({ children, cars }) => {
  const [data, setData] = React.useState({ cars: [] });

  return (
    <CarsContext.Provider value={{ ...data, cars }}>
      {children}
    </CarsContext.Provider>
  );
};
export default ContextProvider;
