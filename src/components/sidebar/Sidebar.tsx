import './sidebar.scss';
import {Apps, GroupOutlined, LineStyle, LocalHospital, PeopleOutline, PermIdentity} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className="menu">
          <h3>Панель управления</h3>
          <ul>
            <Link to='/' className='link'>
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
            <Link to='/patients' className='link'>
              <li>
                <PeopleOutline className={'icon'} />
                Пациенты
              </li>
            </Link>
          </ul>
          <ul>
            <Link to='/doctors' className='link'>
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
