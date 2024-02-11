
import styles from "@/styles/Home.module.css";
import { useCallback, useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import axios from "axios";
type LevelUsers = {
  [key: string]: {
    _id: string;
    user_id: string;
    is_active: boolean;
    is_mining: boolean;
    mining_time: number;
    referralCode: string;
    referredBy: string;
    referredUsers: string[];
    level: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
};
export default function AffiliateProgram({referralCode}:any) {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] = useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const [levelUsers, setLevelUsers] = useState<LevelUsers>({});
  const [totalRefereduser, setTotalRefereduser] = useState(0)

  
  const { open, close } = useWeb3Modal()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()


  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };
  // console.log("account", address);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  const fetchLevelUsers = useCallback(async () => {
    try {
		const user = await axios.get(`https://web-3-be.onrender.com/api/v1/auth/getuser-byid/${address}`);
    // console.log("---->user from affilatye",user.data.data?.referralCode);
    
      const response = await axios.get(`https://web-3-be.onrender.com/api/levelUsers/${user.data.data?.referralCode}/3`);
      setLevelUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch level users', error);
    }
  }, []);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
  
    }).catch((error) => {
      console.error("Failed to copy referral code to clipboard:", error);
    });
  };

  const shareOnSocialMedia = (platform: string) => {
    let shareLink = referralCode;
    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${referralCode}`;
        break;
      case "facebook":
        // Replace the URL with your desired URL
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          "https://example.com"
        )}`;
        break;
      case "twitter":
        // Replace the URL and text with your desired URL and text
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          "https://example.com"
        )}&text=${encodeURIComponent("Check out this referral link: " + referralCode)}`;
        break;
      case "instagram":
        // Replace the URL and text with your desired URL and text
        shareLink = `https://www.instagram.com/?url=${encodeURIComponent("https://example.com")}`;
        break;
      case "telegram":
        // Replace the URL and text with your desired URL and text
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(
          "https://example.com"
        )}&text=${encodeURIComponent("Check out this referral link: " + referralCode)}`;
        break;
      default:
        break;
    }
    window.open(shareLink, "_blank");
  };

  useEffect(() => {
    if (referralCode !== null || undefined) {
      // console.log("Fetching level users...");
      fetchLevelUsers();
    }
  }, [referralCode,fetchLevelUsers]);

  useEffect(() => {
    let totalReferrals = 0;
    Object.keys(levelUsers).forEach((level) => {
      const parsedLevel = parseInt(level);
      if (parsedLevel >= 0) {
        totalReferrals += levelUsers[level].length;
      }
    });
    setTotalRefereduser(totalReferrals);
  }, [levelUsers, setTotalRefereduser]);
  

 
  return (
    <>
      <main className={styles.main}>
        {
          (address) ?
            <div className="text-3xl font-semibold text-white">Affiliate Program</div>
            : null
        }
        <div className={styles.wrapper}>

          <div className="w-full md:max-w-3xl md:w-[40rem] mx-auto -mt-32 relative overflow-hidden z-10
				 bg-gray-800 p-8 rounded-lg shadow-md 
				 before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full 
				 before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400
				  after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">

            <div className="" onClick={openModal}>
              <button className="Btn mb-3 bg-purple-900 shadow-2xl shadow-black">

                <svg data-slot="icon" fill="none" className="w-6 h-6 pl-1 ml-2 " stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path>
                </svg>

                <div className="text">Link</div>
              </button>

              <div className="mb-7  flex gap-5 w-full px-5 py-4 rounded-xl justify-between border border-gray-500">
                <div className="flex items-center text-gray-300">

                  <div className="text-xs md:text-xl md:mr-8 font-semibold">Total Referrals:</div>
                  <div className="text-xs md:text-xl flex items-center">
                    <svg className="h-6 w-6 mr-1" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                    </svg>
                  {totalRefereduser-1}
                  </div>
                </div>
                <div className="flex items-center text-yellow-400">

                  <div className="text-xs md:text-xl  md:mr-8 font-semibold">Active Miners 24h:</div>
                  <div className="text-xs md:text-xl flex items-center">
                    <svg className="h-6 w-6 mr-1" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                    </svg>
                    0
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Levels
              </th>
              <th scope="col" className="px-6 py-3">
                Referrals
              </th>
              <th scope="col" className="px-6 py-3">
                Active 24h
              </th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(levelUsers).map((level, index) => {
        const parsedLevel = parseInt(level);
        return parsedLevel > 0 && (
          <tr key={index} className=" border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Level {parsedLevel}
            </th>
            <td className="px-6 py-4">
              {levelUsers[level].length}
            </td>
            <td className="px-6 py-4">
              {/* Add logic to calculate active users for the given level */}
              {/* For example, you might need to filter users based on some condition */}
              {levelUsers[level].filter((user: { is_active: any; }) => user.is_active).length}
            </td>
          </tr>
        );
      })}
          </tbody>
        </table>
      </div>
              </table>
            </div>

          </div></div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="">
                    <div className="bg-gray-800 mx-4 p-4 rounded-xl w-full ">
                      <div
                        className="flex justify-between items center border-b-2 border-gray-600 py-3"
                      >
                        <div className="flex items-center justify-center">
                          <p className="text-xl font-bold text-gray-200">Share Modal</p>
                        </div>

                        <div
                          onClick={closeModal}
                          className="bg-gray-800 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-200 w-8 h-8 flex items-center justify-center rounded-full"
                        >
                          x
                        </div>
                      </div>

                      <div className="my-4">
                        <p className="text-sm text-gray-200">Share this link via</p>

                        <div className="flex justify-around my-4">
                          <div onClick={() => shareOnSocialMedia("facebook")}
                            className="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                              ></path>
                            </svg>
                          </div>
                          <div onClick={() => shareOnSocialMedia("twitter")}
                            className="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                              ></path>
                            </svg>
                          </div>
                          <div onClick={() => shareOnSocialMedia("instagram")}
                            className="border hover:bg-[#bc2a8d] w-12 h-12 fill-[#bc2a8d] hover:fill-white border-pink-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-pink-500/50 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"
                              ></path>
                              <circle cx="16.806" cy="7.207" r="1.078"></circle>
                              <path
                                d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"
                              ></path>
                            </svg>
                          </div>

                          <div onClick={() => shareOnSocialMedia("whatsapp")}
                            className="border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-white border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                              ></path>
                            </svg>
                          </div>

                          <div
                          onClick={() => shareOnSocialMedia("telegram")}
                            className="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
                              ></path>
                            </svg>
                          </div>
                        </div>

                        <p className="text-sm text-gray-200">Or copy link</p>
                        <div className="border-2 border-gray-500 rounded-xl flex justify-between items-center mt-4 py-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-gray-500 ml-2"
                          >
                            <path
                              d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
                            ></path>
                            <path
                              d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
                            ></path>
                          </svg>

                          <input className="w-full outline-none bg-transparent text-gray-200" type="text" placeholder="link" value={referralCode} />

                          <button onClick={copyToClipboard} className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600">
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

      
      </main>
    </>
  );
}
