import "./App.scss";
import EHSFooter from "./Components/Footer";
import Introduction from "./Modules/About";
import ContactUs from "./Modules/ContactUs";
import Digitization from "./Modules/DigitizationInEH&S";
import CoreComponents from "./Modules/EH&SApplications";
import HeroScreen from "./Modules/HeroScreen";

const LandingPage = () => {
  return(
    <div className='App'>
      <HeroScreen />
      <Introduction />
      <CoreComponents />
      <Digitization />
      <ContactUs />
      <EHSFooter />
    </div>
  )
}

export default LandingPage;
