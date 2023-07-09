import React from "react";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="Homepage">
      <div className="header">
        <div className="subheader">
          <p className="heading">
            "Foster Trust, Amplify Collaboration, Create Your Multi-Signature
            Wallet Today!"
          </p>
        </div>
        <div className="boxes">
          <div className="boxRow">
            <div className="createWallet">
              <p className="heading">Create Multi-Signature Wallet</p>
              <div className="inputBoxes">
                <div className="inB">
                  <input type="text" />
                  <div className="imgs">
                    <img src={require("../components/plus.png")} />
                    <img src={require("../components/minus.png")} />
                  </div>
                </div>
                <div className="inB">
                  <input type="text" />
                  <div className="imgs">
                    <img src={require("../components/plus.png")} />
                    <img src={require("../components/minus.png")} />
                  </div>
                </div>
                <div className="inB">
                  <input type="text" />
                  <div className="imgs">
                    <img src={require("../components/plus.png")} />
                    <img src={require("../components/minus.png")} />
                  </div>
                </div>
              </div>
              <button>Create Wallet</button>
            </div>
          </div>
          <div className="boxColumn">
            <div className="interactWallet">
              <p>edkla</p>
            </div>
            <div className="recentWallets"></div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Homepage;
