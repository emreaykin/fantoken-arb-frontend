import React, { useContext } from "react";
import "./Setting.css";
import Alarm from "../../utils/alarm.svg";
import Stop from "../../utils/stop.svg";
import NotificationIcon from "../../utils/notification.svg";
import Refresh from "../../utils/refresh.svg";
import Calculate from "../../utils/calculate.svg";
import { AppContext } from "../../context/AppContext";

function Setting() {
  const {
    alarm,
    alarmSwitch,
    alarmValue,
    setAlarmValue,
    alarmNotification,
    NotificationSwitch,
    alarmNotificationValue,
    setAlarmNotificationValue,
    stopSound ,
  } = useContext(AppContext);

  return (
    <div className="Settings-menu">
      <span className="Settings-header">Ayarlar</span>

      <div className="Alarm-settings">
        <button className="Alarm">
          <img src={Alarm} alt="" />
        </button>
        <input
          className="Alarm Alarm-input"
          type="number"
          aria-label="Alarm"
          value={alarmValue === "" ? 0 : alarmValue}
          onChange={(e) => setAlarmValue(Number(e.target.value))}
        />
        <button className="Alarm Alarm-button" onClick={alarmSwitch}>
          {alarm ? "Aktif" : "Pasif"}
        </button>
        <button className="Alarm Alarm-button" onClick={stopSound}>
          <img src={Stop} alt="" />
        </button>
      </div>

      <div className="Notification-settings">
        <button className="Alarm">
          <img src={NotificationIcon} alt="" />
        </button>
        <input
          className="Alarm Alarm-input"
          type="number"
          aria-label="Alarm"
          value={alarmNotificationValue === "" ? 0 : alarmNotificationValue}
          onChange={(e) => setAlarmNotificationValue(Number(e.target.value))}
        />
        <button
          className="Alarm Alarm-button"
          onClick={NotificationSwitch}
        >
          {alarmNotification ? "Aktif" : "Pasif"}
        </button>
        <button className="Alarm Alarm-button">
          <img src={Stop} alt="" />
        </button>
      </div>

      <span className="line"></span>

      <div className="Uptade-settings">
        <button className="Alarm Alarm-button">
          <img src={Refresh} alt="" />
        </button>
        <button className="Alarm Alarm-button">
          <img src={Calculate} alt="" />
        </button>
      </div>

      <div className="Uptade-log">
        <textarea
          defaultValue="Consol Log Kayıtları"
          rows="13"
          cols="37"
          className="Area-log"
        ></textarea>
      </div>
    </div>
  );
}

export default React.memo(Setting);
