import { useState, useEffect, useCallback } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";

export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
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
        const response = await axios.get(
          `https://webapp.foebezzie.com/api/v1/auth/getuser-byid/${address}`
        );
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [address]);
  useEffect(() => {
    fetchUserByUserId();
  }, [fetchUserByUserId]);

  // console.log("user", user);
  return (
    <>
      {/* <Navbar is_active={user?.is_active} />
            <CloudBoost user={user} />
            {address ? (
              <>
                <Wallet balance={user?.mining_balance} />
                <AffiliateProgram referralCode={user?.referralCode} />
              </>
            ) : null}
       */}
    </>
  );
}
