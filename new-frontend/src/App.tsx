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
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import MembersPage from './pages/tables/members';
import VirtualizedTablePage from './pages/tables/Doctor_List';
import VirtualizedTable2Page from './pages/tables/Nurse_List';
import VirtualizedTable3Page from './pages/tables/Patient_List';
import VirtualizedTable4Page from './pages/tables/Consent_List';
import VirtualizedTable5Page from './pages/tables/Medical_Record_List';
import FormBasicPage from './pages/forms/Add_Doctor';
import ABHARegistrationPage from './pages/forms/ABHA_Registration';
import FormBasic2Page from './pages/forms/Add_Nurse';
import CalendarPage from './pages/calendar';
import { getAppNavs } from './config';
import Healthrecordpage from './pages/forms/Add_HealthRecord';
import Login from './Login';
const App = () => {
  const appNavs = getAppNavs();
  return (
    <IntlProvider locale="en" messages={locales.en}>
      <CustomProvider locale={enGB}>
        <Routes>
          <Route>
            <Route index element={<Login />} />
            {/* <Route index element={<DashboardPage />} /> */}
            <Route path="dashboard" element={<Frame navs={appNavs} />}>
              <Route index element={<DashboardPage />} />
            </Route>
            <Route path="table-members" element={<Frame navs={appNavs} />}>
              <Route index element={<MembersPage />} />
            </Route>
            <Route path="table-virtualized" element={<Frame navs={appNavs} />}>
              <Route index element={<VirtualizedTablePage />} />
            </Route>
            <Route path="table-virtualized2" element={<Frame navs={appNavs} />}>
              <Route index element={<VirtualizedTable2Page />} />
            </Route>
            <Route path="table-virtualized3" element={<Frame navs={appNavs} />}>
              <Route index element={<VirtualizedTable3Page />} />
            </Route>
            <Route path="table-virtualized4" element={<Frame navs={appNavs} />}>
              <Route index element={<VirtualizedTable4Page />} />
            </Route>
            <Route path="table-virtualized5" element={<Frame navs={appNavs} />}>
              <Route index element={<VirtualizedTable5Page />} />
            </Route>
            <Route path="error-404" element={<Frame navs={appNavs} />}>
              <Route index element={<Error404Page />} />
            </Route>
            <Route path="error-403" element={<Frame navs={appNavs} />}>
              <Route index element={<Error403Page />} />
            </Route>
            <Route path="error-500" element={<Frame navs={appNavs} />}>
              <Route index element={<Error500Page />} />
            </Route>
            <Route path="error-503" element={<Frame navs={appNavs} />}>
              <Route index element={<Error503Page />} />
            </Route>
            <Route path="sign-in" element={<Frame navs={appNavs} />}>
              <Route index element={<SignInPage />} />
            </Route>
            <Route path="sign-up" element={<Frame navs={appNavs} />}>
              <Route index element={<SignUpPage />} />
            </Route>
            <Route path="form-basic" element={<Frame navs={appNavs} />}>
              <Route index element={<FormBasicPage />} />
            </Route>
            <Route path="form-basic2" element={<Frame navs={appNavs} />}>
              <Route index element={<FormBasic2Page />} />
            </Route>
            <Route path="HealthRecord" element={<Frame navs={appNavs} />}>
              <Route index element={<Healthrecordpage />} />
            </Route>
            <Route path="ABHA-Registration" element={<Frame navs={appNavs} />}>
              <Route index element={<ABHARegistrationPage/>} />
            </Route>
            <Route path="calendar" element={<Frame navs={appNavs} />}>
              <Route index element={<CalendarPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </CustomProvider>
    </IntlProvider>
  );
};

export default App;
