import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { unSetChat } from "../../features/user/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center justify-between p-2 bg-slate-600 border-b border-gray-300 rounded-t-lg">
            <div className="flex items-start justify-start">
                <img
                    src="https://media.licdn.com/dms/image/v2/D4E03AQGWQJcTZhESzg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724395263433?e=1732147200&v=beta&t=G4CzguzP3tNWywXWoRQxD5JFHd5JeT3NgmgtGvwlDh8"
                    alt="Admin"
                    width={50}
                    className="rounded-full mr-4"
                />
                <div className="text-center">
                    <h1 className="m-0 text-xl font-semibold text-white">Admin</h1>
                    <div className="flex items-center justify-center mt-1">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        <p className="m-0 text-sm text-green-500">Online</p>
                    </div>
                </div>
            </div>
            <div>
              <div className="p-2 rounded shadow-md text-red-500"
              onClick={() => dispatch(unSetChat())}
              >
              <FaTimes/> 
              </div>

            </div>
        </div>
    );
}

export default Header;