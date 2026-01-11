import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  const path = params.path.join('/')
  const searchParams = request.nextUrl.searchParams
  
  // API 키를 쿼리 파라미터에 추가
  searchParams.set('api_key', apiKey)
  
  const url = `https://api.themoviedb.org/3/${path}?${searchParams.toString()}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch from TMDB API' },
      { status: 500 }
    )
  }
}

