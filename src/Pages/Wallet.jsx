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
  const [requiredApprovals, setRequiredApprovals] = useState(null);
  const [isApproved, setIsApproved] = useState(null);
  const [signer, setSigner] = useState(null);
  const [transactions, setTransactions] = useState([]);
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

    const getAllTransactions = async () => {
      try {
        if (contractWallet) {
          const tx = await contractWallet.getAllTransactions();
          const transactions = [];
          for (let _txId = 0; _txId < tx.length; _txId++) {
            const txn = tx[_txId];
            if (txn.executed) {
              transactions.push(txn);
            } else {
              const approved = await checkIfApproved(_txId);
              const approvals = parseInt(await getApprovalsCount(_txId));
              transactions.push({ ...txn, approved, approvals });
            }
          }
          setTransactions(transactions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getRequiredApprovals = async () => {
      try {
        if (contractWallet) {
          const tx = await contractWallet.getRequiredApprovals();
          setRequiredApprovals(tx);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOwners();
    getBalance();
    getAllTransactions();
    getRequiredApprovals();
  }, [contractWallet, depositToWallet]);

  const checkIfApproved = async (_txId) => {
    const tx = await contractWallet.checkIfApproved(_txId);
    return tx;
  };

  const getApprovalsCount = async (_txId) => {
    const tx = await contractWallet._getApprovalCount(_txId);
    return tx;
  };

  const handleApprove = async (_txId) => {
    const tx = await contractWallet.approve(_txId);
    tx.wait();
  };

  const handleRevoke = async (_txId) => {
    const tx = await contractWallet.revoke(_txId);
    tx.wait();
  };

  const handleExecute = async (_txId) => {
    const tx = await contractWallet.execute(_txId);
    tx.wait();
  };

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
          {transactions.map((tx, _txId) => {
            const dateTime = new Date(tx.timeStamp * 1000).toLocaleString();
            return (
              <tr>
                <td>{_txId}</td>
                <td>
                  {tx.executed ? (
                    <p>Tx. Executed</p>
                  ) : (
                    <p>
                      {tx.approvals}/{requiredApprovals.toString()}
                    </p>
                  )}
                </td>
                <td>{(tx.value / 1000000000000000000).toString()} MATIC</td>
                <td>{tx.to}</td>
                <td>{dateTime}</td>
                <td>
                  {(tx.executed && <button id="Executed">Executed</button>) ||
                    (!tx.approved && (
                      <button onClick={() => handleApprove(_txId)} id="Approve">
                        Approve
                      </button>
                    ))}
                  {tx.approved && !tx.executed && (
                    <button onClick={() => handleRevoke(_txId)} id="Revoke">
                      Revoke
                    </button>
                  )}
                  {tx.approvals >= requiredApprovals && !tx.executed && (
                    <button
                      onClick={() => {
                        if (balance >= tx.value) {
                          handleExecute(_txId);
                        } else {
                          alert(
                            "Not enough balance in your Multi-Signature Wallet."
                          );
                        }
                      }}
                      id="Execute"
                    >
                      Execute
                    </button>
                  )}
                </td>
              </tr>
            );
          })}

          {/* <tr>
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
          </tr> */}
        </table>
      </div>
    </div>
  );
}

export default Wallet;
