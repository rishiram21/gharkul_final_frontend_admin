import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Users from './pages/Customer';
import Signin from './pages/Signin';
import Package from './pages/Package';
import AllProperty from './pages/AllProperty';
import AddProperty from './subpages/AddProperty';
import Amenities from './pages/Amenities';
import Subscriber from './pages/Subscriber';
import AddSubscription from './subpages/AddSubscription';
import AddPackage from './subpages/AddPackage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signin" element={<Signin />} />
          {/* Pages */}
          <Route path="/allproperty" element={<AllProperty />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/package" element={<Package />} />
          <Route path="/subscriber" element={<Subscriber />} />



          {/* Sub-Pages */}
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/addsubscription" element={<AddSubscription />} />
          <Route path="/addpackage" element={<AddPackage />} />



        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
