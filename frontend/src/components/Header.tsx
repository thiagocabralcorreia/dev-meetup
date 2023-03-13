import { FaComments } from "react-icons/fa";

function Header() {
  return (
    <div className="flex content-center gap-4 py-6 px-16">
      <FaComments className="pt-2 text-3xl text-primary" />
      <h1 className="font-fredoka text-2xl text-white">
        dev<span className="text-primary">meetup</span>
      </h1>
    </div>
  );
}

export default Header;
