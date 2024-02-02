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

export default function Navbar() {
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
	// console.log("account", address);

	return (
		<>
		<header>
				<div
					className={`mb-5 ${styles.backdrop}`}
					style={{
						opacity:
							isConnectHighlighted || isNetworkSwitchHighlighted
								? 1
								: 0,
					}}
				/>
				<div className={styles.header}>
					<div className="flex gap-3 items-center">
						<img className="h-16 w-12" src="https://www.btcin.in/tokenLogoSmall.svg" alt="" />
						<span className="font-semibold text-lg">BTCin
</span>
					</div>
					<div className={styles.buttons}>
						{
							(!address) ? <div
								onClick={closeAll}
								className={`${styles.highlight} ${isNetworkSwitchHighlighted
										? styles.highlightSelected
										: ``
									}`}
							>
								<w3m-network-button />
							</div>
								:
								null
						}
						<div
							onClick={closeAll}
							className={`${styles.highlight} ${isConnectHighlighted
									? styles.highlightSelected
									: ``
								}`}
						>
							<w3m-button />
						</div>
						{
							(address) ?
								<div className="" onClick={() => disconnect()}>
									<ConnectBtn text={"Disonnect"} />
								</div> : null
						}
					</div>
				</div>
			</header>
		
		</>
	);
}
