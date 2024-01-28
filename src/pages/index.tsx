import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { Login } from "@/components/login/Login";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectBtn } from "@/components/sub/button/ConnectBtn";
import { Loader } from "@/components/Loader/Loader";
import { SliderBtn } from "@/components/sub/slidderBtn/SliderBtn";
import CloudBoost from "./CloudBoost";
import Navbar from "@/components/sub/navbar/Navbar";
import Wallet from "@/components/wallet/Wallet";
import AffiliateProgram from "@/components/affiliate_program/AffiliateProgram";

export default function Home() {
	const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
		useState(false);
	const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

	const { open, close } = useWeb3Modal()
	const { address } = useAccount()
	const { disconnect } = useDisconnect()


	const closeAll = () => {
		setIsNetworkSwitchHighlighted(false);
		setIsConnectHighlighted(false);
	};
	console.log("account", address);

	return (
		<>
		<Navbar/>
		<CloudBoost/>
		{
							(address) ? 
							<>
							<Wallet/>
							<AffiliateProgram/>
							</>
								:
								null
						}
	
		</>
	);
}
