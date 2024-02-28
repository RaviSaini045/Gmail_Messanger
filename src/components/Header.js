import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { addUser} from "../utils/userSlice";
import { LOGO, USER_AVATAR, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGPTSearch } from "../utils/gptSlice";
import { selectLanguage } from "../utils/configSlice";


const Header=()=>{
	const [showList,setShowList]=useState(false);
	const user = useSelector((store)=>store.user);
	const showGPT = useSelector((store) => store.gpt.toggleGPT)
	const dispatch=useDispatch();
	const navigate=useNavigate();
	const renderList=()=>{
	setShowList(!showList);
	}
	const handleGPTSearch = ()=>{
		dispatch(toggleGPTSearch())
	}
	const logOutUser=()=>{
	signOut(auth)
		.then(() => {
		dispatch(removeUser());
		})
		.catch((error) => {
		navigate("/error");
		});
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
		if (user) {
			const { uid, email, displayName } = user;
			dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
			navigate("/browse");
		} else {
			dispatch(removeUser(null));
			navigate("/");
		}
		});
		return ()=>{
			unsubscribe();
		}
	}, []);

  const handleLanguageChange = (e)=>{
    dispatch(selectLanguage(e.target.value));
  }
	return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
        <button
          className="py-2 px-4 h-8 pb-2 mx-4 my-2 bg-pink-200 text-white rounded-lg "
          onClick={handleGPTSearch}
        >
          {!showGPT ? "Show GPT" : "Home Page"}
        </button>
        {showGPT && <select className="p-2 w-28 bg-gray-800 text-white h-10 " onChange={handleLanguageChange} >
            {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          ))}
        </select>}
      <div className="relative ml-3">
        <div>
          {user !== null && (
            <>
              <button
                type="button"
                className="relative  flex max-w-xs items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={renderList}
              >
                <span className="absolute -inset-1.5"></span>
                {/* <span className="sr-only">Open user menu</span> */}
                <img
                  className="h-10 w-10  p-2"
                  src={USER_AVATAR}
                  alt="user_icon"
                />
              </button>
            </>
          )}
          {showList && (
            <div className="border bg-black bg-opacity-80 text-white min-w-min">
              <ul className="p-2 m-2">
                <li>
                  <button>Profile</button>
                </li>
                <li>
                  <button>Transfer Profile</button>
                </li>
                <li>
                  <button>Help Center</button>
                </li>
                <li>
                  <button onClick={logOutUser}>Sign Out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
	}
	export default Header;
