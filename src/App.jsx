import { useState, useEffect, useRef } from 'react'
import './App.css'

function Bill({ resetFlag, billRegex, validation, onBillHandle, onBillType, billError }) {

  let billRef = useRef();
  
  
  // This function forwards the function responsible for adding the user typed bill amount to state from parent
  const returnBillHandle = (e) => {
    onBillHandle(e)
  }

  // This function forwards the function responsible for restricting the user from typing letters in bill input from parent
  const restrictBillInput = (e) => {
    onBillType(e);
  }

  const validateBillInput = (e) => {
    validation(e);
  }

  const myRef = useRef(false);

  useEffect(() => {
    if (myRef.current) billRef.current.value = '';

    myRef.current = true;
  }, [resetFlag])

  

  return (  

        <div className="bill_label">
          <div className="label_container">
            <label htmlFor="user_bill">Bill</label>
            <p className="error_message message_bill"></p>
          </div>
          <div className="user_bill_input">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17" viewBox="0 0 13 17"><path fill="#9EBBBD" d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z"/></svg>
          <input type="text" name="user_bill" id="user_bill" placeholder="0" ref={billRef} onKeyPress={restrictBillInput} onChange={(e) => {
            validateBillInput(e);
            returnBillHandle(e);
          }} /> 
          </div>
        </div>
  )
}

function TipMenu({ onTipHandle, onTipChange, onTipClick }) {
  const [tipAmount, setTipAmount] = useState([
    {
      amount: '5%',
      id: 0,
      ref: useRef(),
    },
    {
      amount: '10%',
      id: 1,
      ref: useRef(),
    },
    {
      amount: '15%',
      id: 2,
      ref: useRef(),
    },
    {
      amount: '25%',
      id: 3,
      ref: useRef(),
    },
    {
      amount: '50%',
      id: 4,
      ref: useRef(),
    }
  ]);

  // This function forwards the function that restricts inputs to only numbers in the custom input
  const handleKeyPress = (e) => {
    onTipHandle(e);
  }

  // This function forwards the function that sets the value that the user clicks from the tip menu
  const handleCustomClick = (e) => {
    onTipClick(e);
  }

  // This function forwards the function that sets the value that the user enters from the custom input
  const handleCustomChange = (e) => {
    onTipChange(e);
  }

  const highlightButton = (e) => {
    e.target.style.backgroundColor = 'hsla(172, 67%, 45%)';
    e.target.style.boxShadow = 'none';
  }
  
  return (
    <div className="tip_portion">
          <h1>Select Tip %</h1>
          <div className="tip_buttons">
            {tipAmount.map((item) => <button className="tip_button" ref={item.ref} key={item.id} onClick={handleCustomClick}>{item.amount}</button>)}
            <input className="tip_button button_custom" type="text" placeholder="Custom" onKeyPress={handleKeyPress} onChange={handleCustomChange} />
          </div>
        </div>
  )
}

function PeopleAmount({ resetFlag, numVal, onPeopleHandle, validation, peopleError }) {
  const numPeopleRef = useRef();

  const setNumOfPeople = (e) => {
    numVal(e);
  }

  const handleCustomChange = (e) => {
    onPeopleHandle(e);
  }

  const validatePeopleInput = (e) => {
    validation(e);
  }

  const myRef = useRef(false);
  
  useEffect(() => {
    if (myRef.current) numPeopleRef.current.value = '';

    myRef.current = true;
  }, [resetFlag])

  return (
        <div className="amount_of_people_portion">
          <div className="people_label_container">
            <label htmlFor="num_people_input">Number of People</label>
            <p className="error_message num_people_error_message"></p>
          </div>
          <div className="num_people_input_container">
            <svg className="num_people_svg" xmlns="http://www.w3.org/2000/svg" width="13" height="16"><path fill="#9EBBBD" d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z"/></svg>
            <input type="text" name="num_people_input" id="num_people_input" placeholder="0" ref={numPeopleRef} onKeyPress={handleCustomChange} onChange={(e) => {
              validatePeopleInput(e);
              setNumOfPeople(e);
            }} />
          </div>
        </div>
  )
}

