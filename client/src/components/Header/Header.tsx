import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold"> Min butik </h1>
                <nav className="space-x-4 text-sm">
                 <Link to="/" className="hover:underline">Hem</Link>
                 <Link to="/products" className="hover:underline">Produkter</Link>
                 <Link to="/cart" className="hover:underline">Varukorg</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;