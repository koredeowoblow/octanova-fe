import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppWrapper, FlowLayout, MainLayout } from './components/layout';
import React, { Suspense, lazy } from 'react';
import { SecurityProvider } from './components/SecurityProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { KYCGate } from './components/kyc';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,          // 30 seconds
      gcTime: 5 * 60 * 1000,         // 5 minutes
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Lazy loader helper ensuring clean syntax mappings
const load = (resolver: () => Promise<any>, name: string) => lazy(() => resolver().then(m => ({ default: m[name] })));

/* Code-split bundle boundaries */
const authLoad = () => import('./pages/AuthFlow');
const SigninSignupWelcome = load(authLoad, 'SigninSignupWelcome');
const Signup = load(authLoad, 'Signup');
const ConfirmEmail = load(authLoad, 'ConfirmEmail');
const EmailVerified = load(authLoad, 'EmailVerified');
const CreatePassword = load(authLoad, 'CreatePassword');
const SignupBiometrics = load(authLoad, 'SignupBiometrics');
const WelcomeAboard = load(authLoad, 'WelcomeAboard');
const Login = load(authLoad, 'Login');
const LoginPassword = load(authLoad, 'LoginPassword');

const homeLoad = () => import('./pages/Home');
const Home = load(homeLoad, 'Home');
const Deposit = load(homeLoad, 'Deposit');

const cexLoad = () => import('./pages/CEXFlow');
const DepositCrypto = load(cexLoad, 'DepositCrypto');
const CardPurchase = load(cexLoad, 'CardPurchase');
const OrdersHub = load(cexLoad, 'OrdersHub');
const AdsHub = load(cexLoad, 'AdsHub');

const p2pLoad = () => import('./pages/P2PFlow');
const P2P = load(p2pLoad, 'P2P');
const P2PBuy = load(p2pLoad, 'P2PBuy');
const P2PSell = load(p2pLoad, 'P2PSell');

const walletLoad = () => import('./pages/WalletFlow');
const CreateWalletPassword = load(walletLoad, 'CreateWalletPassword');
const CreateWalletSeed = load(walletLoad, 'CreateWalletSeed');
const WalletLoading = load(walletLoad, 'WalletLoading');

const actionLoad = () => import('./pages/ActionFlow');
const ReceiveSelectCoin = load(actionLoad, 'ReceiveSelectCoin');
const ReceiveQR = load(actionLoad, 'ReceiveQR');
const SendSelectCoin = load(actionLoad, 'SendSelectCoin');
const SendAddress = load(actionLoad, 'SendAddress');
const SendAmount = load(actionLoad, 'SendAmount');
const SendConfirm = load(actionLoad, 'SendConfirm');
const SendLoading = load(actionLoad, 'SendLoading');
const SendStatus = load(actionLoad, 'SendStatus');
const Swap = load(actionLoad, 'Swap');
const SwapReview = load(actionLoad, 'SwapReview');
const SwapProcessing = load(actionLoad, 'SwapProcessing');
const SwapStatus = load(actionLoad, 'SwapStatus');
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
const ManageTokens = load(settingsLoad, 'ManageTokens');

const bankLoad = () => import('./pages/BankTransferFlow');
const BankTransferSelectBank = load(bankLoad, 'BankTransferSelectBank');
const BankTransferAmount = load(bankLoad, 'BankTransferAmount');
const BankTransferDetails = load(bankLoad, 'BankTransferDetails');
const BankTransferProcessing = load(bankLoad, 'BankTransferProcessing');
const BankTransferSuccess = load(bankLoad, 'BankTransferSuccess');

