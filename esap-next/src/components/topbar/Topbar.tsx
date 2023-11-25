import {useEffect, useState} from "react";
import {Doctor} from "@/model/Doctor";
import HttpService from "@/service/HttpService";
import Link from 'next/link';
import {NextComponentType} from "next";
import AccountMenu from "@/components/account/AccountMenu";
import DoctorInfo from "@/components/account/DoctorInfo";

const Topbar: NextComponentType = () => {
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
          <Link href={"/"}>
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
