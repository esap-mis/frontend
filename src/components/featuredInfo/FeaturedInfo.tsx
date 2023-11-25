import React, {useEffect, useState} from "react";
import {Doctor} from "@/model/Doctor";
import HttpService from "@/service/HttpService";
import Link from "next/link";

const FeaturedInfo: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>();
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);

  useEffect(() => {
    HttpService.getHomeDoctor()
      .then((response) => {
        setDoctor(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    HttpService.getDoctorCount()
      .then((response) => {
        setDoctorsCount(response);
      });
  }, []);

  useEffect(() => {
    HttpService.getPatientCount()
      .then((response) => {
        setPatientsCount(response);
      });
  }, []);

  const schedulesForToday =
    doctor &&
    doctor.schedules.filter((schedule) => {
      const today = new Date();
      const scheduleDate = new Date(schedule.date);
      return (
        scheduleDate.getFullYear() === today.getFullYear() &&
        scheduleDate.getMonth() === today.getMonth() &&
        scheduleDate.getDate() === today.getDate()
      );
    }
  );

  return (
    <div className="featuredInfo">
      {doctor && (
        <>
          <div className="item">
            <span className="title">{doctor.clinic.name}</span>
            <div>
              <span className="desc">{doctor.clinic.address}</span>
            </div>
            <span className="sub">{doctor.clinic.phoneNumber}</span>
          </div>
          <Link href={`queue/${schedulesForToday && schedulesForToday[0]?.id}`}>
            <div className="item">
              <span className="title">{"Записей на сегодня"}</span>
              <div>
                <span className="desc">
                  {!schedulesForToday || schedulesForToday.length === 0
                    ? 0
                    : schedulesForToday[0].appointments.length}
                </span>
              </div>
            </div>
          </Link>
          <div className="item">
            <span className="title">{"Общее кол-во врачей"}</span>
            <div>
              <span className="desc">{doctorsCount}</span>
            </div>
          </div>
          <div className="item" style={{marginRight: '21px'}}>
            <span className="title">{"Общее кол-во пациентов"}</span>
            <div>
              <span className="desc">{patientsCount}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedInfo;