import React from "react";
import {TokenStorageService} from "@/service/auth/TokenStorageService";
import styles from "@/pages/dashboard/dashboard.module.scss";
import FeaturedInfo from "@/components/featuredInfo/FeaturedInfo";
import Chart from "@/components/chart/Chart";
import WidgetRight from "@/components/widgetRight/WidgetRight";
import WidgetSm from "@/components/widgetSm/WidgetSm";
import WidgetLg from "@/components/widgetLg/WidgetLg";

const Dashboard: React.FC = () => {
  const tokenStorageService = new TokenStorageService();
  const roles = tokenStorageService.getRoles();
  const isDoctorOrChiefDoctor = roles?.includes('ROLE_DOCTOR') || roles?.includes('ROLE_CHIEF_DOCTOR');

  return (
    <div className="dashboardPage">
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

export default Dashboard;
