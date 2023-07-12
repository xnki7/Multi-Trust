import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { contractWalletABI } from "../constant";
import { ethers } from "ethers";
import "./Wallet.css";

function Wallet() {
  const { walletAddress } = useParams();
  const [contractWallet, setContractWallet] = useState(null);
  const [owners, setOwners] = useState([]);
  const [balance, setBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState(null);
  const [amount, setAmount] = useState(null);
  const [toAddress, setToAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const depositToWallet = async () => {
    const tx = await signer.sendTransaction({
      to: contractWallet.address,
      value: ethers.utils.parseEther(depositAmount),
    });
    await tx.wait();
  };

  const submitNewTransaction = async () => {
    const tx = await contractWallet.submit(
      toAddress,
      ethers.utils.parseEther(amount)
    );
    await tx.wait();
  };

  useEffect(() => {
    const loadContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        const contractInstance = new ethers.Contract(
          walletAddress,
          contractWalletABI,
          provider.getSigner()
        );
        setContractWallet(contractInstance);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    loadContract();
  }, [walletAddress]);

  useEffect(() => {
    const getOwners = async () => {
      try {
        if (contractWallet) {
          const tx = await contractWallet.getOwners();
          setOwners(tx);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getBalance = async () => {
      try {
        if (contractWallet) {
          const tx = await contractWallet.getBalance();
          setBalance(tx);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOwners();
    getBalance();
  }, [contractWallet, depositToWallet]);

  return (
    <div className="Wallet">
      <div className="mainBox">
        <div className="walletAddress">
          <p className="address">
            Your Multi-Sig Wallet Address : {walletAddress}
          </p>
        </div>
        <div className="boxRow">
          <div className="owners">
            <p className="heading">Owners</p>
            {owners !== null &&
              owners.map((owner) => {
                return (
                  <p className="owner">
                    {owner.slice(0, 10) + "..." + owner.slice(32, 42)}
                  </p>
                );
              })}
          </div>
          <div className="walletBalance">
            <p className="heading">Wallet Balance</p>
            <p className="balance">
              {balance !== null
                ? (balance / 1000000000000000000).toString()
                : null}{" "}
              MATIC
            </p>
            <div className="deposit">
              <input
                type="number"
                placeholder="Enter Amount (MATIC)"
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                }}
              />
              <button onClick={depositToWallet}>Deposit</button>
            </div>
          </div>
          <div className="transaction">
            <p className="heading">New Transaction</p>
            <input
              type="text"
              placeholder="Receiver's wallet address"
              value={toAddress}
              onChange={(e) => {
                setToAddress(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Amount (MATIC)"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <button onClick={submitNewTransaction}>Submit</button>
          </div>
        </div>
      </div>
      <div className="table">
        <table>
          <tr id="head">
            <th>Tx. ID</th>
            <th>Approvals</th>
            <th>Value</th>
            <th>To</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Approve">Approve</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>2 MATIC</td>
            <td>0x98765...dhu84</td>
            <td>10 June 2023</td>
            <td>
              <button id="Revoke">Revoke</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Wallet;
