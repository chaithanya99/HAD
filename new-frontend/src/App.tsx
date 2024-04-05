import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { CustomProvider } from 'rsuite';
import enGB from 'rsuite/locales/en_GB';
import locales from './locales';
import Frame from './components/Frame';
import DashboardPage from './pages/dashboard';
import Error404Page from './pages/authentication/404';
import Error403Page from './pages/authentication/403';
import Error500Page from './pages/authentication/500';
import Error503Page from './pages/authentication/503';
import VirtualizedTable3Page from './pages/tables/Patient_List';
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import MembersPage from './pages/tables/members';
import VirtualizedTablePage from './pages/tables/Doctor_List';
import VirtualizedTable2Page from './pages/tables/Nurse_List';
import FormBasicPage from './pages/forms/Add_Doctor';
import ABHARegistrationPage from './pages/forms/ABHA_Registration';
import FormBasic2Page from './pages/forms/Add_Nurse';
import CalendarPage from './pages/calendar';
import { appNavs } from './config';
import Healthrecordpage from './pages/forms/Add_HealthRecord';
const App = () => {
  return (
    <IntlProvider locale="en" messages={locales.en}>
      <CustomProvider locale={enGB}>
        <Routes>
          <Route path="/" element={<Frame navs={appNavs} />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="table-members" element={<MembersPage />} />
            <Route path="table-virtualized" element={<VirtualizedTablePage />} />
            <Route path="table-virtualized2" element={<VirtualizedTable2Page />} />
            <Route path="table-virtualized3" element={<VirtualizedTable3Page />} />
            <Route path="error-404" element={<Error404Page />} />
            <Route path="error-403" element={<Error403Page />} />
            <Route path="error-500" element={<Error500Page />} />
            <Route path="error-503" element={<Error503Page />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="form-basic" element={<FormBasicPage />} />
            <Route path="form-basic2" element={<FormBasic2Page />} />
            <Route path="HealthRecord" element={<Healthrecordpage />} />
            <Route path="ABHA-Registration" element={<ABHARegistrationPage />} />
            <Route path="calendar" element={<CalendarPage />} />
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </CustomProvider>
    </IntlProvider>
  );
};

export default App;
