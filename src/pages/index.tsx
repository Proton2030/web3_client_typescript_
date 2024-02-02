import { useState, useEffect, useCallback } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import CloudBoost from "./CloudBoost";
import Navbar from "@/components/sub/navbar/Navbar";
import Wallet from "@/components/wallet/Wallet";
import AffiliateProgram from "@/components/affiliate_program/AffiliateProgram";

export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] = useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const [user, setUser] = useState<any>();

  const { open, close } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  const fetchUserByUserId = useCallback(async () => {
	try {
	  if (address) {
		const response = await axios.get(`http://localhost:8989/api/v1/auth/getuser-byid/${address}`);
		setUser(response.data.data);
	  }
	} catch (error) {
	  console.error("Error fetching user:", error);
	}
}, [address]);
useEffect(() => {
    fetchUserByUserId();
  }, [fetchUserByUserId]);

  console.log("user", user);

  return (
    <>
      <Navbar />
      <CloudBoost />
      {address ? (
        <>
          <Wallet />
          <AffiliateProgram  referralCode={user?.referralCode}/>
        </>
      ) : null}
    </>
  );
}
