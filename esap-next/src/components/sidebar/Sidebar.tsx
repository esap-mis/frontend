import {Apps, LocalHospital, PeopleOutline} from '@mui/icons-material';
import Link from 'next/link';
import {NextComponentType} from "next";

const Sidebar: NextComponentType = () => {
  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className="menu">
          <h3>Панель управления</h3>
          <ul>
            <Link className='link' href={"/"}>
              <li>
                <Apps className='icon'/>
                Домашняя
              </li>
            </Link>
          </ul>
        </div>
        <div className="menu">
          <h3>Быстрое меню</h3>
          <ul>
            <Link href={'/patients'} className='link'>
              <li>
                <PeopleOutline className={'icon'} />
                Пациенты
              </li>
            </Link>
          </ul>
          <ul>
            <Link href={'/doctors'} className='link'>
              <li>
                <LocalHospital className='icon'/>
                Врачи
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
