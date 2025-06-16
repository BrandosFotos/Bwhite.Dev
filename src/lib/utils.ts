import { NextRequest } from 'next/server';

export function getRouteParam(request: NextRequest): string {
    return request.nextUrl.pathname.split('/').pop() || '';
}
