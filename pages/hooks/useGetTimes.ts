import { useCallback, useMemo } from "react";
import ScheduleFormService from "../services/scheduleFormService";

const useGetTimes = () => {
  const scheduleFormService = useMemo(() => new ScheduleFormService(), []);

  const getTimes = useCallback(() => {
    return scheduleFormService.getTimes().then((times) => {
      return Promise.resolve(times);
    });
  }, [scheduleFormService]);

  return getTimes;
};

export default useGetTimes;
