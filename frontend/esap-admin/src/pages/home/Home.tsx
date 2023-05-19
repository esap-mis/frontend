import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import "./home.scss";

const Home = () => {
  return (
    <div className="homePage">
      <FeaturedInfo />
      {/*<Chart*/}
      {/*    data={userData}*/}
      {/*    dataKey={'Active User'}*/}
      {/*    grid={true}*/}
      {/*    title={'Статистика пользователей'}*/}
      {/*/>*/}
      <div className="widgets">
          <WidgetSm />
          {/* <WidgetLg /> */}
      </div>
    </div>
  );
};

export default Home;
