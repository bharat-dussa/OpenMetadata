/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import ApplicationConfigProvider from 'components/ApplicationConfigProvider/ApplicationConfigProvider';
import { AuthProvider } from 'components/authentication/auth-provider/AuthProvider';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import GlobalSearchProvider from 'components/GlobalSearchProvider/GlobalSearchProvider';
import PermissionProvider from 'components/PermissionProvider/PermissionProvider';
import AppRouter from 'components/router/AppRouter';
import WebSocketProvider from 'components/web-scoket/web-scoket.provider';
import WebAnalyticsProvider from 'components/WebAnalytics/WebAnalyticsProvider';
import { TOAST_OPTIONS } from 'constants/Toasts.constants';
import React, { FunctionComponent } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import i18n from 'utils/i18next/LocalUtil';

const App: FunctionComponent = () => {
  return (
    <div className="main-container">
      <div className="content-wrapper" data-testid="content-wrapper">
        <Router>
          <I18nextProvider i18n={i18n}>
            <ErrorBoundary>
              <ApplicationConfigProvider>
                <AuthProvider childComponentType={AppRouter}>
                  <HelmetProvider>
                    <WebAnalyticsProvider>
                      <PermissionProvider>
                        <WebSocketProvider>
                          <GlobalSearchProvider>
                            <AppRouter />
                          </GlobalSearchProvider>
                        </WebSocketProvider>
                      </PermissionProvider>
                    </WebAnalyticsProvider>
                  </HelmetProvider>
                </AuthProvider>
              </ApplicationConfigProvider>
            </ErrorBoundary>
          </I18nextProvider>
        </Router>
        <ToastContainer {...TOAST_OPTIONS} newestOnTop />
      </div>
    </div>
  );
};

export default App;
