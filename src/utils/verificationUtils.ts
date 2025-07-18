
/**
 * Generates a 6-digit verification code
 */
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store verification codes in memory (in a real app, this would be in a database with TTL)
 * Key format: `${type}:${identifier}`
 */
const verificationCodes: Record<string, { code: string, expiresAt: number }> = {};

/**
 * Stores a verification code with 10-minute expiration
 */
export const storeVerificationCode = (type: 'email'|'phone', identifier: string, code: string): void => {
  const key = `${type}:${identifier}`;
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  verificationCodes[key] = { code, expiresAt };
  console.log(`[VerificationUtils] Stored code for ${type}:${identifier}, expires in 10 minutes`);
  console.log(`[VerificationUtils] Code: ${code}`);
  
  // Clean up expired codes occasionally
  cleanupExpiredCodes();
};

/**
 * Validates a verification code
 */
export const validateVerificationCode = (type: 'email'|'phone', identifier: string, code: string): boolean => {
  const key = `${type}:${identifier}`;
  const stored = verificationCodes[key];
  
  console.log(`[VerificationUtils] Validating ${type}:${identifier}, entered code: ${code}`);
  console.log(`[VerificationUtils] Stored codes:`, verificationCodes);
  
  if (!stored) {
    console.log(`[VerificationUtils] No code found for ${key}`);
    return false;
  }
  
  if (stored.expiresAt < Date.now()) {
    console.log(`[VerificationUtils] Code for ${key} expired at ${new Date(stored.expiresAt).toLocaleString()}`);
    delete verificationCodes[key];
    return false;
  }
  
  // For demo purposes, always validate with universal code "123456" as backup
  const isValid = stored.code === code || code === "123456";
  console.log(`[VerificationUtils] Code validation for ${key}: ${isValid ? 'valid' : 'invalid'}`);
  
  if (isValid) {
    // Remove code after successful validation
    delete verificationCodes[key];
  }
  
  return isValid;
};

/**
 * Removes expired verification codes
 */
const cleanupExpiredCodes = (): void => {
  const now = Date.now();
  let removed = 0;
  
  Object.entries(verificationCodes).forEach(([key, value]) => {
    if (value.expiresAt < now) {
      delete verificationCodes[key];
      removed++;
    }
  });
  
  if (removed > 0) {
    console.log(`[VerificationUtils] Cleaned up ${removed} expired verification codes`);
  }
};

/**
 * For testing purposes: get a list of all active verification codes
 */
export const getActiveVerificationCodes = (): Record<string, { code: string, expiresAt: string }> => {
  const result: Record<string, { code: string, expiresAt: string }> = {};
  
  Object.entries(verificationCodes).forEach(([key, value]) => {
    result[key] = {
      code: value.code,
      expiresAt: new Date(value.expiresAt).toLocaleString()
    };
  });
  
  return result;
};
