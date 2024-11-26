import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full p-6  flex justify-between items-center ">
      <h1 className="text-3xl text-purple-500 font-semibold">Party Time!</h1>
      <div className="flex gap-4">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/party/new'}>Criar festa</NavLink>
      </div>
    </nav>
  )
}

export default Navbar;