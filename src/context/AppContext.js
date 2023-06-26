import { createContext, useState, useEffect } from "react";
import { Howl } from "howler";
import Music from "../mymusic.mp3";

export const AppContext = createContext();

const sound = new Howl({
  src: [Music],
});

export const AppContextProvider = ({ children }) => {
  // Remaining state variables and their setters
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [playsound, setPlaySound] = useState(false);
  const [notificationPlay, setNotificationPlay] = useState(false);
  const [alarmValue, setOldAlarmValue] = useState(() => {
    const storedAlarmValue = localStorage.getItem("alarmValue");
    return storedAlarmValue ? Number(storedAlarmValue) : 0;
  });
  const [alarmNotificationValue, setOldAlarmNotificationValue] = useState(
    () => {
      const storedAlarmNotificationValue = localStorage.getItem(
        "alarmNotificationValue"
      );
      return storedAlarmNotificationValue
        ? Number(storedAlarmNotificationValue)
        : 0;
    }
  );
  const [alarm, setAlarm] = useState(() => {
    const storedAlarm = localStorage.getItem("alarm");
    return storedAlarm ? JSON.parse(storedAlarm) : false;
  });
  const [alarmNotification, setAlarmNotification] = useState(() => {
    const storedAlarmNotification = localStorage.getItem("alarmNotification");
    return storedAlarmNotification
      ? JSON.parse(storedAlarmNotification)
      : false;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const stopSound = () => {
    sound.stop();
  };
  const setNewAlarmValue = (value) => {
    setOldAlarmValue(value);
    localStorage.setItem("alarmValue", value);
  };

  const setNewAlarmNotificationValue = (value) => {
    setOldAlarmNotificationValue(value);
    localStorage.setItem("alarmNotificationValue", value);
  };

  const alarmSwitch = () => {
    const newAlarm = !alarm;
    setAlarm(newAlarm);
    localStorage.setItem("alarm", newAlarm);
  };

  const NotificationSwitch = () => {
    const newAlarmNotification = !alarmNotification;
    setAlarmNotification(newAlarmNotification);
    localStorage.setItem("alarmNotification", newAlarmNotification);
  };
  useEffect(() => {
    function establishWebSocketConnection() {
      const socket = new WebSocket("ws://localhost:4000");

      socket.onopen = () => {
        console.log("Connected to the WebSocket Server");
        if ("Notification" in window) {
          Notification.requestPermission().then(function (result) {
            if (result === "granted") {
              new Notification("Bağlantı Durumu", {
                body: `Sunucu bağlantısı başarılı`,
              });
            }
          });
        }
      };

      socket.onmessage = (event) => {
        const dataFromServer = JSON.parse(event.data);
        const sortedData = dataFromServer.sort((a, b) => b.profit - a.profit);

        setOriginalData(sortedData); // Update the original data
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
        if ("Notification" in window) {
          Notification.requestPermission().then(function (result) {
            if (result === "granted") {
              new Notification("Bağlantı Durumu", {
                body: `Sunucu bağlantı kesildi 30 saniye içinde tekrar deneniyor.`,
              });
            }
          });
        }
        setTimeout(establishWebSocketConnection, 30000);
      };
    }

    establishWebSocketConnection();
  }, []);

  useEffect(() => {
    let filteredData = originalData;
    if (searchTerm.trim() !== "") {
      filteredData = originalData.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setData(filteredData); // Update the filtered data
  }, [searchTerm, originalData]); // Rely on searchTerm and originalData

  useEffect(() => {
    const checkAlarmCondition = () => {
      return data.some((item) => {
        const profit = parseInt(item.profit);
        return (
          profit > alarmValue && item.withdrawEnabled && item.depositEnabled
        );
      });
    };

    const checkNotificationCondition = () => {
      for (let item of data) {
        const profit = parseInt(item.profit);
        if (
          profit > alarmNotificationValue &&
          item.withdrawEnabled &&
          item.depositEnabled
        ) {
          return item;
        }
      }
      return null;
    };

    if (alarm && checkAlarmCondition()) {
      setPlaySound(true);
      console.log("çalıyor...");
      sound.pause();
      sound.seek(0);
      sound.play();
      setAlarm(false);
      localStorage.setItem("alarm", false);
    }
    const alarmTriggeringItem = checkNotificationCondition();

    if (alarmNotification && alarmTriggeringItem) {
      setNotificationPlay(true);
      console.log("çalıyor bildirim...");
      if ("Notification" in window) {
        Notification.requestPermission().then(function (result) {
          if (result === "granted") {
            new Notification("Fırsat", {
              body: `${alarmTriggeringItem.exchangeOne} -> ${alarmTriggeringItem.exchangeTwo},Coin: ${alarmTriggeringItem.exchangeOneSymbol} , Kaar: ${alarmTriggeringItem.profit}`,
            });
          }
        });
      }
      localStorage.setItem("alarmNotification", false);
      setAlarmNotification(false);
    }
  }, [data, alarmValue, alarm, alarmNotificationValue, alarmNotification]);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        alarmValue,
        setOldAlarmValue,
        alarmNotificationValue,
        setOldAlarmNotificationValue,
        playsound,
        setPlaySound,
        notificationPlay,
        setNotificationPlay,
        alarm,
        setAlarm,
        alarmNotification,
        setAlarmNotification,
        stopSound,
        searchTerm,
        setSearchTerm,
        setAlarmValue: setNewAlarmValue,
        setAlarmNotificationValue: setNewAlarmNotificationValue,
        alarmSwitch,
        NotificationSwitch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
