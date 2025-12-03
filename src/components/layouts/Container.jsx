import { Footer } from "./Footer"
import { Header } from "./Header"

export const Container = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
        <Header />
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-[80vh] text-white overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full">
            { children }
          </div>
        <Footer />
    </div>
  )
}