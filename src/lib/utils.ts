import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Security: Strip HTML tags and script content
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input.replace(/<[^>]*>?/gm, '').replace(/script/gi, '');
}

// Security: Mask Account Number (Show only last 4)
export function maskAccountNumber(account: string): string {
  if (!account || account.length < 4) return account;
  return account.slice(0, -4).replace(/./g, '*') + account.slice(-4);
}

// Security: Truncate Wallet Address (First 6, Last 4)
export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Security: Validate BVN (Exactly 11 digits)
export function isValidBVN(bvn: string): boolean {
  return /^\d{11}$/.test(bvn);
}

// Security: Validate numeric input without negative values
export function isPositiveNumeric(value: string): boolean {
  return /^\d*\.?\d+$/.test(value) && parseFloat(value) > 0;
}
