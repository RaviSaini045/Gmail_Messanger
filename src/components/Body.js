import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse"

const Body=()=>{
    const AppRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
            children:[
                {
                    path:"/login",
                    element:<Login/>,
                },
                {
                    path:"/signup",
                    element:<Login/>
                }
            ]
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ])

    return(
        <div>
            <RouterProvider router={AppRouter}/>
        </div>
    );
};
export default Body;