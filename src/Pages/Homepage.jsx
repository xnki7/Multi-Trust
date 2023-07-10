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
                  <input type="text" placeholder="Account 1" />
                  <div className="imgs">
                    <img src={require("../components/plus.png")} />
                    <img src={require("../components/minus.png")} />
                  </div>
                </div>
                <div className="inB">
                  <input type="text" placeholder="Account 2" />
                  <div className="imgs">
                    <img src={require("../components/plus.png")} />
                    <img src={require("../components/minus.png")} />
                  </div>
                </div>
                <div className="inB">
                  <input type="text" placeholder="Account 3" />
                  <div className="imgs">
                    <img src={require("../components/plus.png")} />
                    <img src={require("../components/minus.png")} />
                  </div>
                </div>
                <div className="inB">
                  <input type="text" placeholder="Required Approvals" />
                </div>
              </div>
              <button>Create Wallet</button>
            </div>
          </div>
          <div className="boxColumn">
            <div className="interactWallet">
              <p className="heading">Interact With A Multi-Sig Wallet</p>
              <div className="interactBox">
                <input type="text" placeholder="Wallet Address" />
                <button id="btnInteract">Interact</button>
              </div>
            </div>
            <div className="recentWallets">
              <p className="heading">Recently Created Wallet(s)</p>
              <div className="addresses">
                <p className="address">0x37cBCf2...33c20ad32</p>
                <button id="btnInteract">Interact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Homepage;