const kycLoad = () => import('./pages/KYCFlow');
const KYCOverview = load(kycLoad, 'KYCOverview');
const KYCPhoneEntry = load(kycLoad, 'KYCPhoneEntry');
const KYCPhoneVerify = load(kycLoad, 'KYCPhoneVerify');
const KYCPhoneSuccess = load(kycLoad, 'KYCPhoneSuccess');
const KYCDocumentsEntry = load(kycLoad, 'KYCDocumentsEntry');
const KYCDocumentsCountry = load(kycLoad, 'KYCDocumentsCountry');
const KYCDocumentsType = load(kycLoad, 'KYCDocumentsType');
const KYCDocumentsBVN = load(kycLoad, 'KYCDocumentsBVN');
const KYCDocumentsUpload = load(kycLoad, 'KYCDocumentsUpload');
const KYCDocumentsFace = load(kycLoad, 'KYCDocumentsFace');
const KYCDocumentsSuccess = load(kycLoad, 'KYCDocumentsSuccess');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SecurityProvider>
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
          <Route path="/signup/biometrics" element={<FlowLayout><SignupBiometrics /></FlowLayout>} />
          <Route path="/signup/welcome" element={<WelcomeAboard />} />

          <Route path="/login" element={<FlowLayout><Login /></FlowLayout>} />
          <Route path="/login/password" element={<FlowLayout><LoginPassword /></FlowLayout>} />

          {/* Main App flow (Bottom Nav) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/p2p" element={<KYCGate requiredTier={1}><P2P /></KYCGate>} />
            <Route path="/orders" element={<KYCGate requiredTier={1}><OrdersHub /></KYCGate>} />
            <Route path="/ads" element={<KYCGate requiredTier={2}><AdsHub /></KYCGate>} />
            <Route path="/settings" element={<SettingsHub />} />
          </Route>

          {/* Sub Flows with Top Nav only */}
          <Route path="/deposit" element={<FlowLayout title="Deposit"><Deposit /></FlowLayout>} />
          <Route path="/deposit/crypto" element={<FlowLayout title="Deposit Crypto"><KYCGate requiredTier={1}><DepositCrypto /></KYCGate></FlowLayout>} />
          <Route path="/deposit/card" element={<FlowLayout title="Buy with Card"><KYCGate requiredTier={2}><CardPurchase /></KYCGate></FlowLayout>} />
          
          <Route path="/deposit/bank" element={<FlowLayout title="Select Bank"><KYCGate requiredTier={2}><BankTransferSelectBank /></KYCGate></FlowLayout>} />
          <Route path="/deposit/bank/amount" element={<FlowLayout title="Deposit Amount"><KYCGate requiredTier={2}><BankTransferAmount /></KYCGate></FlowLayout>} />
          <Route path="/deposit/bank/details" element={<FlowLayout title="Transfer Details"><KYCGate requiredTier={2}><BankTransferDetails /></KYCGate></FlowLayout>} />
          <Route path="/deposit/bank/processing" element={<KYCGate requiredTier={2}><BankTransferProcessing /></KYCGate>} />
          <Route path="/deposit/bank/success" element={<KYCGate requiredTier={2}><BankTransferSuccess /></KYCGate>} />

          <Route path="/p2p/buy" element={<FlowLayout title="Buy BTC"><KYCGate requiredTier={1}><P2PBuy /></KYCGate></FlowLayout>} />
          <Route path="/p2p/sell" element={<FlowLayout title="Sell BTC"><KYCGate requiredTier={2}><P2PSell /></KYCGate></FlowLayout>} />
          <Route path="/p2p/transaction" element={
            <div className="flex flex-col items-center justify-center h-[100dvh]">
              <p>Transaction View Coming Soon</p>
              <button onClick={() => window.history.back()} className="mt-4 px-4 py-2 bg-brand-primary rounded-xl">Go Back</button>
            </div>
          } />

          <Route path="/kyc" element={<FlowLayout title="KYC"><KYCOverview /></FlowLayout>} />
          <Route path="/kyc/phone" element={<FlowLayout title="Phone Verification"><KYCPhoneEntry /></FlowLayout>} />
          <Route path="/kyc/phone/verify" element={<FlowLayout title="Verify Phone"><KYCPhoneVerify /></FlowLayout>} />
          <Route path="/kyc/phone/success" element={<FlowLayout title="Success"><KYCPhoneSuccess /></FlowLayout>} />
          <Route path="/kyc/documents" element={<FlowLayout title="Document Verification"><KYCDocumentsEntry /></FlowLayout>} />
          <Route path="/kyc/documents/country" element={<FlowLayout title="Country"><KYCDocumentsCountry /></FlowLayout>} />
          <Route path="/kyc/documents/type" element={<FlowLayout title="Document Type"><KYCDocumentsType /></FlowLayout>} />
          <Route path="/kyc/documents/bvn" element={<FlowLayout title="BVN"><KYCDocumentsBVN /></FlowLayout>} />
          <Route path="/kyc/documents/upload" element={<FlowLayout title="Upload"><KYCDocumentsUpload /></FlowLayout>} />
          <Route path="/kyc/documents/face" element={<FlowLayout title="Face Verification"><KYCDocumentsFace /></FlowLayout>} />
          <Route path="/kyc/documents/success" element={<FlowLayout title="Success"><KYCDocumentsSuccess /></FlowLayout>} />

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
          <Route path="/settings/tokens" element={<FlowLayout title="Manage Tokens"><ManageTokens /></FlowLayout>} />
          
          <Route path="/receive" element={<FlowLayout title="Select Coin"><ReceiveSelectCoin /></FlowLayout>} />
          <Route path="/receive/qr" element={<FlowLayout title="Receive"><ReceiveQR /></FlowLayout>} />
          <Route path="/send" element={<FlowLayout title="Select Coin"><SendSelectCoin /></FlowLayout>} />
          <Route path="/send/address" element={<FlowLayout title="Send to Address"><SendAddress /></FlowLayout>} />
          <Route path="/send/amount" element={<FlowLayout title="Enter Amount"><SendAmount /></FlowLayout>} />
          <Route path="/send/confirm" element={<FlowLayout title="Confirm Send"><SendConfirm /></FlowLayout>} />
          <Route path="/send/loading" element={<SendLoading />} />
          <Route path="/send/success" element={<SendStatus status="success" />} />
          <Route path="/send/failed" element={<SendStatus status="failed" />} />
          <Route path="/swap" element={<FlowLayout title="Swap"><Swap /></FlowLayout>} />
          <Route path="/swap/review" element={<FlowLayout title="Review Swap"><SwapReview /></FlowLayout>} />
          <Route path="/swap/processing" element={<SwapProcessing />} />
          <Route path="/swap/success" element={<SwapStatus status="success" />} />
          <Route path="/swap/failed" element={<SwapStatus status="failed" />} />
          
          <Route path="/history" element={<FlowLayout title="History"><History /></FlowLayout>} />
          <Route path="/history/:id" element={<FlowLayout title="Transaction Details"><TransactionDetail /></FlowLayout>} />
          <Route path="/notifications" element={<FlowLayout title="Notifications"><Notifications /></FlowLayout>} />
          
          <Route path="/wallet/create/face-id" element={<CreateWalletPassword />} />
            <Route path="/wallet/create/seed" element={<FlowLayout><CreateWalletSeed /></FlowLayout>} />
            <Route path="/wallet/create/loading" element={<WalletLoading />} />
  
          </Route>
        </Routes>
      </SecurityProvider>
    </BrowserRouter>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