function Results({ reset, billAmount, tip, people, billError, tipError, peopleError }) {

  let [amountResults, setAmountResults] = useState({
    tipAmount: `$0.00`,
    ref: useRef(),
  })

  let [totalResults, setTotalResults] = useState({
    total: `$0.00`,
    ref: useRef(),
  });

  let initialAmountRender = useRef(false);
  let tipCalc = () => {
    if (tip !== 0 && billAmount !== 0 && people !== 0 ) {
      return ((billAmount / people) * Number(tip) - 0.01).toFixed(2);
    } else {
      return '0.00';
    }
  }

  let totalCalc = () => {
    if (billAmount !== 0 && tip !== 0 && people !== 0) {
      let splitBill = ((billAmount / people) + 0.01).toFixed(2);
      let splitBillTip = ((billAmount / people) * Number(tip) - 0.01).toFixed(2);
      return (Number(splitBill) + Number(splitBillTip)).toFixed(2);
    } else {
      return '0.00';
    } 
  }

  useEffect(() => {
    if (initialAmountRender.current) {
      setTotalResults((prev) => ({
        ...prev,
        total: `$${totalCalc()}`
      }))
    }
  }, [billAmount, tip, people])
  
  useEffect(() => {
    if (initialAmountRender.current) {
     setAmountResults((prev) => ({
      ...prev,
      tipAmount: `$${tipCalc()}`
     }))
    }

    initialAmountRender.current = true;
  }, [billAmount, tip, people])

  const resetEverything = () => {
    reset();
    setAmountResults((prev) => ({
      ...prev,
      tipAmount: `$0.00`,
    }))
    setTotalResults((prev) => ({
      ...prev,
      tipAmount: `$0.00`,
    }))
  }


  return (
    <div className="results_portion">
          <div className="amount_container">
            <div className="amount_header">
              <p className="upper_header">Tip Amount</p>
              <p className="lower_header">/ person</p>
            </div>
            <p ref={amountResults.ref} className="tip_amount amount_display">{amountResults.tipAmount}</p>
          </div>
          <div className="amount_container">
            <div className="amount_header">
              <p className="upper_header">Total</p>
              <p className="lower_header">/ person</p>
            </div>
            <p ref={totalResults.ref} className="tip_amount total_display">{totalResults.total}</p>
          </div>
          <button className="reset_button" onClick={resetEverything}>Reset</button>
        </div>
  )
}


