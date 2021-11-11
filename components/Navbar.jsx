import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar({taxonomy}) {

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <nav>
      <h2 className="big-nav-item">
        <Link href="/">
          <a>Home</a>
        </Link>
      </h2>
      <ul className="small-nav-item-list">
        <li className="small-nav-item">
          <Link href="/aboutme">
            <a>About Me</a>
          </Link>
        </li>
      </ul>
      <button onClick={() => setShowSidebar(true)}> Open Sidebar </button>
      <Sidebar toggleClose={() => {setShowSidebar(false)}} show={showSidebar} taxonomy={taxonomy} />
    </nav>
  );
}
