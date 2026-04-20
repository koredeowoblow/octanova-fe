import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppWrapper, FlowLayout, MainLayout } from './components/layout';

/* Flows */
import { SigninSignupWelcome, Signup, ConfirmEmail, EmailVerified, CreatePassword, WelcomeAboard, Login, LoginPassword } from './pages/AuthFlow';
import { Home, Deposit } from './pages/Home';
import { P2P, P2PBuy } from './pages/P2PFlow';
import { CreateWalletPassword, CreateWalletSeed, WalletLoading } from './pages/WalletFlow';
import { Receive, SendSelectCoin, SendAddress, SendAmount, SendConfirm, SendLoading, SendStatus, Swap, History, TransactionDetail } from './pages/ActionFlow';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />}>
          
          {/* Index Redirect */}
          <Route path="/" element={<Navigate to="/signup/welcome" />} />

          {/* Auth Flow (No navbars) */}
          <Route path="/signup/welcome" element={<SigninSignupWelcome />} />
          <Route path="/signup" element={<FlowLayout><Signup /></FlowLayout>} />
          <Route path="/signup/confirm-email" element={<FlowLayout><ConfirmEmail /></FlowLayout>} />
          <Route path="/signup/email-verified" element={<EmailVerified />} />
          <Route path="/signup/create-password" element={<FlowLayout><CreatePassword /></FlowLayout>} />
          <Route path="/signup/welcome" element={<WelcomeAboard />} />

          <Route path="/login" element={<FlowLayout><Login /></FlowLayout>} />
          <Route path="/login/password" element={<FlowLayout><LoginPassword /></FlowLayout>} />

          {/* Main App flow (Bottom Nav) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/p2p" element={<P2P />} />
            <Route path="/orders" element={<div className="p-4 text-gray-400 text-center mt-20">Orders Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-4 text-gray-400 text-center mt-20">Settings Coming Soon</div>} />
          </Route>

          {/* Sub Flows with Top Nav only */}
          <Route path="/deposit" element={<FlowLayout title="Deposit"><Deposit /></FlowLayout>} />
          <Route path="/p2p/buy" element={<FlowLayout title="Buy BTC"><P2PBuy /></FlowLayout>} />
          
          <Route path="/receive" element={<FlowLayout title="Receive"><Receive /></FlowLayout>} />
          <Route path="/send" element={<FlowLayout title="Select Coin"><SendSelectCoin /></FlowLayout>} />
          <Route path="/send/address" element={<FlowLayout title="Send to Address"><SendAddress /></FlowLayout>} />
          <Route path="/send/amount" element={<FlowLayout title="Enter Amount"><SendAmount /></FlowLayout>} />
          <Route path="/send/confirm" element={<FlowLayout title="Confirm Send"><SendConfirm /></FlowLayout>} />
          <Route path="/send/loading" element={<SendLoading />} />
          <Route path="/send/success" element={<SendStatus status="success" />} />
          <Route path="/send/failed" element={<SendStatus status="failed" />} />
          <Route path="/swap" element={<FlowLayout title="Swap"><Swap /></FlowLayout>} />
          <Route path="/history" element={<FlowLayout title="History"><History /></FlowLayout>} />
          <Route path="/history/:id" element={<FlowLayout title="Transaction Details"><TransactionDetail /></FlowLayout>} />
          
          <Route path="/wallet/create/face-id" element={<CreateWalletPassword />} />
          <Route path="/wallet/create/seed" element={<FlowLayout><CreateWalletSeed /></FlowLayout>} />
          <Route path="/wallet/create/loading" element={<WalletLoading />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
