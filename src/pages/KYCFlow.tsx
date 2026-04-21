import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ui';
import { useAuthStore } from '../store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../api/queryKeys';
import { mockApi } from '../api/mockApi';
import { KYCStepPill } from '../components/kyc';

export function KYCOverview() {
  const navigate = useNavigate();
  const tier = useAuthStore((state) => state.user.kycTier);

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-3">Verification Status</h2>
        <div className="flex flex-col gap-3">
          <KYCStepPill label="Phone number" active={tier === 0} done={tier >= 1} />
          <KYCStepPill label="Documents" active={tier === 1} done={tier >= 2} />
          <KYCStepPill label="Account" done={tier >= 2} />
        </div>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
        <h3 className="font-semibold mb-2">Current tier: {tier}</h3>
        <p className="text-sm text-gray-400 mb-4">
          {tier === 0
            ? 'Complete phone verification to unlock P2P trading and CEX crypto deposits.'
            : tier === 1
              ? 'Complete document verification to unlock card purchase, bank transfer, and full P2P.'
              : 'Your account is fully verified with full platform access.'}
        </p>
        {tier < 2 && (
          <Button onClick={() => navigate(tier === 0 ? '/kyc/phone' : '/kyc/documents')}>Verify Now</Button>
        )}
      </div>
    </div>
  );
}

export function KYCPhoneEntry() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Verify your phone number</h2>
      <Input label="Phone number" placeholder="+2348012345678" />
      <Button onClick={() => navigate('/kyc/phone/verify')}>Continue</Button>
    </div>
  );
}

export function KYCPhoneVerify() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Enter OTP code</h2>
      <Input label="Code" placeholder="6-digit code" />
      <Button onClick={() => navigate('/kyc/phone/success')}>Verify Phone</Button>
    </div>
  );
}

export function KYCPhoneSuccess() {
  const navigate = useNavigate();
  const setKYCTierFromAPI = useAuthStore((state) => state.setKYCTierFromAPI);
  const queryClient = useQueryClient();

  const complete = async () => {
    const response = await mockApi.completePhoneVerification();
    setKYCTierFromAPI(response.kycTier);
    queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
    navigate('/home');
  };

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-2">Phone verified</h2>
      <p className="text-sm text-gray-400 mb-8">You now have Tier 1 access.</p>
      <Button onClick={complete}>Go to Home</Button>
    </div>
  );
}

export function KYCDocumentsEntry() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Document verification</h2>
      <p className="text-sm text-gray-400">Complete identity verification for full platform access.</p>
      <Button onClick={() => navigate('/kyc/documents/country')}>Start Verification</Button>
    </div>
  );
}

export function KYCDocumentsCountry() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Choose country</h2>
      <Input label="Country" placeholder="Nigeria" />
      <Button onClick={() => navigate('/kyc/documents/type')}>Continue</Button>
    </div>
  );
}

export function KYCDocumentsType() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Select document type</h2>
      <Button variant="secondary" onClick={() => navigate('/kyc/documents/bvn')}>BVN</Button>
      <Button variant="secondary" onClick={() => navigate('/kyc/documents/upload')}>Passport or ID card</Button>
    </div>
  );
}

export function KYCDocumentsBVN() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Enter BVN</h2>
      <Input label="BVN" placeholder="11 digits" />
      <Button onClick={() => navigate('/kyc/documents/face')}>Continue</Button>
    </div>
  );
}

export function KYCDocumentsUpload() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Upload documents</h2>
      <p className="text-sm text-gray-400">Upload a clear image of your selected document.</p>
      <Button onClick={() => navigate('/kyc/documents/face')}>Continue</Button>
    </div>
  );
}

export function KYCDocumentsFace() {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Face verification</h2>
      <p className="text-sm text-gray-400">Take a short selfie scan to complete verification.</p>
      <Button onClick={() => navigate('/kyc/documents/success')}>Complete scan</Button>
    </div>
  );
}

export function KYCDocumentsSuccess() {
  const navigate = useNavigate();
  const setKYCTierFromAPI = useAuthStore((state) => state.setKYCTierFromAPI);
  const queryClient = useQueryClient();

  const complete = async () => {
    const response = await mockApi.completeDocumentVerification();
    setKYCTierFromAPI(response.kycTier);
    queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
    navigate('/home');
  };

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-2">Verification complete</h2>
      <p className="text-sm text-gray-400 mb-8">You now have Tier 2 full access.</p>
      <Button onClick={complete}>Go to Home</Button>
    </div>
  );
}
