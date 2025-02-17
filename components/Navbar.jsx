const Navbar = () => {
  return (
    <div className="flex flex-wrap justify-around py-3">
      <h2 className="text-lg font-semibold">Todo App</h2>
      <ul className="flex gap-[40px] text-md">
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
