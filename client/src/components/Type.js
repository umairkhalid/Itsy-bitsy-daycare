import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Your Child..",
          "Our Commitment..",  
        //   "We provide quality care and education,",
        //   "positively contributing to the",
        //   "foundations of each child's",
        //   "lifelong learning",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;