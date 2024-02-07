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
// import Acount from "../Popover/Popover";
import { ActivateAcountBtn } from "../DepayBtn/Dpay";

export default function Navbar({is_active}:any) {
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
	
console.log("------->active user ",is_active);


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

						{
							(address) ?
								<>
								<w3m-button />
								{
									(!is_active)?
								<ActivateAcountBtn/>
								:"Activated"
								}
									<div
										onClick={closeAll}
										className={`${styles.highlight} ${isConnectHighlighted
											? styles.highlightSelected
											: ``
											}`}
									>
									{/* <Acount/> */}
									</div>
								</>
								: null
						}
					</div>
				</div>
			</header>

		</>
	);
}
