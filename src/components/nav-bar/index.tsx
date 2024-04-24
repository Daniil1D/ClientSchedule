import React from "react"
import { BsPostcard } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { NavButton } from "../nav-button"

export const NavBar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href="/schedule" icon={<FiUsers />}>
            Расписание
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
