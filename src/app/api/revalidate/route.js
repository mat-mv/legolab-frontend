import { revalidateTag } from 'next/cache'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401, headers: CORS_HEADERS })
  }

  const tag = request.nextUrl.searchParams.get('tag')

  if (!tag) {
    return Response.json({ message: 'Missing tag' }, { status: 400, headers: CORS_HEADERS })
  }

  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() }, { headers: CORS_HEADERS })
}