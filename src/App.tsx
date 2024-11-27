import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MainView } from './views/MainView';
import { SingleReviewView } from './views/SingleReviewView';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/review/:id" element={<SingleReviewView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}