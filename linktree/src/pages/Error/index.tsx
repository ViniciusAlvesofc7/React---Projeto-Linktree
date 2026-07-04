import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

const ErrorPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
        <p className="text-lg mb-8">Você caiu em uma página que não existe!</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition duration-300 ease-in-out">
          <FiArrowLeft className="text-lg font-bold" />
          <p>Voltar para a página inicial</p>
        </Link>
    </div>
  )
}

export default ErrorPage
