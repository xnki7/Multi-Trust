import React from "react";
import { useState, useEffect } from "react";
import "./Homepage.css";

function Homepage({ factoryContract }) {
  const [owners, setOwners] = useState(["", ""]);
  const [myWallets, setMyWallets] = useState([]);
  const [required, setRequired] = useState(null);

  const addOwners = () => setOwners([...owners, ""]);
  const removeOwner = (index) => {
    if (owners.length > 2) {
      const tempOwners = [...owners];
      tempOwners.splice(index, 1);
      setOwners(tempOwners);
    }
  };

  const handleOwnerChange = (index, value) => {
    const tempOwners = [...owners];
    tempOwners[index] = value;
    setOwners(tempOwners);
  };

  const handleRequiredChange = (e) => {
    setRequired(e.target.value);
  };

  const getAllWallets = async () => {
    if (factoryContract) {
      const tx = await factoryContract.getMyWallets();
      setMyWallets(tx);
    }
  };

  const createWallet = async () => {
    if (required < 0 || required === "0")
      return alert("Required Approvals cannot be less than or equal to 0.");
    if (required > owners.length)
      return alert("Required Approvals should be less than number of owners");
    if (!owners.every((owner) => owner.length === 42))
      return alert("Please Remove Invalid/Empty Owner Addresses");
    try {
      const tx = await factoryContract.createWallet(owners, required);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllWallets();
  }, [factoryContract]);

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
                {owners.map((owner, index) => (
                  <div className="inB" key={index}>
                    <input
                      type="text"
                      placeholder={`Wallet Address ${index + 1}`}
                      value={owner.address}
                      onChange={(e) => handleOwnerChange(index, e.target.value)}
                      required
                    />
                    <div className="imgs">
                      <img
                        src={require("../components/plus.png")}
                        onClick={addOwners}
                      />
                      <img
                        src={require("../components/minus.png")}
                        onClick={() => removeOwner(index)}
                      />
                    </div>
                  </div>
                ))}

                <div className="inB">
                  <input
                    type="number"
                    placeholder="Required Approvals"
                    value={required}
                    onChange={handleRequiredChange}
                    required
                  />
                </div>
              </div>
              <button onClick={createWallet}>Create Wallet</button>
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
              <p className="heading">My Wallet(s)</p>
              {myWallets !== null &&
                myWallets.map((myWallet) => {
                  return (
                    <div className="addresses">
                      <p className="address">{myWallet}</p>
                      <button id="btnInteract">Interact</button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Homepage;
