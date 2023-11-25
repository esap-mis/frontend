import './widgetRight.scss';
import React, {useEffect, useState} from 'react';
import CircleChart from "../chart/CircleChart";
import HttpService from "../../service/HttpService";
import {PatientStatisticsByGenderDTO} from "../../model/dto/PatientStatisticsByGenderDTO";
import {PatientStatisticsByAgeDTO} from "../../model/dto/PatientStatisticsByAgeDTO";

const WidgetRight: React.FC = () => {
  const [statisticsByGender, setStatisticsByGender] = useState<PatientStatisticsByGenderDTO>();
  const [statisticsByAge, setStatisticsByAge] = useState<PatientStatisticsByAgeDTO>();

  useEffect(() => {
    HttpService.getPatientsStatisticsByGender()
      .then(response => setStatisticsByGender(response))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    HttpService.getPatientsStatisticsByAge()
      .then(response => setStatisticsByAge(response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="widgetRight">
      {statisticsByGender &&
        <CircleChart
          title={"Пациенты по полу"}
          legend={['Мужской', 'Женский']}
          statistics={statisticsByGender}
          colors={['#0088FE', '#a9a9a9']}
        />
      }
      {statisticsByAge &&
        <CircleChart
          title={"Пациенты по возрасту"}
          legend={['Дети', 'Взрослые', 'Пожилые']}
          statistics={statisticsByAge}
          colors={['#15e069', '#0088FE', '#a9a9a9']}
        />
      }
    </div>
  );
};

export default WidgetRight;