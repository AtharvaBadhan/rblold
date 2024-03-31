import React, { useEffect, useState } from "react";

const ExamTest = () => {
  const [increment, setIncrement] = useState(0);

  useEffect(() => {
    setInterval(() => {
      incrementFun();
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(increment);
  }, [increment]);

  const incrementFun = async () => {
    // console.log("incrementing");
    const inc1 = increment;
    var inc = inc1 + 1;
    console.log("-->", inc);
    await setIncrement(inc);
  };

  //   const decrementFun = () => {
  //     setIncrement(increment - 1);
  //   };

  return (
    <div className="container">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow={increment}
          aria-valuemin="0"
          aria-valuemax="100"
          //   style={{
          //     width: increment,
          //   }}
        >
          <span class="sr-only">70% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default ExamTest;
