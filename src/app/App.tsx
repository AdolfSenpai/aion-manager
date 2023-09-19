import { initializeApp } from "@firebase/app";
import Navbar from "./Navbar/Navbar";
import Router, { useRouter } from "preact-router";
import { useRoutes } from "react-router";

const firebaseConfig = {
    apiKey: "AIzaSyB6gLCAd3vsb-QYSAFhh_6BjjnruAxlJjI",
    authDomain: "aion-2023.firebaseapp.com",
    projectId: "aion-2023",
    storageBucket: "aion-2023.appspot.com",
    messagingSenderId: "776192316285",
    appId: "1:776192316285:web:f0c60e974ee605ad0a3214"
};

export default function App() {
      
    initializeApp(firebaseConfig);
    
    useRoutes([
        {
            path: "/",
            element: TestComponent,
        },
        {
            path: "/test",
            element: TestComponent2,
        },
    ]);

    return (
        <div class="section">
            <Navbar />
        </div>
    );
}

const TestComponent = ({...props}) => {

    return(<div>/ <a href="/test">To test</a></div>);
}

const TestComponent2 = ({...props}) => {

    return(<div>/TEST <a href="/">Back</a></div>);
}