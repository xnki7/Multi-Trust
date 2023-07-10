import React from "react";
import "./Wallet.css";

function Wallet() {
  return (
    <div className="Wallet">
      <div className="mainBox">
        <div className="walletAddress">
          <p className="address">
            Your Multi-Sig Wallet Address :
            0xc7815cba9d36381b095a8d8F4cA1BAa38879E1B5
          </p>
        </div>
        <div className="boxRow">
          <div className="owners">
            <p className="heading">Owners</p>
            <p className="owner">0x37cb...0ad32</p>
            <p className="owner">0x37cb...0ad32</p>
          </div>
          <div className="walletBalance">
            <p className="heading">Wallet Balance</p>
            <p className="balance">2.50 MATIC</p>
            <div className="deposit">
              <input type="number" placeholder="Enter Amount (MATIC)" />
              <button>Deposit</button>
            </div>
          </div>
          <div className="transaction">
            <p className="heading">New Transaction</p>
            <input type="text" placeholder="Receiver's wallet address" />
            <input type="number" placeholder="Amount (MATIC)" />
            <button>Submit</button>
          </div>
        </div>
      </div>
      <div className="table"></div>
    </div>
  );
}

export default Wallet;
