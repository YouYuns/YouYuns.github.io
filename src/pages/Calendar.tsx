import React, { useState, useEffect } from 'react';
import '../css/Calendar.css'; // 스타일 분리

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
  const dayOfWeekClass = day % 7 === 1 ? 'red' : day % 7 === 0 ? 'blue' : '';
  const holidayClass = isHoliday ? 'red' : '';
  const specialDayClass = isWeddingDay ? 'heart red' : '';

  return (
    <div
      className={`calendar__day ${dayOfWeekClass} ${specialDayClass} ${holidayClass}`}
      style={{
        minWidth: '32px', // ⭐ 숫자 바뀌어도 width 고정
        minHeight: '32px', // ⭐ 숫자 바뀌어도 height 고정
      }}
    >
      {day}
    </div>
  );
};

/* 남은 시간 타입 */
interface TimeLeft {
  days: number;
  hours: number;
}

const Calendar: React.FC = () => {
  const daysInMonth = 30; // 11월
  const firstDayOfWeek = 0; // 2026-11-01 = 일요일
  const emptyDays: null[] = Array.from(
    { length: firstDayOfWeek },
    () => null
  );
  const days: number[] = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const target = new Date(2026, 10, 14, 15, 0, 0);

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      });
    };

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container calendar" style={{ overflowAnchor: 'none' }}> {/* ⭐ overflow-anchor 추가 */}
      <div className="contact__sub_title">Calendar Info</div>
      <div className="contact__title">웨딩날짜</div>
      <h3>2026년 11월 14일 토요일 오후 3시</h3>

      <div className="calendar__line"></div>

      <div className="calendar__body" style={{ overflowAnchor: 'none' }}> {/* ⭐ overflow-anchor 추가 */}
        <div className="calendar__weekdays">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
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

      <div className="calendar__remain" style={{ display: 'flex', gap: '8px', minHeight: '24px' }}>
        <span>{timeLeft.days}일</span>
        <span>{timeLeft.hours}시간</span>
      </div>

      <div>
        성호♥소리의 결혼식{' '}
        <span className="calendar__remain-day">{timeLeft.days}일</span> 전
      </div>
    </div>
  );
};

export default Calendar;
