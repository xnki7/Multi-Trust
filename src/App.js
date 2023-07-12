import { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import { contractFactoryAddress, contractFactoryABI } from "./constant";
import Navbar from "./components/Navbar";
import Wallet from "./Pages/Wallet";
import { Routes, Route } from "react-router-dom";
import { publicProvider } from "wagmi/providers/public";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [factoryContract, setFactoryContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function loadBcData() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const contractInstance = new ethers.Contract(
          contractFactoryAddress,
          contractFactoryABI,
          signer
        );
        console.log(contractInstance);
        setFactoryContract(contractInstance);
        setIsLoading(false);
        const address = await signer.getAddress();
        console.log("Metamask Connected to " + address);
        setAccount(address);
      } else {
        const provider = new ethers.providers.Web3Provider(publicProvider);
        const signer = provider.getSigner();
        setSigner(signer);
        const contractInstance = new ethers.Contract(
          contractFactoryAddress,
          contractFactoryABI,
          signer
        );
        console.log(contractInstance);
        setFactoryContract(contractInstance);
        setIsLoading(false);
        const address = await signer.getAddress();
        console.log("Public Provider Connected to " + address);
        setAccount(address);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    loadBcData();
  }, []);

  return (
    <div className="App">
      <Navbar setConnected={setConnected} setAccount={setAccount} />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              factoryContract={factoryContract}
              account={account}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/wallet/:walletAddress" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
