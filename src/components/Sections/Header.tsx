import Link from "next/link";
import React from "react";
import { ContactPopup } from "../Elements/ContactPopup";
import Dot from "../Elements/Dot";

export default function Header() {
  return (
    <header className="fixed z-10 w-full py-6 top-0 left-0 flex flex-row items-center gap-2 px-8 justify-between">
      <Link
        scroll={false}
        href="/"
        className="font-sans font-medium text-gray-700"
      >
        Connor Rothschild
      </Link>
      <ContactPopup>
        <div className="cursor-pointer flex items-center gap-2 text-gray-700">
          Work with me <Dot />
        </div>
      </ContactPopup>
    </header>
  );
}
