import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Test from "./pages/test/Test";
import Home from "./pages/home/Home";
import Copy from "./pages/copy/Copy";
import Login from "./pages/employee/Login";
import Notice from "./pages/notice/Notice";
import NoticeDetail from "./pages/notice/NoticeDetail";
import ReceiveMessageBox from "./pages/message/ReceiveMessageBox";
import SendMessageBox from "./pages/message/SendMessageBox";
import ImpoMessageBox from "./pages/message/ImpoMessageBox";
import BinMessageBox from "./pages/message/BinMessageBox";
import AppCSS from "./App.module.css";


function App() {
  return (
    <BrowserRouter>
      <div className={AppCSS.container} >

        <Routes>
          <Route path="/login" element={ <Login />} />
            <Route path="/" element={ <Layout />} >
              <Route index element={ <Main />} />
              <Route path="Home" element={ <Home />} />
              <Route path="Copy" element={ <Copy />} />
              <Route path="Test" element={ <Test />} />
              <Route path="Notice" element={<Notice />} />
              <Route path="noticeDetail/:notNo" element={<NoticeDetail />} />
              <Route path="message/receive" element={ <ReceiveMessageBox/> }/>
              <Route path="message/send" element={ <SendMessageBox/> }/>
              <Route path="message/impo" element={ <ImpoMessageBox/> }/>
              <Route path="message/bin/receive" element={ <BinMessageBox/> }/>
            </Route>

            

        </Routes>
      </div>




    </BrowserRouter>
  );
}

export default App;