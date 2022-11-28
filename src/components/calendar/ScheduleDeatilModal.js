import { callScheduleDetailAPI, callUpdateScheduleAPI, callDeleteScheduleAPI } from "../../api/CalendarAPICalls";
import { callEmployeeInfoAPI } from "../../api/EmployeeAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils';

function ScheduleDetailModal({clickEventId, setScheduleDetailModal}){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    
    if(isLogin) {
            const temp = decodeJwt(isLogin);
            decoded = temp.auth[0];
    }

    const dispatch = useDispatch();
    const calendarEvent = useSelector(state => state.calendarReducer); // 일정 정보
    const loginEmp = useSelector(state => state.employeeReducer); // 로그인한 사원 정보
    const [modifyMode, setModifyMode] = useState(false);
    const [update, setUpdate] = useState({});

    useEffect(
        () => {
            dispatch(callScheduleDetailAPI({
                scheduleNo : clickEventId
            }));

            dispatch(callEmployeeInfoAPI());
        }
        , []
    )

    /* 일정 수정 모드로 변경 */
    const onClickUpdateBtnHandler = () => {
        setModifyMode(true);
        setUpdate({
            calendarCategory : {
                calendarCategoryName : calendarEvent.calendarCategory.calendarCategoryName
            },
            scheduleTitle : calendarEvent.scheduleTitle,
            startDate : calendarEvent.startDate,
            endDate : calendarEvent.endDate,
            startTime : calendarEvent.startTime,
            scheduleLocation : calendarEvent.scheduleLocation,
            scheduleContent : calendarEvent.scheduleContent
        });

        console.log(update);
    }

    /* 수정 일정 입력 */
    const onChangeHandler = (e) => {
        setUpdate({
            ...update,
            [e.target.name] : e.target.value
        });
    }

    /* slect 수정 */
    const onSelectChangeHandler = (e) => {
        setUpdate({
            ...update,
            calendarCategory : {
                calendarCategoryName : e.target.value
            }
        });
    }

    /* 일정 수정 저장 */
    const onClickSaveHandler = (e) => {

        console.log(update);
        dispatch(callUpdateScheduleAPI({ 
            form : update,
            scheduleNo : clickEventId
        }));

        window.alert('일정이 수정되었습니다.');
        window.location.reload();
    }

    /* 일정 삭제 */
    const onClickDeleteBtnHandler = () => {

        dispatch(callDeleteScheduleAPI({ scheduleNo : clickEventId }));

        window.alert('일정이 삭제되었습니다.');
        window.location.reload();
    }

    console.log(update);

    return(
        <>
            <button
                onClick={ () => setScheduleDetailModal(false) }
            >X</button>
            <div key={clickEventId}>
                <select onChange={ e => onSelectChangeHandler(e) }>
                    { modifyMode && <>
                        <option>{calendarEvent.calendarCategory.calendarCategoryName}</option>
                        <option>내 일정</option>
                        { loginEmp.position.positionNo > 211 /* 사원 이상부터 부서일정 추가/수정 가능 */ && <> 
                            <option>부서 일정</option>
                                { decoded == "ROLE_ADMIN" /* 관리자만 전사 일정 추가/수정 가능 */ && <>
                                    <option>전사 일정</option>
                                </> }
                        </>}
                    </> || calendarEvent.calendarCategory && <option>{calendarEvent.calendarCategory.calendarCategoryName}</option> }
                

                </select>
                <input 
                    name='scheduleTitle'
                    value={ (!modifyMode ? calendarEvent.scheduleTitle : update.scheduleTitle) || '' }
                    readOnly={ modifyMode ? false : true }
                    placeholder='일정 타이틀'
                    onChange={ e => onChangeHandler(e) }
                />
                <input
                    name='startDate'
                    type='date'
                    value={ (!modifyMode ? calendarEvent.startDate : update.startDate) || '' }
                    readOnly={ modifyMode ? false : true }
                    onChange={ e => onChangeHandler(e) }
                />
                <input 
                    name='endDate'
                    type='date'
                    value={ (!modifyMode ? calendarEvent.endDate : update.endDate) || '' }
                    readOnly={ modifyMode ? false : true }
                    onChange={ e => onChangeHandler(e) }
                />
                <input 
                    type='time'
                    name='startTime'
                    value={ (!modifyMode ? calendarEvent.startTime : update.startTime) || '' }
                    readOnly={ modifyMode ? false : true }
                    onChange={ e => onChangeHandler(e) }
                />
                <input
                    name='scheduleLocation'
                    value={ (!modifyMode ? calendarEvent.scheduleLocation : update.scheduleLocation) || '' }
                    readOnly={ modifyMode ? false : true }
                    onChange={ e => onChangeHandler(e) }
                />
                <input
                    name='scheduleContent'
                    value={ (!modifyMode ? calendarEvent.scheduleContent : update.scheduleContent) || '' }
                    readOnly={ modifyMode ? false : true }
                    onChange={ e => onChangeHandler(e) }
                />
                </div>
                { !modifyMode && <> 
                    <button onClick={() => onClickUpdateBtnHandler()}>수정</button>
                    <button onClick={ () => onClickDeleteBtnHandler() }>삭제</button>
                </> }
                { modifyMode && <>
                    <button onClick={() => onClickSaveHandler() }>저장</button>
                    <button onClick={ () => setModifyMode(false) }>취소</button>
                </> }
        </>
    );
}

export default ScheduleDetailModal;