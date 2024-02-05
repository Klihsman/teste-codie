import { useCallback, useMemo } from "react";
import ScheduleFormService from "../services/scheduleFormService";

const useGetDates = () => {
  const scheduleFormService = useMemo(() => new ScheduleFormService(), []);

  const getDates = useCallback(() => {
    return scheduleFormService.getDates().then((dates) => {
      return Promise.resolve(dates);
    });
  }, [scheduleFormService]);

  return getDates;
};

export default useGetDates;
