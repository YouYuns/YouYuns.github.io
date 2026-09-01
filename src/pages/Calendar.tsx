import React, { useState, useEffect } from "react";
import { useFadeUp } from "../hooks/useFadeUp";

/* CalendarDay Props */
interface CalendarDayProps {
  day: number;
  isWeddingDay: boolean;
  isHoliday: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isWeddingDay,
  isHoliday,
}) => {
  const dayOfWeekClass = day % 7 === 1 ? "red" : day % 7 === 0 ? "blue" : "";
  const holidayClass = isHoliday ? "red" : "";
  const specialDayClass = isWeddingDay ? "heart red" : "";

  return (
    <div
      className={`calendar__day ${dayOfWeekClass} ${specialDayClass} ${holidayClass}`}
    >
      {day}
    </div>
  );
};

/* 남은 시간 타입 */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Calendar: React.FC = () => {
  const { ref: calendarRef, show: calendarShow } = useFadeUp();
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: timerRef, show: timerShow } = useFadeUp();
  /* 📅 2026년 11월 */
  const daysInMonth = 30; // 11월
  const firstDayOfWeek = 0; // 2026-11-01 = 일요일
  const emptyDays: null[] = Array.from({ length: firstDayOfWeek }, () => null);
  const days: number[] = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const target = new Date(2026, 10, 14, 15, 0, 0);

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer(); // ⭐ 중요
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container calendar between_space">
      <div ref={titleRef} className={`fade-up ${titleShow ? "show" : ""}`}>
        <div className="contact__sub_title">Calendar Info</div>
        <div className="contact__title">웨딩날짜</div>

        <h3>2026년 11월 14일 토요일 오후 3시</h3>
      </div>
      <div
        ref={calendarRef}
        className={`fade-up ${calendarShow ? "show" : ""}`}
      >
        <div className="calendar__line"></div>

        <div className="calendar__body">
          <div className="calendar__weekdays">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar__days">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {days.map((day) => (
              <CalendarDay
                key={day}
                day={day}
                isWeddingDay={day === 14}
                isHoliday={false}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        ref={timerRef}
        className={`fade-up ${timerShow ? "show" : ""}`}
        style={{ width: "100%" }}
      >
        <div className="calendar__remain">
          <span>{timeLeft.days}일</span>
          <span>{timeLeft.hours}시간</span>
          <span>{timeLeft.minutes}분</span>
          <span>{timeLeft.seconds}초</span>
        </div>

        <div>
          성호♥소리의 결혼식{" "}
          <span className="calendar__remain-day">{timeLeft.days}일</span> 전
        </div>
      </div>
    </div>
  );
};

export default Calendar;
