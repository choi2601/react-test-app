// import { useState } from "react";

// function App() {
//   const [counter, setCounter] = useState(0);
//   const [disabled, setDisabled] = useState(false);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h3 data-testid="counter">{counter}</h3>
//         <div>
//           <button
//             data-testid="minus-button"
//             onClick={() => setCounter(counter - 1)}
//             disabled={disabled}
//           >
//             -
//           </button>
//           <button
//             data-testid="plus-button"
//             onClick={() => setCounter(counter + 1)}
//             disabled={disabled}
//           >
//             +
//           </button>
//         </div>
//         <div>
//           <button
//             data-testid="on/off-button"
//             style={{ backgroundColor: "blue" }}
//             onClick={() => setDisabled((prev) => !prev)}
//           >
//             on/off
//           </button>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import "./App.css";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import CompletePage from "./pages/CompletePage/CompletePage";
import { OrderContextProvider } from "./contexts/OrderContext";
function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{ padding: "4rem" }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompletePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
