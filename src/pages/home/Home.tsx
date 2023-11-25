import "./home.scss";
import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetRight from "../../components/widgetRight/WidgetRight";
import {TokenStorageService} from "../../service/auth/TokenStorageService";

const Home: React.FC = () => {
  const tokenStorageService = new TokenStorageService();
  const roles = tokenStorageService.getRoles();
  const isDoctorOrChiefDoctor = roles.includes('ROLE_DOCTOR') || roles.includes('ROLE_CHIEF_DOCTOR');

  return (
    <div className="homePage">
      <FeaturedInfo />
      <div className="widgets">
        <Chart
            grid={true}
            title={'Статистика приемов'}
        />
        <WidgetRight />
      </div>
      <div className="widgets">
          <WidgetSm />
          {isDoctorOrChiefDoctor && <WidgetLg />}
      </div>
    </div>
  );
};

export default Home;
