import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
import type { NextRequest } from 'next/server';

/**
 * Protects routes with Kinde auth middleware
 * Kinde Docs: https://kinde.com/docs/developer-tools/nextjs-sdk/#protect-routes-using-middleware
 * NextJS Docs: https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @param {NextRequest} req
 * @returns {Promise}
 */
export default function middleware(req: NextRequest) {
    return withAuth(req);
}

// How to match paths: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/dashboard/:path*'],
};