function App() {
  // I created an object of regexes to avoid constant variable assignment
  const regexes = {
    numOnly: /[0-9]+/,
    numPeriodOnly: /[0-9]+|\./,
    bill_regex: /^[0-9]$|^[0-9]{1,4}$|^[0-9]{1,3}\.[0-9]?[0-9]$|^[1-4][0-9]{3}\.[0-9]?[0-9]/,
    num_people_regex: /^[1-9]$|^[1-4][0-9]$/,
    percent_regex: /(?=(%)).*/,
    custom_tip_regex: /^[0-9]$|^[1][0-9]$|^[2][0-5]$/,
  }

  /* This state object is for the bill amount that is entered by the user via the input at the top
  it will be used at the end to calculate results for the results portion */
  const [billAmount, setBillAmount] = useState({
    amount: 0,
    tip: 0,
    numPeople: 0, 
  });

  // This state object holds all of the error flags for every input except the buttons

  const [error, setError] = useState({
    billError: true,
    numPeopleError: true,
    customTipError: true,
  });

  // This state is a flag for the reset button
  const [resetFlag, setResetFlag] = useState(false);

  
  /* This function is for grabbing the bill's input from the top of the page and changes
  it to a number for further operation later */
  const returnBillAmount = (amount) => {
    setBillAmount((prev) => ({
      ...prev,
      amount: Number(amount.target.value),
    }));
  }

  /* This function is for grabbing the custom input's value upon changing from the input,
  it is sent to the TipMenu component  */
  const returnTipAmountChange = (amount) => {
    // setPickedTip(Number(amount.target.value));
    if (amount.target.value === '') {
      setBillAmount((prev) => ({
        ...prev,
        tip: 0,
      }))
    } else {
      setBillAmount((prev) => ({
        ...prev,
        tip: `.${amount.target.value}`,
      }))
    }  
  }

  /* This function is for grabbing the tip buttons inputs upon clicking them,
  it grabs the input and removes the percent sign from the end of it, and finally,
  it changes it to a number for operations later */
  const returnTipAmountClick = (amount) => {
    setBillAmount((prev) => ({
      ...prev,
      tip: `.${amount.target.textContent.replace(regexes.percent_regex, '')}`,
    }))
    // setPickedTip(Number(amount.target.textContent.replace(regexes.percent_regex, '')));
  }

  // This function is for grabbing the amount of people that the user inputs 
  const returnNumOfPeople = (num) => {
    setBillAmount((prev) => ({
      ...prev,
      numPeople: Number(num.target.value),
    }))
  }
  
  // Validation function for the bill input that checks the input against the regex while also checking for the error state
  const validateBill = (e) => {
    if (e.target.value === '') {
      e.target.classList.remove('success');
      e.target.classList.add('error');
      e.target.parentElement.previousSibling.lastChild.textContent = "Can't be zero";
      e.target.parentElement.previousSibling.lastChild.classList.add('error');
      setError((prev => ({
        ...prev,
        billError: true,
      })));
    } else if (!regexes.bill_regex.test(e.target.value) && error.billError || !regexes.bill_regex.test(e.target.value) && !error.billError) {
      e.target.classList.remove('success');
      e.target.classList.add('error');
      e.target.parentElement.previousSibling.lastChild.textContent = "Please enter correct dollar amount";
      e.target.parentElement.previousSibling.lastChild.classList.add('error');
      setError((prev) => ({
        ...prev,
        billError: true,
      }))
    } else if (regexes.bill_regex.test(e.target.value) && error.billError || regexes.bill_regex.test(e.target.value) && !error.billError) {
      e.target.classList.remove('error');
      e.target.classList.add('success');
      e.target.parentElement.previousSibling.lastChild.classList.remove('error');
      e.target.parentElement.previousSibling.lastChild.textContent = "";
      setError((prev) => ({
        ...prev,
        billError: false,
      }))
    }
    }

  // Validation function for the people input that checks against the regex while checking for error state
  const validatePeople = (e) => {
    if (e.target.value === '') {
      e.target.classList.remove('success');
      e.target.classList.add('error');
      e.target.parentElement.previousSibling.lastChild.textContent = "Can't be zero";
      e.target.parentElement.previousSibling.lastChild.classList.add('error');
      setError((prev) => ({
        ...prev,
        numPeopleError: true,
      }))
    } else if (!regexes.num_people_regex.test(e.target.value) && error.numPeopleError || !regexes.num_people_regex.test(e.target.value) && !error.numPeopleError) {
      e.target.classList.remove('success');
      e.target.classList.add('error');
      e.target.parentElement.previousSibling.lastChild.textContent = "Enter amount between 1 and 49";
      e.target.parentElement.previousSibling.lastChild.classList.add('error');
      setError((prev) => ({
        ...prev,
        numPeopleError: true,
      }))
    } else if (regexes.num_people_regex.test(e.target.value) && error.numPeopleError || regexes.num_people_regex.test(e.target.value) && !error.numPeopleError) {
      e.target.classList.remove('error');
      e.target.classList.add('success');
      e.target.parentElement.previousSibling.lastChild.classList.remove('error');
      e.target.parentElement.previousSibling.lastChild.textContent = "";
      setError((prev) => ({
        ...prev,
        numPeopleError: false,
      }))
    }
  }

  /* This helper function is designed to stop the custom tip input from receiving any input from anything
  that isn't a number...can be used in any input EXCEPT the bill input as that requires a different regex */
  const handleCustomChange = (e) => {
    !regexes.numOnly.test(e.key) ? e.preventDefault() : null;
  }

  /* This function is specifically for the bill input, it restricts the user from entering letters and only
  allows numbers and periods. It will require a further check to see if it's validated by requiring a specific
  amount of numbers before the period and a specific amount of numbers after */
  const handleBillChange = (e) => {
    !regexes.numPeriodOnly.test(e.key) ? e.preventDefault() : null;
  }


  /* This ref & useEffect are used to switch the tipError to false as it has no onChange method to do so like the
  Bill and People input do. This ensures that the user can't progress through the application without all of the 
  necessary data for the calculations being present */
  const myRef = useRef(false);

  useEffect(() => {
    if (myRef.current) {
      setError((prev) => ({
        ...prev,
        customTipError: false,
      }))
      return;
    }

    myRef.current = true;
  }, [billAmount.tip])

  // This function is responsible for resetting all of the content on the page as well as the saved states that are available
  const resetStates = () => {
    setBillAmount(() => ({
      amount: 0,
      tip: 0,
      numPeople: 0,
    }))

    setError(() => ({
      billError: true,
      numPeopleError: true,
      customTipError: true,
    }))

    setResetFlag(!resetFlag)
  } 

  return (
    <div className="container">
      <svg xmlns="http://www.w3.org/2000/svg" width="87" height="54"><path fill="#3D6666" d="M6.72 17.472c.944 0 1.792-.12 2.544-.36s1.392-.584 1.92-1.032a4.476 4.476 0 001.212-1.62c.28-.632.42-1.34.42-2.124v-.288c0-1.472-.464-2.584-1.392-3.336-.928-.752-2.272-1.288-4.032-1.608a14.615 14.615 0 01-1.74-.408c-.456-.144-.824-.308-1.104-.492-.28-.184-.476-.392-.588-.624a1.771 1.771 0 01-.168-.78c0-.56.232-1.004.696-1.332.464-.328 1.096-.492 1.896-.492.944 0 1.676.248 2.196.744.52.496.78 1.08.78 1.752v.576h3.168v-.864a5 5 0 00-.396-1.968 4.762 4.762 0 00-1.176-1.656C10.436 1.08 9.792.7 9.024.42 8.256.14 7.376 0 6.384 0c-.88 0-1.676.12-2.388.36s-1.32.576-1.824 1.008c-.504.432-.896.94-1.176 1.524-.28.584-.42 1.22-.42 1.908v.144c0 .832.144 1.536.432 2.112a3.978 3.978 0 001.212 1.44c.52.384 1.132.692 1.836.924.704.232 1.48.42 2.328.564.64.112 1.168.248 1.584.408.416.16.744.34.984.54s.408.424.504.672c.096.248.144.508.144.78 0 .576-.232 1.072-.696 1.488-.464.416-1.176.624-2.136.624-1.232 0-2.14-.3-2.724-.9-.584-.6-.876-1.404-.876-2.412v-.576H0v.72c0 .88.144 1.692.432 2.436a5.47 5.47 0 001.272 1.944c.56.552 1.26.984 2.1 1.296.84.312 1.812.468 2.916.468zm22-.336V10.8h3.408c.864 0 1.616-.144 2.256-.432a4.707 4.707 0 001.596-1.14 4.833 4.833 0 00.96-1.608c.216-.6.324-1.212.324-1.836v-.576c0-.608-.108-1.204-.324-1.788a4.625 4.625 0 00-.96-1.56A4.737 4.737 0 0034.384.756c-.64-.28-1.392-.42-2.256-.42h-6.576v16.8h3.168zm3.096-9.36H28.72V3.36h3.096c.704 0 1.26.192 1.668.576.408.384.612.88.612 1.488v.288c0 .608-.204 1.104-.612 1.488-.408.384-.964.576-1.668.576zm29.464 9.36v-3.024h-7.632V.336H50.48v16.8h10.8zm24.88 0v-3.024h-4.032V3.36h4.032V.336H74.928V3.36h4.032v10.752h-4.032v3.024H86.16zm-78.096 36V39.36h4.464v-3.024H.432v3.024h4.464v13.776h3.168zm24.688 0V39.36h4.464v-3.024H25.12v3.024h4.464v13.776h3.168zm28.624 0v-3.024h-7.728v-3.888H60.8V43.2h-7.152v-3.84h7.44v-3.024H50.48v16.8h10.896zm16.744 0V46.8h3.648c.464 0 .796.12.996.36.2.24.3.552.3.936v5.04h3.168v-5.808c0-.56-.164-1.024-.492-1.392-.328-.368-.772-.584-1.332-.648v-.432c.768-.32 1.336-.78 1.704-1.38a3.63 3.63 0 00.552-1.932v-.576c0-.64-.116-1.24-.348-1.8a4.332 4.332 0 00-1.008-1.476c-.44-.424-.988-.756-1.644-.996-.656-.24-1.416-.36-2.28-.36h-6.432v16.8h3.168zm3.024-9.36H78.12V39.36h3.024c.768 0 1.352.204 1.752.612.4.408.6.892.6 1.452v.288c0 .656-.2 1.164-.6 1.524-.4.36-.984.54-1.752.54z"/></svg>
      <div className="calculator_container">
        {/* upper portion begins */}
        <Bill resetFlag={resetFlag} billError={error.billError} validation={(e) => validateBill(e)} onBillType={(e) => handleBillChange(e)} onBillHandle={(e) => returnBillAmount(e)}  />
        {/* upper portion ends */}
        {/* tip portion begins */}
        <TipMenu onTipHandle={(e) => handleCustomChange(e)} onTipClick={(e) => returnTipAmountClick(e)} onTipChange={(e) => returnTipAmountChange(e)} />
        {/* tip portion ends */}
        {/* number of people portion begins */}
        <PeopleAmount resetFlag={resetFlag} peopleError={error.numPeopleError} validation={(e) => validatePeople(e)} onPeopleHandle={(e) => handleBillChange(e)}  numVal={(e) => returnNumOfPeople(e)} />
        {/* number of people portion ends */}
        {/* results portion begins */}
        <Results reset={resetStates} billError={error.billError} tipError={error.customTipError} peopleError={error.numPeopleError} billAmount={billAmount.amount} tip={billAmount.tip} people={billAmount.numPeople} />
        {/* results portion ends */}
      </div>
    
    </div>
  )
}

export default App

/* For the results calculation, you will take the bill and divide it by the num of people.
Next, multiply that value by the tip percentage. That will be the tip amount.

Next, take the tip amount and add it to the amount that you got when you divided the bill and numPeople*/
