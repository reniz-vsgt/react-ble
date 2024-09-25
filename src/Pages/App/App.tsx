import { Layout, Typography } from 'antd';
import BLE from '../BLE/BLE';
import Report from '../Report/Report'
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const { Content, Header } = Layout;
const { Title } = Typography;


function App() {

  return (
    <>
      <React.StrictMode>
        <Layout className='Layout'>
          <Header className='Header'>
            <div className="Logo" ><img className='Logo' src="/logo.png" alt='logo'/></div>
            <Title level={2} style={{color:"#205274"}}>The Breath AI</Title>
          </Header>
          <Content className='Content'>
            <Router>
              <Routes>
                <Route path='/' element={<BLE />} />
                <Route path="/report" element={<Report />} />
              </Routes>
            </Router>
          </Content>
        </Layout>
      </React.StrictMode>
    </>
  );
}

export default App;
