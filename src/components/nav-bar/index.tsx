import React from "react";
import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { NavButton } from "../nav-button";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../features/user/userSlice";

export const NavBar: React.FC = () => {
  const currentUserRole = useSelector(selectUserRole);

  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          {/* <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton> */}
        </li>
        <li>
          <NavButton href="/schedule" icon={<FiUsers />}>
            Расписание
          </NavButton>
        </li>
        {currentUserRole === 'Заместитель Директора' && (
          <>
            <li>
              <NavButton href="/CreateSchedule" icon={<FiUsers />}>
                Добавить расписание
              </NavButton>
            </li>
            <li>
              <NavButton href="/AllUsers" icon={<FiUsers />}>
                Список пользователей
              </NavButton>
            </li>
            <li>
              <NavButton href="/auth2" icon={<FiUsers />}>
                Зарегистрировать пользователя
              </NavButton>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
