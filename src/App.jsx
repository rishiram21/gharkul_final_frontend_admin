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
import Customer from './pages/Customer';
import ViewPropertyDetails from './subpages/ViewPropertyDetails';
import AllRequirement from './pages/AllRequirement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* Pages */}
          <Route path="/allproperty" element={<AllProperty />} />
          <Route path="/allrequirement" element={<AllRequirement />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/package" element={<Package />} />
          <Route path="/subscriber" element={<Subscriber />} />
          <Route path="/customer" element={<Customer />} />




          {/* Sub-Pages */}
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/addsubscription" element={<AddSubscription />} />
          <Route path="/addpackage" element={<AddPackage />} />
          <Route path="/allproperty/:propertyId" element={<ViewPropertyDetails />} />



        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
