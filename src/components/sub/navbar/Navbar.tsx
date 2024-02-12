import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

// import Acount from "../Popover/Popover";

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
			<header className="h-24 bg-gray-900 z-50 overflow-hidden">
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
								<div className="flex flex-col ">
								<w3m-button />
								{/* {
									(!is_active)?
								<ActivateAcountBtn context={"Activate Account"}/>
								:null

								} */}
									<div
										onClick={closeAll}
										className={`${styles.highlight} ${isConnectHighlighted
											? styles.highlightSelected
											: ``
											}`}
									>
									</div>
								</div>
								: null
						}
					</div>
				</div>
			</header>

		</>
	);
}
