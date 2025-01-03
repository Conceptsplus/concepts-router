import { redirect } from '@remix-run/node';
import { auth } from '~/lib/firebase.server';
import { getSession } from '~/utils/session.server';

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  if (!token) {
    throw redirect('/auth/login');
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw redirect('/auth/login');
  }
}

export async function requireAdmin(request: Request) {
  const decodedToken = await requireAuth(request);
  
  // Check if user has admin role in Firestore
  const userDoc = await auth.getUser(decodedToken.uid);
  const customClaims = userDoc.customClaims || {};
  
  if (!customClaims.role || customClaims.role !== 'admin') {
    throw redirect('/');
  }

  return { ...decodedToken, role: customClaims.role };
}

export async function requireKeyholder(request: Request) {
  const decodedToken = await requireAuth(request);
  
  // Check if user has keyholder role in Firestore
  const userDoc = await auth.getUser(decodedToken.uid);
  const customClaims = userDoc.customClaims || {};
  
  if (!customClaims.role || !['admin', 'keyholder'].includes(customClaims.role)) {
    throw redirect('/');
  }

  return { ...decodedToken, role: customClaims.role };
}

export async function rateLimiter(request: Request) {
  // Implement rate limiting logic here
  return true;
}
