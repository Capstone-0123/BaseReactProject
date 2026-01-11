export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
        <a href="/" className="text-netflix-red hover:underline">
          Go back home
        </a>
      </div>
    </div>
  )
}

