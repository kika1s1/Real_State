import {  FaCommentAlt, FaPaperPlane } from "react-icons/fa";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setAndUnsetChat } from "../../features/user/userSlice";

const Chat = () => {
const { showChat } = useSelector((state) => state.user);
const {currentUser} = useSelector((state)=>state.user)
// console.log(useSelector((state) => state.user));
const dispatch = useDispatch();
  const handleChat = () => {
    if (!currentUser) {
        window.location.href = '/signin';
        return;
    }
    dispatch(setAndUnsetChat());
  };
  return (
    <main className="fixed right-0 bottom-0  rounded-xl bg-white z-20">
      <div className=" ">
        {showChat && (
          <div>
            <Header />
            <Message />
          </div>
        )}

        {!showChat &&(
          <div
            className="bg-blue-800 text-white p-3 rounded-lg"
            onClick={handleChat}
          >
            <div className="flex items-center gap-2">
              <div className="text-sm">Chat with us</div>
              <div className="bg-white text-blue-800 p-1 rounded-full">
                <FaCommentAlt className="text-xs" />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Chat;

const Message = () => {
  return (
    <>
      <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg max-h-60 overflow-y-auto">
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg self-start">
          <div className="text-sm">Hi, how can we help you today?</div>
        </div>
        <div className="bg-gray-50 text-gray-800 p-3 rounded-lg self-end">
          <div className="text-sm">
            I need some information about your services.
          </div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg self-start">
          <div className="text-sm">Hi, how can we help you today?</div>
        </div>
        <div className="bg-gray-50 text-gray-800 p-3 rounded-lg self-end">
          <div className="text-sm">
            I need some information about your services.
          </div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg self-start">
          <div className="text-sm">Hi, how can we help you today?</div>
        </div>
        <div className="bg-gray-50 text-gray-800 p-3 rounded-lg self-end">
          <div className="text-sm">
            I need some information about your services.
          </div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg self-start">
          <div className="text-sm">Sure, what would you like to know?</div>
        </div>
      </div>
      <form className="flex items-center gap-2 mt-2 sticky bottom-0 bg-gray-50 p-3 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-800 text-white p-2 rounded-lg">
          <FaPaperPlane className="text-xs" />
        </button>
      </form>
    </>
  );
};
