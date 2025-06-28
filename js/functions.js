const isMeetingInWorkHours = function (
  workStart,
  workEnd,
  meetingStart,
  meetingDuration
) {
  // Преобразуем время в минуты с начала дня
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number); // разделяем часы и минуты
    return hours * 60 + minutes; // возвращаем количество минут
  };

  // Преобразуем входные данные в минуты
  const workStartMinutes = timeToMinutes(workStart); // начало рабочего дня (минуты)
  const workEndMinutes = timeToMinutes(workEnd); // конец рабочего дня (минуты)
  const meetingStartMinutes = timeToMinutes(meetingStart); // начало встречи (минуты)
  const meetingEndMinutes = meetingStartMinutes + meetingDuration; // конец встречи (минуты)

  // Проверяем, выходит ли встреча за рамки рабочего дня
  return (
    meetingStartMinutes >= workStartMinutes && // проверяем не начинается ли встреча до начала рабочего дня
    meetingEndMinutes <= workEndMinutes // проверяем не заканчивается ли встреча после окончания рабочего дня
  );
};

// Примеры использования
console.log(isMeetingInWorkHours('9:00', '17:9', '10:00', 60)); // true
console.log(isMeetingInWorkHours('09:00', '17:00', '16:00', 120)); // false
console.log(isMeetingInWorkHours('8:00', '18:00', '07:30', 30)); // false
console.log(isMeetingInWorkHours('12:30', '14:30', '13:00', 30)); // true
