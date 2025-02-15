import SubSidebarCSS from "./SubSidebar.module.css";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { decodeJwt } from '../../utils/tokenUtils';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SubSidebar() {

    const navigate = useNavigate();
    const employee = useSelector(state => state.employeeReducer);

    const onClickSurveyInsert = () => {
        console.log('[survey] onClickSurveyInsert');
        navigate("/survey-registration", { replace: false })
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if (isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    $(function () {
        $("#slideToggleBtn").on("click", function () {
            $("#divBox").fadeToggle("fast");
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();

        });
    });

    $(function () {
        $("#slideToggleBtn1").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").fadeToggle("fast");
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();

        });
    });

    $(function () {
        $("#slideToggleBtn2").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").fadeToggle("fast");
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();

        });
    });

    $(function () {
        $("#slideToggleBtn3").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").fadeToggle("fast");
            $("#divBox4").hide();
            $("#divBox5").hide();

        });
    });

    $(function () {
        $("#slideToggleBtn4").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").fadeToggle("fast");
            $("#divBox5").hide();

        });
    });

    $(function () {
        $("#slideToggleBtn5").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").fadeToggle("fast");

        });
    });


    return (

        <div className={SubSidebarCSS.sidebar}>

            {/* 1.근태관리 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>근태관리</li>
                </div>
                <div>

                    <ul>
                        <li className={SubSidebarCSS.sideTitle1}>ㅇ근태 관리</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="att/start">일일 근태 등록</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}>월간 근태 현황</li>
                    </ul>
                    <ul>
                        <li className={SubSidebarCSS.sideTitle2}>ㅇ휴가 관리</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="rest/regist">연차 신청</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="rest/list">연차 조회</NavLink></li>
                        {decoded === "ROLE_ADMIN" && <li className={SubSidebarCSS.smallTitle}><NavLink to="rest/list/admin">연차 인가</NavLink></li>}
                    </ul>
                </div>

            </div>
            {/* 2.전자결재 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox1">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>전자결재</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="approval/regist">결재 작성</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="approval/draft">상신함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="approval/approver">수신함</NavLink></li>
                    </ul>

                </div>

            </div>

            {/* 3.주소록 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox2">
                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CoPresentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>직원관리</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="emp/employeeList">직원 조회</NavLink></li>
                        {/* 관리자로 로그인시 보이게끔 작업할 것 */}
                        {employee.employeeRole === 'ROLE_ADMIN' && <li className={SubSidebarCSS.smallTitle}><NavLink to="employee/regist">직원 등록</NavLink></li>}

                    </ul>

                </div>
            </div>
            {/* 3.메세지 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox3">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <EmailIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>메시지</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/write">새 메시지 작성</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/receive">받은 메시지함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/send">보낸 메시지함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/impo">중요 메시지함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/bin/receive">휴지통</NavLink></li>
                    </ul>

                </div>

            </div>
            {/* 4.캘린더 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox4">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CalendarMonthIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>캘린더</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="calendar/add">새 일정 추가</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="calendar">내 캘린더</NavLink></li>

                    </ul>

                </div>

            </div>
            {/* 5.설문조사 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox5">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>설문조사</li>
                </div>
                <div className={SubSidebarCSS.midleTitle}>
                     <li onClick={onClickSurveyInsert}>
                        설문등록
                    </li>

                </div>
                <div>
                    <ul>
                        <li className={SubSidebarCSS.sideTitle1}> ㅇ설문</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="survey/ing">진행중인 설문</NavLink></li>
                    </ul>

                </div>

            </div>
            

        </div>
    );

}

export default SubSidebar;