import './topbar.scss';
import React, {useEffect, useState} from "react";
import AccountMenu from "../account/AccountMenu";
import {Link} from "react-router-dom";
import {Doctor} from "../../model/Doctor";
import HttpService from "../../service/HttpService";
import DoctorInfo from "../account/DoctorInfo";

const Topbar: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>();
  const [error, setError] = useState<Doctor>();

  useEffect(() => {
    HttpService.getHomeDoctor()
      .then((response) => {
        setDoctor(response);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div className={'topbar'}>
      <div className={"wrapper"}>
        <div className={"left"}>
          <Link to="/">
            <span>ЕСАП</span>
          </Link>
        </div>
        <div className={"right"}>
          {doctor &&
            <DoctorInfo doctor={doctor} />}
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
