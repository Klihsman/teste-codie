import { useCallback, useMemo } from "react";
import ScheduleFormService from "../services/scheduleFormService";

const useGetLocations = () => {
  const scheduleFormService = useMemo(() => new ScheduleFormService(), []);

  const getLocations = useCallback(() => {
    return scheduleFormService.getLocations().then((locations) => {
      return Promise.resolve(locations);
    });
  }, [scheduleFormService]);

  return getLocations;
};
export default useGetLocations;
