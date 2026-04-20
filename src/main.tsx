import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppWrapper, FlowLayout, MainLayout } from './components/layout';
import React, { Suspense, lazy } from 'react';

import './index.css';

// Lazy loader helper ensuring clean syntax mappings
const load = (resolver: () => Promise<any>, name: string) => lazy(() => resolver().then(m => ({ default: m[name] })));

/* Code-split bundle boundaries */
const authLoad = () => import('./pages/AuthFlow');
const SigninSignupWelcome = load(authLoad, 'SigninSignupWelcome');
const Signup = load(authLoad, 'Signup');
const ConfirmEmail = load(authLoad, 'ConfirmEmail');
const EmailVerified = load(authLoad, 'EmailVerified');
const CreatePassword = load(authLoad, 'CreatePassword');
const WelcomeAboard = load(authLoad, 'WelcomeAboard');
const Login = load(authLoad, 'Login');
const LoginPassword = load(authLoad, 'LoginPassword');

const homeLoad = () => import('./pages/Home');
const Home = load(homeLoad, 'Home');
const Deposit = load(homeLoad, 'Deposit');

const p2pLoad = () => import('./pages/P2PFlow');
const P2P = load(p2pLoad, 'P2P');
const P2PBuy = load(p2pLoad, 'P2PBuy');
const P2PSell = load(p2pLoad, 'P2PSell');

const walletLoad = () => import('./pages/WalletFlow');
const CreateWalletPassword = load(walletLoad, 'CreateWalletPassword');
const CreateWalletSeed = load(walletLoad, 'CreateWalletSeed');
const WalletLoading = load(walletLoad, 'WalletLoading');

const actionLoad = () => import('./pages/ActionFlow');
const Receive = load(actionLoad, 'Receive');
const SendSelectCoin = load(actionLoad, 'SendSelectCoin');
const SendAddress = load(actionLoad, 'SendAddress');
const SendAmount = load(actionLoad, 'SendAmount');
const SendConfirm = load(actionLoad, 'SendConfirm');
const SendLoading = load(actionLoad, 'SendLoading');
const SendStatus = load(actionLoad, 'SendStatus');
const Swap = load(actionLoad, 'Swap');
const History = load(actionLoad, 'History');
const TransactionDetail = load(actionLoad, 'TransactionDetail');

const notifLoad = () => import('./pages/Notifications');
const Notifications = load(notifLoad, 'Notifications');

const settingsLoad = () => import('./pages/SettingsFlow');
const SettingsHub = load(settingsLoad, 'SettingsHub');
const AddressBook = load(settingsLoad, 'AddressBook');
const AddressBookAdd = load(settingsLoad, 'AddressBookAdd');
const Preferences = load(settingsLoad, 'Preferences');
const PreferencesCurrency = load(settingsLoad, 'PreferencesCurrency');
const PreferencesLanguage = load(settingsLoad, 'PreferencesLanguage');
const PreferencesTheme = load(settingsLoad, 'PreferencesTheme');
const Security = load(settingsLoad, 'Security');
const DAppConnection = load(settingsLoad, 'DAppConnection');
const OctaNovaHandles = load(settingsLoad, 'OctaNovaHandles');
const ManageWallets = load(settingsLoad, 'ManageWallets');
const EditProfile = load(settingsLoad, 'EditProfile');

const bankLoad = () => import('./pages/BankTransferFlow');
const BankTransferSelectBank = load(bankLoad, 'BankTransferSelectBank');
const BankTransferAmount = load(bankLoad, 'BankTransferAmount');
const BankTransferDetails = load(bankLoad, 'BankTransferDetails');
const BankTransferProcessing = load(bankLoad, 'BankTransferProcessing');
const BankTransferSuccess = load(bankLoad, 'BankTransferSuccess');

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
            <Route path="/settings" element={<SettingsHub />} />
          </Route>

          {/* Sub Flows with Top Nav only */}
          <Route path="/deposit" element={<FlowLayout title="Deposit"><Deposit /></FlowLayout>} />
          
          <Route path="/deposit/bank" element={<FlowLayout title="Select Bank"><BankTransferSelectBank /></FlowLayout>} />
          <Route path="/deposit/bank/amount" element={<FlowLayout title="Deposit Amount"><BankTransferAmount /></FlowLayout>} />
          <Route path="/deposit/bank/details" element={<FlowLayout title="Transfer Details"><BankTransferDetails /></FlowLayout>} />
          <Route path="/deposit/bank/processing" element={<BankTransferProcessing />} />
          <Route path="/deposit/bank/success" element={<BankTransferSuccess />} />

          <Route path="/p2p/buy" element={<FlowLayout title="Buy BTC"><P2PBuy /></FlowLayout>} />
          <Route path="/p2p/sell" element={<FlowLayout title="Sell BTC"><P2PSell /></FlowLayout>} />
          <Route path="/p2p/transaction" element={
            <div className="flex flex-col items-center justify-center h-[100dvh]">
              <p>Transaction View Coming Soon</p>
              <button onClick={() => window.history.back()} className="mt-4 px-4 py-2 bg-brand-primary rounded-xl">Go Back</button>
            </div>
          } />

          <Route path="/settings/address-book" element={<FlowLayout title="Address Book"><AddressBook /></FlowLayout>} />
          <Route path="/settings/address-book/add" element={<FlowLayout title="Add Address"><AddressBookAdd /></FlowLayout>} />
          <Route path="/settings/preferences" element={<FlowLayout title="Preferences"><Preferences /></FlowLayout>} />
          <Route path="/settings/preferences/currency" element={<FlowLayout title="Local Currency"><PreferencesCurrency /></FlowLayout>} />
          <Route path="/settings/preferences/language" element={<FlowLayout title="App Language"><PreferencesLanguage /></FlowLayout>} />
          <Route path="/settings/preferences/theme" element={<FlowLayout title="Color Theme"><PreferencesTheme /></FlowLayout>} />
          <Route path="/settings/security" element={<FlowLayout title="Security"><Security /></FlowLayout>} />
          <Route path="/settings/dapps" element={<FlowLayout title="Connected DApps"><DAppConnection /></FlowLayout>} />
          <Route path="/settings/handles" element={<FlowLayout title="OctaNova Handles"><OctaNovaHandles /></FlowLayout>} />
          <Route path="/settings/wallets" element={<FlowLayout title="Manage Wallets"><ManageWallets /></FlowLayout>} />
          <Route path="/settings/profile" element={<FlowLayout title="Edit Profile"><EditProfile /></FlowLayout>} />
          
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
          <Route path="/notifications" element={<FlowLayout title="Notifications"><Notifications /></FlowLayout>} />
          
          <Route path="/wallet/create/face-id" element={<CreateWalletPassword />} />
          <Route path="/wallet/create/seed" element={<FlowLayout><CreateWalletSeed /></FlowLayout>} />
          <Route path="/wallet/create/loading" element={<WalletLoading />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
