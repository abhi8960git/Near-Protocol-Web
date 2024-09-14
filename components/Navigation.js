import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { NearContext } from "@/context";

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;
    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-gray-100">
      {/* <Link href="/" passHref legacyBehavior>
        <a className="inline-block">
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width={30}
            height={24}
          />
        </a>
      </Link> */}
      <div>
        <button 
        style={{color:'red'}}
          className="bg-gray-600 text-white border-none px-4 py-2 rounded cursor-pointer text-sm transition duration-300 ease-in-out hover:bg-gray-700"
          onClick={action}
        >
          {label}
        </button>
      </div>
    </nav>
  );
};