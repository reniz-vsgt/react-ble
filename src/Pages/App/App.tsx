import { Layout, Typography } from 'antd';
import Report from '../Report/Report'
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Signup from '../SignUp/Signup';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Record from '../Record/Record';
import Dashboard from '../Dashboard/Dashboard';
import { Footer } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';


const { Content, Header } = Layout;
const { Title } = Typography;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isVSGTLoggedIn = localStorage.getItem('isVSGTLoggedIn') === 'true';

  if (!isVSGTLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {

  return (
    <>
      <React.StrictMode>
        <Layout className='Layout'>
          <Header className='Header'>
            <div className="Logo" ><img className='Logo' src="/logo.png" alt='logo' /></div>
            <Title style={{ color: "#205274", fontFamily: "'Montserrat', sans-serif" }}>breathAI</Title>
          </Header>
          <Content className='Content'>
            <Router>
              <Routes>
                <Route path='*' element={<PageNotFound />} />
                <Route path='/' element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/googleAuth' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/record' element={
                  <ProtectedRoute>
                    <Record />
                  </ProtectedRoute>
                } />
                <Route path="/report" element={
                  <ProtectedRoute>
                    <Report />
                  </ProtectedRoute>} />
              </Routes>
            </Router>
          </Content>
          {/* <Footer className='Footer'>
            <Paragraph className='paragraph'>
              Breath Band is not a medical device and should not be used as a substitute for professional medical
              judgment. It is not designed or intended for use in the diagnosis of disease or other conditions, or in the
              cure, mitigation, treatment, or prevention of any condition or disease. Please consult your healthcare
              provider prior to making any decisions related to your health.
            </Paragraph>
          </Footer> */}
        </Layout>
      </React.StrictMode>
    </>
  );
}

export default App;
